"use client";
import { LayoutNavbarNew, TEMA } from "@/module/_global";
import { funGetUserByCookies } from "@/module/auth";
import { funGetAllGroup, IDataGroup } from "@/module/group";
import { useHookstate } from "@hookstate/core";
import { Avatar, Box, Button, Divider, Grid, Group, rem, Select, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowDropright } from "react-icons/io";
import { globalMemberDivision } from "../lib/val_division";
import NavbarAdminDivision from "./navbar_admin_division";
import NavbarCreateUsers from "./navbar_create_users";

export default function CreateDivision() {
    const router = useRouter();
    const [dataGroup, setDataGroup] = useState<IDataGroup[]>([]);
    const [roleUser, setRoleUser] = useState<any>("")
    const [isChooseAnggota, setChooseAnggota] = useState(false)
    const [isChooseAdmin, setChooseAdmin] = useState(false)
    const member = useHookstate(globalMemberDivision)
    const tema = useHookstate(TEMA)
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

    function onCheck() {
        const cek = checkAll()
        if (!cek)
            return false
        if (member.length <= 1)
            return toast.error("Error! Silahkan pilih anggota lebih dari 1")

        setChooseAdmin(true)
    }

    function onToChooseAnggota() {
        if (roleUser == "supadmin" && body.idGroup == "")
            return toast.error("Error! grup harus diisi")
        setChooseAnggota(true)
    }


    function onChooseGroup(val: any) {
        member.set([])
        onValidation('idGroup', val)
    }



    useShallowEffect(() => {
        loadData();
    }, []);

    function onValidation(kategori: string, val: any) {
        if (kategori == 'name') {
            setBody({ ...body, name: val })
            if (val === "") {
                setTouched({ ...touched, name: true })
            } else {
                setTouched({ ...touched, name: false })
            }
        } else if (kategori == 'idGroup') {
            setBody({ ...body, idGroup: val, })
            if (val === "" || String(val) == "null") {
                setTouched(touched => ({ ...touched, idGroup: true }))
            } else {
                setTouched({ ...touched, idGroup: false })
            }
        } else if (kategori == 'desc') {
            setBody({ ...body, desc: val })
        }
    }

    function checkAll() {
        let nilai = true
        if (roleUser == "supadmin" && (body.idGroup === "" || String(body.idGroup) == "null")) {
            setTouched(touched => ({ ...touched, idGroup: true }))
            nilai = false
        }
        if (body.name === "") {
            setTouched(touched => ({ ...touched, name: true }))
            nilai = false
        }
        return nilai
    }



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
                                radius={10}
                                data={dataGroup?.map((pro: any) => ({
                                    value: String(pro.id),
                                    label: pro.name
                                }))}
                                onChange={(val) => {
                                    onChooseGroup(val)
                                }}
                                error={
                                    touched.idGroup && (
                                        body.idGroup == "" || String(body.idGroup) == "null" ? "Grup Tidak Boleh Kosong" : null
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
                        radius={10}
                        value={body.name}
                        onChange={(val) => { onValidation('name', val.target.value) }}
                        error={
                            touched.name && (
                                body.name == "" ? "Nama Divisi Tidak Boleh Kosong" : null
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
                            <Text c={tema.get().utama}>Anggota Terpilih</Text>
                            <Text c={tema.get().utama}>Total {member.length} Anggota</Text>
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
                                                            <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size={isMobile ? 'md' : 'lg'} />
                                                            <Box w={{
                                                                base: isMobile ? 130 : 140,
                                                                xl: 270
                                                            }}>
                                                                <Text c={tema.get().utama} fw={"bold"} lineClamp={1} fz={isMobile ? 14 : 16}>
                                                                    {v.name}
                                                                </Text>
                                                            </Box>
                                                        </Group>
                                                    </Grid.Col>
                                                    <Grid.Col span={3}>
                                                        <Text c={tema.get().utama} fw={"bold"} ta={'end'} fz={isMobile ? 13 : 16}>
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
                backgroundColor: `${tema.get().bgUtama}`,
            }}>
                <Button color="white" bg={tema.get().utama} size="lg" radius={30} fullWidth onClick={() => { onCheck() }} >
                    Simpan
                </Button>
            </Box>
        </Box>
    );
}
