import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls } from "@react-three/drei";
import ObjectRender from "./ui/oldComputer";
import LightObject from "./ui/lightObject";
import { Suspense, useRef } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useControlOrbit } from "@/shares/zustand";

export default function RenderModel() {
  const orbit = useRef<OrbitControlsImpl | null>(null);
  const onControl = useControlOrbit((s) => s.onControl);

  return (
    <Canvas camera={{ position: [-70, 60, 100], fov: 55, near: 0.1, far: 200 }}>
      <Suspense fallback={null}>
        <OrbitControls
          ref={orbit}
          enablePan={onControl}
          enableZoom={onControl}
          enableRotate={onControl}
          maxDistance={130}
          maxPolarAngle={Math.PI / 2}
        />
        <LightObject />
        <ObjectRender orbitRef={orbit} />
        <ContactShadows
          position={[0, 0, -1]}
          scale={200}
          blur={0.5}
          opacity={0.2}
          far={35}
          color={"#a79a73"}
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
