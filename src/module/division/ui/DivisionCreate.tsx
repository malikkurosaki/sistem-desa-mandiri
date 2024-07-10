'use client'

import { ActionIcon, Avatar, Button, Card, Flex, ScrollArea, Select, Stack, Text, TextInput, Textarea } from "@mantine/core"
import { MultiSelectList } from "../lib/MultiSelectList"
import { WARNA } from "@/module/_global"
import { useTestDevisionListAnggota, useTestDevisionListGroup } from "@/lib/stateApi"
import { useState } from "react"
import _ from "lodash"
import { MdAccountCircle, MdClose, MdGroup, MdGroupAdd, MdGroupWork, MdShield } from "react-icons/md"
import { ButtonNavi } from "../lib/ButtonNavi"
import { pagePathTestDivision } from "@/lib/pagePath"
import { SingleSelect } from "../lib/SingleSelect"
import { ButtonConfirm } from "../lib/ButtonConfirm"
import { toast } from "../lib/toast"


export function DivisionCreate() {
    const [val, setVal, load] = useTestDevisionListGroup<any[]>()
    const [listAnggota, setListAnggota] = useTestDevisionListAnggota<any[]>()
    const [listSelectedAnggota, setListSelectedAnggota] = useState<any[]>([])
    const [selectedAdmin, setSelectedAdmin] = useState("")
    const [selectedGroup, setSelectedGroup] = useState("")


    return <Stack p={"md"} gap={"md"} >
        <SingleSelect
            desc="Pilih Grup"
            icon={<MdGroupWork size={"1.5rem"} />}
            selected={selectedGroup}
            setSelected={setSelectedGroup}
            data={val && val.map((v) => ({ label: v.name, value: v.id }))}
            placeholder="Pilih Grup" />
        <TextInput
            size="md"
            withAsterisk
            radius={12}
            placeholder="Nama"
            label="Masukan Nama" />
        <Textarea
            size="md"
            withAsterisk
            radius={12}
            autosize
            minRows={6}
            maxRows={12}
            placeholder="Masukan Deskripsi"
            label="Masukan Deskripsi" />
        <MultiSelectList setListSelected={setListSelectedAnggota} listSelected={listSelectedAnggota} placeholder="Pilih Anggota" data={listAnggota.map((v) => ({ label: v.name, value: v.id }))} />
        <SelectedAnggotaContainer setListSelectedAnggota={setListSelectedAnggota} listSelectedAnggota={listSelectedAnggota} listAnggota={listAnggota} />
        <SingleSelect desc="Pilih Admin" icon={<MdShield size={"1.5rem"} />} selected={selectedAdmin} setSelected={setSelectedAdmin} data={listAnggota.filter((v) => listSelectedAnggota.includes(v.id)).map((v) => ({ label: v.name, value: v.id }))} placeholder="Select Admin" />
        <ButtonConfirm onConfirm={() => {
            toast("Simpan Berhasil", "success")
        }} label="Simpan" desc="Apakah anda yakin ingin menyimpan data?" />
    </Stack>
}

function SelectedAnggotaContainer({ listSelectedAnggota, listAnggota, setListSelectedAnggota }: { listSelectedAnggota: any[], listAnggota?: any[], setListSelectedAnggota: any }) {
    if (_.isEmpty(listSelectedAnggota)) return null
    return <Card>
        <Stack>
            <Flex justify={"space-between"}>
                <Text>Anggota Terpilih</Text>
                <Text>Total: {listSelectedAnggota.length}</Text>
            </Flex>
            <ScrollArea.Autosize mah={200}>
                {listAnggota?.filter((v) => listSelectedAnggota.includes(v.id)).map((v, k) => <Stack py={"sm"} key={k}>
                    <Flex align={"center"} gap={"md"} justify={"space-between"}>
                        <Flex gap={"md"}>
                            <Avatar size={"md"} color={WARNA.biruTua}><MdAccountCircle /></Avatar><Text>{v.name}</Text>
                        </Flex>
                        <ActionIcon onClick={() => {
                            setListSelectedAnggota((prev: any) => prev.filter((val: any) => val !== v.id))
                        }} variant="subtle">
                            <MdClose />
                        </ActionIcon>
                    </Flex>
                </Stack>)}
            </ScrollArea.Autosize>
        </Stack>
    </Card>

}