'use client'
import { ActionIcon, Drawer, Flex, Stack, Text } from "@mantine/core";
import { MdAddCircle, MdClose, MdFileCopy, MdSort } from "react-icons/md";
import { pagePathTestDivision } from "@/lib/pagePath";

export function BottomDrawer({ openDrawer, setOpenDrawer }: { openDrawer: boolean, setOpenDrawer: any }) {

    function onAddDivisi() {
        window.location.href = pagePathTestDivision({ searchParams: { page: "division-create" } })
    }

    function onDivisionFilter() {
        window.location.href = pagePathTestDivision({ searchParams: { page: "division-filter" } })
    }

    function onDivisionReport() {
        window.location.href = pagePathTestDivision({ searchParams: { page: "division-report" } })
    }
    return <Drawer
        p={0}
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        position="bottom"
        withCloseButton={false}
        styles={{
            content: {
                margin: "0 auto",
                maxWidth: 550,
                height: 200,
                borderTopRightRadius: 20,
                borderTopLeftRadius: 20
            }
        }}

    >
        <Stack gap={"md"}>
            <Flex justify="space-between">
                <Flex justify={"end"}>
                    <Text>Menu</Text>
                </Flex>
                <ActionIcon onClick={() => setOpenDrawer(false)} variant="subtle">
                    <MdClose />
                </ActionIcon>
            </Flex>

            <Flex gap={"md"} justify={"space-evenly"}>
                <Stack align="center">
                    <ActionIcon onClick={onAddDivisi} size={"xl"} variant="subtle">
                        <MdAddCircle size={32} />
                    </ActionIcon>
                    <Text>Tambah Divisi</Text>
                </Stack>
                <Stack align="center">
                    <ActionIcon onClick={onDivisionFilter} size={"xl"} variant="subtle">
                        <MdSort size={32} />
                    </ActionIcon>
                    <Text>Filter</Text>
                </Stack>
                <Stack align="center">
                    <ActionIcon onClick={onDivisionReport} variant="subtle" size={"xl"}>
                        <MdFileCopy size={32} />
                    </ActionIcon>
                    <Text>Report</Text>
                </Stack>
            </Flex>
        </Stack>
    </Drawer>
}