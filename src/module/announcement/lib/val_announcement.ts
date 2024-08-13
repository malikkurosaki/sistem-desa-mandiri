import { hookstate } from "@hookstate/core";
import { GroupData } from "./type_announcement";


export const globalMemberAnnouncement = hookstate<GroupData[]>([])