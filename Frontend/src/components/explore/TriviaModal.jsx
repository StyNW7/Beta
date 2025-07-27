import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

const modalOverlayStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 100,
};

const modalContentStyle = {
  backgroundColor: '#fdf6e3',
  color: '#586e75',
  padding: '30px',
  borderRadius: '15px',
  width: '90%',
  maxWidth: '500px',
  textAlign: 'center',
  fontFamily: 'serif',
  border: '5px solid #cb9b6a',
  boxShadow: '0 10px 20px rgba(0,0,0,0.4)',
};

const questionStyle = {
  fontSize: '24px',
  marginBottom: '25px',
};

const optionsGridStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '15px',
};

const optionButtonStyle = {
  padding: '15px',
  fontSize: '18px',
  cursor: 'pointer',
  border: '2px solid #cb9b6a',
  borderRadius: '10px',
  backgroundColor: '#eee8d5',
  transition: 'background-color 0.2s, transform 0.2s',
};

const explanationStyle = {
  marginTop: '20px',
  fontSize: '16px',
  color: '#073642',
  fontStyle: 'italic',
};


export const TriviaModal = () => {
  const { isTriviaModalOpen, currentTrivia, closeTriviaModal, openChest, showReward } = useGameStore();
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  if (!isTriviaModalOpen || !currentTrivia) {
    return null;
  }

  const handleAnswer = (option) => {
    if (isAnswered) return;
    setSelectedAnswer(option);
    setIsAnswered(true);

    if (option === currentTrivia.correctAnswer) {
      openChest();
      setTimeout(() => {
        handleClose();
        showReward();
      }, 2500);
    } else {
      setTimeout(handleClose, 2500);
    }
  };

  const handleClose = () => {
    setSelectedAnswer(null);
    setIsAnswered(false);
    closeTriviaModal();
  };

  const getButtonColor = (option) => {
    if (!isAnswered) return '#eee8d5';
    if (option === currentTrivia.correctAnswer) return '#859900';
    if (option === selectedAnswer) return '#dc322f';
    return '#eee8d5';
  };

  return (
    <div style={modalOverlayStyle}>
      <div style={modalContentStyle}>
        <h2 style={questionStyle}>{currentTrivia.question}</h2>
        <div style={optionsGridStyle}>
          {currentTrivia.options.map((option) => (
            <button
              key={option}
              style={{ 
                ...optionButtonStyle, 
                backgroundColor: getButtonColor(option),
                color: 'black' 
              }}
              onClick={() => handleAnswer(option)}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>
        {isAnswered && (
          <div style={explanationStyle}>
            <p><strong>{selectedAnswer === currentTrivia.correctAnswer ? "Correct!" : "Not quite!"}</strong></p>
            <p>{currentTrivia.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};