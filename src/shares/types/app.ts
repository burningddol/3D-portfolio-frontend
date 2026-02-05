export type APPName =
  | "ToDo Schedular"
  | "Junseok's Book"
  | "My Blog"
  | "Jabdori Time";

export type AppOpenStatus = Record<APPName, boolean>;

export const INITIAL_APP_STATUS: AppOpenStatus = {
  "ToDo Schedular": false,
  "Junseok's Book": false,
  "My Blog": false,
  "Jabdori Time": false,
};

export const APP_NAMES: APPName[] = [
  "ToDo Schedular",
  "Junseok's Book",
  "My Blog",
  "Jabdori Time",
];
