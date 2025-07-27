import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Navigation, Star, ArrowRight } from "lucide-react"; // Added ArrowRight
import { useGameStore } from "../../store/gameStore";
import { landmarkDetails } from "../../data/monuments";

// Mock data for recommendations. In a real app, this would likely come from an API.
const recommendationsData = {
  // Assuming selectedLandmark.id could be 'tugu_pahlawan'
  tugu_pahlawan: [
    { id: 'monkasel', title: 'Monumen Kapal Selam', location: 'Surabaya', imageUrl: 'https://source.unsplash.com/random/200x200?submarine' },
    { id: 'kenjeran', title: 'Jembatan Kenjeran', location: 'Surabaya', imageUrl: 'https://source.unsplash.com/random/200x200?bridge' },
    { id: 'sampoerna', title: 'House of Sampoerna', location: 'Surabaya', imageUrl: 'https://source.unsplash.com/random/200x200?museum' },
  ],
  // Default recommendations if no specific one is found
  default: [
    { id: 'borobudur', title: 'Candi Borobudur', location: 'Magelang', imageUrl: 'https://source.unsplash.com/random/200x200?temple' },
    { id: 'prambanan', title: 'Candi Prambanan', location: 'Yogyakarta', imageUrl: 'https://source.unsplash.com/random/200x200?ruins' },
  ]
};


const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex justify-center items-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full relative animate-fade-in-up">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 z-10">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
        {children}
      </div>
    </div>
  );
};

const Button = ({ children, ...props }) => <button {...props}>{children}</button>;

const LandmarkModal = () => {
  const { 
    isLandmarkModalOpen, 
    closeLandmarkModal, 
    isNearMonument, 
    distanceToMonument,
    claimKerisRecipe,
    isKerisClaimable,
    selectedLandmark
  } = useGameStore();
  
  // State to manage which tab is active: 'details', 'review', or 'recommendations'
  const [activeView, setActiveView] = useState('details');
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");

  useEffect(() => {
    // Reset to the details tab and clear review form whenever the modal is opened
    if (isLandmarkModalOpen) {
      setActiveView('details');
      setRating(0);
      setReviewText("");
    }
  }, [isLandmarkModalOpen]);
  
  if (!isLandmarkModalOpen || !selectedLandmark) {
    return null;
  }
  
  const details = landmarkDetails[selectedLandmark.id] || landmarkDetails.default;
  const recommendations = recommendationsData[selectedLandmark.id] || recommendationsData.default;

  const handleReviewSubmit = () => {
    console.log({ rating, reviewText });
    closeLandmarkModal(); 
  };

  return (
    <Modal isOpen={isLandmarkModalOpen} onClose={closeLandmarkModal}>
        <div className="max-w-md">
          {/* Tab Switcher */}
          <div className="flex border-b border-gray-200">
            <button 
              onClick={() => setActiveView('details')} 
              className={`flex-1 p-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${activeView === 'details' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Deskripsi
            </button>
            <button 
              onClick={() => setActiveView('review')} 
              className={`flex-1 p-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${activeView === 'review' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Ulasan
            </button>
            <button 
              onClick={() => setActiveView('recommendations')} 
              className={`flex-1 p-4 text-xs sm:text-sm font-semibold transition-colors duration-200 ${activeView === 'recommendations' ? 'text-red-600 border-b-2 border-red-600' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              Rekomendasi
            </button>
          </div>

          {/* Conditional Content */}
          {activeView === 'details' && (
            <div>
              <div className="relative overflow-hidden">
                <img src={details.imageUrl} alt={details.title} className="w-full h-48 object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">{details.title}</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto mt-2"></div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="text-gray-700 text-sm">{details.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                        <p className="text-xs font-medium text-gray-500">TAHUN</p>
                        <p className="text-lg font-bold text-gray-900">{details.year}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500">LOKASI</p>
                        <p className="text-lg font-bold text-gray-900">{details.place}</p>
                    </div>
                </div>
              </div>
            </div>
          )}
          
          {activeView === 'review' && (
            <div className="p-6 space-y-4 animate-fade-in-up">
              <div className="text-center">
                <h3 className="text-xl font-bold text-gray-800">Beri Ulasan & Rating</h3>
                <p className="text-sm text-gray-500 mt-1">Bagikan pengalamanmu di {details.title}</p>
              </div>
              <div className="flex justify-center items-center space-x-2 my-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button key={star} onClick={() => setRating(star)}>
                    <Star
                      className={`h-8 w-8 transition-colors duration-200 ${rating >= star ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-300'}`}
                      fill={rating >= star ? 'currentColor' : 'none'}
                    />
                  </button>
                ))}
              </div>
              <div>
                <textarea
                  className="w-full h-28 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-300 focus:border-red-500 transition"
                  placeholder="Tulis ulasanmu di sini..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
              </div>
              <div>
                <Button 
                  onClick={handleReviewSubmit}
                  className="w-full mt-2 bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-transform transform active:scale-95"
                >
                  Kirim Ulasan
                </Button>
              </div>
            </div>
          )}

          {activeView === 'recommendations' && (
             <div className="p-6 space-y-4 animate-fade-in-up">
                <div className="text-center">
                  <h3 className="text-xl font-bold text-gray-800">Rekomendasi Selanjutnya</h3>
                  <p className="text-sm text-gray-500 mt-1">Berdasarkan AI kami</p>
                </div>
                <div className="space-y-3 pt-2">
                  {recommendations.map(place => (
                    <a href="#" key={place.id} className="flex items-center space-x-4 bg-gray-50 hover:bg-red-50 rounded-xl p-3 border border-gray-200 hover:border-red-200 transition-all duration-200 group">
                      <img src={place.imageUrl} alt={place.title} className="w-16 h-16 object-cover rounded-lg" />
                      <div className="flex-grow">
                        <h4 className="font-bold text-gray-800 group-hover:text-red-600">{place.title}</h4>
                        <p className="text-sm text-gray-500">{place.location}</p>
                      </div>
                      <div className="p-2 text-gray-400 group-hover:text-red-600 transition-colors">
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    </a>
                  ))}
                </div>
             </div>
          )}
        </div>
    </Modal>
  );
};

export default LandmarkModal;