import * as THREE from "three";
import type { GLTF } from "three-stdlib";

export type GLTFResult = GLTF & {
  nodes: Record<string, THREE.Mesh>;
  materials: Record<string, THREE.MeshStandardMaterial>;
};
export type MeshTypes = {
  geometry: THREE.BufferGeometry<THREE.NormalBufferAttributes>;
  material: THREE.Material | THREE.Material[];
};
