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