import { IEditDataProfile } from "./type_profile";

export const funGetProfileByCookies = async (path?: string) => {
    const response = await fetch(`/api/user/profile${(path) ? path : ''}`, { next: { tags: ['profile'] } });
    return await response.json().catch(() => null);
}

export const funEditProfileByCookies = async (data: FormData) => {
    const response = await fetch(`/api/user/profile/`, {
        method: "PUT",
        body: data,
    });
    return await response.json().catch(() => null);
}
