import { IFormTheme } from "./type_theme";

export const funGetAllTheme = async (path?: string) => {
   const response = await fetch(`/api/theme${(path) ? path : ''}`, { next: { tags: ['theme'] } });
   return await response.json().catch(() => null);
};

export const funGetThemeById = async (path: string) => {
   const response = await fetch(`/api/theme/${path}`);
   return await response.json().catch(() => null);
};

export const funCreateTheme = async (data: IFormTheme) => {
   const response = await fetch("/api/theme", {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};


export const funDeleteTheme = async (path: string) => {
   const response = await fetch(`/api/theme/${path}`, {
      method: "DELETE",
      headers: {
         "Content-Type": "application/json",
      }
   });
   return await response.json().catch(() => null);
};

export const funEditTheme = async (path: string, data: IFormTheme) => {
   const response = await fetch(`/api/theme/${path}`, {
      method: "PUT",
      headers: {
         "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
};

export const funChangeTheme = async (path: string) => {
   const response = await fetch(`/api/theme/${path}`, {
      method: "POST",
      headers: {
         "Content-Type": "application/json",
      }
   });
   return await response.json().catch(() => null);
};