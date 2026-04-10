import toDoList from "/toDoList.png";
import junseokBook from "/junseokBook.png";
import blog from "/blog.png";
import jabdori from "/jabdori.png";
import github from "/github.webp";
import { type APPName } from "../zustand";

const IMAGE_MAP: Record<APPName, string> = {
  "ToDo Schedular": toDoList,
  "Junseok's Book": junseokBook,
  "My Blog": blog,
  "Jabdori Time": jabdori,
  "GitHub": github,
};

export default function imageProvider(name: APPName) {
  return IMAGE_MAP[name];
}
