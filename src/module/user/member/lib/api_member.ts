import { IEditDataMember, IFormMember, IStatusmember } from "./type_member";

export const funGetAllmember = async (path?: string) => {
    const response = await fetch(`/api/user${(path) ? path : ''}`, { next: { tags: ['member'] } });
    return await response.json().catch(() => null);
}

export const funGetRoleUser = async (path?: string) => {
    const response = await fetch(`/api/role-user${(path) ? path : ''}`, { next: { tags: ['member'] } });
    return await response.json().catch(() => null);
}

export const funGetOneMember = async (path: string) => {
    const response = await fetch(`/api/user/${path}`);
    return await response.json().catch(() => null);
}

export const funCreateMember = async (data: FormData) => {
    const response = await fetch("/api/user", {
        method: "POST",
        body: data,
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


export const funEditMember = async (path: string, data: FormData) => {
    const response = await fetch(`/api/user/${path}`, {
        method: "PUT",
        body: data,
    });
    return await response.json().catch(() => null);
}
