import { hookstate } from "@hookstate/core";
import { IFormMemberCalender } from "./type_calender";


export const globalCalender = hookstate<IFormMemberCalender[]>([])