export interface IDataCalender {
    id: string
    title: string
    desc: string
    status: number
    timeStart: string
    timeEnd: string
    dateStart: string
    dateEnd: string
    createdAt: string
    user_name: string
}

export interface IDataDetailByIdCalender {
    id: string
    title: string
    desc: string
    timeStart: string
    dateStart: string
    timeEnd: string
    createdAt: string
    linkMeet: string
    repeatEventTyper: string
}
export interface IDataDetailByIdMember {
    id: string
    idUser: string
    name: string
    email: string
}