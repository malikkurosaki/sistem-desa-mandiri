export interface IDataDocument {
   id: string;
   name: string;
   extension: string;
   category: string;
   path: string;
   createdBy: string;
   createdAt: string;
   updatedAt: string;
}


export interface IFormFolder {
   name: string;
   path: string;
   idDivision: string
}


export interface IFormEditItem {
   id: string
   name: string
   path: string
   idDivision: string
   extension: string
}

export interface IFormDetailMoreItem {
   id: string
   name: string
}

export interface IFormMoreItem {
   path: string,
   dataItem: IFormDetailMoreItem[]
}