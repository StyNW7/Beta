import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { useGameStore } from "../../store/gameStore";

export const MultiMonumentProximityManager = ({ monuments, interactionDist }) => {
  // Get player position and state setters from your global store
  const playerPosition = useGameStore((state) => state.playerPosition);
  // These will be new functions and state in your store
  const setClosestMonument = useGameStore((state) => state.setClosestMonument);
  
  // Refs for performance
  const playerVec3 = useRef(new THREE.Vector3());
  const prevClosestId = useRef(null); // Stores the ID of the previously closest monument

  useFrame(() => {
    if (!playerPosition || !monuments || monuments.length === 0) {
      // If there's no data, ensure the state is cleared
      if (prevClosestId.current !== null) {
        setClosestMonument(null);
        prevClosestId.current = null;
      }
      return;
    }

    playerVec3.current.set(playerPosition.x, playerPosition.y, playerPosition.z);

    let closestDist = Infinity;
    let closestMon = null;

    // 1. Loop through all monuments to find the single closest one
    for (const monument of monuments) {
      const distance = playerVec3.current.distanceTo(monument.position);
      if (distance < closestDist) {
        closestDist = distance;
        closestMon = monument;
      }
    }

    // 2. Check if the closest monument is within the interaction distance
    let newClosestMonumentInfo = null;
    if (closestMon && closestDist <= interactionDist) {
        newClosestMonumentInfo = {
            _id: closestMon._id,
            position: closestMon.position,
            distance: closestDist,
        };
    }

    // 3. Only update state if the closest monument has changed
    const newClosestId = newClosestMonumentInfo ? newClosestMonumentInfo.id : null;
    if (newClosestId !== prevClosestId.current) {
      setClosestMonument(newClosestMonumentInfo);
      // setIsNearMonument(true);
      prevClosestId.current = newClosestId; // Update our reference for the next frame
    }
  });

  return null; // This component does not render anything
};