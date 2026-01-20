import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import ObjectsRender from "./ui/models";
import LightObject from "./ui/lightObject";
import { Suspense, useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useControlOrbit } from "@/shares/zustand";

export default function RenderModel() {
  const orbit = useRef<OrbitControlsImpl | null>(null);
  const onControl = useControlOrbit((s) => s.onControl);

  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ powerPreference: "high-performance" }}
      camera={{ position: [40, 0, 25], fov: 55, near: 0.1, far: 200 }} //첫진입 position 여기서 설정 ㄱㄱ
    >
      <Suspense fallback={null}>
        <OrbitControls
          ref={orbit}
          target={[-20, 40, -30]}
          enablePan={onControl}
          enableZoom={onControl}
          enableRotate={onControl}
          maxDistance={130}
          maxPolarAngle={onControl ? Math.PI / 2 : Math.PI}
        />
        <LightObject />
        <ObjectsRender orbitRef={orbit} />
        <ContactShadows
          position={[-7, -4.9, -5]}
          scale={200}
          blur={2}
          opacity={0.35}
          far={35}
          color={"#000000"}
        />
        <Environment
          files="/moonless_golf_1k.exr"
          background
          backgroundBlurriness={1}
          environmentIntensity={0.1}
          backgroundIntensity={0.35}
        />
      </Suspense>
    </Canvas>
  );
}
