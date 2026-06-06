"use client";

import { useMemo } from "react";
import * as THREE from "three";

function createBrickTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#E8DCC8";
  ctx.fillRect(0, 0, 256, 256);

  const brickW = 64;
  const brickH = 28;
  const gap = 4;

  for (let row = 0; row < 9; row++) {
    const offset = row % 2 === 0 ? 0 : brickW / 2;
    for (let col = -1; col < 5; col++) {
      const x = col * (brickW + gap) + offset;
      const y = row * (brickH + gap);
      ctx.fillStyle = "#C4772A";
      ctx.fillRect(x, y, brickW, brickH);
      ctx.fillStyle = "rgba(0,0,0,0.08)";
      ctx.fillRect(x, y + brickH - 3, brickW, 3);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 3);
  return texture;
}

export function WallMesh() {
  const texture = useMemo(() => createBrickTexture(), []);

  return (
    <mesh position={[0, 1.5, -0.8]} receiveShadow castShadow>
      <boxGeometry args={[4.5, 3.2, 0.2]} />
      <meshLambertMaterial map={texture} />
    </mesh>
  );
}
