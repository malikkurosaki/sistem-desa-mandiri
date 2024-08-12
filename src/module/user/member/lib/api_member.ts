import { IEditDataMember, IFormMember, IStatusmember } from "./type_member";

export const funGetAllmember = async (path?: string) => {
    const response = await fetch(`/api/user${(path) ? path : ''}`, { next: { tags: ['member'] } });
    return await response.json().catch(() => null);
}

export const funGetRoleUser= async (path?: string) => {
    const response = await fetch(`/api/role-user${(path) ? path : ''}`, { next: { tags: ['member'] } });
    return await response.json().catch(() => null);
}

export const funGetOneMember = async (path: string) => {
    const response = await fetch(`/api/user/${path}`);
    return await response.json().catch(() => null);
}

export const funCreateMember = async (data: IFormMember) => {

    if (data.name.length < 3)
        return { success: false, message: 'Name minimal 3 karakter' }
    if (data.email.length < 3)
        return { success: false, message: 'Email minimal 3 karakter' }

    if (data.phone.length < 10)
        return { success: false, message: 'Phone minimal 10 karakter' }

    if (data.nik.length < 16)
        return { success: false, message: 'NIK harus 16 karakter' }

    const response = await fetch("/api/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}


export const funEditStatusMember = async (path: string, data: IStatusmember) => {

    const response = await fetch(`/api/user/${path}`, {
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

    const response = await fetch(`/api/user/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}
