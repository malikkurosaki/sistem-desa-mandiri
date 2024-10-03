export const funDeleteBanner = async (path: string) => {
    const response = await fetch(`/api/banner/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json().catch(() => null);
};