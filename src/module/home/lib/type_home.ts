export interface IDataHomeKegiatan {
   id: string
   title: string
   desc: string
   status: string
   progress: number
   createdAt: string
}

export interface IDataHomeDivision {
   id: string
   name: string
   jumlah: number
}

export interface IDataHomeEvent {
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

export interface IDataHomeDiskusi {
   id: string
   idDivision: string
   desc: string
   title: string
   date: string
   user: string
}