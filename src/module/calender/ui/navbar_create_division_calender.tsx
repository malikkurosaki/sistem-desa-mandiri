"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Avatar, Box, Button, Flex, Group, Input, Select, SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
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

export default function NavbarCreateDivisionCalender() {
  const [value, setValue] = useState<Date | null>(null);
  const router = useRouter()
  const [isModal, setModal] = useState(false)
  const memberUser = useHookstate(globalCalender)
  const memberValue = memberUser.get() as IFormMemberCalender[]
  const [openMember, setOpenMember] = useState(false)
  const param = useParams<{ id: string, detail: string }>()
  const [touched, setTouched] = useState({
    title: false,
    dateStart: false,
    timeStart: false,
    timeEnd: false,
    repeatEventTyper: false,
    desc: false
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
          member: memberValue
        })

        if (response.success) {
          setModal(false)
          router.push(`/division/${param.id}/calender`)
          setData({
            ...isData,
            title: "",
            dateStart: "",
            timeStart: "",
            timeEnd: "",
            linkMeet: "",
            repeatEventTyper: "1",
            desc: "",
          })
          toast.success(response.message)
          memberUser.set([])
        } else {
          toast.error(response.message)
          setModal(false)
        }
      }
    } catch (error) {
      console.log(error)
      setModal(false)
      toast.error("Gagal menambahkan pengumuman, coba lagi nanti");
    } finally {
      setModal(false)
    }
  }

  if (openMember) return <CreateUserCalender onClose={() => setOpenMember(false)} />


  return (
    <Box>
      <LayoutNavbarNew back={`/division/${param.id}/calender/`} title="tambah kalender" menu />
      <Box p={20}>
        <Stack>
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
            onChange={(event) => setData({ ...isData, title: event.target.value })}
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
            }}
            placeholder="Input Tanggal"
            label="Tanggal"
            minDate={new Date()}
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
            placeholder="Ulangi Event"
            label="Ulangi Event"
            data={[
              { value: '1', label: 'Acara 1 Kali' },
              { value: '2', label: 'Hari Kerja (Sen - Jum)' },
              { value: '3', label: 'Mingguan' },
              { value: '4', label: 'Bulanan' },
              { value: '5', label: 'Tahunan' },
            ]}
            value={isData.repeatEventTyper}
            onChange={(val: any) =>
              setData({ ...isData, repeatEventTyper: val })
            }
            onBlur={() => setTouched({ ...touched, repeatEventTyper: true })}
            error={
              touched.repeatEventTyper && (
                isData.repeatEventTyper == "" ? "Ulangi Event Tidak Boleh Kosong" : null
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
              <Text>Tambah Anggota *</Text>
              <IoIosArrowDropright size={25} />
            </Group>
          </Box>
          {
            memberUser.length > 0 &&
            <Box pt={30}>
              <Group justify="space-between">
                <Text c={WARNA.biruTua}>Anggota Terpilih</Text>
                <Text c={WARNA.biruTua}>Total {memberUser.length} Anggota</Text>
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
                    {memberUser.get().map((v: any, i: any) => {
                      return (
                        <Flex
                          justify={"space-between"}
                          align={"center"}
                          mt={20}
                          key={i}
                        >
                          <Group>
                            <Avatar src={"v.image"} alt="it's me" size="lg" />
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
          }
          <Box mt={"xl"}>
            <Button
              c={"white"}
              bg={WARNA.biruTua}
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
        </Stack>
      </Box>
      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => { onSubmit(val) }} />
    </Box>
  );
} 
