import { hookstate } from "@hookstate/core";
import { IFormMemberDivision } from "./type_division";

export const globalMemberDivision = hookstate<IFormMemberDivision[]>([]);