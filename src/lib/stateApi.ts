
'use client';
import { State, hookstate, useHookstate } from '@hookstate/core';
import _ from 'lodash';

const wrapState = <T>(s: State<T | undefined>) => ({
    get: s.value,
    set: (v: T) => s.set(v)
});


const devVillage = hookstate<any | undefined>(undefined);
export const ProviderDevVillage = ({data}: {data: any}) => {
    if(data && devVillage.value === undefined) {
        devVillage.set(data)
    }
    return null
}
export const useDevVillage = () => {
    const state = wrapState(useHookstate(devVillage))

    async function load({ searchParams, token }: { searchParams?: string[], token?: string }) {
        const headers: Record<string, string> = token ? { 'Authorization': `Bearer ${token}` } : {};
        const search = searchParams ? '?' + searchParams.join('&') : '';
        const res = await fetch(`/api/dev/village${searchParams || ''}`, { method: 'GET', headers,  cache: "no-cache" });
        const json = await res.json().then((json) => json).catch(() => null);
        if(json) state.set(json);
        return {
            res,
            json
        };
    }

    return [state.get, state.set, load] as const
};


