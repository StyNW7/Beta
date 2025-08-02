import { create } from "zustand";
import * as THREE from 'three';
import { triviaQuestions } from '../data/trivia';
import { REWARDS } from '../data/resources';

const is24HoursPassed = (lastTimestamp) => {
  if (!lastTimestamp) return true;
  const oneDay = 24 * 60 * 60 * 1000;
  return Date.now() - lastTimestamp > oneDay;
};

const fullKeyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

export const useGameStore = create((set, get) => ({
  // Player state
  playerPosition: new THREE.Vector3(),
  setPlayerPosition: (position) => set({ playerPosition: position }),

  // Monument state
  isNearMonument: false,
  setIsNearMonument: (isNear) => set({ isNearMonument: isNear }),

  isNearKorrigan: false,
  setIsNearKorrigan: (isNear) => set({ isNearKorrigan: isNear }),

  // Landmark modal state
  isLandmarkModalOpen: false,
  distanceToMonument: 0,
  setDistanceToMonument: (distance) => set({ distanceToMonument: distance }),

  isChatModalOpen: false,
  distanceToKorrigan: 0,
  setDistanceToKorrigan: (distance) => set({ distanceToKorrigan: distance }),

  showJoystick: true,
  setShowJoystick: (show) => set({ showJoystick: show }),

  keyboardEnabled: true,
  keyboardMap: fullKeyboardMap,
  enableKeyboard: () =>
    set({
      keyboardEnabled: true,
      keyboardMap: fullKeyboardMap,
    }),
  disableKeyboard: () =>
    set({
      keyboardEnabled: false,
      keyboardMap: [],
    }),

  openChatModal: () => {
    if (get().isNearKorrigan) {
      set({ isChatModalOpen: true });
    }
  },
  closeChatModal: () => {
    set({ isChatModalOpen: false });
    enableKeyboard();
  },

  selectedLandmark: null, // To store the data for the opened modal

  // Update the function to accept data
  openLandmarkModal: (landmarkData) =>
    set({
      isLandmarkModalOpen: true,
      selectedLandmark: landmarkData,
    }),

  closeLandmarkModal: () =>
    set({ isLandmarkModalOpen: false, selectedLandmark: null }),

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

  // keyboardEnabled: true,
  // setKeyboardEnabled: (enabled) => set({ keyboardEnabled: enabled }),
}));