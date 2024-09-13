import { ICreateData, IFormCreateAnnouncement } from "./type_announcement";

export const funGetAllAnnouncement = async (path?: string) => {
    const response = await fetch(`/api/announcement${(path) ? path : ''}`, { next: { tags: ['announcement'] } });
    return await response.json().catch(() => null);
}

export const funGetAnnouncementById = async (path: string) => {
    const response = await fetch(`/api/announcement/${path}`);
    return await response.json().catch(() => null);
}

export const funCreateAnnouncement = async (data: IFormCreateAnnouncement) => {
    if (data.title == "" || data.desc == "")
        return { success: false, message: 'Silahkan lengkapi form tambah pengumuman' }

    if (data.groups.length == 0)
        return { success: false, message: 'Silahkan pilih divisi penerima pengumuman' }

    const response = await fetch("/api/announcement", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}

export const funDeleteAnnouncement = async (path: string) => {
    const response = await fetch(`/api/announcement/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json().catch(() => null);
};

export const funEditAnnouncement = async (path: string, data: IFormCreateAnnouncement) => {
    if (data.title == "" || data.desc == "")
        return { success: false, message: 'Silahkan lengkapi form edit pengumuman' }

    if (data.groups.length == 0)
        return { success: false, message: 'Silahkan pilih divisi penerima pengumuman' }

    const response = await fetch(`/api/announcement/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}