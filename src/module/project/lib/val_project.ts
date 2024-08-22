import { hookstate } from "@hookstate/core";

export const globalRefreshProject = hookstate<boolean>(false)

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