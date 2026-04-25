export type APPName =
  | "ToDo List"
  | "Junseok's Book"
  | "My Blog"
  | "Jabdori Time"
  | "GitHub"
  | "Portfolio"
  | "CS Study";

export type AppOpenStatus = Record<APPName, boolean>;

export const INITIAL_APP_STATUS: AppOpenStatus = {
  "ToDo List": false,
  "Junseok's Book": false,
  "My Blog": false,
  "Jabdori Time": false,
  "GitHub": false,
  "Portfolio": false,
  "CS Study": false,
};

export const APP_NAMES: APPName[] = [
  "GitHub",
  "Portfolio",
  "My Blog",
  "Junseok's Book",
  "CS Study",
  "Jabdori Time",
  "ToDo List",
];

export const APP_CONFIG: Record<APPName, { label: string; iframeSrc: string; openInIframe: boolean }> = {
  "ToDo List": { label: "ToDo List", iframeSrc: "https://todoiniframe.vercel.app/", openInIframe: true },
  "Junseok's Book": { label: "Junseok's Book", iframeSrc: "https://win98-memobook.vercel.app/", openInIframe: true },
  "My Blog": { label: "My Blog", iframeSrc: "https://velog.io/@junbug/posts/", openInIframe: true },
  "Jabdori Time": { label: "Jabdori Time", iframeSrc: "https://jabdori-time.vercel.app/", openInIframe: true },
  "GitHub": { label: "GitHub", iframeSrc: "https://github.com/burningddol", openInIframe: false },
  "Portfolio": { label: "Portfolio", iframeSrc: "https://js-portfolio-sandy.vercel.app/", openInIframe: true },
  "CS Study": { label: "CS Study", iframeSrc: "https://cs-junseok.vercel.app/", openInIframe: true },
};
