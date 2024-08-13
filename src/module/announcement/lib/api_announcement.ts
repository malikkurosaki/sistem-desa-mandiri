import { ICreateData } from "./type_announcement";

export const funGetAllAnnouncement = async (path?: string) => {
    const response = await fetch(`/api/announcement${(path) ? path : ''}`, { next: { tags: ['announcement'] } });
    return await response.json().catch(() => null);
} 

export const funGetAnnouncementById = async (path: string) => {
    const response = await fetch(`/api/announcement/${path}`);
    return await response.json().catch(() => null);
}

export const funCreateAnnouncement = async (data: ICreateData) => {
    const response = await fetch("/api/announcement", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}