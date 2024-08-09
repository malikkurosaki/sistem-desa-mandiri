import { IDataPosition, IFormPosition, IStatusPosition } from "./type_position";

export const funGetAllPosition = async (path?: string) => {
    const response = await fetch(`/api/position${(path) ? path : ''}`, { next: { tags: ['position'] } });
    return await response.json().catch(() => null);
}


export const funGetOnePosition = async (path: string) => {
    const response = await fetch(`/api/position/${path}`);
    return await response.json().catch(() => null);
}

export const funCreatePosition = async (data: IFormPosition) => {
    if (data.name.length < 3)
        return { success: false, message: 'Minimal 3 karakter' }

    const response = await fetch("/api/position", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}


export const funEditStatusPosition = async (path: string, data: IStatusPosition) => {

    const response = await fetch(`/api/position/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}


export const funEditPosition = async (path: string, data: IFormPosition) => {
    if (data.name.length < 3)
        return { success: false, message: 'Minimal 3 karakter' }

    const response = await fetch(`/api/position/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}