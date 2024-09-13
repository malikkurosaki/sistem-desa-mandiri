export interface IListDataAnnouncement {
   id: string,
   title: string,
   desc: string,
   createdAt: string
}

export interface IRootAllAnnouncement {
   data: IAnnouncement
   member: IAllAnnouncementMember
}

export interface IAnnouncement {
   id: string
   title: string
   desc: string
}

export interface IAllAnnouncementMember {
   group: {
      idGroup: string
      idDivision: string
      group: string
      division: string
   }[]
}

export interface GroupData {
   id: string;
   name: string;
   Division: {
      id: string;
      name: string;
   }[];
}

export interface GroupDataEditAnnouncement {
   id: string;
   name: string;
   Division: {
      idGroup: string;
      idDivision: string;
      group: string;
      division: string;
   }[];
}

export interface ICreateData {
   title: string
   desc: string
}

export interface IFormCreateAnnouncement {
   title: string
   desc: string
   groups: GroupData[]
}

export interface IGroupData {
   idAnnouncement: string
   idGroup: string
   idDivision: string
   isActive: boolean
}
