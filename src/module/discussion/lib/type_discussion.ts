export interface IDataDiscussion {
   id: string
   title: string
   desc: string
   img: string
   status: number
   createdAt: string
   user_name: string
   total_komentar: number
}

export interface IFormDiscussion {
   desc: string,
   idDivision: string
}

export interface IStatusDiscussion {
   status: number
}


export interface IDetailDiscussion {
   id: string
   title: any
   desc: string
   status: number
   createdAt: string
   DivisionDisscussionComment: IAllComents[]
   username: string
   user_img: string
   totalComments: number
   createdBy: string
}

export interface IAllComents {
   id: string
   comment: string
   createdAt: string
   User: User
   img: string
   username: string
}

export interface User {
   name: string
}

export interface IDeleteDicussion {
   id: string
}

export interface IEditDiscussion {
   desc: string
}

export interface ICreateComent {
   comment: string
   idDiscussion: string
}