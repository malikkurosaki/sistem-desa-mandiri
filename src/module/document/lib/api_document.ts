import { IFormEditItem, IFormFolder, IFormMoreCopyItem, IFormMoreItem } from "./type_document";

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

export const funRenameDocument = async (data: IFormEditItem) => {
   if (data.name == "")
      return { success: false, message: 'Nama item tidak boleh kosong' }

   const response = await fetch("/api/document", {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};

export const funDeleteDocument = async (data: []) => {
   const response = await fetch("/api/document", {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};

export const funMoveDocument = async (data: IFormMoreItem) => {
   const response = await fetch("/api/document/more", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};

export const funCopyDocument = async (data: IFormMoreCopyItem) => {
   const response = await fetch("/api/document/more", {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};