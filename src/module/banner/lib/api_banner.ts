export const funGetAllBanner = async (path?: string) => {
    const response = await fetch(`/api/banner${(path) ? path : ''}`, { next: { tags: ['banner'] } });
    return await response.json().catch(() => null);
}

export const funDeleteBanner = async (path: string) => {
    const response = await fetch(`/api/banner/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json().catch(() => null);
};

export const funCreateBanner = async (data: FormData) => {
    const response = await fetch(`/api/banner`, {
        method: "POST",
        body: data,
    });
    return await response.json().catch(() => null);
}

export const funGetOneBanner = async (path: string, p0: string) => {
    const response = await fetch(`/api/banner/${path}`)
    return await response.json().catch(() => null);
}

export const funEditBanner = async (path: string, data: FormData) => {
    const response = await fetch(`/api/banner/${path}`, {
        method: "PUT",
        body: data,
    });
    return await response.json().catch(() => null);
}

