"use client";

export function CompostBox() {
  return (
    <group position={[-1.6, 0.075, 0.3]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.8, 0.15, 0.4]} />
        <meshLambertMaterial color="#3C2008" />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <boxGeometry args={[0.7, 0.06, 0.32]} />
        <meshLambertMaterial color="#4A3018" />
      </mesh>
    </group>
  );
}
