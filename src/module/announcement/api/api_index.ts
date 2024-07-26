import { getAllAnnouncement } from "./get/getAllAnnouncement";
import { getOneAnnouncement } from "./get/getOneAnnouncement";
import { createAnnouncement } from "./post/createAnnouncement";
import { deleteAnnouncement } from "./post/deleteAnnouncement";
import { updateAnnouncement } from "./post/updateAnnouncement";

export const API_INDEX_ANNOUNCEMENT = [
    {
      path: "get-all-announcement",
      method: "GET",
      bin: getAllAnnouncement,
    },
    {
      path: "get-one-announcement",
      method: "GET",
      bin: getOneAnnouncement,
    },
    {
      path: "create-announcement",
      method: "POST",
      bin: createAnnouncement,
    },
    {
      path: "update-announcement",
      method: "POST",
      bin: updateAnnouncement,
    },
    {
      path: "delete-announcement",
      method: "POST",
      bin: deleteAnnouncement,
    },
  ];
  