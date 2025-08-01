import { Server } from "socket.io";

let io;
const gameSessions = {}; // In-memory game state

export function setupSocket(server) {
  io = new Server(server, {
    cors: {
      origin: "*", // Or restrict to your frontend URL
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    socket.on("createGame", (playerName) => {
      const gameId = Math.random().toString(36).substring(2, 8).toUpperCase();
      gameSessions[gameId] = {
        gameId,
        players: [{ id: socket.id, name: playerName, score: 0 }],
        rounds: [],
        currentRound: 0,
      };
      socket.join(gameId);
      socket.emit("gameCreated", gameSessions[gameId]);
    });

    socket.on("joinGame", ({ gameId, playerName }) => {
      const session = gameSessions[gameId];
      if (session && session.players.length < 2) {
        session.players.push({ id: socket.id, name: playerName, score: 0 });
        socket.join(gameId);
        io.to(gameId).emit("playerJoined", session);

        if (session.players.length === 2) {
          session.rounds = [
            {
              questionNumber: 1,
              imageSrc: "/Images/quizz/jam-gadang.png",
              hint: "Menara jam ikonik ini terletak di jantung kota besar Sumatera",
              correctAnswer: "Padang/Bukittinggi",
              description:
                "Ini adalah Jam Gadang yang terkenal di Bukittinggi, dekat Padang, Sumatera Barat.",
              coordinates: { lat: -0.3049, lng: 100.3694 },
            },
            {
              questionNumber: 2,
              imageSrc: "/Images/quizz/tanah-lot.png",
              hint: "Pura Hindu yang indah ini berada di atas formasi batu di tepi laut",
              correctAnswer: "Bali",
              description:
                "Ini adalah Pura Tanah Lot, salah satu landmark paling ikonik di Bali.",
              coordinates: { lat: -8.6211, lng: 115.0868 },
            },
          ];
          io.to(gameId).emit("gameStarted", session);
        }
      } else {
        socket.emit("gameError", "Game not found or is full");
      }
    });

    socket.on("playerGuess", ({ gameId, guess }) => {
      const session = gameSessions[gameId];
      if (session) {
        const player = session.players.find((p) => p.id === socket.id);
        if (player) {
          player.guess = guess;
        }

        const allPlayersGuessed = session.players.every((p) => p.guess);

        if (allPlayersGuessed) {
          const round = session.rounds[session.currentRound];
          session.players.forEach((p) => {
            const distance = getDistance(round, p.guess);
            p.score += calculateScore(distance);
          });

          io.to(gameId).emit("roundResult", session);

          session.currentRound++;
          if (session.currentRound < session.rounds.length) {
            session.players.forEach((p) => (p.guess = null));
            setTimeout(() => {
              io.to(gameId).emit("nextRound", session);
            }, 5000);
          } else {
            io.to(gameId).emit("gameOver", session);
            delete gameSessions[gameId];
          }
        }
      }
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
      for (const gameId in gameSessions) {
        const session = gameSessions[gameId];
        const playerIndex = session.players.findIndex(
          (p) => p.id === socket.id
        );
        if (playerIndex !== -1) {
          session.players.splice(playerIndex, 1);
          io.to(gameId).emit("playerLeft", session);
          if (session.players.length === 0) {
            delete gameSessions[gameId];
          }
          break;
        }
      }
    });
  });

  return io;
}

export function getIO() {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
}

// --- Helper functions ---
function getDistance(loc1, loc2) {
  if (!loc1 || !loc2) return Infinity;
  const R = 6371;
  const dLat = deg2rad(loc2.lat - loc1.lat);
  const dLon = deg2rad(loc2.lng - loc1.lng);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(loc1.lat)) *
      Math.cos(deg2rad(loc2.lat)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function calculateScore(distance) {
  if (distance > 2000) return 0;
  return Math.round(5000 * Math.exp(-distance / 1000));
}
