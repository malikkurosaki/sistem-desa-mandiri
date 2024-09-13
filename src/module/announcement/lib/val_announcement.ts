import { hookstate } from "@hookstate/core";
import { GroupData, GroupDataEditAnnouncement } from "./type_announcement";


export const globalMemberAnnouncement = hookstate<GroupData[]>([])
export const globalMemberEditAnnouncement = hookstate<GroupData[]>([])