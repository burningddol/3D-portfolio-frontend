export type APPName =
  | "ToDo Schedular"
  | "Junseok's Book"
  | "My Blog"
  | "Jabdori Time"
  | "GitHub";

export type AppOpenStatus = Record<APPName, boolean>;

export const INITIAL_APP_STATUS: AppOpenStatus = {
  "ToDo Schedular": false,
  "Junseok's Book": false,
  "My Blog": false,
  "Jabdori Time": false,
  "GitHub": false,
};

export const APP_NAMES: APPName[] = [
  "GitHub",
  "My Blog",
  "Junseok's Book",
  "Jabdori Time",
  "ToDo Schedular",
];

export const APP_CONFIG: Record<APPName, { label: string; iframeSrc: string; openInIframe: boolean }> = {
  "ToDo Schedular": { label: "ToDo Scheduler", iframeSrc: "https://todoiniframe.vercel.app/", openInIframe: true },
  "Junseok's Book": { label: "Junseok's Book", iframeSrc: "https://win98-memobook.vercel.app/", openInIframe: true },
  "My Blog": { label: "My Blog", iframeSrc: "https://velog.io/@junbug/posts/", openInIframe: true },
  "Jabdori Time": { label: "Jabdori Time", iframeSrc: "https://jabdori-time.vercel.app/", openInIframe: true },
  "GitHub": { label: "GitHub", iframeSrc: "https://github.com/burningddol", openInIframe: false },
};
