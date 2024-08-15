export interface IDataTask {
   id: string
   title: string
   desc: string,
   status: number,
   progress: number,
   member: number
}

export interface IFormMemberTask {
   idUser: string,
   name: string
}


export interface IFormDateTask {
   dateStart: Date,
   dateEnd: Date,
   title: string
}