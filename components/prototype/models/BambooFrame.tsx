"use client";

import { FRAME_HEIGHT, FRAME_WIDTH } from "@/lib/plantData";

const ROW_Y = [0.6, 1.2, 1.8, 2.4];
const BAMBOO = "#8B7355";

export function BambooFrame() {
  const postX = [-FRAME_WIDTH / 2, FRAME_WIDTH / 2];
  const postZ = -0.5;

  return (
    <group position={[0, 0, postZ]}>
      {postX.map((x) => (
        <mesh
          key={`post-${x}`}
          position={[x, FRAME_HEIGHT / 2, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.04, 0.05, FRAME_HEIGHT, 6]} />
          <meshLambertMaterial color={BAMBOO} />
        </mesh>
      ))}

      {ROW_Y.map((y) => (
        <mesh
          key={`beam-${y}`}
          position={[0, y, 0]}
          rotation={[0, 0, Math.PI / 2]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[0.03, 0.03, FRAME_WIDTH, 6]} />
          <meshLambertMaterial color={BAMBOO} />
        </mesh>
      ))}
    </group>
  );
}
