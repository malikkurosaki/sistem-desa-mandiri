import getAllDivision from "./get/getAllDivision";
import getOneDivision from "./get/getOneDivision";
import getOneDetailDivision from "./get/getOneDetailDivision";
import createDivision from "./post/createDivision";
import deleteDivision from "./post/deleteDivision";
import updateDivision from "./post/updateDivision";

export const API_INDEX_DIVISION = [
  {
    path: "create-division",
    method: "POST",
    bin: createDivision,
  },
  {
    path: "update-division",
    method: "POST",
    bin: updateDivision,
  },
  {
    path: "delete-division",
    method: "POST",
    bin: deleteDivision,
  },
  {
    path: "get-all-division",
    method: "GET",
    bin: getAllDivision,
  },
  {
    path: "get-one-division",
    method: "GET",
    bin: getOneDivision,
  },
  {
    path: "get-one-detail-division",
    method: "GET",
    bin: getOneDetailDivision,
  },
];
