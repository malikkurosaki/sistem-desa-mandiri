"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Avatar, Box, Button, Flex, Group, Input, SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import React, { useState } from 'react';
import { IoIosArrowDropright } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import LayoutModal from '@/module/_global/layout/layout_modal';
import toast from 'react-hot-toast';
import moment from 'moment';
import { useHookstate } from '@hookstate/core';
import { globalCalender } from '../lib/val_calender';
import { IFormMemberCalender } from '../lib/type_calender';
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
  const [isData, setData] = useState({
    idDivision: "",
    title: "",
    dateStart: "",
    timeStart: "",
    timeEnd: "",
    linkMeet: "",
    repeatEventTyper: "1",
    desc: "",
  })

  function onTrue(val: boolean) {
    if (val) {
      toast.success("Sukses! Data tersimpan");
    }
    setModal(false)
  }

  async function onSubmit() {
    try {
      if (isData.timeStart >  isData.timeEnd) {
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
        toast.success(response.message)
        setModal(false)
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
        memberUser.set([])
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal menambahkan pengumuman, coba lagi nanti");
    }
    console.log({
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
  }

  if(openMember) return <CreateUserCalender onClose={() => setOpenMember(false)}/>


  return (
    <Box>
      <LayoutNavbarNew back="/calender" title="tambah kalender" menu />
      <Box p={20}>
        {/* <pre>{JSON.stringify(param.id, null, 1)}</pre> */}
        <Stack>
          <TextInput
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            size="md"
            placeholder="Event Nama"
            label="Event Nama"
            value={isData.title}
            onChange={(event) => setData({ ...isData, title: event.target.value })}
          />
          <DateInput
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
          />
          <SimpleGrid
            cols={{ base: 2, sm: 2, lg: 2 }}
          >
            <TimeInput
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
            />
            <TimeInput
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
          <Box mt={5} onClick={() => router.push('/calender/create?page=ulangi-event')}>
            <Group
              justify="space-between"
              p={10}
              style={{
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              }}
            >
              <Text>Ulangi Event</Text>
              <IoIosArrowDropright size={25} />
            </Group>
          </Box>
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
              onClick={onSubmit}
            >
              Simpan
            </Button>
          </Box>
        </Stack>
      </Box>
      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => { onTrue(val) }} />
    </Box>
  );
} 
