import { IEditDataMember, IFormMember, IStatusmember } from "./type_member";

export const funGetAllmember = async (path?: string) => {
    const response = await fetch(`/api/member${(path) ? path : ''}`, { next: { tags: ['member'] } });
    return await response.json().catch(() => null);
}


export const funGetOneMember = async (path: string) => {
    const response = await fetch(`/api/member/${path}`);
    return await response.json().catch(() => null);
}

export const funCreateMember = async (data: IFormMember) => {

    if (data.name.length < 3)
        return { success: false, message: 'Minimal 3 karakter' }
    if (data.email.length < 3)
        return { success: false, message: 'Minimal 3 karakter' }

    if (data.phone.length < 10)
        return { success: false, message: 'Minimal 10 karakter' }

    if (data.nik.length == 16)
        return { success: false, message: 'NIK harus 16 karakter' }

    const response = await fetch("/api/member", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}


export const funEditStatusMember = async (path: string, data: IStatusmember) => {

    const response = await fetch(`/api/member/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}


export const funEditMember = async (path: string, data: IEditDataMember) => {

    if (data.name.length < 3)
        return { success: false, message: 'Minimal 3 karakter' }

    const response = await fetch(`/api/member/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}
