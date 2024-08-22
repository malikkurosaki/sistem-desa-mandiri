export interface IDataProject {
  id: string
  name: string
  desc: string
  status: number
  member: number
}

export interface IDataListTaskProject {
  id: string
  name: string
  desc: string
  status: number
  dateStart: string
  dateEnd: string
}

export interface IDataFileProject {
  id: string
  name: string
  extension: string
}

export interface IDataMemberProject {
  id: string
  idUser: string
  name: string
  email: string
}

export interface IFormProject {
  idDivision: string,
  name: string,
  task: IFormDateProject[] | [],
  member: IFormMemberProject[] | [],
  file: FormData[] | []
}

export interface IFormDateProject {
  dateStart: Date,
  dateEnd: Date,
  name: string,
}

export interface IFormMemberProject {
  idUser: string,
  name: string
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
  name: string
}