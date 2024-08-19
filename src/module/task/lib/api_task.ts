import { IFormAddDetailTask, IFormAddMemberTask, IFormDateTask, IFormTaskDivision } from "./type_task";

export const funGetAllTask = async (path?: string) => {
   const response = await fetch(`/api/task${(path) ? path : ''}`, { next: { tags: ['task'] } });
   return await response.json().catch(() => null);
}


export const funCreateTask = async (data: IFormTaskDivision) => {
   if (data.title.length < 3)
      return { success: false, message: 'Nama proyek minimal 3 karakter' }

   const response = await fetch("/api/task", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};

export const funGetTaskDivisionById = async (path: string, kategori: string) => {
   const response = await fetch(`/api/task/${path}?cat=${kategori}`);
   return await response.json().catch(() => null);
}


export const funDeleteDetailTask = async (path: string) => {
   const response = await fetch(`/api/task/detail/${path}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      },
   });
   return await response.json().catch(() => null);
};


export const funUpdateStatusDetailTask = async (path: string, data: { status: number }) => {
   const response = await fetch(`/api/task/detail/${path}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};


export const funGetDetailTask = async (path: string) => {
   const response = await fetch(`/api/task/detail/${path}`);
   return await response.json().catch(() => null);
}


export const funEditDetailTask = async (path: string, data: IFormDateTask) => {
   const response = await fetch(`/api/task/detail/${path}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};


export const funCreateDetailTask = async (path: string, data: IFormAddDetailTask) => {
   const response = await fetch(`/api/task/${path}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};

export const funAddMemberTask = async (path: string, data: IFormAddMemberTask) => {
   const response = await fetch(`/api/task/${path}/member`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};