import * as THREE from "three";
import { Html, useGLTF, useTexture, useVideoTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import type { ThreeEvent } from "@react-three/fiber";
import type { RefObject } from "react";
import { useRef, useEffect } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useDesktop, useHover } from "@/shares/zustand";
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
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onDesktop = useDesktop((s) => s.onDesktop);
  const texture = useTexture("/oldEffect.png");
  const noise = useVideoTexture("/glitch.mp4", {
    loop: true,
    muted: true,
    autoplay: true,
  });

  //송신
  useEffect(() => {
    iframeRef.current?.contentWindow?.postMessage(
      {
        type: "DESKTOP_STATE",
        payload: {
          on: onDesktop,
        },
      },
      window.location.origin
    );
  }, [onDesktop]);

  return (
    <>
      <mesh geometry={ScreenMesh.geometry} visible={!onDesktop}>
        <meshBasicMaterial
          map={noise}
          toneMapped={false}
          transparent
          opacity={0.1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      <mesh geometry={ScreenMesh.geometry}>
        <meshBasicMaterial color="black" toneMapped={false} />
      </mesh>

      <mesh geometry={ScreenMesh.geometry}>
        <meshBasicMaterial
          alphaMap={texture}
          transparent
          opacity={0.25}
          toneMapped={false}
          depthWrite={false}
        />

        <Html
          transform
          occlude
          distanceFactor={7}
          rotation={[-0.09, 0, 0]}
          position={[0.01, 36.5, 11.9]}
          center
          pointerEvents="none"
        >
          <iframe
            ref={iframeRef}
            id="iframe"
            style={{
              border: "none",
              pointerEvents: onDesktop ? "auto" : "none",
              WebkitUserSelect: "none",
              MozUserSelect: "none",
              msUserSelect: "none",
              userSelect: "none",
            }}
            width={1840}
            height={1440}
            src={`/screen`}
          />
        </Html>
      </mesh>
    </>
  );
}

type Props = {
  orbitRef: RefObject<OrbitControlsImpl | null>;
};

const FLY_ZOOM = new THREE.Vector3(0, 37, 48);
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
  const { setIsHovered } = useHover();
  const { changeRotation, moveLookAt } = useGsap;

  const zoom = (e: ThreeEvent<PointerEvent>): void => {
    e.stopPropagation();
    if (onDesktop) return;
    if (e.eventObject.name !== "desktopGroup") return;

    const argues: LookAt = {
      position: camera.position,
      fly: FLY_ZOOM,
      target: control.current.target,
      lookAt: LOOKAT_ZOOM,
      isOut: false,
    };

    moveLookAt(argues);

    setOnDesktop(true);
  };

  const missed = (): void => {
    if (!onDesktop) return;

    const argues: LookAt = {
      position: camera.position,
      fly: FLY_MISSED,
      target: control.current.target,
      lookAt: LOOKAT_MISSED,
      isOut: true,
    };

    moveLookAt(argues);

    setOnDesktop(false);
  };

  useFrame((state) => {
    const desktop = deskTopGroup.current as THREE.Group;
    const argues1: Rotation = {
      rotation: desktop.rotation,
      pointer: state.pointer,
    };

    const argues2: Rotation = {
      rotation: desktop.rotation,
      pointer: new THREE.Vector2(0, 0.05),
      useY: true,
    };

    if (onDesktop) {
      changeRotation(argues2);
    } else {
      changeRotation(argues1);
    }
  });

  //수신
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type !== "SET_SCREEN") return;

      if (e.data.payload.on === false) {
        console.log("missed");
        missed();
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [missed]);

  return (
    <group
      name="desktopGroup"
      position={[0, -5, 0]}
      rotation={[0, 0, 0]}
      ref={deskTopGroup}
      onPointerDown={zoom}
      onPointerMissed={missed}
      onPointerOver={() => setIsHovered(true)}
      onPointerOut={() => setIsHovered(false)}
    >
      <Standard nodes={nodes} />
      <Screen nodes={nodes} />
    </group>
  );
}
