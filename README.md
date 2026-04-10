#  Interactive 3D Desktop Portfolio

> *슈타인즈 게이트*의 시간선 테마에서 영감받은 인터랙티브 3D 포트폴리오.  
> 3D 렌더링된 컴퓨터 모델 안에, 실제로 동작하는 Win98 스타일의 웹 데스크톱을 임베드했다.

개발자 **henryheffernan**의 포트폴리오에서 영감을 받아 제작했다.  
사용자는 3D 공간 속 컴퓨터를 조작하고, 화면에 포커스하여 마치 실제 PC처럼 웹 UI를 조작할 수 있다.

---

## 데모

![bandicam 2026-04-09 05-47-42-518](https://github.com/user-attachments/assets/c3babeaa-7b67-41af-98c1-89321b552525)


---

## 이렇게 구현 되었어요

### 1. 3D 화면 위에 DOM UI를 오버레이

 
3D 씬 안의 Screen 메시 위에 `@react-three/drei`의 `<Html>` 컴포넌트를 이용해  
실제 `<iframe>`을 픽셀 단위로 정렬

- `transform` 옵션으로 HTML 요소가 3D 공간의 변환(위치·회전·스케일)을 그대로 따라가요
- `distanceFactor={7}`로 카메라 거리에 따라 자동 스케일링
- `occlude`로 다른 3D 오브젝트에 가려질 때 자동 숨김 처리

```
3D Canvas
└── Screen Mesh (Three.js geometry)
    └── <Html transform occlude>
        └── <iframe src="/screen" width={1870} height={1480} />
```

화면이 포커스되면 `pointerEvents: "auto"`, 벗어나면 `"none"`으로 전환하여  
클릭 이벤트를 3D 캔버스와 DOM 사이에서 상황에 맞게 라우팅해요

---

### 2. 3D 씬 ↔ iframe 양방향 상태 동기화 (postMessage)

3D 씬(부모)과 iframe(자식)은 독립된 브라우징 컨텍스트이므로,  
`window.postMessage`로 상태를 동기화해요

```
[3D Scene] onDesktop 상태 변경
    → postMessage({ type: "DESKTOP_STATE", payload: { on, onControl } })
    → [iframe] pointerEvents 활성화 / 비활성화

[iframe] 종료 버튼 클릭
    → postMessage({ type: "SET_SCREEN", payload: { on: false } })
    → [3D Scene] 카메라 줌아웃 애니메이션 실행
```

---

### 3. 카메라 모션 — GSAP + useFrame 2단 연결

카메라 경험은 두 단계로 나뉘어요

| 단계 | 기술 | 설명 |
|---|---|---|
| 인트로 진입 | GSAP Timeline | 1.5초 플라이인 애니메이션 (중간 경유지 경유) |
| 마우스 패럴랙스 | useFrame | 마우스 위치에 따라 카메라 ±25(X), ±10(Y) 오프셋 |
| 화면 포커스 줌인 | useFrame lerp | `onDesktop` 상태에 따라 부드럽게 목표 위치로 수렴 |


---

### 4. 글리치 이펙트 레이어

두 개의 독립된 글리치 레이어가 있어요

- **DOM 레이어**: 배경에 글리치 영상(`/glitch.mp4`)을 `opacity: 4%`, `saturate(6) contrast(100)` 필터로 렌더링
- **3D 레이어**: Screen 메시 위에 동일 영상을 `MeshBasicMaterial`의 `additive blending`, `opacity: 29%`로 오버레이

화면이 포커스될 때는 글리치가 꺼지고, Off 상태에서는 켜져요  
CRT 모니터의 노이즈 느낌을 자연스럽게 연출해요

---

### 5. 공간 오디오 시스템

씬의 몰입감을 위해 상황별 오디오를 독립적으로 관리해요

| 오디오 | 트리거 |
|---|---|
| 분위기 앰비언트 | 로더 진입 시 루프 재생 |
| 화면 전환 whoosh | 카메라 줌인/줌아웃 시 (0.45초 오프셋 시작) |
| 화면 ON/OFF | 데스크톱 활성화/비활성화 시 |
| 마우스 클릭 | 데스크톱 UI mousedown/mouseup |
| 키보드 타이핑 | 타이프라이터 컴포넌트 문자 출력마다 |


---

### 6. Win98 드래그·리사이즈 윈도우

데스크톱 UI의 각 앱 창은 실제 OS처럼 드래그와 리사이즈를 구현 했어요

- **드래그**: 타이틀 바 mousedown으로 시작, 이동 중 시각적 border preview 표시 후 mouseup에서 확정
- **리사이즈**: 우하단 핸들로 크기 조절, 동일한 preview 패턴 적용
- **Z-index 관리**: Zustand의 `useZIndex` 스토어가 전역 카운터를 관리하여 클릭된 창이 항상 최상단에 위치

---

## 아키텍처


```
src/
├── app/          # 앱 진입점, 라우팅, Provider
├── pages/
│   ├── main/     # 3D 씬 (R3F Canvas)
│   └── screen/   # Win98 데스크톱 UI (iframe)
├── widgets/      # 조합형 UI 블록 (Navigation, Win98Window, Loader 등)
├── features/     # 독립 기능 모듈 (audio)
└── shares/       # 공유 타입, 상수, Zustand 스토어, 공통 컴포넌트
```

3D 씬과 데스크톱 UI는 각각 독립된 라우트(`/`, `/screen`)로 분리되어,  
iframe이 완전히 독립된 브라우징 컨텍스트에서 동작해요

---

## 기술 스택 및 선택 이유

| 기술 | 선택 이유 |
|---|---|
| **React + Vite** | 3D 씬과 UI를 단일 컴포넌트 트리로 통합; Canvas 기반 앱에서 SSR/SSG 이점 미미 |
| **TypeScript** | 3D 오브젝트 좌표, 상태 구조를 타입으로 안정적으로 관리 |
| **Three.js / R3F** | WebGL 기반 GLB 모델 렌더링 및 씬 제어 |
| **GSAP** | 카메라 인트로 타임라인 애니메이션 및 3D 오브젝트 트랜지션 |
| **Zustand** | 3D 레이어와 UI 레이어 간 가벼운 전역 상태 공유 |
| **SCSS** | WebGL 렌더링 성능 유지를 위해 런타임 CSS-in-JS 제거, 정적 스타일링 적용 |

---

## 사용자 흐름

```
접속
  → 로더 (에셋 로딩 + 앰비언트 오디오)
  → "PRESS" 클릭 → 카메라 플라이인 애니메이션 (GSAP)
  → 3D 씬 인터랙션 (마우스 패럴랙스)
  → 모니터 클릭 → 줌인 + Win98 데스크톱 활성화 (useFrame lerp)
  → 앱 아이콘 더블클릭 → Win98 윈도우 + iframe 앱 실행
  → 종료 버튼 → postMessage → 카메라 줌아웃
```

---

## 시작하기

```bash
npm install
npm run dev
```

---

## 커밋 컨벤션

| 접두사 | 설명 |
|---|---|
| `feat` | 새로운 기능 추가 |
| `fix` | 버그 수정 |
| `refactor` | 기능 변경 없는 코드 구조 개선 |
| `-_-` | 사소하지만 심적 만족감을 주는 변경 |
