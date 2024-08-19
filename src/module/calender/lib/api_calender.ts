import { IEditCalender, IFormCreateCalender } from "./type_calender";

export const funGetAllCalender = async (path?: string) => {
    const response = await fetch(`/api/calender${(path) ? path : ''}`, { next: { tags: ['calender'] } });
    return await response.json().catch(() => null);
}
export const funGetHostory = async (path?: string) => {
    const response = await fetch(`/api/calender/history${(path) ? path : ''}`, { next: { tags: ['hostory'] } });
    return await response.json().catch(() => null);
}

export const funGetOneCalender = async (path: string) => {
    const response = await fetch(`/api/calender/${path}`);
    return await response.json().catch(() => null);
}

export const funCreateCalender = async (data: IFormCreateCalender) => {
    const response = await fetch("/api/calender", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}

export const funDeleteCalenderById = async (path: string) => {
    const response = await fetch(`/api/calender/${path}`, {
        method: "DELETE",
    });
    return await response.json().catch(() => null);
}

export const funEditCalenderById = async (path: string, data: IEditCalender) => {
    const response = await fetch(`/api/calender/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}