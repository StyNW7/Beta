import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Info } from 'lucide-react';

const buttonStyle = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  padding: '10px 20px',
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
  color: '#333',
  borderRadius: '12px',
  border: '1px solid rgba(0, 0, 0, 0.1)',
  fontSize: '16px',
  fontFamily: 'sans-serif',
  cursor: 'pointer',
  fontWeight: '600',
  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
  transition: 'all 0.2s ease-in-out',
  zIndex: 40,
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
};

export const LandmarkInteraction = () => {
  const { isNearMonument, openLandmarkModal } = useGameStore();

  if (!isNearMonument) {
    return null;
  }

  const handleClick = (e) => {
    e.stopPropagation();
    openLandmarkModal();
  };

  return (
    <button 
      style={buttonStyle}
      onClick={handleClick}
    >
      <Info size={20} />
      View Landmark Info
    </button>
  );
};