export interface IDataDocument {
   idStorage: string;
   id: string;
   name: string;
   extension: string;
   category: string;
   path: string;
   share: boolean;
   createdBy: string;
   createdAt: string;
   updatedAt: string;
}


export interface IFormFolder {
   name: string;
   path: string;
   idDivision: string
}

export interface IJalurItem {
   id: string
   name: string
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

export interface IFormMoreCopyItem {
   idDivision: string,
   path: string,
   dataItem: IDataDocument[]
}


export interface IShareDivision {
   id: string
   name: string
}

export interface IShareDocument {
   dataDivision: IShareDivision[],
   dataItem: IShareDivision[]
}