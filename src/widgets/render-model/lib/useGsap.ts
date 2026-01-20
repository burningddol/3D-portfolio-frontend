import gsap from "gsap";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { RefObject } from "react";

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
  isWhoosh?: boolean;
}

export interface Camera {
  position: THREE.Vector3;
  target: THREE.Vector3;
  pointer: THREE.Vector2;
}

// Shared state for syncing GSAP with R3F frame loop (fixes macOS Html sync)
export const gsapTicker = {
  needsUpdate: false,
  controlRef: null as RefObject<OrbitControlsImpl | null> | null,
  cameraRef: null as THREE.Camera | null,
};

interface UseGsap {
  changeRotation: (rotationInfo: Rotation) => void;
  moveLookAt: (lookAtInfo: LookAt) => void;
  moveCamera: (cameraInfo: Camera) => void;
  firstMotion: (lookAtInfo: LookAt) => void;
}

const useGsap: UseGsap = {
  changeRotation: () => {},
  moveLookAt: () => {},
  moveCamera: () => {},
  firstMotion: () => {},
};

/* 애니메이션 회전미사용으로 잠정 폐기

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

useGsap.moveLookAt = ({
  position,
  fly,
  target,
  lookAt,
  isOut,
  isWhoosh = false,
}: LookAt) => {
  gsap.to(position, {
    duration: 1,
    repeat: 0,
    x: fly.x,
    y: fly.y,
    z: fly.z,
    ease: !isWhoosh && isOut ? "power3.inout" : "power3.out",
  });
  gsap.to(target, {
    duration: 1.25,
    repeat: 0,
    x: lookAt.x,
    y: lookAt.y,
    z: lookAt.z,
    ease: isOut ? "power3.out" : "power3.inout",
  });
};
*/
useGsap.firstMotion = ({
  position,
  fly,
  target,
  lookAt,
  isOut,
  isWhoosh = false,
}: LookAt) => {
  gsapTicker.needsUpdate = true;

  // Sync function to update OrbitControls and camera matrix on every GSAP tick
  // This ensures Html overlay stays in sync with camera on macOS
  const syncUpdate = () => {
    if (gsapTicker.controlRef?.current) {
      gsapTicker.controlRef.current.update();
    }
    if (gsapTicker.cameraRef) {
      gsapTicker.cameraRef.updateMatrixWorld();
    }
  };

  const tl = gsap.timeline({
    onUpdate: syncUpdate,
    onComplete: () => {
      gsapTicker.needsUpdate = false;
    },
  });

  tl.to(position, {
    duration: 1,
    repeat: 0,
    x: 0,
    y: 50,
    z: 130,
    ease: !isWhoosh && isOut ? "power3.inout" : "power3.out",
  }).to(position, {
    duration: 0.5,
    repeat: 0,
    x: fly.x,
    y: fly.y,
    z: fly.z,
    ease: !isWhoosh && isOut ? "power3.inout" : "power3.out",
  });

  gsap.to(target, {
    duration: 1.5,
    repeat: 0,
    x: lookAt.x,
    y: lookAt.y,
    z: lookAt.z,
    ease: isOut ? "power3.out" : "power3.inout",
    onUpdate: syncUpdate,
  });
};

export default useGsap;
