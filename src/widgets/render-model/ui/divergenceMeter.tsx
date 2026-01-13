import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function DivergenceMeter({ scene }: { scene: THREE.Group }) {
  const ref = useRef<THREE.Object3D>(null);

  const baseY = 39;

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    // 둥둥 떠있는 느낌
    const floatY = Math.sin(t * 0.8) * 1.4;

    // 미세 떨림
    const micro = Math.sin(t * 3.2) * 0.1;

    ref.current.position.y = baseY + floatY + micro;

    // 살짝 좌우 기울기
    ref.current.rotation.z = Math.sin(t * 0.6) * 0.06;
    ref.current.rotation.x = Math.cos(t * 0.7) * 0.02;
  });

  return (
    <primitive
      ref={ref}
      object={scene}
      position={[-61, baseY, 42]}
      rotation={[0, -0.1, 0]}
      scale={60}
    />
  );
}
