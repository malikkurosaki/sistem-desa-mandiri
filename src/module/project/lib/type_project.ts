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