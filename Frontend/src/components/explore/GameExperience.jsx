
import React from "react";
import { Environment, OrthographicCamera } from "@react-three/drei";
// import { useControls } from "leva";
// import { useFrame } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import { Tugu } from "./models/Tugu";
import { Physics } from "@react-three/rapier";
import { CharacterController } from "./CharacterController";
import { MapTiles } from "./models/Map";
import * as THREE from "three";

// import { useGameStore } from "@/store/gameStore";
import { MultiMonumentProximityManager } from './MultiMonumentProximityManager';
import useLandmarkStore from "../../store/landmarkStore";

export const Experience = () => {
  const shadowCameraRef = useRef();
  const INTERACTION_DIST = 1
  // const chestPosition = useGameStore((state) => state.chestPosition);
  // const tuguPosition = new THREE.Vector3(1, 0, 2);

  const { landmarks } = useLandmarkStore();
  const [monumentsWithVector3, setMonumentsWithVector3] = useState([]);

  useEffect(() => {
    if (landmarks.length > 0) {
      const converted = landmarks.map(monument => ({
        ...monument,
        position: new THREE.Vector3(
          monument.position.x,
          monument.position.y,
          monument.position.z
        )
      }));

      setMonumentsWithVector3(converted);
    }
  }, [landmarks]);

  // const monumentsData = [
  //   { id: "tugu-center", position: new THREE.Vector3(1, 0, 2) },
  //   { id: "tugu-east", position: new THREE.Vector3(5, 0, 5) },
  //   { id: "tugu-west", position: new THREE.Vector3(-5, 0, 4) },
  //   { id: "tugu-north", position: new THREE.Vector3(6, 0, 1) },
  //   { id: "tugu-far-east", position: new THREE.Vector3(12, 0, 5) },
  //   { id: "tugu-south", position: new THREE.Vector3(5, 0, 12) },
  //   { id: "tugu-south-west", position: new THREE.Vector3(-5, 0, 12) },
  // ];

  return (
    <>
      {/* <OrbitControls /> */}
      <Environment preset="sunset" />
      <directionalLight
        intensity={0.65}
        castShadow
        position={[-15, 10, 15]}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00005}
      >
        <OrthographicCamera
          left={-22}
          right={15}
          top={10}
          bottom={-20}
          ref={shadowCameraRef}
          attach={"shadow-camera"}
        />
      </directionalLight>
      <Physics>
        <MapTiles
          initialLat={-7.607504578304}
          initialLon={110.20460294024036}
          MAP_ZOOM={15}
          MAP_GRID_SIZE={5}
          WORLD_SCALE={10}
        />
        <CharacterController />
        {monumentsWithVector3.map((monument) => (
          <Tugu
            key={monument._id}
            scale={0.5}
            position={monument.position}
          />
        ))}
        <MultiMonumentProximityManager
          monuments={monumentsWithVector3}
          interactionDist={INTERACTION_DIST}
        />
      </Physics>
    </>
  );
};
