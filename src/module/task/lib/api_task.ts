import { IFormTaskDivision } from "./type_task";

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