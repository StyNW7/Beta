import React, { useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
import Lobby from "./lobby";
import Game from "./game";
import { toast } from "sonner";

const SOCKET_SERVER_URL = "http://localhost:3000";

interface Player {
  id: string;
  name: string;
  score: number;
}

interface Round {
  questionNumber: number;
  imageSrc: string;
  hint: string;
  correctAnswer: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

interface GameSession {
  gameId: string;
  players: Player[];
  currentRound: number;
  rounds: Round[];
}

function GeoCulturePage() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [gameSession, setGameSession] = useState<GameSession | null>(null);
  const [playerName, setPlayerName] = useState<string>("");

  useEffect(() => {
    const newSocket = io(SOCKET_SERVER_URL);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleSessionUpdate = (session: GameSession) =>
      setGameSession(session);

    socket.on("gameCreated", handleSessionUpdate);
    socket.on("playerJoined", handleSessionUpdate);
    socket.on("gameStarted", handleSessionUpdate);
    socket.on("nextRound", handleSessionUpdate);
    socket.on("roundResult", handleSessionUpdate);
    socket.on("playerLeft", (session: GameSession) => {
      setGameSession(session);
      alert("The other player has left the game.");
    });

    socket.on("gameOver", (session: GameSession) => {
      const winner = session.players.sort((a, b) => b.score - a.score)[0];
      alert(`Game Over! Winner: ${winner.name}`);
      setGameSession(null);
    });

    socket.on("gameError", (message: string) => {
      toast.error(message);
    });

    return () => {
      socket.off("gameCreated");
      socket.off("playerJoined");
      socket.off("gameStarted");
      socket.off("nextRound");
      socket.off("roundResult");
      socket.off("gameOver");
      socket.off("playerLeft");
      socket.off("gameError");
    };
  }, [socket]);

  const handleCreateGame = () => {
    if (!playerName || !socket) {
      alert("Please enter your name.");
      return;
    }
    socket.emit("createGame", playerName);
  };

  const handleJoinGame = (gameId: string) => {
    if (!playerName || !gameId || !socket) {
      alert("Please enter your name and a game ID.");
      return;
    }
    socket.emit("joinGame", { gameId, playerName });
  };

  return (
    <div>
      {!gameSession ? (
        <Lobby
          playerName={playerName}
          setPlayerName={setPlayerName}
          onCreateGame={handleCreateGame}
          onJoinGame={handleJoinGame}
        />
      ) : (
        <Game socket={socket} gameSession={gameSession} />
      )}
    </div>
  );
}

export default GeoCulturePage;
