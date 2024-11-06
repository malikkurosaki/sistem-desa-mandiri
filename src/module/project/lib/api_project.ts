import { IFormAddDetailproject, IFormAddMemberProject, IFormDateProject } from "./type_project";


export const funGetAllProject = async (path?: string) => {
    const response = await fetch(`/api/project${(path) ? path : ''}`, { next: { tags: ['project'] } });
    return await response.json().catch(() => null);
}

export const funCreateProject = async (data: FormData) => {
    const response = await fetch(`/api/project`, {
        method: "POST",
        body: data,
    });
    return await response.json().catch(() => null);
}

export const funGetOneProjectById = async (path: string, kategori: string) => {
    const response = await fetch(`/api/project/${path}?cat=${kategori}`);
    return await response.json().catch(() => null);
}

export const funGetAllMemberById = async (path?: string, id?:string) => {
    const response = await fetch(`/api/project/${id}/member/${path}`);
    return await response.json().catch(() => null);
}


export const funDeleteDetailProject = async (path: string, data: { idProject: string }) => {
    const response = await fetch(`/api/project/detail/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}


export const funUpdateStatusProject = async (path: string, data: { status: number, idProject: string }) => {
    const response = await fetch(`/api/project/detail/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}


export const funGetDetailProject = async (path: string) => {
    const response = await fetch(`/api/project/detail/${path}`);
    return await response.json().catch(() => null);
}

export const funEditDetailProject = async (path: string, data: IFormDateProject) => {
    const response = await fetch(`/api/project/detail/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}


export const funCreateDetailProject = async (path: string, data: IFormAddDetailproject) => {
    const response = await fetch(`/api/project/${path}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}

export const funAddMemberProject = async (path: string, data: IFormAddMemberProject) => {
    const response = await fetch(`/api/project/${path}/member`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}


export const funDeleteMemberProject = async (path: string, data: { idUser: string }) => {
    const response = await fetch(`/api/project/${path}/member`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}

export const funCancelProject = async (path: string, data: { reason: string }) => {
    const response = await fetch(`/api/project/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}

export const funEditProject = async (path: string, data: { name: string }) => {
    const response = await fetch(`/api/project/${path}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    return await response.json().catch(() => null);
}


export const funDeleteFileProject = async (path: string) => {
    const response = await fetch(`/api/project/file/${path}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return await response.json().catch(() => null);
};

export const funCekNamFileUploadProject = async (path: string, data: FormData) => {
    const response = await fetch(`/api/project/file/${path}`, {
        method: "PUT",
        body: data,
    });
    return await response.json().catch(() => null);
};

export const funAddFileProject = async (path: string, data: FormData) => {
    const response = await fetch(`/api/project/file/${path}`, {
        method: "POST",
        body: data,
    });
    return await response.json().catch(() => null);
};
