

export const funGetAllProject = async (path?: string) => {
    const response = await fetch(`/api/project${(path) ? path : ''}`, { next: { tags: ['project'] } });
    return await response.json().catch(() => null);
}

export const funGetOneProjectById = async (path: string, kategori: string) => {
    const response = await fetch(`/api/project/${path}?cat=${kategori}`);
    return await response.json().catch(() => null);
}