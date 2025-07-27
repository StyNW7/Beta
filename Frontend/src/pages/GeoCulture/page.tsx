import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, latLng } from "leaflet";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

interface LatLngProp {
  lat: number;
  lng: number;
  id: number;
}

function ClickHandler({
  onMapClick,
}: {
  onMapClick: (latlng: LatLngProp) => void;
}) {
  useMapEvents({
    click(e) {
      const newMarker = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
        id: Date.now(),
      };
      onMapClick(newMarker);
    },
  });
  return null;
}

const customIcon = new Icon({
  iconUrl: "https://cdn-icons-png.flaticon.com/512/1239/1239332.png",
  iconSize: [38, 38], // size of the icon
});

function MapGamePage() {
  const [answer] = useState<LatLngProp>({
    id: Date.now(),
    lat: -0.94806860577927,
    lng: 100.36417717625399,
  });
  const [tempMarker, setTempMarker] = useState<LatLngProp | null>(null);
  const [showLine, setShowLine] = useState(false);
  const [showAnswer, setShowAnswer] = useState(false);
  const [distanceKm, setDistanceKm] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [isPlaying, setIsPlaying] = useState(false)
//   const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isCorrect, setIsCorrect] = useState(false)

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  
  const quizData = {
    totalQuestions: 10,
    quiz: [
        {
            questionNumber: 1,
            audioSrc: "/audio/padang.m4a",
            sentence: "Ambo ka pai makan sabanta lai.",
            meaning: "I'm going out to eat soon",
            correctAnswer: "Bahasa Minang",
            description: "The main language spoken in Padang, the capital city of West Sumatra."
        },
        {
            questionNumber: 2,
            audioSrc: "/audio/bali.opus",
            sentence: "Selamat pagi, apa kabar? Saya harap Anda baik-baik saja hari ini.",
            meaning: "I want to go to the beach this afternoon.",
            correctAnswer: "Padang",
            description: "it is the local language in Bali."
        }
    ]
  }
//   const isCorrect = selectedAnswer === quizData.correctAnswer
  const currentQuestion = quizData.quiz[currentQuestionIndex];
  
  const handlePlayAudio = () => {
      if (audioRef.current) {
          if (isPlaying) {
          audioRef.current.pause()
        setIsPlaying(false)
    } else {
        audioRef.current.play()
        setIsPlaying(true)
      }
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  const handleNextQuestion = () => {
    setModalOpen(false)
    setIsCorrect(false)
    setShowResult(false)
    setIsPlaying(false)
    setTempMarker(null);
    setShowLine(false);
    setShowAnswer(false);
    setDistanceKm(null);

    if (currentQuestionIndex + 1 < quizData.quiz.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("You've completed all questions!");
    }
  }

  const handleMapClick = (marker: LatLngProp) => {
    setTempMarker(marker);
    setShowLine(false); //reset the line if user picks a new temp marker
  };

  const handleButtonClick = () => {
    if (tempMarker) {
      setShowLine(true);
      const pointA = latLng(tempMarker.lat, tempMarker.lng);
      const pointB = latLng(answer.lat, answer.lng);

      const distanceMeters = pointA.distanceTo(pointB);
      const distanceKm = distanceMeters / 1000;
      setDistanceKm(distanceKm);

      console.log(`Distance between markers: ${distanceKm.toFixed(2)} km`);
      if(distanceKm < 5) {
        setIsCorrect(true)
      }
      
      setShowAnswer(true);
      openModal()
      setShowResult(true)
    } else {
      alert("Please click on the map to place a temporary marker first!");
    }
  };

  // const handleCloseBar = () => {
  //   setShowLine(false);
  //   setDistanceKm(null);
  //   setShowAnswer(false);
  // };

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

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

        {tempMarker && (
          <Marker position={[tempMarker.lat, tempMarker.lng]}>
            <Popup>Clicked Marker</Popup>
          </Marker>
        )}

        {showAnswer && (
          <Marker position={[answer.lat, answer.lng]} icon={customIcon}>
            <Popup>
              This is the answer marker. <br /> You can customize this!
            </Popup>
          </Marker>
        )}
        {showLine && tempMarker && (
          <Polyline
            positions={[
              [tempMarker.lat, tempMarker.lng],
              [answer.lat, answer.lng],
            ]}
            color="red"
          />
        )}
      </MapContainer>

      <button
        onClick={handleButtonClick}
        className="fixed bottom-5 right-5 px-4 py-2 bg-blue-600 text-white rounded cursor-pointer z-[1000] shadow-md text-base"
      >
        Guess
      </button>
      {/* {showLine && distanceKm !== null && (
        <div className="fixed bottom-0 left-0 w-full bg-[#222] text-white px-5 py-3 flex justify-center items-center z-[1001] shadow-[0_-2px_8px_rgba(0,0,0,0.5)] text-lg gap-4">
          <span>Distance: {distanceKm.toFixed(2)} km</span>
          <button
            onClick={handleCloseBar}
            className="px-3 py-1.5 bg-red-600 rounded text-white cursor-pointer font-bold"
          >
            Close
          </button>
        </div>
      )} */}
      <button
        onClick={openModal}
        className="fixed bottom-5 left-5 px-4 py-2 bg-green-600 text-white rounded cursor-pointer z-[1000] shadow-md text-base"
      >
        See Question
      </button>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-[1500] flex items-center justify-center"
          onClick={closeModal} // close modal on backdrop click
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white p-8 rounded-lg max-w-md w-[90%] shadow-lg text-center relative text-black"
          >
            <div className="relative">
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-red-500 to-red-600"></div>
              <div className="absolute top-2 left-0 right-0 h-2 bg-white"></div>

              {!showResult ? (
                <>
                  <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 text-center relative overflow-hidden">
                    <div className="absolute top-4 left-4 w-6 h-6 bg-white/20 rounded-full"></div>
                    <div className="absolute top-8 right-6 w-3 h-3 bg-white/30 rounded-full"></div>
                    <div className="absolute bottom-4 left-8 w-4 h-4 bg-white/20 rounded-full"></div>
                    <div className="absolute bottom-6 right-4 w-2 h-2 bg-white/40 rounded-full"></div>

                    <div className="relative z-10">
                      <h3 className="text-white text-lg font-bold mb-2">Language Quiz</h3>
                      <p className="text-red-100 text-sm">
                        Question {currentQuestion.questionNumber} of {quizData.totalQuestions}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">Where is this speaker from?</h2>
                      <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto"></div>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-6 border border-red-100 text-center">
                      <div className="flex justify-center mb-4">
                        <Button
                          onClick={handlePlayAudio}
                          className="bg-red-500 hover:bg-red-600 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                        >
                          {isPlaying ? <Pause className="h-6 w-6" /> : <Play className="h-6 w-6" />}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Click to play the audio clip</p>
                      <div className="flex justify-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 h-4 bg-red-300 rounded-full ${isPlaying ? "animate-pulse" : ""}`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          ></div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Translation</p>
                      <p className="text-gray-700 text-sm leading-relaxed italic">"{currentQuestion.meaning}"</p>
                    </div>

                    <div className="flex justify-center space-x-2 pt-2">
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-white border-2 border-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-white border-2 border-red-400 rounded-full"></div>
                      <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className={`p-8 text-center relative overflow-hidden ${
                      isCorrect
                        ? "bg-gradient-to-br from-green-500 to-green-600"
                        : "bg-gradient-to-br from-red-500 to-red-600"
                    }`}
                  >
                    <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full"></div>
                    <div className="absolute top-8 right-6 w-4 h-4 bg-white/30 rounded-full"></div>
                    <div className="absolute bottom-4 left-8 w-6 h-6 bg-white/20 rounded-full"></div>
                    <div className="absolute bottom-6 right-4 w-3 h-3 bg-white/40 rounded-full"></div>

                    <div className="relative z-10">
                      <h3 className="text-white text-lg font-bold mb-2">
                        {isCorrect ? "🎉 Correct!" : "❌ Incorrect"}
                      </h3>
                      <p className="text-white/90 text-sm">
                        {isCorrect ? "Well done! You got it right." : "Don't worry, keep practicing!"}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 space-y-6">
                    <div className="text-center">
                      <h2 className="text-xl font-bold text-gray-900 mb-2">
                        {/* The speaker is from {quizData.options.find((o) => o.id === quizData.correctAnswer)?.label} */}
                        It was the {currentQuestion.correctAnswer} language
                      </h2>
                      {/* <div className="text-4xl mb-2">
                        {quizData.options.find((o) => o.id === quizData.correctAnswer)?.flag}
                      </div> */}
                      <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto"></div>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-white rounded-2xl p-4 border border-red-100">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 text-center">
                        Your Answer
                      </p>
                      <div className="text-center">
                        <span className="text-2xl mr-2">
                          {/* {quizData.options.find((o) => o.id === selectedAnswer)?.flag} */}
                          {/* test */}
                          {distanceKm?.toFixed(2)}
                        </span>
                        <span className="font-medium text-gray-900">
                          {/* {quizData.options.find((o) => o.id === selectedAnswer)?.label} */}
                          km
                        </span>
                      </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                      <p className="text-gray-600 text-sm text-center leading-relaxed">
                        {currentQuestion.description}
                      </p>
                    </div>

                    <Button
                      onClick={handleNextQuestion}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-4 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Next Question
                    </Button>

                    <div className="flex justify-center space-x-2 pt-2">
                      <div
                        className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white border-2 border-red-400 rounded-full animate-bounce"
                        style={{ animationDelay: "150ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                        style={{ animationDelay: "300ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-white border-2 border-red-400 rounded-full animate-bounce"
                        style={{ animationDelay: "450ms" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-red-400 rounded-full animate-bounce"
                        style={{ animationDelay: "600ms" }}
                      ></div>
                    </div>
                  </div>
                </>
              )}

              <audio ref={audioRef} onEnded={handleAudioEnded} preload="metadata">
                <source src={currentQuestion.audioSrc} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MapGamePage;