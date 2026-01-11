## 

**Interactive 3D Desktop Portfolio**

3D로 렌더링된 컴퓨터 모델 안에  
실제로 동작하는 웹 데스크톱(바탕화면, 앱, 이력서)을  
임베드한 인터랙티브 포트폴리오  

사용자는 3D 공간 속 컴퓨터를 조작하고,  
화면에 포커스하여 마치 진짜 PC처럼 웹 UI를 사용할 수 있다.  


**Main Features**
- 3D 컴퓨터 모델 (Three.js / React Three Fiber)  
- 실제 웹 기반 데스크톱 UI (iframe)
- 앱, 폴더, resume 실행 (작업중...)
- 마우스 & 키보드 입력 지원
- 카메라 이동 및 화면 포커스 애니메이션

**System Architecture**  
- 3D Layer (WebGL 기반)  
Three.js (R3F)  
GLTF 컴퓨터 모델 (fab 구매)  
Screen Mesh (Mesh, 3dObject 분리 적용)  

- UI Layer (DOM)
React (vite)  
iframe 기반 데스크톱 OS (독립적 환경, postMessage를 활용한 상태공유)  
앱 및 resume  

3D 화면과 iframe UI는 정확히 정렬되어  
WebGL 화면 위에서 실제 웹 OS가 실행되는 구조  

**Camera & Motion**
- GSAP  
카메라 이동  
화면 줌인  
UI 포커스 전환  
을 자연스럽게 연결해  
공간 기반 인터페이스 경험을 제공

**Convention**

| **태그** | **내용** |
| --- | --- |
| Feat | 새로운 기능을 추가한 경우 |
| -_-  | 별 의미없는 사소한 변경이지만 심적 만족감을 주는 것 |


**Architecture**

[Feature-Sliced Design](https://emewjin.github.io/feature-sliced-design/)

**Stacks**
 - React:  3D 씬과 UI를 하나의 컴포넌트 트리로 통합하기 위해 사용. SEO와 페이지라우팅 최적화 불필요, Canvas는 브라우저에서 연산되므로 ssr, ssg장점 희미.     
 - Typescript:  3D 오브젝트, 좌표, 상태 구조를 타입으로 안정적으로 관리  
 - three.js:  WebGL 기반으로 GLB 모델과 3D 씬을 제어하기 위해 사용  
 - scss:  WebGL 렌더링 성능 유지를 위해 런타임 CSS-in-JS를 피하고 정적 스타일링 적용  
 - gsap:  카메라와 3D 오브젝트를 부드럽게 애니메이션하기 위해 사용   
 -zustand:  3D와 UI 상태를 가볍게 공유하기 위한 전역 상태 관리   




