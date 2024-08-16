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


export interface IFormTaskDivision {
   idDivision: string
   title: string
   task: IFormDateTask[] | []
   member: IFormMemberTask[] | []
   file: FormData[] | []
}

export interface IListFileTask {
   name: string,
   extension: string
}


export interface IDataListTaskDivision {
   id: string
   title: string
   dateStart: string
   dateEnd: string
   status: number
}

export interface IDataMemberTaskDivision {
   id: string
   name: string
   email: string
}

export interface IDataFileTaskDivision {
   id: string
   name: string
   extension: string
}