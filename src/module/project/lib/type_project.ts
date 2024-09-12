export interface IDataProject {
  id: string
  title: string
  desc: string
  status: number
  member: number
}

export interface IDataListTaskProject {
  id: string
  title: string
  desc: string
  status: number
  dateStart: string
  dateEnd: string
}

export interface IDataFileProject {
  id: string
  name: string
  extension: string
  idStorage:string
}

export interface IDataMemberProject {
  id: string
  idUser: string
  name: string
  email: string
  img: string
  position: string
}

export interface IFormProject {
  title: string,
  idGroup: string,
  task: IFormDateProject[] | [],
  member: IFormMemberProject[] | [],
  file: FormData[] | []
}

export interface IFormDateProject {
  dateStart: Date,
  dateEnd: Date,
  title: string,
}

export interface IFormMemberProject {
  idUser: string,
  name: string,
  img: string
}


export interface IFormAddDetailproject {
  dateStart: Date,
  dateEnd: Date,
  name: string
}


export interface IFormAddMemberProject {
  member: IFormMemberProject[] | []
}

export interface IDataMemberProjectDetail {
  id: string,
  idUser: string,
  isLeader: string,
  name: string,
  img: string
}

export interface IListFileTaskProject {
  name: string,
  extension: string
}