import { getOneGroup } from "./get/getOneGroup";
import { listGroup } from "./get/listGroup";
import { createGroup } from "./post/createGroup";
import { deleteGroup } from "./post/deleteGroup";
import { updateGroup } from "./post/updateGroup";

export const API_INDEX_GROUP = [
  {
    path: "list-group",
    method: "GET",
    bin: listGroup,
  },
  {
    path: "create-group",
    method: "POST",
    bin: createGroup,
  },
  {
    path: "update-group",
    method: "POST",
    bin: updateGroup,
  },
  {
    path: "delete-group",
    method: "POST",
    bin: deleteGroup,
  },
  {
    path: "get-one-group",
    method: "GET",
    bin: getOneGroup,
  },
];
