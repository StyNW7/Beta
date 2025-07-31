import { create } from "zustand";

const useLandmarkStore = create((set) => ({
  landmarks: [],
  setLandmarks: (data) => set({ landmarks: data }),
}));

export default useLandmarkStore;
