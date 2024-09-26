"use client"
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import { Avatar, Box, Button, Divider, Flex, Grid, Group, Input, NumberInput, rem, Select, SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import React, { useState } from 'react';
import { IoIosArrowDropright } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import LayoutModal from '@/module/_global/layout/layout_modal';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useHookstate } from '@hookstate/core';
import { globalCalender, globalUlangiEvent } from '../lib/val_calender';
import { IFormMemberCalender, IFormUlangiEvent } from '../lib/type_calender';
import { funCreateCalender } from '../lib/api_calender';
import CreateUserCalender from './create_user_calender';
import { useMediaQuery } from '@mantine/hooks';

export default function NavbarCreateDivisionCalender() {
  const [value, setValue] = useState<Date | null>(null);
  const router = useRouter()
  const [isModal, setModal] = useState(false)
  const member = useHookstate(globalCalender)
  const memberValue = member.get() as IFormMemberCalender[]
  const [openMember, setOpenMember] = useState(false)
  const param = useParams<{ id: string, detail: string }>()
  const tema = useHookstate(TEMA)
  const isMobile = useMediaQuery('(max-width: 369px)');
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
      if (val) {
        if (isData.timeStart > isData.timeEnd) {
          return toast.error("Waktu Akhir Tidak tepat");
        }
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
      }
    } catch (error) {
      console.error(error)
      setModal(false)
      toast.error("Gagal menambahkan pengumuman, coba lagi nanti");
    } finally {
      setModal(false)
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
            onChange={(event) => {
              setData({ ...isData, title: event.target.value })
              setTouched({ ...touched, title: false })
            }}
            onBlur={() => setTouched({ ...touched, title: true })}
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
            onChange={(val) => {
              setValue(val);
              setData({ ...isData, dateStart: moment(val).format("YYYY-MM-DD") });
              setTouched({ ...touched, dateStart: false });
            }}
            placeholder="Input Tanggal"
            label="Tanggal"
            onBlur={() => setTouched({ ...touched, dateStart: true })}
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
              onChange={(event) => setData({ ...isData, timeStart: event.target.value })}
              onBlur={() => setTouched({ ...touched, timeStart: true })}
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
              onChange={(event) => setData({ ...isData, timeEnd: event.target.value })}
              onBlur={() => setTouched({ ...touched, timeEnd: true })}
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
            onChange={(val: any) => {
              setData({ ...isData, repeatEventTyper: val })
              setTouched({ ...touched, repeatEventTyper: false })
            }
            }
            onBlur={() => setTouched({ ...touched, repeatEventTyper: true })}
            error={
              touched.repeatEventTyper && (
                isData.repeatEventTyper == "" ? "Ulangi Acara Tidak Boleh Kosong" : null
              )
            }
          />
          {isData.repeatEventTyper == "once" ?
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
              disabled
              placeholder='Jumlah pengulangan'
              value={isData.repeatValue}
              onChange={(event) => {
                setData({ ...isData, repeatValue: String(event.currentTarget.value) })
                setTouched({ ...touched, repeatValue: false })
              }}
              onBlur={() => setTouched({ ...touched, repeatValue: true })}
              // TODO :: NANTI DIPERBAIKI
              error={
                touched.repeatValue && (
                  isData.repeatValue == "" ? "Jumlah pengulangan tidak boleh kosong" : ""
                  // || Number(isData.repeatValue) <= 0 ? "Jumlah pengulangan tidak boleh 0" : ""
                )
              }
            />
            :
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
              onChange={(event) => {
                setData({ ...isData, repeatValue: String(event.currentTarget.value) })
                setTouched({ ...touched, repeatValue: false })
              }}
              onBlur={() => setTouched({ ...touched, repeatValue: true })}
              // TODO :: NANTI DIPERBAIKI
              error={
                touched.repeatValue && (
                  isData.repeatValue == "" ? "Jumlah pengulangan tidak boleh kosong" : ""
                  // || Number(isData.repeatValue) <= 0 ? "Jumlah pengulangan tidak boleh 0" : ""
                )
              }
            />
          }
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
                              <Grid.Col span={9}>
                                <Group>
                                  <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size={isMobile ? 'md' : 'lg'} />
                                  <Box w={{
                                    base: isMobile ? 130 : 140,
                                    xl: 270
                                  }}>
                                    <Text c={tema.get().utama} fw={"bold"} lineClamp={1} fz={isMobile ? 14 : 16} >
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
          onClick={() => {
            if (
              isData.title !== "" &&
              isData.dateStart !== " " &&
              isData.timeStart !== "" &&
              isData.timeEnd !== "" &&
              isData.repeatEventTyper !== ""
            ) {
              setModal(true);
            } else {
              toast.error("Mohon lengkapi semua form");
            }
          }}
        >
          Simpan
        </Button>
      </Box>
      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => { onSubmit(val) }} />
    </Box>
  );
} 
