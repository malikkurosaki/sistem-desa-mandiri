export const funGetAllCalender = async (path?: string) => {
    const response = await fetch(`/api/calender${(path) ? path : ''}`, { next: { tags: ['calender'] } });
    return await response.json().catch(() => null);
}


export const funGetOneCalender = async (path: string) => {
    const response = await fetch(`/api/calender/${path}`);
    return await response.json().catch(() => null);
}