
import { getAllUser } from "./get/getAllUser";
import { getOneUser } from "./get/getOneUser";
import { updateUser } from "./post/updateUser";
import { deleteUser } from "./post/deleteUser";
import { createUser } from "./post/createUser";

export const API_INDEX_USER = [
    {
      path: "get-all-users",
      method: "GET",
      bin: getAllUser,
    },
    {
      path: "get-one-users",
      method: "GET",
      bin: getOneUser,
    },
    {
      path: "create-users",
      method: "POST",
      bin: createUser,
    },
    {
      path: "update-users",
      method: "POST",
      bin: updateUser,
    },
    {
      path: "delete-users",
      method: "POST",
      bin: deleteUser,
    },
  ];