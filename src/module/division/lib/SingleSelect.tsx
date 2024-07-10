'use client'
import { Flex, Group, NavLink, Paper, ScrollArea, Select, Stack, Text, UnstyledButton } from "@mantine/core";
import { useState } from "react";
import { BottomMenu } from "./BottomMenu";
import { MdArrowForwardIos, MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";
import _ from "lodash";

export function SingleSelect({ desc, icon, placeholder, selected, setSelected, data }: { desc?: string, icon?: any, placeholder: string, selected: any, setSelected: any, data: any[] }) {
    const [open, setOpen] = useState(false)
    const completed = desc && !_.isEmpty(data) && !_.isEmpty(selected)

    const onSelected = (value: any) => {
        setSelected(value)
        setOpen(false)
    }
    return <Stack>
        <UnstyledButton onClick={() => setOpen(true)} disabled={_.isEmpty(data)}>
            <Paper p={"sm"} withBorder radius={12} bg={_.isEmpty(data) ? "transparent" : "white"}>
                <Stack gap={ completed ? "sm" : 0}>
                    <Flex justify={"space-between"}>
                        <Flex gap={"md"} align={"center"}>
                            {icon && icon}
                            <Text c={_.isEmpty(selected) ? "dimmed" : "black"}>{!_.isEmpty(data) ? data?.filter((v) => v.value === selected)[0]?.label || placeholder : placeholder}</Text>
                        </Flex>
                        <MdArrowForwardIos color={_.isEmpty(data) ? "light" : "black"} size={"1.5rem"} />
                    </Flex>
                    {completed && <Group justify="end"><Text c="dimmed" size="sm">{desc}</Text></Group>}
                </Stack>
            </Paper>
        </UnstyledButton>
        <BottomMenu openDrawer={open} setOpenDrawer={setOpen} >
            <Stack>
                <ScrollArea.Autosize mah={300} >
                    {data?.map((v, k) => <NavLink
                        onClick={() => onSelected(v.value)}
                        leftSection={selected === v.value ?
                            <MdCheckBox size={"1.5rem"} /> :
                            <MdCheckBoxOutlineBlank
                                size={"1.5rem"} />}
                        key={k}
                        label={v.label} />)}
                </ScrollArea.Autosize>
            </Stack>
        </BottomMenu>
    </Stack>
}