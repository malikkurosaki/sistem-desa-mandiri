import { IEditDataProfile } from "./type_profile";

export const funGetProfileByCookies = async (path?: string) => {
    const response = await fetch(`/api/user/profile${(path) ? path : ''}`, { next: { tags: ['profile'] } });
    return await response.json().catch(() => null);
}

export const funEditProfileByCookies = async ( data: IEditDataProfile) => {
    const response = await fetch(`/api/user/profile/`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}
