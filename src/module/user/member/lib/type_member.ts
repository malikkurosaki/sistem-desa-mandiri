export interface IListMember {
    id: string,
    name: string,
    nik: string,
    email: string,
    phone: string,
    gender: string,
    position: string,
    group: string,
    isActive: boolean
}

export interface IFormMember  {
    nik: string;
    name: string;
    phone: string;
    email: string;
    gender: string;
    idGroup: string;
    idPosition: string;
    idUserRole: string;
}

export interface IStatusmember {
    isActive: boolean;
 }

// EDIT MEMBER
export interface IEditDataMember  {
    id: string;
    nik: string;
    name: string;
    phone: string;
    email: string;
    gender: string;
    idGroup: string;
    idPosition: string;
    idUserRole: string;
 }
 
 export interface IDataPositionMember {
    id: string;
    name: string;
 };
 
 export interface IDataROleMember  {
    id: string;
    name: string;
 }

export interface IMember{
   id: string
}