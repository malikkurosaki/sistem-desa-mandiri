import { getAllVillage } from "./get/getAllVillage";
import { getOneVillage } from "./get/getOneVillage";
import { createVillage } from "./post/createVillage";
import { deleteVillage } from "./post/deleteVillage";
import { updateVillage } from "./post/updateVillage";

export const API_INDEX_VILLAGE = [
    {
      path: "get-all-village",
      method: "GET",
      bin: getAllVillage,
    },
    {
      path: "create-village",
      method: "POST",
      bin: createVillage,
    },
    {
      path: "update-village",
      method: "POST",
      bin: updateVillage,
    },
    {
      path: "delete-village",
      method: "POST",
      bin: deleteVillage,
    },
    {
      path: "get-one-village",
      method: "GET",
      bin: getOneVillage,
    },
  ];
  