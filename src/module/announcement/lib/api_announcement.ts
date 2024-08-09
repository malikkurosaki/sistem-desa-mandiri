export const funGetAllAnnouncement = async (path?: string) => {
    const response = await fetch(`/api/announcement${(path) ? path : ''}`, { next: { tags: ['announcement'] } });
    return await response.json().catch(() => null);
} 

export const funGetAnnouncementById = async (path: string) => {
    const response = await fetch(`/api/announcement/${path}`);
    return await response.json().catch(() => null);
}