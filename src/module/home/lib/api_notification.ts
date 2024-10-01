export const funGetAllNotification = async (path?: string) => {
   const response = await fetch(`/api/home/notification${(path) ? path : ''}`, { next: { tags: ['notification'] } });
   return await response.json().catch(() => null);
}


export const funReadNotification = async (data: { id: string }) => {
   const response = await fetch(`/api/home/notification`, {
      method: "PUT",
      body: JSON.stringify(data),
   });
   return await response.json().catch(() => null);
}