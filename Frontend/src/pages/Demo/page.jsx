import React from "react";

import { Canvas } from "@react-three/fiber";
import { KeyboardControls } from "@react-three/drei";
import { Experience } from "../../components/explore/GameExperience";
import Modal from "../../components/Modal";
import FloatingButton from "../../components/explore/FloatingButton";
import FloatingMenuButton from "../../components/explore/FloatingButtonStyle";
import { ChestInteraction } from '../../components/explore/ChestInteraction';
import { LandmarkInteraction } from '../../components/explore/LandmarkInteraction';
import { TriviaModal } from "../../components/explore/TriviaModal";
import { RewardModal } from "../../components/explore/RewardModal";
import LandmarkModal from "../../components/explore/LandmarkModal";
import { ZoomUI } from '../../components/explore/ZoomUI';
import { Joystick } from '../../components/explore/Joystick';
import { Leva } from "leva";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "run", keys: ["Shift"] },
];

function DemoPage() {
  return (
    <div id="canvas-container">
      <KeyboardControls map={keyboardMap}>
        <Canvas shadows camera={{ position: [3, 3, 3], near: 0.1, fov: 40 }}>
          <color attach="background" args={["#ececec"]} />
          <Experience />
        </Canvas>
        {/* <ChestInteraction /> */}
        <LandmarkInteraction />
        <ZoomUI />
        <TriviaModal />
        <RewardModal />
        <LandmarkModal />
        <Joystick />
        <Leva hidden />
      </KeyboardControls>
      {/* <Modal /> */}
      {/* <Menu /> */}
      <FloatingMenuButton />
    </div>
  );
}

export default DemoPage;
