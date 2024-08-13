export interface IDataDiscussion {
   id: string
   title: string
   desc: string
   status: boolean
   createdAt: string
   user_name: string
   total_komentar: number
}

export interface IFormDiscussion {
   desc: string,
   idDivision: string
}