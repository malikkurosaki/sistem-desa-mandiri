'use client'
import { WARNA } from "@/module/_global";
import { ActionIcon, Box, Flex, Title } from "@mantine/core";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdArrowBackIos, MdMenu } from "react-icons/md";
import { useTitle } from "../lib/devision_state";
import { BottomDrawer } from "./BottomDrawer";
import { pagePathTestDivision } from "@/lib/pagePath";
import _ from "lodash";

export function HeadDivision({ title }: { title: string }) {
    const [openDrawer, setOpenDrawer] = useState(false)

    function onBack() {
        window.location.href = pagePathTestDivision()
    }

    return <Box pos={"sticky"} top={0} bg={WARNA.biruTua} p={"lg"} style={{
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        zIndex: 999,
        boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
    }}>
        <Flex justify={"space-between"}>
            <ActionIcon onClick={onBack} bg={WARNA.bgIcon} radius={100}>
                <MdArrowBackIos />
            </ActionIcon>
            <Title c={WARNA.bgWhite} order={3}>{_.startCase(title)}</Title>
            <ActionIcon onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} >
                <MdMenu />
            </ActionIcon>
        </Flex>
        <BottomDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} />
    </Box>
}