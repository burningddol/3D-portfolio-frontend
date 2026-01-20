import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";

import type { RefObject } from "react";
import { useRef, useEffect, useCallback } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import {
  useDesktop,
  useHover,
  useControlOrbit,
  useProject,
} from "@/shares/zustand";
import useGsap from "../lib/useGsap";
import type { LookAt } from "../lib/useGsap";
import { Standard, Screen } from "./oldComputer";

import { DrPaper1, DrPaper2 } from "./drPaper";
import { TimeMachine } from "./timeMachine";
import { DivergenceMeter } from "./divergenceMeter";

type Props = {
  orbitRef: RefObject<OrbitControlsImpl | null>;
};

const FLY_ZOOM = new THREE.Vector3(0, 34.3, 38);
const LOOKAT_ZOOM = new THREE.Vector3(0, 30.3, 0);

const FLY_MISSED = new THREE.Vector3(0, 30, 90);
const LOOKAT_MISSED = new THREE.Vector3(0, 15, 0);

export default function ObjectsRender({ orbitRef }: Props) {
  const { nodes } = useGLTF("/old_computer.glb");
  const { scene } = useGLTF("/glb/divergence_meter.glb");
  const { scene: scene2 } = useGLTF("/glb/time_machine2.glb");
  const { scene: scene3 } = useGLTF("/glb/dr_pepper.glb");

  const control = orbitRef as RefObject<OrbitControlsImpl>;
  const deskTopGroup = useRef<THREE.Group>(null);
  const drPepperGroup = useRef<THREE.Group>(null);
  const isFirstActive = useRef(false);

  const desiredCamPos = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const isAnimating = useRef(false);
  const follow = 0.018;

  const { camera } = useThree();

  const { onDesktop, setOnDesktop } = useDesktop();
  const { setIsHovered } = useHover();
  const { onControl, setOnControl } = useControlOrbit();
  const { onProject } = useProject();

  const { firstMotion } = useGsap;

  const zoom = (): void => {
    setOnDesktop(true);
    setOnControl(false);
  };

  // 해당 고차함수 리팩토링 할 것 (회전애니메이션 => 이동애니메이션 변환과정 )
  const missed = useCallback(
    (): (() => void) => (): void => {
      if (onControl) return;

      setOnDesktop(false);
    },
    [setOnDesktop, onControl],
  );

  const inOut = (): void => {
    //if (!onDesktop) return;  어차피 useFrame에서 rotation중 윈도우종료버튼때도 돌아가게하려고 잠시 뺌
    const onMissed = missed();
    onMissed();
  };

  const controlOut = useCallback((): void => {
    const onMissed = missed();
    onMissed();
  }, []); // deps에 missed추가하면 무한렌더링

  const startProjectMotion = (): void => {
    isAnimating.current = true;
    const argues: LookAt = {
      position: camera.position,
      fly: FLY_MISSED,
      target: control.current.target,
      lookAt: LOOKAT_MISSED,
      isOut: true,
      isWhoosh: true,
    };

    firstMotion(argues);

    setTimeout(() => {
      isAnimating.current = false;
    }, 1500); // firstMotion 총 길이와 맞추기
  };

  useFrame((state) => {
    if (isAnimating.current) return;
    if (!control.current) return;

    const pointer = state.pointer;

    if (onDesktop && !onControl) {
      // 데스크탑 줌 상태: 기본은 FLY_ZOOM, LOOKAT_ZOOM
      desiredCamPos.current.set(FLY_ZOOM.x, FLY_ZOOM.y, FLY_ZOOM.z);

      desiredTarget.current.set(LOOKAT_ZOOM.x, LOOKAT_ZOOM.y, LOOKAT_ZOOM.z);
    } else if (!onDesktop && !onControl && isFirstActive.current) {
      // 일반 상태: 기본은 FLY_MISSED, LOOKAT_MISSED
      desiredCamPos.current.set(
        FLY_MISSED.x + pointer.x * 25,
        FLY_MISSED.y + pointer.y * 10,
        FLY_MISSED.z,
      );

      desiredTarget.current.set(
        LOOKAT_MISSED.x + pointer.x * 25,
        LOOKAT_MISSED.y + pointer.y * 10,
        LOOKAT_MISSED.z,
      );
    } else {
      return;
    }

    camera.position.lerp(desiredCamPos.current, follow);
    control.current.target.lerp(desiredTarget.current, follow);

    // OrbitControls damping/target 반영
    control.current.update();
  });

  useEffect(() => {
    if (!onControl && onProject) controlOut(); //웹 접속하자마자 1회실행
  }, [controlOut, onControl, onProject]);

  //수신
  useEffect(() => {
    const handler = (e: MessageEvent) => {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type !== "SET_SCREEN") return;

      if (e.data.payload.on === false && onProject) {
        //웹 접속하자마자 1회실행, on=onScreen
        inOut();
      }
    };

    window.addEventListener("message", handler);
    return () => window.removeEventListener("message", handler);
  }, [missed, onProject]);

  useEffect(() => {
    if (onProject) {
      setTimeout(() => (isFirstActive.current = true), 1400);
      startProjectMotion();
    } //웹 접속하자마자 1회실행 startProjectMotion이 controlOut과 inOut 덮어씀 순서 중요
  }, [onProject]);

  return (
    <>
      <group
        name="desktopGroup"
        position={[0, -5, 0]}
        rotation={[0, 0, 0]}
        ref={deskTopGroup}
        onPointerDown={zoom}
        onPointerMissed={inOut}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <Standard nodes={nodes} />
        <Screen nodes={nodes} />
      </group>

      <group>
        <DivergenceMeter scene={scene} />
      </group>

      <group ref={drPepperGroup}>
        <DrPaper1 scene={scene3} />
        <DrPaper2 scene={scene3} />
      </group>
      <group>
        <TimeMachine scene={scene2} />
      </group>
    </>
  );
}
