"use client";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import {
    Avatar,
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    Group,
    rem,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoIosArrowDropright } from "react-icons/io";
import { globalMemberDivision } from "../lib/val_division";
import toast from "react-hot-toast";
import { funGetUserByCookies } from "@/module/auth";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import NavbarAdminDivision from "./navbar_admin_division";
import NavbarCreateUsers from "./navbar_create_users";

export default function CreateDivision() {
    const router = useRouter();
    const [dataGroup, setDataGroup] = useState<IDataGroup[]>([]);
    const [roleUser, setRoleUser] = useState<any>("")
    const [isChooseAnggota, setChooseAnggota] = useState(false)
    const [isChooseAdmin, setChooseAdmin] = useState(false)
    const member = useHookstate(globalMemberDivision)
    const isMobile = useMediaQuery('(max-width: 369px)');
    const [body, setBody] = useState<any>({
        idGroup: "",
        name: "",
        desc: "",
    });
    const [touched, setTouched] = useState({
        idGroup: false,
        name: false,
    });

    async function loadData() {
        const loadGroup = await funGetAllGroup('?active=true')
        if (loadGroup.success) {
            setDataGroup(loadGroup.data);
        } else {
            toast.error(loadGroup.message);
        }

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
            // setBody({
            //     ...body,
            //     idGroup: "",
            //     name: "",
            //     desc: "",
            // })
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
                                onBlur={() => setTouched({ ...touched, idGroup: true })}
                                error={
                                    touched.idGroup && (
                                        body.idGroup == "" ? "Grup Tidak Boleh Kosong" : null
                                    )
                                }
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
                        onBlur={() => setTouched({ ...touched, name: true })}
                        error={
                            touched.name && (
                                body.name == "" ? "Nama Tidak Boleh Kosong" : null
                            )
                        }
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
                    <Box pt={20} pb={50}>
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
                                            <Box key={i}>
                                                <Grid align='center' mt={10}
                                                >
                                                    <Grid.Col span={9}>
                                                        <Group>
                                                            <Avatar src={`/api/file/img?jenis=image&cat=user&file=${v.img}`} alt="it's me" size={isMobile ? 'md' : 'lg'} />
                                                            <Box w={{
                                                                base: isMobile ? 130 : 140,
                                                                xl: 270
                                                            }}>
                                                                <Text c={WARNA.biruTua} fw={"bold"} lineClamp={1} fz={isMobile ? 14 : 16}>
                                                                    {v.name}
                                                                </Text>
                                                            </Box>
                                                        </Group>
                                                    </Grid.Col>
                                                    <Grid.Col span={3}>
                                                        <Text c={WARNA.biruTua} fw={"bold"} ta={'end'} fz={isMobile ? 13 : 16}>
                                                            Anggota
                                                        </Text>
                                                    </Grid.Col>
                                                </Grid>
                                                <Box mt={10}>
                                                    <Divider size={"xs"} />
                                                </Box>
                                            </Box>
                                        );
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Stack>
            </Box>
            <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
                maxWidth: rem(550),
                zIndex: 999,
                backgroundColor: `${WARNA.bgWhite}`,
            }}>
                <Button
                    color="white"
                    bg={WARNA.biruTua}
                    size="lg"
                    radius={30}
                    fullWidth
                    onClick={() => {
                        onSubmit()
                    }}
                >
                    Simpan
                </Button>
            </Box>
        </Box>
    );
}
