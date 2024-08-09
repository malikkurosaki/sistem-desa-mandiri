export interface IListDataAnnouncement {
    id: string,
    title: string,
    desc: string,
    createdAt: string
}

export interface IRootAllAnnouncement {
    announcement: IAnnouncement
    allAnnouncementMember: IAllAnnouncementMember[]
 }
 
 export interface IAnnouncement {
    id: string
    title: string
    desc: string
 }
 
 export interface IAllAnnouncementMember {
    idAnnouncement: string
    idGroup: string
    idDivision: string
    group: string
 }