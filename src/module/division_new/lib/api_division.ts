import { IFormDivision, IFormFixDivision, IFormMemberDivision } from "./type_division";

export const funGetAllDivision = async (path?: string) => {
   const response = await fetch(`/api/division${(path) ? path : ''}`, { next: { tags: ['division'] } });
   return await response.json().catch(() => null);
}

export const funGetDivisionById = async (path: string) => {
   const response = await fetch(`/api/division/${path}`);
   return await response.json().catch(() => null);
}

export const funGetDetailDivisionById = async (path: string, kategori: string) => {
   const response = await fetch(`/api/division/${path}/detail?cat=${kategori}`);
   return await response.json().catch(() => null);
}

export const funCreateDivision = async (data: IFormFixDivision) => {
   const response = await fetch("/api/division", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
}

export const funEditDivision = async (path: string, data: IFormDivision) => {
   const response = await fetch(`/api/division/${path}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
}

export const funDeleteMemberDivision = async (path: string, data: { id: string }) => {
   const response = await fetch(`/api/division/${path}/detail`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
}


export const funEditStatusAdminDivision = async (path: string, data: { id: string, isAdmin: boolean }) => {
   const response = await fetch(`/api/division/${path}/detail`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};


export const funAddDivisionMember = async (path: string, data: IFormMemberDivision) => {
   const response = await fetch(`/api/division/${path}/detail`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
}