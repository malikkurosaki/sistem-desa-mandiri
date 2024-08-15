export const funGetAllTask = async (path?: string) => {
   const response = await fetch(`/api/task${(path) ? path : ''}`, { next: { tags: ['task'] } });
   return await response.json().catch(() => null);
}