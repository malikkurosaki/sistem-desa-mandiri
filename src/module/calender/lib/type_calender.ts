export interface IDataCalender {
    id: string
    idCalendar: string
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

export interface IHistoryCalender {
    dateStart: string;
    data: {
        id: number;
        title: string;
        timeEnd: string;
        timeStart: string;
    }[];
}[];

export interface IDataDetailByIdCalender {
    id: string
    idCalendar: string
    title: string
    desc: string
    timeStart: string
    dateStart: string
    timeEnd: string
    createdAt: string
    linkMeet: string
    repeatEventTyper: string
    repeatValue: string
}
export interface IDataDetailByIdMember {
    id: string
    idUser: string
    name: string
    email: string
    img: string
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
    repeatValue: string,
    member: IFormMemberCalender[]
}

export interface IFormMemberCalender {
    idCalender: string
    idUser: {
        id: string
        name: string
        img: string
    }[]
}

export interface IFormUlangiEvent {
    id: string
}

export interface IEditCalender {
    title?: string
    dateStart?: String
    timeStart?: string
    timeEnd?: string
    linkMeet?: string
    repeatEventTyper?: string
    desc?: string,
    repeatValue?: string
    // member?: IFormMemberCalender[]
}

export interface IEditMemberCalender {
    idUser: {
        id: string
        name: string
    }[]
}


export interface IDetailByIdCalender {
    title?: string
    desc?: string
    timeStart?: string
    dateStart?: string
    timeEnd?: string
    createdAt?: string
    linkMeet?: string
    repeatEventTyper?: string
    repeatValue?: string
}

export interface IFormMemberCalenderNew {
    idUser: string
    name: string
}