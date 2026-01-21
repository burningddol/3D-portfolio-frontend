import toDoList from "/toDoList.png";
import junseokBook from "/junseokBook.png";
import blog from "/blog.png";
import { type APPName } from "../zustand";

const IMAGE_MAP: Record<APPName, string> = {
  "Junseok's Book": junseokBook,
  "My Blog": blog,
  "ToDo Schedular": toDoList,
};

export default function imageProvider(name: APPName) {
  return IMAGE_MAP[name];
}
