import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import OldComputer from "./ui/oldComputer";

export default function RenderModel() {
  return (
    <Canvas camera={{ position: [-50, 0, 55], fov: 55 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 5, 3]} intensity={1} />

      <OldComputer />

      <OrbitControls />
    </Canvas>
  );
}
