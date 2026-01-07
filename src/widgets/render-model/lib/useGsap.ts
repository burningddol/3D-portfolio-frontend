import gsap from "gsap";
import * as THREE from "three";

export interface Rotation {
  rotation: THREE.Euler;
  pointer: THREE.Vector2;
  useY?: boolean;
}

export interface LookAt {
  position: THREE.Vector3;
  fly: THREE.Vector3;
  target: THREE.Vector3;
  lookAt: THREE.Vector3;
  isOut: boolean;
}
interface UseGsap {
  changeRotation: (rotationInfo: Rotation) => void;
  moveLookAt: (lookAtInfo: LookAt) => void;
}

const useGsap: UseGsap = { changeRotation: () => {}, moveLookAt: () => {} };

useGsap.changeRotation = ({ rotation, pointer, useY }: Rotation) => {
  gsap.to(rotation, {
    duration: 2,
    repeat: 0,
    x: useY ? pointer.y : 0,
    y: -pointer.x / 3.5,
    z: 0,
    ease: "power3.out",
  });
};

useGsap.moveLookAt = ({ position, fly, target, lookAt, isOut }: LookAt) => {
  gsap.to(position, {
    duration: 2,
    repeat: 0,
    x: fly.x,
    y: fly.y,
    z: fly.z,
    ease: isOut ? "power3.inout" : "power3.out",
  });
  gsap.to(target, {
    duration: 2.5,
    repeat: 0,
    x: lookAt.x,
    y: lookAt.y,
    z: lookAt.z,
    ease: isOut ? "power3.out" : "power3.inout",
  });
};

export default useGsap;
