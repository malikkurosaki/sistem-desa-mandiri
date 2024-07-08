import { WARNA } from "@/module/_global";
import { Button, Flex, Stack, Text, UnstyledButton } from "@mantine/core";
import { BottomMenu } from "./BottomMenu";
import { useState } from "react";

export function ButtonConfirm({ label, desc, onConfirm }: { label: string, desc: string, onConfirm: () => void }) {
    const [open, setOpen] = useState(false)

    const onClickConfirm = () => {
        setOpen(false)
        onConfirm()
    }
    return <Stack>
        <Button onClick={() => setOpen(true)} radius={50} color={WARNA.biruTua}>{label}</Button>
        <BottomMenu size={"xs"} title="Konfirmasi" openDrawer={open} setOpenDrawer={setOpen}>
            <Stack gap={"xl"}>
                <Text>{desc}</Text>
                <Flex justify={"end"} gap={"xl"}>
                    <UnstyledButton onClick={() => setOpen(false)}>Cancel</UnstyledButton>
                    <Button onClick={onClickConfirm} color={WARNA.biruTua}>Confirm</Button>
                </Flex>
            </Stack>
        </BottomMenu>
    </Stack>
}