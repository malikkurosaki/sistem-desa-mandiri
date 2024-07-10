import { State, hookstate, useHookstate } from "@hookstate/core";

const useState = <T>(s: State<T>) => {
    const state = useHookstate(s);
    const get = state.value;
    const set = (v: typeof state.value) => state.set(v);
    return [get, set] as const;
};

const title = hookstate("Divisi")
export const useTitle = () => useState<string>(title);

const filter = hookstate("")
export const useDivisionfilter = () => useState<string>(filter)