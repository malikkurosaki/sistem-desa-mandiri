import { hookstate } from "@hookstate/core";
import { IFormMemberProject } from "./type_project";

export const globalRefreshProject = hookstate<boolean>(false)
export const globalMemberProject = hookstate<IFormMemberProject[]>([]);

export const valStatusDetailProject = [
    {
       name: "Belum Dikerjakan",
       value: 0
    },
    {
       name: "Selesai",
       value: 1
    }
 ]