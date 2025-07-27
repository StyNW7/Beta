import { create } from "zustand";
import * as THREE from 'three';
import { triviaQuestions } from '../data/trivia';
import { REWARDS } from '../data/resources';

const is24HoursPassed = (lastTimestamp) => {
  if (!lastTimestamp) return true;
  const oneDay = 24 * 60 * 60 * 1000;
  return Date.now() - lastTimestamp > oneDay;
};


export const useGameStore = create((set, get) => ({
  // Player state
  playerPosition: new THREE.Vector3(),
  setPlayerPosition: (position) => set({ playerPosition: position }),

  // Inventory state curr player
  inventory: {
    Wood: 0,
    Iron: 0,
    recipes: [],
  },
  addRewardToInventory: (reward) => {
    set((state) => ({
      inventory: {
        ...state.inventory,
        [reward]: state.inventory[reward] + 1,
      }
    }));
    console.log(`Added ${reward} to inventory. New count:`, get().inventory);
  },
  addRecipe: (recipeName) => {
    set((state) => {
      if (state.inventory.recipes.includes(recipeName)) {
        return {};
      }
      return {
        inventory: {
          ...state.inventory,
          recipes: [...state.inventory.recipes, recipeName],
        }
      };
    });
    console.log(`Added ${recipeName} recipe. Current recipes:`, get().inventory.recipes);
  },

  // Chest state
  chestPosition: null, 
  isChestOpen: false,
  spawnChest: (position) => set({ chestPosition: position, isChestOpen: false, isNearChest: false }),
  despawnChest: () => set({ chestPosition: null }),
  openChest: () => { if (get().chestPosition) set({ isChestOpen: true }) },

  // Interaction state
  isNearChest: false,
  setIsNearChest: (isNear) => set({ isNearChest: isNear }),

  // Trivia state
  isTriviaModalOpen: false,
  currentTrivia: null,
  startTrivia: () => {
    const { isNearChest, isChestOpen } = get();
    if (isNearChest && !isChestOpen) {
      const randomQuestion = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
      set({ 
        isTriviaModalOpen: true, 
        currentTrivia: randomQuestion 
      });
    }
  },
  closeTriviaModal: () => set({ isTriviaModalOpen: false, currentTrivia: null }),

  // Reward state
  isRewardModalOpen: false,
  currentReward: null,
  showReward: () => {
    const reward = REWARDS[Math.floor(Math.random() * REWARDS.length)];
    set({ isRewardModalOpen: true, currentReward: reward });
  },
  closeRewardModal: () => set({ isRewardModalOpen: false, currentReward: null }),

  // Monument state
  isNearMonument: false,
  setIsNearMonument: (isNear) => set({ isNearMonument: isNear }),
  lastKerisClaim: null,
  isKerisClaimable: () => is24HoursPassed(get().lastKerisClaim),
  claimKerisRecipe: () => {
    if (get().isKerisClaimable() && get().isNearMonument) {
      console.log("Claiming Keris Recipe!");
      get().addRecipe("Keris");
      set({ lastKerisClaim: Date.now() });
    }
  },
  
  // Landmark modal state
  isLandmarkModalOpen: false,
  distanceToMonument: 0,
  setDistanceToMonument: (distance) => set({ distanceToMonument: distance }),

  // openLandmarkModal: () => {
  //   if (get().isNearMonument) {
  //     set({ isLandmarkModalOpen: true });
  //   }
  // },
  // closeLandmarkModal: () => set({ isLandmarkModalOpen: false }),

  selectedLandmark: null, // To store the data for the opened modal

  // Update the function to accept data
  openLandmarkModal: (landmarkData) => set({ 
    isLandmarkModalOpen: true, 
    selectedLandmark: landmarkData 
  }),
  
  closeLandmarkModal: () => set({ isLandmarkModalOpen: false, selectedLandmark: null }),

  cameraZoomOffset: 0,
  zoomIn: () => {
    set((state) => ({
      cameraZoomOffset: Math.max(state.cameraZoomOffset - 0.5, -2), 
    }));
  },
  zoomOut: () => {
    set((state) => ({
      cameraZoomOffset: Math.min(state.cameraZoomOffset + 0.5, 4),
    }));
  },

  joystickVector: { x: 0, y: 0 },
  setJoystickVector: (vector) => set({ joystickVector: vector }),

  closestMonument: null,
  setClosestMonument: (monumentInfo) => set({ closestMonument: monumentInfo }),
}));