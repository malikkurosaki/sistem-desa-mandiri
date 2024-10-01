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

export interface IFormAddDetailTask {
   dateStart: Date,
   dateEnd: Date,
   title: string
   idDivision: string
}


export interface IFormAddMemberTask {
   idDivision: string
   member: IFormMemberTask[] | []
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
   idUser: string
   name: string
   email: string
   img: string
   position: string
}

export interface IDataFileTaskDivision {
   id: string
   name: string
   extension: string,
   nameInStorage: string,
   idStorage: string
}