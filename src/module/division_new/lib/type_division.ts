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
   title: string,
   dateStart: string,
   dateEnd: string
}

export interface IDataKalenderOnDetailDivision {
   id: string,
   name: string,
   extension: string,
}

export interface IDataDiscussionOnDetailDivision {
   id: string,
   title: string,
   date: string,
   user: string
}

export interface IDataMemberDivision {
   id: string,
   idUser: string,
   isAdmin: string,
   isLeader: string,
   name: string
}