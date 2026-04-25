import toDoList from "/toDoList.png";
import junseokBook from "/junseokBook.png";
import blog from "/blog.png";
import jabdori from "/jabdori.png";
import github from "/github.svg";
import portfolio from "/portfolio.svg";
import csStudy from "/csStudy.svg";
import { type APPName } from "../zustand";

const IMAGE_MAP: Record<APPName, string> = {
  "ToDo List": toDoList,
  "Junseok's Book": junseokBook,
  "My Blog": blog,
  "Jabdori Time": jabdori,
  "GitHub": github,
  "Portfolio": portfolio,
  "CS Study": csStudy,
};

export default function imageProvider(name: APPName) {
  return IMAGE_MAP[name];
}
