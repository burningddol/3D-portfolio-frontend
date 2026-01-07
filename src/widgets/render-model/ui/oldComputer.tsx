import * as THREE from "three";
import { Html, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import type { RefObject } from "react";
import { useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useDesktop } from "@/shares/zustand";
import useGsap from "../lib/useGsap";
import type { Rotation, LookAt } from "../lib/useGsap";

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

type Props = {
  orbitRef: RefObject<OrbitControlsImpl | null>;
};

const FLY_ZOOM = new THREE.Vector3(0, 40, 48);
const LOOKAT_ZOOM = new THREE.Vector3(0, 30, 0);

const FLY_MISSED = new THREE.Vector3(-70, 60, 110);
const LOOKAT_MISSED = new THREE.Vector3(0, 0, 0);

export default function ObjectRender({ orbitRef }: Props) {
  let timer: number;
  const { nodes } = useGLTF("/old_computer.glb");

  const control = orbitRef as RefObject<OrbitControlsImpl>;
  const deskTopGroup = useRef<THREE.Group>(null);

  const { camera } = useThree();

  const { onDesktop, setOnDesktop } = useDesktop();
  const { changeRotation, moveLookAt } = useGsap;

  const zoom = (e: ThreeEvent<PointerEvent>): void => {
    e.stopPropagation();

    const argues: LookAt = {
      position: camera.position,
      fly: FLY_ZOOM,
      target: control.current.target,
      lookAt: LOOKAT_ZOOM,
      isOut: false,
    };
    if (e.eventObject.name !== "desktopGroup") return;

    if (!onDesktop) {
      moveLookAt(argues);

      setOnDesktop(true);
    }
  };

  const missed = (): void => {
    if (onDesktop) {
      if (timer) return;

      const argues: LookAt = {
        position: camera.position,
        fly: FLY_MISSED,
        target: control.current.target,
        lookAt: LOOKAT_MISSED,
        isOut: true,
      };

      moveLookAt(argues);

      timer = setTimeout(() => setOnDesktop(false), 2000);
    }
  };

  useFrame((state) => {
    const desktop = deskTopGroup.current as THREE.Group;
    const argues: Rotation = {
      rotation: desktop.rotation,
      pointer: state.pointer,
    };

    if (!onDesktop) {
      changeRotation(argues);
    }
  });

  return (
    <group
      name="desktopGroup"
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
      ref={deskTopGroup}
      onPointerDown={zoom}
      onPointerMissed={missed}
    >
      <Standard nodes={nodes} />
      <Screen nodes={nodes} />
    </group>
  );
}
