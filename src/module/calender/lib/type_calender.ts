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

export interface IFormCreateCalender {
    idDivision: string
    title: string
    dateStart: String
    timeStart: string
    timeEnd: string
    linkMeet: string
    repeatEventTyper: string
    desc: string,
    member: IFormMemberCalender[]
}

export interface IFormMemberCalender {
    idCalender: string
    idUser: {
        id: string
        name: string
    }[]
}

export interface IFormUlangiEvent {
    id: string
}