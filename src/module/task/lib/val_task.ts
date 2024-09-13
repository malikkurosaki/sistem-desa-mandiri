import { hookstate } from "@hookstate/core";
import { IFormMemberTask } from "./type_task";

export const globalMemberTask = hookstate<IFormMemberTask[]>([]);
export const globalRefreshTask = hookstate<boolean>(false);

export const valStatusDetailTask = [
   {
      name: "Belum Dikerjakan",
      value: 0
   },
   {
      name: "Selesai",
      value: 1
   }
]