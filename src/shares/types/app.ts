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

export const APP_CONFIG: Record<APPName, { label: string; iframeSrc: string }> = {
  "ToDo Schedular": { label: "ToDo Scheduler", iframeSrc: "https://todoiniframe.vercel.app/" },
  "Junseok's Book": { label: "Junseok's Book", iframeSrc: "https://win98-memobook.vercel.app/" },
  "My Blog": { label: "My Blog", iframeSrc: "https://velog.io/@junbug/posts/" },
  "Jabdori Time": { label: "Jabdori Time", iframeSrc: "https://jabdori-time.vercel.app/" },
};
