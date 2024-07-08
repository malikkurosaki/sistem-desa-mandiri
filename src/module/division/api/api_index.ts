import { createProject } from "./post/createProject";
import { listProject } from "./get/listProject";
export const API_INDEX = [
  {
    path: "create-project",
    method: "POST",
    bin: createProject,
  },
  {
    path: "list-project",
    method: "GET",
    bin: listProject,
  },
];
