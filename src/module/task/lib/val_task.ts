import { hookstate } from "@hookstate/core";
import { IFormMemberTask } from "./type_task";

export const globalMemberTask = hookstate<IFormMemberTask[]>([]);