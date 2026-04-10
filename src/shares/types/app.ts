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

export const APP_IFRAME_SRCS: Record<APPName, string> = {
  "ToDo Schedular": "https://todoiniframe.vercel.app/",
  "Junseok's Book": "https://win98-memobook.vercel.app/",
  "My Blog": "https://velog.io/@junbug/posts/",
  "Jabdori Time": "https://jabdori-time.vercel.app/",
};
