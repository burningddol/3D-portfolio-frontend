import * as THREE from "three";
import { Html, useTexture, useVideoTexture } from "@react-three/drei";
import { useRef, useEffect } from "react";
import { useDesktop, useControlOrbit } from "@/shares/zustand";

type GLTFNodes = Record<string, THREE.Object3D>;

const getMeshesFromNodes = (nodes: GLTFNodes) => {
  return Object.values(nodes).filter(
    (node): node is THREE.Mesh => node instanceof THREE.Mesh,
  );
};

const removeScreenMesh = (meshes: THREE.Mesh[]) => {
  return meshes.filter((mesh) => mesh.name != "Screen");
};

export function Standard({ nodes }: { nodes: GLTFNodes }) {
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

export function Screen({ nodes }: { nodes: GLTFNodes }) {
  const ScreenMesh: any = nodes.Screen;
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const onDesktop = useDesktop((s) => s.onDesktop);
  const onControl = useControlOrbit((s) => s.onControl);
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
          onControl: onControl,
        },
      },
      window.location.origin,
    );
  }, [onDesktop, onControl]);

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
          position={[0.01, 36.3, 11.2]}
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
            width={1870}
            height={1480}
            src={`/screen`}
          />
        </Html>
      </mesh>
    </>
  );
}
