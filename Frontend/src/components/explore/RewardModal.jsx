import React from 'react';
import { useGameStore } from '../../store/gameStore';

const modalOverlayStyle = {
  position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)', display: 'flex',
  justifyContent: 'center', alignItems: 'center', zIndex: 101,
};

const modalContentStyle = {
  backgroundColor: '#fdf6e3',
  color: '#586e75',
  padding: '30px',
  borderRadius: '15px',
  width: '90%',
  maxWidth: '400px',
  textAlign: 'center',
  fontFamily: 'serif',
  border: '5px solid #cb9b6a',
  boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
};
const titleStyle = {
  fontSize: '28px',
  marginBottom: '20px',
  color: '#8b5a2b',
  textTransform: 'uppercase',
};
const rewardSpriteStyle = {
  width: '120px',
  height: '120px',
  margin: '0 auto',
};
const rewardNameStyle = {
  fontSize: '22px',
  margin: '15px 0',
  color: '#586e75',
};
const claimButtonStyle = {
  padding: '12px 30px',
  fontSize: '18px',
  cursor: 'pointer',
  border: '2px solid #cb9b6a',
  borderRadius: '10px',
  backgroundColor: '#eee8d5',
  color: '#586e75', 
  fontWeight: 'bold',
  marginTop: '20px',
  transition: 'background-color 0.2s',
};

export const RewardModal = () => {
  const { 
    isRewardModalOpen, 
    currentReward, 
    closeRewardModal, 
    addRewardToInventory,
    despawnChest,
  } = useGameStore();

  if (!isRewardModalOpen || !currentReward) {
    return null;
  }

  const handleClaim = () => {
    addRewardToInventory(currentReward.name);
    closeRewardModal();
    despawnChest();
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2 style={titleStyle}>Reward!</h2>
        <img 
          src={currentReward.image}
          alt=""
          style={rewardSpriteStyle} 
        />
        <p style={rewardNameStyle}>You received 1 x {currentReward.name}</p>
        <button 
          style={claimButtonStyle}
          onClick={handleClaim}
          onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#d1c7b7'}
          onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#eee8d5'}
        >
          Claim Reward
        </button>
      </div>
    </div>
  );
};