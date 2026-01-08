## 

**Portfolio Concept**

이 포트폴리오는 개발자 Henry Hefferman 및 jiwoo의 R3F 포트폴리오에서 영감을 받아 시작.
3D요소를 접목하여 화면안의 또다른 화면이 주는 이질적인 경험이 매우 인상깊어 제작을 시작함.
요즘은 흔히 볼 수 없는 고전 데스크탑의 형태로 참신한 몰입감을 주도록 재해석하여 제작.



**Architecture**

[Feature-Sliced Design](https://emewjin.github.io/feature-sliced-design/)

**Stacks**

| **스킬** | **내용** |
| --- | --- |
| React | 적절한 컴포넌트분리 및 Three.js를 리액트에서 쉽게 사용할 수 있는 R3F의 존재로 리액트 선택   |
| Typescript | 런타임 환경에서의 에러를 방지하고 빠른 데이터 인터페이스 파악 |
| three.js | glb데이터를 리액트 컴포넌트화하여 관리 가능, 리액트와의 좋은 호환성으로 선택|
| scss | 이미 3D렌더링으로 이한 js실행시간 과점유 우려로 스타일드 컴포넌트와 같은 css in js의 편리성을 포기하고 css로 작성|
| gsap | 애니메이션을 부드럽게 주는대 유용한 라이브러리. 객체의 Vector3{[x,y,z}]를 효율적으로 control|
| zustand | 많지않은 전역 상태를 구독방식으로 간편하게 관리|
**Libraries**



