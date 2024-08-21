import { IFormFolder } from "./type_document";

export const funGetAllDocument = async (path?: string) => {
   const response = await fetch(`/api/document${(path) ? path : ''}`, { next: { tags: ['document'] } });
   return await response.json().catch(() => null);
};


export const funCreateFolder = async (data: IFormFolder) => {
   if (data.name == "")
      return { success: false, message: 'Nama folder tidak boleh kosong' }

   const response = await fetch("/api/document", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};