import { Stack } from "@mantine/core";
import { ViewGrid } from "./ViewGrid";
import { ViewList } from "./ViewList";

export function ListDivision({ listData, isGrid }: { listData: any[], isGrid?: boolean }) {
    return <Stack gap={"md"} p={"md"}>
        {listData.map((v, k) => isGrid ? <ViewGrid v={v} key={k} /> : <ViewList v={v} key={k} />)}
    </Stack>


}