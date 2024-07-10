import { Button, Divider, Flex, ScrollArea, Stack, Text } from "@mantine/core";
import { useDivisionfilter } from "../lib/devision_state";
import { useTestDevisionListDivision } from "@/lib/stateApi";
import { WARNA } from "@/module/_global";

export function DivisionFilter() {
    const [filterText, setFilterText] = useDivisionfilter()
    const [listDevision, setListDevision] = useTestDevisionListDivision<any[]>()
    return <Stack>
        {/* {listDevision.map((v, k) => <ViewList key={k} v={v} />)} */}
        <Button color={WARNA.biruTua} radius={100}>Terapkan</Button>
    </Stack>
}

function ViewList({ v }: { v: any }) {
    return <Stack gap={0}>
        <Flex p={"md"}>
            <Text>{v.name}</Text>
        </Flex>
        <Divider />
    </Stack>
}