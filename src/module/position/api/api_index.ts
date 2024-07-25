import { getAllPosition } from "./get/getAllPosition";
import { getOnePosition } from "./get/getOnePosition";
import { createlPosition } from "./post/createPosition";
import { deletePosition } from "./post/deletePosition";
import { updatePosition } from "./post/updatePosition";

export const API_INDEX_POSITION = [
    {
      path: "get-all-position",
      method: "GET",
      bin: getAllPosition,
    },
    {
      path: "create-position",
      method: "POST",
      bin: createlPosition,
    },
    {
      path: "update-position",
      method: "POST",
      bin: updatePosition,
    },
    {
      path: "delete-position",
      method: "POST",
      bin: deletePosition,
    },
    {
      path: "get-one-position",
      method: "GET",
      bin: getOnePosition,
    },
  ];
  