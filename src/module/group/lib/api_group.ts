import { IFormGroup, IStatusGroup } from "./type_group";

export const funGetAllGroup = async (path?: string) => {
   const response = await fetch(`/api/group${(path) ? path : ''}`, { next: { tags: ['group'] } });
   return await response.json().catch(() => null);
};

export const funGetGroupById = async (path: string) => {
   const response = await fetch(`/api/group/${path}`);
   return await response.json().catch(() => null);
};

export const funCreateGroup = async (data: IFormGroup) => {
   if (data.name.length < 3)
      return { success: false, message: 'Minimal 3 karakter' }

   const response = await fetch("/api/group", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};

export const funEditStatusGroup = async (path: string, data: IStatusGroup) => {
   const response = await fetch(`/api/group/${path}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};

export const funEditGroup = async (path: string, data: IFormGroup) => {
   if (data.name.length < 3)
      return { success: false, message: 'Minimal 3 karakter' }

   const response = await fetch(`/api/group/${path}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};

