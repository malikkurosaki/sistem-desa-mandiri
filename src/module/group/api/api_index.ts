import { getOneGroup } from "./get/getOneGroup";
import { listGroups } from "./get/listGroup";

export const API_INDEX_GROUP = [
  {
    path: "get-all-group",
    method: "GET",
    bin: listGroups,
  },
  {
    path: "get-one-group",
    method: "GET",
    bin: getOneGroup,
  },
];
