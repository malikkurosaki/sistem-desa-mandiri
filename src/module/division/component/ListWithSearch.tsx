'use client'

import { Box, Card, Center, Flex, Stack, Text, Title } from "@mantine/core"
import { ListDivision } from "./ListDivision"
import { SearchDivision } from "./SearchDivision"
import { ToogleList } from "./ToogleList"
import { useState } from "react"
import { useShallowEffect } from "@mantine/hooks"
import { WARNA } from "@/module/_global"
import { apiFetchTestDevisionListDivisionGET } from "@/lib/apiFetch"


export function ListWithSearch({ listData, count }: { listData: any[], count: number }) {
    const [isGrid, setIsGrid] = useState(true)
    const [search, setSearch] = useState("")
    const [listDivision, setListDivision] = useState(listData)

    useShallowEffect(() => {
        apiFetchTestDevisionListDivisionGET().then(setListDivision)
    }, [])


    return <Stack>
        <Flex align={"center"} p={"md"} gap={"md"}>
            <SearchDivision setText={setSearch} text={search} />
            <ToogleList isGrid={isGrid} setIsGrid={setIsGrid} />
        </Flex>
        <Box p={"md"}>
            <Card p={"md"} bg={WARNA.biruTua}>
                <Stack>
                    <Text size="md" fw={"bold"} c={WARNA.bgWhite}>Total Divisi</Text>
                    <Center>
                        <Title c={WARNA.bgWhite}>{count}</Title>
                    </Center>
                </Stack>
            </Card>
        </Box>
        <ListDivision listData={listDivision.filter((v) => v.name.toLowerCase().includes(search.toLowerCase()))} isGrid={isGrid} />
    </Stack>
}