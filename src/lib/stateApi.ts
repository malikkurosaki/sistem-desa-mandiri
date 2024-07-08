
'use client';
import { State, hookstate, useHookstate } from '@hookstate/core';

const useState = <T>(s: State<T>) => {
    const state = useHookstate(s);
    const get = state.value;
    const set = (v: typeof state.value) => state.set(v);
    return [get, set] as const;
};

interface ParamsLoad {
    searchParams?: Record<string, string>
    token?: string
    body?: Record<string, any>
}

const funLoad = async (url: string, params?: ParamsLoad, set?: any, method?: string) => {
    const property: Record<string, any> = {}
    if(params) {
        if(params.searchParams) {
            property.searchParams = "?"+new URLSearchParams(params.searchParams).toString();
        }
    
        if(params.body) {
            property.body = JSON.stringify(params.body);
        }
    
        if(params.token) {
            property.headers.Authorization = `Bearer ${params.token}`;
        }
    }
    property.method = method;
    const res = await fetch(url, property );
    const json = await res.json().then((json) => json).catch(() => null);
    if(json && set) set(json);
    return {
        res,
        json
    };
    
}

const testDevisionListGroup = hookstate<any | undefined>(undefined);
export const ProviderTestDevisionListGroup = ({data}: {data: any}) => {
    if(data && testDevisionListGroup.value === undefined) {
        testDevisionListGroup.set(data)
    }
    return null
}
export const useTestDevisionListGroup = <T>() => {
    
    const [get, set] = useState(useHookstate(testDevisionListGroup))
    const load = (params?: ParamsLoad) => funLoad(`/api/test-devision/list-group/`,params, set, "GET")
    const value: T = get
    return [value, set, load] as const
};


const testDevisionListDivision = hookstate<any | undefined>(undefined);
export const ProviderTestDevisionListDivision = ({data}: {data: any}) => {
    if(data && testDevisionListDivision.value === undefined) {
        testDevisionListDivision.set(data)
    }
    return null
}
export const useTestDevisionListDivision = <T>() => {
    
    const [get, set] = useState(useHookstate(testDevisionListDivision))
    const load = (params?: ParamsLoad) => funLoad(`/api/test-devision/list-division/`,params, set, "GET")
    const value: T = get
    return [value, set, load] as const
};


const testDevisionListAnggota = hookstate<any | undefined>(undefined);
export const ProviderTestDevisionListAnggota = ({data}: {data: any}) => {
    if(data && testDevisionListAnggota.value === undefined) {
        testDevisionListAnggota.set(data)
    }
    return null
}
export const useTestDevisionListAnggota = <T>() => {
    
    const [get, set] = useState(useHookstate(testDevisionListAnggota))
    const load = (params?: ParamsLoad) => funLoad(`/api/test-devision/list-anggota/`,params, set, "GET")
    const value: T = get
    return [value, set, load] as const
};


const testDevisionCountDevision = hookstate<any | undefined>(undefined);
export const ProviderTestDevisionCountDevision = ({data}: {data: any}) => {
    if(data && testDevisionCountDevision.value === undefined) {
        testDevisionCountDevision.set(data)
    }
    return null
}
export const useTestDevisionCountDevision = <T>() => {
    
    const [get, set] = useState(useHookstate(testDevisionCountDevision))
    const load = (params?: ParamsLoad) => funLoad(`/api/test-devision/count-devision/`,params, set, "GET")
    const value: T = get
    return [value, set, load] as const
};


