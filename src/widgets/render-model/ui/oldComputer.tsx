import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";

type GLTFNodes = Record<string, THREE.Object3D>;

const getMeshesFromNodes = (nodes: GLTFNodes) => {
  return Object.values(nodes).filter(
    (node): node is THREE.Mesh => node instanceof THREE.Mesh
  );
};

const removeScreenMesh = (meshes: THREE.Mesh[]) => {
  return meshes.filter((mesh) => mesh.name != "Screen");
};

function Standard({ nodes }: { nodes: GLTFNodes }) {
  const meshes = getMeshesFromNodes(nodes);
  const noScreenMeshes = removeScreenMesh(meshes);
  console.log(nodes);
  return noScreenMeshes.map((mesh: THREE.Mesh) => (
    <mesh
      key={mesh.geometry.id}
      geometry={mesh.geometry}
      material={mesh.material}
      castShadow
      receiveShadow
    />
  ));
}

function Screen({ nodes }: { nodes: GLTFNodes }) {
  const ScreenMesh: any = nodes.Screen;
  return (
    <mesh geometry={ScreenMesh.geometry}>
      <Html
        transform
        occlude
        distanceFactor={1}
        rotation={[-0.1, 0, 0]}
        position={[0, 36.38, 11.9]}
        center
        pointerEvents="none"
      >
        <iframe
          id="iframe"
          style={{
            border: "none",
            pointerEvents: "auto",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
            transform: "scale(10)",
          }}
          width={1336}
          height={1060}
          src={`${window.location.origin}/screen`}
        />
      </Html>
    </mesh>
  );
}

export default function ObjectRender() {
  const { nodes } = useGLTF("/old_computer.glb");

  return (
    <group>
      <Standard nodes={nodes} />
      <Screen nodes={nodes} />
    </group>
  );
}
