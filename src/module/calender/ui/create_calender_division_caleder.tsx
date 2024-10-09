'use client'
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Avatar, Box, Button, Divider, Grid, Group, rem, Select, SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useMediaQuery } from '@mantine/hooks';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoIosArrowDropright } from 'react-icons/io';
import { funCreateCalender } from '../lib/api_calender';
import { IFormMemberCalender } from '../lib/type_calender';
import { globalCalender } from '../lib/val_calender';
import CreateUserCalender from './create_user_calender';

export default function CreateCalenderDivisionCaleder() {
    const [value, setValue] = useState<Date | null>(null);
    const router = useRouter()
    const [isModal, setModal] = useState(false)
    const [loadingModal, setLoadingModal] = useState(false)
    const member = useHookstate(globalCalender)
    const memberValue = member.get() as IFormMemberCalender[]
    const [openMember, setOpenMember] = useState(false)
    const param = useParams<{ id: string, detail: string }>()
    const tema = useHookstate(TEMA)
    const isMobile = useMediaQuery('(max-width: 369px)');
    const isMobile2 = useMediaQuery("(max-width: 438px)");
    const [touched, setTouched] = useState({
        title: false,
        dateStart: false,
        timeStart: false,
        timeEnd: false,
        repeatEventTyper: false,
        desc: false,
        repeatValue: false
    })
    const [isData, setData] = useState({
        idDivision: "",
        title: "",
        dateStart: "",
        timeStart: "",
        timeEnd: "",
        linkMeet: "",
        repeatEventTyper: "",
        desc: "",
        repeatValue: "1"
    })

    async function onSubmit(val: boolean) {
        try {
            setLoadingModal(true)
            const response = await funCreateCalender({
                idDivision: param.id,
                title: isData.title,
                dateStart: isData.dateStart,
                timeStart: isData.timeStart,
                timeEnd: isData.timeEnd,
                linkMeet: isData.linkMeet,
                repeatEventTyper: isData.repeatEventTyper,
                desc: isData.desc,
                repeatValue: isData.repeatValue,
                member: memberValue
            })

            if (response.success) {
                setModal(false)
                router.push(`/division/${param.id}/calender`)
                toast.success(response.message)
                member.set([])
            } else {
                toast.error(response.message)
                setModal(false)
            }
        } catch (error) {
            console.error(error)
            toast.error("Gagal menambahkan pengumuman, coba lagi nanti");
        } finally {
            setModal(false)
            setLoadingModal(false)
        }
    }

    function onCheck() {
        const cek = checkAll()
        if (!cek)
            return false

        if (memberValue.length == 0)
            return toast.error("Error! silahkan pilih anggota")

        setModal(true)
    }

    function checkAll() {
        let nilai = true
        if (isData.title === "") {
            setTouched(touched => ({ ...touched, title: true }))
            nilai = false
        }
        if (isData.dateStart === "") {
            setTouched(touched => ({ ...touched, dateStart: true }))
            nilai = false
        }
        if (isData.timeStart == "") {
            setTouched(touched => ({ ...touched, timeStart: true }))
            nilai = false
        }
        if (isData.timeEnd == "" || isData.timeStart > isData.timeEnd) {
            setTouched(touched => ({ ...touched, timeEnd: true }))
            nilai = false
        }
        if (isData.repeatEventTyper == "" || String(isData.repeatEventTyper) == "null") {
            setTouched(touched => ({ ...touched, repeatEventTyper: true }))
            nilai = false
        }
        if (isData.repeatValue === "" || Number(isData.repeatValue) <= 0) {
            setTouched(touched => ({ ...touched, repeatValue: true }))
            nilai = false
        }

        return nilai
    }

    function onValidation(kategori: string, val: any) {
        if (kategori == 'title') {
            setData({ ...isData, title: val })
            if (val === "") {
                setTouched({ ...touched, title: true })
            } else {
                setTouched({ ...touched, title: false })
            }
        } else if (kategori == 'dateStart') {
            setValue(val)
            setData({ ...isData, dateStart: moment(val).format("YYYY-MM-DD") })
            if (val === "") {
                setTouched({ ...touched, dateStart: true })
            } else {
                setTouched({ ...touched, dateStart: false })
            }
        } else if (kategori == 'timeStart') {
            setData({ ...isData, timeStart: val })
            if (val == "") {
                setTouched({ ...touched, timeStart: true })
            } else {
                setTouched({ ...touched, timeStart: false })
            }
        } else if (kategori == 'timeEnd') {
            setData({ ...isData, timeEnd: val })
            if (val == "" || isData.timeStart > val) {
                setTouched({ ...touched, timeEnd: true })
            } else {
                setTouched({ ...touched, timeEnd: false })
            }
        } else if (kategori == 'repeatEventTyper') {
            setData(isData => ({ ...isData, repeatEventTyper: val }))
            if (val == "once") {
                setData(isData => ({ ...isData, repeatValue: "1" }))
            }
            if (val == "" || String(val) == "null") {
                setTouched({ ...touched, repeatEventTyper: true })
            } else {
                setTouched({ ...touched, repeatEventTyper: false })
            }
        } else if (kategori == 'repeatValue') {
            setData(isData => ({ ...isData, repeatValue: val, }))
            if (val === "" || Number(val) <= 0) {
                setTouched(touched => ({ ...touched, repeatValue: true }))
            } else {
                setTouched({ ...touched, repeatValue: false })
            }
        }
    }

    if (openMember) return <CreateUserCalender onClose={() => setOpenMember(false)} />

    return (
        <Box>
            <LayoutNavbarNew back={`/division/${param.id}/calender/`} title="Tambah Acara" menu />
            <Box p={20}>
                <Stack pb={100}>
                    <TextInput
                        required
                        styles={{
                            input: {
                                border: `1px solid ${"#D6D8F6"}`,
                                borderRadius: 10,
                            },
                        }}
                        size="md"
                        placeholder="Nama Acara"
                        label="Nama Acara"
                        value={isData.title}
                        onChange={(event) => { onValidation('title', event.target.value) }}
                        error={
                            touched.title && (
                                isData.title == "" ? "Nama Acara Tidak Boleh Kosong" : null
                            )
                        }
                    />
                    <DateInput
                        required
                        styles={{
                            input: {
                                border: `1px solid ${"#D6D8F6"}`,
                                borderRadius: 10,
                            },
                        }}
                        size="md"
                        value={value}
                        onChange={(val) => { onValidation('dateStart', val) }}
                        placeholder="Input Tanggal"
                        label="Tanggal"
                        error={
                            touched.dateStart && (
                                isData.dateStart == "" ? "Tanggal Tidak Boleh Kosong" : null
                            )
                        }
                    />
                    <SimpleGrid
                        cols={{ base: 2, sm: 2, lg: 2 }}
                    >
                        <TimeInput
                            required
                            styles={{
                                input: {
                                    border: `1px solid ${"#D6D8F6"}`,
                                    borderRadius: 10,
                                },
                            }}
                            size="md"
                            label="Waktu Awal"
                            value={isData.timeStart}
                            onChange={(event) => onValidation('timeStart', event.target.value)}
                            error={
                                touched.timeStart && (
                                    isData.timeStart == "" ? "Waktu Awal Tidak Boleh Kosong" : null
                                )
                            }
                        />
                        <TimeInput
                            required
                            styles={{
                                input: {
                                    border: `1px solid ${"#D6D8F6"}`,
                                    borderRadius: 10,
                                },
                            }}
                            size="md"
                            label="Waktu Akhir"
                            value={isData.timeEnd}
                            onChange={(event) => onValidation('timeEnd', event.target.value)}
                            error={
                                touched.timeEnd && (
                                    isData.timeEnd == "" ? "Waktu Akhir Tidak Boleh Kosong" : null
                                ) ||
                                (isData.timeStart > isData.timeEnd ? "Waktu Akhir Tidak Tepat" : null)
                            }
                        />
                    </SimpleGrid>
                    <TextInput
                        styles={{
                            input: {
                                border: `1px solid ${"#D6D8F6"}`,
                                borderRadius: 10,
                            },
                        }}
                        size="md"
                        placeholder="Link Meet"
                        label="Link Meet"
                        value={isData.linkMeet}
                        onChange={(event) => setData({ ...isData, linkMeet: event.target.value })}
                    />
                    <Select
                        required
                        styles={{
                            input: {
                                border: `1px solid ${"#D6D8F6"}`,
                                borderRadius: 10,
                            },
                        }}
                        size="md"
                        placeholder="Ulangi Acara"
                        label="Ulangi Acara"
                        data={[
                            { value: 'once', label: 'Acara 1 Kali' },
                            { value: 'daily', label: 'Setiap Hari' },
                            { value: 'weekly', label: 'Mingguan' },
                            { value: 'monthly', label: 'Bulanan' },
                            { value: 'yearly', label: 'Tahunan' },
                        ]}
                        value={isData.repeatEventTyper}
                        onChange={(val: any) => { onValidation('repeatEventTyper', val) }}
                        error={
                            touched.repeatEventTyper && (
                                isData.repeatEventTyper == "" || String(isData.repeatEventTyper) == "null" ? "Ulangi Acara Tidak Boleh Kosong" : null
                            )
                        }
                    />
                    <TextInput styles={{
                        input: {
                            border: `1px solid ${"#D6D8F6"}`,
                            borderRadius: 10,
                        },
                    }}
                        type='number'
                        required
                        label="Jumlah pengulangan"
                        size="md"
                        placeholder='Jumlah pengulangan'
                        value={isData.repeatValue}
                        min={1}
                        disabled={(isData.repeatEventTyper == "once") ? true : false}
                        onChange={(event) => { onValidation('repeatValue', event.currentTarget.value) }}
                        error={
                            touched.repeatValue && (
                                isData.repeatValue == "" ? "Jumlah pengulangan tidak boleh kosong" :
                                    Number(isData.repeatValue) <= 0 ? "Jumlah pengulangan tidak boleh di bawah 1" : ""
                            )
                        }
                    />
                    <Textarea styles={{
                        input: {
                            border: `1px solid ${"#D6D8F6"}`,
                            borderRadius: 10,
                        },
                    }}
                        value={isData.desc}
                        size="md" placeholder='Deskripsi' label="Deskripsi"
                        onChange={(event) => setData({ ...isData, desc: event.target.value })}
                    />
                    <Box mt={5} onClick={() => setOpenMember(true)}>
                        <Group
                            justify="space-between"
                            p={10}
                            style={{
                                border: `1px solid ${"#D6D8F6"}`,
                                borderRadius: 10,
                            }}
                        >
                            <Text>Tambah Anggota</Text>
                            <IoIosArrowDropright size={25} />
                        </Group>
                    </Box>
                    {
                        member.length > 0 &&
                        <Box pt={30} mb={60}>
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
                                        {member.length == 0 ?
                                            <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
                                                <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada Anggota</Text>
                                            </Box>
                                            :

                                            member.get().map((v: any, i: any) => {
                                                return (
                                                    <Box key={i}>
                                                        <Grid align='center' mt={10}
                                                        >
                                                            <Grid.Col span={1}>
                                                                <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size={'lg'} />
                                                            </Grid.Col>
                                                            <Grid.Col span={8}>
                                                                <Text c={tema.get().utama} fw={"bold"} lineClamp={1} pl={isMobile2 ? 40 : 30} fz={isMobile ? 14 : 16} >
                                                                    {v.name}
                                                                </Text>
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
                    }
                </Stack>
            </Box>
            <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
                maxWidth: rem(550),
                zIndex: 999,
                backgroundColor: `${tema.get().bgUtama}`,
            }}>
                <Button
                    c={"white"}
                    bg={tema.get().utama}
                    size="lg"
                    radius={30}
                    fullWidth
                    onClick={() => { onCheck() }}
                >
                    Simpan
                </Button>
            </Box>
            <LayoutModal loading={loadingModal} opened={isModal} onClose={() => setModal(false)}
                description="Apakah Anda yakin ingin menambahkan data?"
                onYes={(val) => {
                    if (val) {
                        onSubmit(val)
                    } else {
                        setModal(false)
                    }
                }} />
        </Box>
    );
} 