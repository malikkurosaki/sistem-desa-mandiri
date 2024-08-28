export const funGetHome = async (path?: string) => {
   const response = await fetch(`/api/home${(path) ? path : ''}`, { next: { tags: ['discussion'] } });
   return await response.json().catch(() => null);
}