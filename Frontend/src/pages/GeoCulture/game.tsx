import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
// import FloatingMenuButton from "@/components/geoculture/MenuButton";
import { toast } from "sonner";
import { Socket } from "socket.io-client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Clipboard, Hash, Loader2, Users, XCircle } from "lucide-react";

interface Player {
  id: string;
  name: string;
  score: number;
  guess?: LatLngProp | null;
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
  rounds: Round[];
  currentRound: number;
}

interface LatLngProp {
  lat: number;
  lng: number;
}

//additions

interface GameProps {
  socket: Socket | null; // Allow null
  gameSession: GameSession;
}

//additions

function ClickHandler({
  onMapClick,
}: {
  onMapClick: (latlng: LatLngProp) => void;
}) {
  useMapEvents({
    click(e) {
      onMapClick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1239/1239332.png",
  iconSize: [38, 38],
});

// --- Main Component ---
function MapGamePage({ socket, gameSession }: GameProps) {
  const [playerGuess, setPlayerGuess] = useState<LatLngProp | null>(null);

  // State for UI control
  const [showRoundResult, setShowRoundResult] = useState(false);
  const [modalOpen, setModalOpen] = useState(true); // Open modal by default to show question

  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(gameSession.gameId);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const canStartGame = gameSession.players.length >= 2;

  const currentRound = gameSession?.rounds[gameSession.currentRound];
  const answer = currentRound?.coordinates;

  useEffect(() => {
    if (!socket) return;

    const handleRoundResult = () => {
      setShowRoundResult(true);
      setModalOpen(true);
    };

    const handleNextRound = () => {
      setPlayerGuess(null);
      setShowRoundResult(false);
      setModalOpen(true);
      toast.info(`Starting round`);
    };

    const handleStart = () => {
      toast.info("The game has started!");
    };

    socket.on("gameStarted", handleStart);
    socket.on("roundResult", handleRoundResult);
    socket.on("nextRound", handleNextRound);

    return () => {
      socket.off("roundResult", handleRoundResult);
      socket.off("nextRound", handleNextRound);
    };
  }, [socket]);

  const handleDisconnect = () => {
    if (socket) {
      socket.disconnect();
    }
  };

  const handleMapClick = (coords: LatLngProp) => {
    if (!showRoundResult) {
      // Prevent changing guess after submitting
      setPlayerGuess(coords);
    }
  };

  const handleGuessButtonClick = () => {
    if (playerGuess && socket) {
      socket.emit("playerGuess", {
        gameId: gameSession.gameId,
        guess: playerGuess,
      });
      toast.info("Your guess has been submitted!");
      // Optionally disable the button after guessing
    } else {
      toast.warning("Please place a marker on the map first!");
    }
  };

  // This function is now used to trigger the *next round* after viewing results
  const handleNextRoundClick = () => {
    // The server will automatically trigger the next round,
    // this button just closes the modal for the user.
    setModalOpen(false);
  };

  // Find your player data to show personalized info
  const me = gameSession?.players.find((p) => p.id === socket?.id);

  if (!gameSession || !currentRound || !answer) {
    return (
      <div className="flex min-h-screen items-center">
        <div className="container px-4 md:px-6">
          <Card className="max-w-2xl mx-auto shadow-2xl border-gray-200 bg-white">
            <CardHeader className="text-center p-8 bg-gray-50 rounded-t-lg">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white shadow-lg">
                <Users className="h-8 w-8" />
              </div>
              <CardTitle className="text-3xl font-bold text-gray-800">
                Ruang Tunggu
              </CardTitle>
              <CardDescription className="text-lg text-gray-600 mt-2">
                Menunggu pemain lain untuk bergabung...
              </CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <p className="text-gray-600 mb-2">
                  Bagikan Kode Game ini ke temanmu:
                </p>
                <div className="flex items-center justify-center gap-2 p-3 bg-red-50 rounded-lg max-w-sm mx-auto">
                  <Hash className="h-6 w-6 text-red-500" />
                  <span className="text-3xl font-bold tracking-widest text-red-600">
                    {gameSession.gameId}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleCopy}
                    className="ml-2"
                  >
                    <Clipboard
                      className={`h-6 w-6 transition-colors ${
                        isCopied ? "text-green-500" : "text-gray-500"
                      }`}
                    />
                  </Button>
                </div>
                {isCopied && (
                  <p className="text-green-600 text-sm mt-2">
                    Kode berhasil disalin!
                  </p>
                )}
              </div>

              <div className="mb-8">
                <h3 className="font-bold text-gray-700 mb-4 text-center text-lg">
                  Pemain Terhubung ({gameSession.players.length})
                </h3>
                <div className="space-y-3">
                  {gameSession.players.length < 8 && (
                    <div className="flex items-center gap-4 p-3 bg-gray-50 border border-dashed border-gray-300 rounded-lg">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <Loader2 className="h-5 w-5 text-gray-400 animate-spin" />
                      </div>
                      <span className="font-medium text-gray-500">
                        Menunggu pemain lain...
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={handleDisconnect}
                  className="w-full sm:w-auto py-6 text-lg font-semibold border-2"
                >
                  <XCircle className="h-6 w-6 mr-3" />
                  Batalkan
                </Button>
              </div>
              {!canStartGame && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Butuh minimal 2 pemain untuk memulai.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    ); // Or a loading spinner
  }

  return (
    <div style={{ position: "relative", height: "100vh", width: "100%" }}>
      <MapContainer
        center={[-2.5489, 118.0149]}
        zoom={5}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <ClickHandler onMapClick={handleMapClick} />

        {/* Show player's guess marker */}
        {playerGuess && (
          <Marker position={[playerGuess.lat, playerGuess.lng]}>
            <Popup>Your Guess</Popup>
          </Marker>
        )}

        {/* When round result is shown, display all players' guesses and the correct answer */}
        {showRoundResult && (
          <>
            <Marker position={[answer.lat, answer.lng]} icon={customIcon}>
              <Popup>{currentRound.description}</Popup>
            </Marker>
            {gameSession.players.map((player) =>
              player.guess ? (
                <Polyline
                  key={player.id}
                  positions={[
                    [player.guess.lat, player.guess.lng],
                    [answer.lat, answer.lng],
                  ]}
                  color={player.id === socket?.id ? "red" : "blue"}
                />
              ) : null
            )}
          </>
        )}
      </MapContainer>

      {/* Buttons */}
      <button
        onClick={handleGuessButtonClick}
        disabled={showRoundResult || !!me?.guess} // Disable after guessing or when showing results
        className="fixed bottom-[70px] left-5 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer z-[1000] shadow-md text-base disabled:bg-gray-400"
      >
        {me?.guess ? "Waiting for others..." : "Tebak"}
      </button>
      <button
        onClick={() => setModalOpen(true)}
        className="fixed bottom-5 left-5 px-4 py-2 bg-green-600 text-white rounded cursor-pointer z-[1000] shadow-md text-base"
      >
        Lihat Pertanyaan
      </button>

      {/* Modal for Question and Results */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1500] flex items-center justify-center"
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-lg max-w-md w-[90%] shadow-lg text-center relative text-black"
          >
            {/* Show Round Result View */}
            {showRoundResult ? (
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Hasil Ronde {currentRound.questionNumber}
                </h2>
                <p className="mb-4">
                  Jawaban Benar: <strong>{currentRound.correctAnswer}</strong>
                </p>
                <img
                  src={currentRound.imageSrc}
                  alt="Lokasi jawaban"
                  className="w-full h-48 object-cover rounded-xl shadow-lg mb-4"
                />
                <p className="text-gray-700 mb-4">{currentRound.description}</p>

                {/* Scoreboard */}
                <div className="text-left w-full border-t pt-4 mt-4">
                  <h3 className="font-bold mb-2 text-lg">Papan Skor</h3>
                  <ul className="space-y-2">
                    {gameSession.players
                      .sort((a, b) => b.score - a.score) // Sort by score
                      .map((p, index) => (
                        <li
                          key={p.id}
                          className="flex justify-between items-center p-2 rounded-md bg-gray-100"
                        >
                          <span className="font-medium">
                            {index + 1}. {p.name}
                          </span>
                          <span className="font-semibold text-blue-600">
                            {p.score} poin
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>

                <Button
                  onClick={handleNextRoundClick}
                  className="mt-6 w-full bg-red-500 hover:bg-red-600" // Matched button color
                >
                  Tutup
                </Button>
              </div>
            ) : (
              // Show Question View
              <div>
                <h2 className="text-xl font-bold mb-2">
                  Di mana landmark ini berada?
                </h2>
                <p className="mb-4">Pertanyaan {currentRound.questionNumber}</p>
                <img
                  src={currentRound.imageSrc}
                  alt="Petunjuk lokasi"
                  className="w-full h-48 object-cover rounded-xl shadow-lg mb-4"
                />
                <p className="text-gray-700 text-sm italic">
                  "{currentRound.hint}"
                </p>
                <Button
                  onClick={() => setModalOpen(false)}
                  className="mt-6 w-full bg-red-500 hover:bg-red-600"
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      {/* <FloatingMenuButton /> */}
    </div>
  );
}

export default MapGamePage;
