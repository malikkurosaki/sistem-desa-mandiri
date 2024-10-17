import { hookstate } from "@hookstate/core";
import { IFormMemberCalender, IFormUlangiEvent } from "./type_calender";


export const globalCalender = hookstate<IFormMemberCalender[]>([])
export const globalUlangiEvent = hookstate<IFormUlangiEvent | string>('')