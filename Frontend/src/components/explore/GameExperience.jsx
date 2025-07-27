import React from "react";

import { Environment, OrthographicCamera } from "@react-three/drei";
// import { useControls } from "leva";
import { useFrame } from "@react-three/fiber";
import { useRef, useEffect } from "react";
import { Tugu } from "./models/Tugu";
import { Physics } from "@react-three/rapier";
import { CharacterController } from "./CharacterController";
import { MapTiles } from "./models/Map";
import { Chest } from "./models/Chest";
import * as THREE from "three";

import { useGameStore } from "@/store/gameStore";

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

const ProximityManager = ({ chestPosition, interactionDist }) => {
  const playerPosition = useGameStore((state) => state.playerPosition);
  const setIsNearChest = useGameStore((state) => state.setIsNearChest);
  
  const wasNear = useRef(false);
  const playerVec3 = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!chestPosition) {
      if (wasNear.current) {
        setIsNearChest(false);
        wasNear.current = false;
      }
      return;
    }

    if (playerPosition) {
        playerVec3.current.set(playerPosition.x, playerPosition.y, playerPosition.z);
    }
    
    const distance = playerVec3.current.distanceTo(chestPosition);
    // console.log(`Distance to chest: ${distance.toFixed(2)}`);
    const isNowNear = distance <= interactionDist;
    // console.log(interactionDist);

    if (isNowNear !== wasNear.current) {
      // console.log(
      //   `%cProximity status changed: Player is now ${isNowNear ? 'NEAR' : 'FAR'}`
      // );
      setIsNearChest(isNowNear);
      wasNear.current = isNowNear;
    }
  });

  return null;
};

const ChestSpawner = () => {
    const spawnChest = useGameStore((state) => state.spawnChest);

    useEffect(() => {
        const spawnInterval = setInterval(() => {
          if (useGameStore.getState().chestPosition) {
            return;
          }
          if (Math.random() < 0.3) {
            // console.log("Spawning a new chest!");
            const playerPos = useGameStore.getState().playerPosition;
            
            const angle = Math.random() * Math.PI * 2;
            const distance = 0.5 + Math.random() * 1.25; 
            
            const spawnPos = new THREE.Vector3(
              playerPos.x + Math.sin(angle) * distance,
              0,
              playerPos.z + Math.cos(angle) * distance
            );
            
            spawnChest(spawnPos);
          }
        }, 5000);
    
        return () => clearInterval(spawnInterval);
      }, [spawnChest]);

      return null;
}

export const Experience = () => {
  const shadowCameraRef = useRef();
  const INTERACTION_DIST = 1
  const chestPosition = useGameStore((state) => state.chestPosition);
  const tuguPosition = new THREE.Vector3(1, 0, 2);

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
          initialLat={37.7749}
          initialLon={-122.4194}
          MAP_ZOOM={15}
          MAP_GRID_SIZE={5}
          WORLD_SCALE={10}
        />
        <CharacterController />
        <Tugu scale={0.5} position={tuguPosition} />
        <Tugu scale={0.5} position={[5,0,5]} />
        <Tugu scale={0.5} position={[-5,0,4]} />
        <Tugu scale={0.5} position={[6,0,1]} />
        <Tugu scale={0.5} position={[12,0,5]} />
        <Tugu scale={0.5} position={[5,0,12]} />
        <Tugu scale={0.5} position={[-5,0,12]} />
        
        {/* {chestPosition && (
          <Chest 
            key={`${chestPosition.x}-${chestPosition.z}`} 
            scale={0.5} 
            position={chestPosition} 
          />
        )} */}

        {/* <ProximityManager
          chestPosition={chestPosition}
          interactionDist={INTERACTION_DIST}
        /> */}
        <MonumentProximityManager
          monumentPosition={tuguPosition}
          interactionDist={INTERACTION_DIST}
        />
        <ChestSpawner />
      </Physics>
    </>
  );
};
