"use client";

import { HECTARE_SIZE, FIELD_OFFSET } from "@/lib/terrainData";

const TREE_POSITIONS: [number, number, number][] = [
  [-FIELD_OFFSET - 8, 0, -FIELD_OFFSET - 5],
  [FIELD_OFFSET + 10, 0, -FIELD_OFFSET - 8],
  [-FIELD_OFFSET - 12, 0, FIELD_OFFSET + 6],
  [FIELD_OFFSET + 8, 0, FIELD_OFFSET + 10],
  [-FIELD_OFFSET - 6, 0, 0],
  [FIELD_OFFSET + 12, 0, -20],
  [-30, 0, FIELD_OFFSET + 12],
  [40, 0, FIELD_OFFSET + 8],
];

export function HorizonTrees() {
  return (
    <group>
      {TREE_POSITIONS.map(([x, y, z], i) => (
        <group key={i} position={[x, y, z]}>
          <mesh position={[0, 1.2, 0]} castShadow>
            <coneGeometry args={[1.2, 3, 6]} />
            <meshLambertMaterial color="#2D6A4F" />
          </mesh>
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.2, 0.8, 6]} />
            <meshLambertMaterial color="#5D4037" />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export function FieldBoundaryMarkers() {
  return (
    <group>
      {[
        [-FIELD_OFFSET, 0.01, 0],
        [FIELD_OFFSET, 0.01, 0],
        [0, 0.01, -FIELD_OFFSET],
        [0, 0.01, FIELD_OFFSET],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.4, HECTARE_SIZE]} />
          <meshBasicMaterial color="#E9A319" transparent opacity={0.15} />
        </mesh>
      ))}
    </group>
  );
}
