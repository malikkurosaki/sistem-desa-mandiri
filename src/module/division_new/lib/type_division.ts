export interface IFormDivision {
   name: string
   idGroup: string
   desc: string
}

export interface IFormMemberDivision {
   idUser: string,
   name: string
}

export interface IFormFixDivision {
   data: IFormDivision,
   member: IFormMemberDivision[],
   admin: string[]
}

export interface IDataDivison {
   id: string,
   name: string,
   desc: string,
   jumlah_member: number
}

export interface IDataJumlahDetailDivision {
   tugas: number,
   dokumen: number,
   diskusi: number,
   kalender: number
}

export interface IDataTaskOnDetailDivision {
   id: string,
   idProject: string,
   title: string,
   dateStart: string,
   dateEnd: string,
   projectTitle: string
}

export interface IDataKalenderOnDetailDivision {
   id: string,
   name: string,
   extension: string,
   path: string
}

export interface IDataDiscussionOnDetailDivision {
   id: string,
   desc: string,
   title: string,
   date: string,
   user: string
}

export interface IDataMemberDivision {
   id: string,
   idUser: string,
   isAdmin: string,
   isLeader: string,
   name: string,
   img: string
}

export interface IDataReportDivision {
   id: string
   idDivision: string
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