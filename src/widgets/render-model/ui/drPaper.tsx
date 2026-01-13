import * as THREE from "three";

export function DrPaper1({ scene }: { scene: THREE.Group }) {
  const clone = scene.clone();
  return (
    <primitive
      object={clone}
      position={[-35, 0, 20]}
      rotation={[0, 0, 0]}
      scale={4.3}
    />
  );
}

export function DrPaper2({ scene }: { scene: THREE.Group }) {
  const clone = scene.clone();
  return (
    <primitive
      object={clone}
      position={[-42, 0, 3]}
      rotation={[1.5, 3, 4.5]}
      scale={4.3}
    />
  );
}
