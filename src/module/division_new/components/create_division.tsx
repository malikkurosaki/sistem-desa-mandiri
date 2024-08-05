"use client";
import { API_ADDRESS, LayoutNavbarNew, WARNA } from "@/module/_global";
import { TypeGroup } from "@/module/group";
import { useHookstate } from "@hookstate/core";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Group,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { globalMemberDivision } from "../lib/val_division";
import toast from "react-hot-toast";
import { funGetUserByCookies } from "@/module/auth";
import CreateAdminDivision from "./create_admin_division";
import CreateUsers from "./create_users";
import NavbarCreateUsers from "./ui/navbar_create_users";
import NavbarAdminDivision from "./ui/navbar_admin_division";


export default function CreateDivision() {
    const router = useRouter();
    const [dataGroup, setDataGroup] = useState<TypeGroup>();
    const [roleUser, setRoleUser] = useState<any>("")
    const [isChooseAnggota, setChooseAnggota] = useState(false)
    const [isChooseAdmin, setChooseAdmin] = useState(false)
    const member = useHookstate(globalMemberDivision)
    const [body, setBody] = useState<any>({
        idGroup: "",
        name: "",
        desc: "",
    });

    async function loadData() {
        const loadGroup = await fetch(API_ADDRESS.apiGetAllGroup + '&active=true');
        const dataGroup = await loadGroup.json();
        setDataGroup(dataGroup);

        const loadUser = await funGetUserByCookies();
        setRoleUser(loadUser.idUserRole)
    }

    function onSubmit() {
        if (roleUser == "supadmin" && (body.idGroup == "" || body.idGroup == null)) {
            return toast.error("Error! grup harus diisi")
        }

        if (body.name == "") {
            return toast.error("Error! nama divisi harus diisi")
        }

        if (member.length == 0) {
            return toast.error("Error! belum ada anggota yang terdaftar")
        }



        setChooseAdmin(true)

    }

    function onToChooseAnggota() {
        if (roleUser == "supadmin" && body.idGroup == "")
            return toast.error("Error! grup harus diisi")
        setChooseAnggota(true)
    }


    function onChooseGroup(val: any) {
        member.set([])
        setBody({ ...body, idGroup: val })
    }



    useShallowEffect(() => {
        loadData();
    }, []);

    if (isChooseAdmin) return <NavbarAdminDivision data={body} onSuccess={(val) => {
        if (val) {
            member.set([])
            setBody({
                ...body,
                idGroup: "",
                name: "",
                desc: "",
            })
        }

        setChooseAdmin(false)
    }} />

    if (isChooseAnggota) return <NavbarCreateUsers grup={body.idGroup} onClose={() => { setChooseAnggota(false) }} />

    return (
        <Box>
            <LayoutNavbarNew back="/division" title="Tambah Divisi" menu />
            <Box p={20}>
                <Stack>
                    {
                        (roleUser == "supadmin") && (
                            <Select
                                placeholder="Grup"
                                label="Grup"
                                size="md"
                                required
                                radius={40}
                                data={dataGroup?.map((pro: any) => ({
                                    value: String(pro.id),
                                    label: pro.name
                                }))}
                                onChange={(val) => {
                                    onChooseGroup(val)
                                }}

                                value={body.idGroup}
                            />
                        )
                    }
                    <TextInput
                        placeholder="Nama Divisi"
                        label="Nama Divisi"
                        size="md"
                        required
                        radius={40}
                        value={body.name}
                        onChange={(val) => { setBody({ ...body, name: val.target.value }) }}
                    />
                    <Textarea size="md" placeholder="Deskripsi" label="Deskripsi" value={body.desc} radius={10} onChange={(val) => { setBody({ ...body, desc: val.currentTarget.value }) }} />
                    <Box onClick={() => { onToChooseAnggota() }}>
                        <Group
                            justify="space-between"
                            p={10}
                            style={{
                                border: `1px solid ${"#D6D8F6"}`,
                                borderRadius: 10,
                            }}
                        >
                            <Text>Pilih Anggota</Text>
                            <IoIosArrowDropright size={25} />
                        </Group>
                    </Box>
                    <Box pt={20}>
                        <Group justify="space-between">
                            <Text c={WARNA.biruTua}>Anggota Terpilih</Text>
                            <Text c={WARNA.biruTua}>Total {member.length} Anggota</Text>
                        </Group>
                        <Box pt={10}>
                            <Box mb={20}>
                                <Box
                                    style={{
                                        border: `1px solid ${"#C7D6E8"}`,
                                        borderRadius: 10,
                                    }}
                                    px={20}
                                    py={10}
                                >
                                    {(member.length === 0) ? (
                                        <Text c="dimmed" ta={"center"} fs={"italic"}>Belum ada anggota</Text>
                                    ) : member.get().map((v: any, i: any) => {
                                        return (
                                            <Flex
                                                justify={"space-between"}
                                                align={"center"}
                                                mt={20}
                                                key={i}
                                            >
                                                <Group>
                                                    <Avatar src={v.img} alt="it's me" size="lg" />
                                                    <Box>
                                                        <Text c={WARNA.biruTua} fw={"bold"}>
                                                            {v.name}
                                                        </Text>
                                                    </Box>
                                                </Group>
                                                <Text c={WARNA.biruTua} fw={"bold"}>
                                                    Anggota
                                                </Text>
                                            </Flex>
                                        );
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box mt="xl">
                        <Button
                            color="white"
                            bg={WARNA.biruTua}
                            size="lg"
                            radius={30}
                            fullWidth
                            onClick={() => {
                                onSubmit()
                                // router.push("/division/create?page=pilih-admin")
                            }}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
