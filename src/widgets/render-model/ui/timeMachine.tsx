import * as THREE from "three";
import { useEffect } from "react";

export function TimeMachine({ scene }: { scene: THREE.Group }) {
  useEffect(() => {
    scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;

        mat.toneMapped = false;

        mat.color.setRGB(1.25, 1.25, 1.25);

        mat.needsUpdate = true;
      }
    });
  }, [scene]);

  return (
    <primitive
      object={scene}
      position={[64, -5, 18]}
      rotation={[0, 4.2, 0]}
      scale={62}
    />
  );
}
