import { IFormDiscussion } from "./type_discussion";

export const funGetAllDiscussion = async (path?: string) => {
   const response = await fetch(`/api/discussion${(path) ? path : ''}`, { next: { tags: ['discussion'] } });
   return await response.json().catch(() => null);
}

export const funCreateDiscussion = async (data: IFormDiscussion) => {
   if (data.desc == "")
      return { success: false, message: 'Diskusi tidak boleh kosong' }

   const response = await fetch("/api/discussion", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
}


export const funGetDiscussionById = async (path: string) => {
   const response = await fetch(`/api/discussion/${path}`);
   return await response.json().catch(() => null);
}