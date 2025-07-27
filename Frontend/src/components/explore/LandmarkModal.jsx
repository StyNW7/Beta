import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Navigation } from "lucide-react";
import { useGameStore } from "../../store/gameStore";

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
    isKerisClaimable
  } = useGameStore();
  
  const [showRewardView, setShowRewardView] = useState(false);

  useEffect(() => {
    if (isLandmarkModalOpen) {
      setShowRewardView(false);
    }
  }, [isLandmarkModalOpen]);

  const handleClaimClick = () => {
    if (!isNearMonument || !isKerisClaimable()) return;
    claimKerisRecipe();
    setShowRewardView(true);
  };

  const landmark = {
    name: "Monas",
    image: "/Images/monas.jpg",
    description: "A historic monument representing the spirit of the nation. It is said that ancient recipes can be discovered by those who show respect.",
    yearBuilt: "1961",
    location: "Central Jakarta, Indonesia",
  };

  const reward = {
    name: "Keris Recipe",
    image: "/Images/Item/keris_recipe.png",
  };

  return (
    <Modal isOpen={isLandmarkModalOpen} onClose={closeLandmarkModal}>
        <div>
          {!showRewardView ? (
            <div className="relative max-w-md">
              <div className="relative overflow-hidden rounded-t-3xl">
                <img src={landmark.image} alt="" className="w-full h-48 object-cover" />
              </div>
              <div className="p-6 space-y-4">
                <div className="text-center">
                  <h2 className="text-2xl font-bold text-gray-900">{landmark.name}</h2>
                  <div className="w-16 h-1 bg-gradient-to-r from-red-400 to-red-600 rounded-full mx-auto mt-2"></div>
                </div>
                <div className="bg-red-50 rounded-xl p-4 border border-red-100">
                  <p className="text-gray-700 text-sm">{landmark.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 text-center">
                    <div>
                        <p className="text-xs font-medium text-gray-500">BUILT</p>
                        <p className="text-lg font-bold text-gray-900">{landmark.yearBuilt}</p>
                    </div>
                    <div>
                        <p className="text-xs font-medium text-gray-500">DISTANCE</p>
                        <p className="text-lg font-bold text-gray-900">{distanceToMonument.toFixed(2)} km</p>
                    </div>
                </div>
                <Button
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleClaimClick}
                  disabled={!isNearMonument || !isKerisClaimable()}
                >
                  {isKerisClaimable() ? "Get Recipe" : "Recipe Claimed Today"}
                </Button>
              </div>
            </div>
          ) : (
            <div className="max-w-md">
              <div className="bg-gradient-to-br from-red-500 to-red-600 p-6 text-center rounded-t-3xl">
                  <h3 className="text-white text-lg font-bold">Recipe Unlocked!</h3>
              </div>
              <div className="p-6 space-y-4 text-center">
                <div className="flex justify-center">
                    <img src={reward.image} alt="" className="w-24 h-24 object-contain"/>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{reward.name}</h2>
                <p className="text-gray-600 text-sm">A legendary recipe for crafting the mystical Keris dagger.</p>
                <Button
                  className="w-full bg-red-500 text-white font-semibold py-3 rounded-xl"
                  onClick={closeLandmarkModal}
                >
                  Awesome!
                </Button>
              </div>
            </div>
          )}
        </div>
    </Modal>
  );
};

export default LandmarkModal;