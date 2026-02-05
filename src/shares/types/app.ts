/**
 * 앱 관련 공통 타입 정의
 * - 앱 이름, 상태 등 여러 컴포넌트에서 공유되는 타입
 */

/** 앱 이름 리터럴 유니온 타입 */
export type APPName =
  | "ToDo Schedular"
  | "Junseok's Book"
  | "My Blog"
  | "Jabdori Time";

/** 각 앱의 열림/닫힘 상태를 나타내는 타입 */
export type AppOpenStatus = Record<APPName, boolean>;

/** 앱 상태 초기값 */
export const INITIAL_APP_STATUS: AppOpenStatus = {
  "ToDo Schedular": false,
  "Junseok's Book": false,
  "My Blog": false,
  "Jabdori Time": false,
};

/** 앱 이름 배열 (순회용) */
export const APP_NAMES: APPName[] = [
  "ToDo Schedular",
  "Junseok's Book",
  "My Blog",
  "Jabdori Time",
];
