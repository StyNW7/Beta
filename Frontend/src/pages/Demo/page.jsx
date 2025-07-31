import React, { useEffect, useState } from 'react';

import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Experience } from "../../components/explore/GameExperience";
import FloatingMenuButton from "../../components/explore/FloatingButtonStyle";
import { LandmarkInteraction } from '../../components/explore/LandmarkInteraction';
import { TriviaModal } from "../../components/explore/TriviaModal";
import { RewardModal } from "../../components/explore/RewardModal";
import LandmarkModal from "../../components/explore/LandmarkModal";
import { ZoomUI } from '../../components/explore/ZoomUI';
import { Joystick } from '../../components/explore/Joystick';
import { Leva } from "leva";
import useLandmarkStore from "../../store/landmarkStore";
import axios from "axios";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

function DemoPage() {
  const { setLandmarks } = useLandmarkStore();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);
  useEffect(() => {
    async function fetchLandmarks() {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/landmark`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log(response.data);
        setLandmarks(response.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch landmarks');
        setLoading(false);
      }
    }

    fetchLandmarks();
  }, []);

  return (
    <div id="canvas-container">
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}>
          <color attach="background" args={["#ececec"]} />
          <Experience />
        </Canvas>
        <LandmarkInteraction />
        <ZoomUI />
        {/* <TriviaModal />
        <RewardModal /> */}
        <LandmarkModal />
        <Joystick />
        <Leva hidden />
      </KeyboardControls>
      <FloatingMenuButton />
    </div>
  );
}

export default DemoPage;
