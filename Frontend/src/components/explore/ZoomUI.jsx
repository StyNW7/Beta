import React from 'react';
import { useGameStore } from '../../store/gameStore';
import { Plus, Minus } from 'lucide-react';

const buttonClass = `
  w-12 h-12 rounded-full 
  flex items-center justify-center 
  bg-white/20 backdrop-blur-md 
  border border-white/30 
  text-black shadow-lg
  hover:bg-white/30 hover:scale-105 active:scale-95
  transition-all duration-200
`;

export const ZoomUI = () => {
  const { zoomIn, zoomOut } = useGameStore();

  return (
    <div className="fixed zoom-button-position z-50 flex flex-col gap-2">
      <button onClick={zoomIn} className={buttonClass} aria-label="Zoom In">
        <Plus size={24} />
      </button>
      <button onClick={zoomOut} className={buttonClass} aria-label="Zoom Out">
        <Minus size={24} />
      </button>
    </div>
  );
};
