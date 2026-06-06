"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import {
  type SensorReading,
  SENSOR_COLORS,
} from "@/lib/sensorData";

interface SensorNodesProps {
  sensors: SensorReading[];
  active: boolean;
  context: Record<string, number>;
  htmlDistanceFactor?: number;
  nodeScale?: number;
}

function SensorNode({
  sensor,
  context,
  htmlDistanceFactor,
  nodeScale,
}: {
  sensor: SensorReading;
  context: Record<string, number>;
  htmlDistanceFactor: number;
  nodeScale: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const color = SENSOR_COLORS[sensor.kind];
  const value = sensor.getValue(context);
  const stemHeight = Math.max(0.1, sensor.position[1]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const pulse = 1 + Math.sin(clock.elapsedTime * 4 + sensor.position[0]) * 0.2;
    meshRef.current.scale.setScalar(nodeScale * pulse);
    if (ringRef.current) {
      ringRef.current.rotation.z = clock.elapsedTime * 0.6;
    }
  });

  return (
    <group position={sensor.position}>
      <mesh position={[0, -stemHeight / 2, 0]}>
        <cylinderGeometry args={[0.008, 0.008, stemHeight, 4]} />
        <meshBasicMaterial color={color} transparent opacity={0.35} />
      </mesh>

      <mesh ref={meshRef} castShadow>
        <sphereGeometry args={[1, 10, 10]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.2}
        />
      </mesh>

      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[nodeScale * 1.4, nodeScale * 2, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.45} />
      </mesh>

      <Html
        center
        distanceFactor={htmlDistanceFactor}
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div className="whitespace-nowrap rounded-lg border border-sage-border bg-forest-dark/90 px-2 py-1 font-mono text-[10px] text-white shadow-lg">
          <span className="text-amber">{sensor.label}</span>
          <br />
          <span className="font-bold">
            {value}
            {sensor.unit}
          </span>
        </div>
      </Html>
    </group>
  );
}

export function SensorNodes({
  sensors,
  active,
  context,
  htmlDistanceFactor = 8,
  nodeScale = 0.08,
}: SensorNodesProps) {
  if (!active) return null;

  return (
    <group>
      {sensors.map((sensor) => (
        <SensorNode
          key={sensor.id}
          sensor={sensor}
          context={context}
          htmlDistanceFactor={htmlDistanceFactor}
          nodeScale={nodeScale}
        />
      ))}
    </group>
  );
}
