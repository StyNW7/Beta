
import React from 'react'
import { Environment, OrthographicCamera } from "@react-three/drei";
// import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Tugu } from "./models/Tugu";
import { Physics } from "@react-three/rapier";
import { CharacterController } from "./CharacterController";
import { MapTiles } from "./models/Map";
import * as THREE from "three";

import { useGameStore } from "@/store/gameStore";
import { MultiMonumentProximityManager } from './MultiMonumentProximityManager';

const MonumentProximityManager = ({ monumentPosition, interactionDist }) => {
  const playerPosition = useGameStore((state) => state.playerPosition);
  const setIsNearMonument = useGameStore((state) => state.setIsNearMonument);
  const setDistanceToMonument = useGameStore((state) => state.setDistanceToMonument);

  const wasNear = useRef(false);
  const playerVec3 = useRef(new THREE.Vector3());

  useFrame(() => {
    if (playerPosition) {
      playerVec3.current.set(playerPosition.x, playerPosition.y, playerPosition.z);
    }
    const distance = playerVec3.current.distanceTo(monumentPosition);
    
    setDistanceToMonument(distance / 1000); 

    const isNowNear = distance <= interactionDist;
    if (isNowNear !== wasNear.current) {
      setIsNearMonument(isNowNear);
      wasNear.current = isNowNear;
    }
  });
  return null;
};

export const Experience = () => {
  const shadowCameraRef = useRef();
  const INTERACTION_DIST = 1
  const chestPosition = useGameStore((state) => state.chestPosition);
  const tuguPosition = new THREE.Vector3(1, 0, 2);

  const monumentsData = [
    { id: "tugu-center", position: new THREE.Vector3(1, 0, 2) },
    { id: "tugu-east", position: new THREE.Vector3(5, 0, 5) },
    { id: "tugu-west", position: new THREE.Vector3(-5, 0, 4) },
    { id: "tugu-north", position: new THREE.Vector3(6, 0, 1) },
    { id: "tugu-far-east", position: new THREE.Vector3(12, 0, 5) },
    { id: "tugu-south", position: new THREE.Vector3(5, 0, 12) },
    { id: "tugu-south-west", position: new THREE.Vector3(-5, 0, 12) },
  ];

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
        {monumentsData.map((monument) => (
          <Tugu
            key={monument.id}
            scale={0.5}
            position={monument.position}
          />
        ))}
        {/* <Tugu scale={0.5} position={tuguPosition} />
        <Tugu scale={0.5} position={[5,0,5]} />
        <Tugu scale={0.5} position={[-5,0,4]} />
        <Tugu scale={0.5} position={[6,0,1]} />
        <Tugu scale={0.5} position={[12,0,5]} />
        <Tugu scale={0.5} position={[5,0,12]} />
        <Tugu scale={0.5} position={[-5,0,12]} /> */}
        
        {/* <MonumentProximityManager
          monumentPosition={tuguPosition}
          interactionDist={INTERACTION_DIST}
        /> */}
        <MultiMonumentProximityManager
          monuments={monumentsData}
          interactionDist={INTERACTION_DIST}
        />
        {/* <ChestSpawner /> */}
      </Physics>
    </>
  );
};
