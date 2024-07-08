'use client'
import { ActionIcon, Anchor, Button, Card, Divider, Flex, Group, NavLink, Paper, ScrollArea, Select, Stack, Text, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { MdArrowForwardIos, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import { BottomMenu } from "./BottomMenu";
import { ButtonNavi } from "./ButtonNavi";
import _ from "lodash";
import { WARNA } from "@/module/_global";

export function MultiSelectList(
    { label, placeholder, data = [], listSelected = [], setListSelected }:
        { label?: string, placeholder?: string, data?: any[], listSelected: any[], setListSelected: any }
) {
    const [open, setOpen] = useState(false)
    // const [listSelected, setListSelected] = useState(defaultValue)

    function selected(value: { label: string, value: any }) {
        if (listSelected.includes(value.value)) {
            setListSelected(listSelected.filter((v) => v !== value.value))
        } else {
            setListSelected([...listSelected, value.value])
        }
    }

    const onClickSimpan = () => {
        setOpen(false)
    }
    return <Stack>
        <UnstyledButton onClick={() => setOpen(true)}>
            <Paper p={"sm"} withBorder radius={12}>
                <Flex justify={"space-between"}>
                    <Text>{_.isEmpty(listSelected) ? "Pilih Anggota" : "Tambah Anggota"}</Text>
                    <MdArrowForwardIos size={"1.5rem"} />
                </Flex>
            </Paper>
        </UnstyledButton>
        <BottomMenu title="Pilih Anggota" openDrawer={open} setOpenDrawer={setOpen}>
            <Stack>
                <ScrollArea.Autosize mah={300} >
                    {data.map((v, k) => <Stack key={k} gap={"lg"}>
                        <NavLink
                            onClick={() => selected(v)}
                            leftSection={listSelected.includes(v.value) ? <MdCheckBox size={"1.5rem"} /> : <MdCheckBoxOutlineBlank size={"1.5rem"} />}
                            label={v.label} />
                    </Stack>)}
                </ScrollArea.Autosize>
                <Group justify="end">
                    <ButtonNavi onClick={onClickSimpan}>Simpan</ButtonNavi>
                </Group>
            </Stack>
        </BottomMenu>
    </Stack>
}