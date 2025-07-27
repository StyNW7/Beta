import React from "react";

import {
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  TextureLoader
} from 'three';
import { useEffect, useRef } from 'react';
import { RigidBody } from '@react-three/rapier';

const latLonToTile = (lat, lon, zoom) => {
  const x = Math.floor(((lon + 180) / 360) * Math.pow(2, zoom));
  const y = Math.floor(
    ((1 -
      Math.log(Math.tan((lat * Math.PI) / 180) + 1 / Math.cos((lat * Math.PI) / 180)) /
        Math.PI) /
      2) *
      Math.pow(2, zoom)
  );
  return { x, y };
};

export const MapTiles = ({ initialLat, initialLon, MAP_ZOOM, MAP_GRID_SIZE, WORLD_SCALE }) => {
  const loader = useRef(new TextureLoader());

  const centralTile = latLonToTile(initialLat, initialLon, MAP_ZOOM);
  const tileGridOffset = Math.floor(MAP_GRID_SIZE / 2);

  return (
    <>
      {Array.from({ length: MAP_GRID_SIZE }).map((_, i) =>
        Array.from({ length: MAP_GRID_SIZE }).map((_, j) => {
          const tileX = centralTile.x + i - tileGridOffset;
          const tileY = centralTile.y + j - tileGridOffset;
          const tileUrl = `https://tile.openstreetmap.org/${MAP_ZOOM}/${tileX}/${tileY}.png`;

          const xPos = (i - tileGridOffset) * WORLD_SCALE;
          const zPos = (j - tileGridOffset) * WORLD_SCALE;

          return (
            <Tile
              key={`${tileX}-${tileY}`}
              url={tileUrl}
              position={[xPos, 0, zPos]}
              WORLD_SCALE={WORLD_SCALE}
              loader={loader.current}
            />
          );
        })
      )}
    </>
  );
};

const Tile = ({ url, position, WORLD_SCALE, loader }) => {
  const materialRef = useRef();

  useEffect(() => {
    loader.load(
      url,
      (texture) => {
        if (materialRef.current) {
          materialRef.current.map = texture;
          materialRef.current.needsUpdate = true;
        }
      },
      undefined,
      (err) => console.error('Error loading tile:', url, err)
    );
  }, [url, loader]);

  return (
    <RigidBody type="fixed" colliders="cuboid">
      <mesh position={position} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[WORLD_SCALE, WORLD_SCALE]} />
        <meshBasicMaterial ref={materialRef} />
      </mesh>
    </RigidBody>
  );
};
