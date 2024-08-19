"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Avatar, Box, Button, Flex, Group, Input, Select, SimpleGrid, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import React, { useState } from 'react';
import { IoIosArrowDropright } from 'react-icons/io';
import { useParams, useRouter } from 'next/navigation';
import LayoutModal from '@/module/_global/layout/layout_modal';
import toast from 'react-hot-toast';
import { funEditCalenderById, funGetOneCalender } from '../lib/api_calender';
import { useShallowEffect } from '@mantine/hooks';
import { IDataDetailByIdCalender, IDataDetailByIdMember, IDetailByIdCalender, IEditMemberCalender, IFormMemberCalender } from '../lib/type_calender';
import moment from 'moment';
import "moment/locale/id";
import { useHookstate } from '@hookstate/core';
import { globalCalender } from '../lib/val_calender';
import UpdateListUsers from './update_list_users';

export default function UpdateDivisionCalender() {
  const [isModal, setModal] = useState(false)
  const param = useParams<{ id: string, detail: string }>()
  const memberUser = useHookstate(globalCalender)
  const memberValue = memberUser.get() as IFormMemberCalender[]
  const [isDataCalender, setDataCalender] = useState<IDetailByIdCalender>()
  const [openMember, setOpenMember] = useState(false)

  const fetchGetOne = async () => {
    try {
      const response = await funGetOneCalender(param.detail)
      setDataCalender(response.data.calender)
      memberUser.set(response.data.member)
    } catch (error) {
      console.log(error)
    }
  }

  useShallowEffect(() => {
    fetchGetOne()
  }, [])

  const [value, setValue] = useState<Date | null>(null);
  const router = useRouter()

  async function onSubmit(val: boolean) {
    try {
      if (val) {
        const response = await funEditCalenderById(param.detail, {
          title: isDataCalender?.title,
          dateStart: isDataCalender?.dateStart,
          timeStart: isDataCalender?.timeStart,
          timeEnd: isDataCalender?.timeEnd,
          linkMeet: isDataCalender?.linkMeet,
          repeatEventTyper: isDataCalender?.repeatEventTyper,
          desc: isDataCalender?.desc,
          member: memberValue
        })

        if (response.success) {
          setModal(false)
          router.push(`/division/${param.id}/calender`)
          toast.success(response.message)
        } else {
          toast.error(response.message)
        }
      }
      setModal(false)
    } catch (error) {
      console.log(error)
      toast.error("Terjadi kesalahan! Silahkan coba kembali");
      setModal(false)
    } finally {
      setModal(false)
    }
  }

  if (openMember) return <UpdateListUsers onClose={() => setOpenMember(false)} />

  return (
    <Box>
      <LayoutNavbarNew back={`/division/${param.id}/calender`} title="Edit kalender" menu />
      <Box p={20}>
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
            defaultValue={isDataCalender?.title}
            onChange={
              (event) => {
                setDataCalender({
                  ...isDataCalender,
                  title: event.target.value
                })
              }
            }
          />
          <DateInput
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            size="md"
            value={
              (isDataCalender?.dateStart == '' || isDataCalender?.dateStart == null) ? null : new Date(isDataCalender.dateStart)
            }
            onChange={
              (val) => {
                setValue(val);
                setDataCalender({
                  ...isDataCalender,
                  dateStart: moment(val).format("YYYY-MM-DD")
                })
              }
            }
            placeholder="Input Tanggal"
            label="Tanggal"
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
              // value={isDataCalender?.timeStart}
              defaultValue={isDataCalender?.timeStart}
              onChange={
                (event) => {
                  setDataCalender({
                    ...isDataCalender,
                    timeStart: event.target.value
                  })
                }
              }
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
              // value={isDataCalender?.timeEnd}
              defaultValue={isDataCalender?.timeEnd}
              onChange={
                (event) => {
                  setDataCalender({
                    ...isDataCalender,
                    timeEnd: event.target.value
                  })
                }
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
            // value={isDataCalender?.linkMeet}
            defaultValue={isDataCalender?.linkMeet}
            onChange={
              (event) => {
                setDataCalender({
                  ...isDataCalender,
                  linkMeet: event.target.value
                })
              }
            }
          />
          <Select
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
            value={isDataCalender?.repeatEventTyper}
            defaultValue={isDataCalender?.repeatEventTyper}
            onChange={
              (val: any) => {
                setDataCalender({
                  ...isDataCalender,
                  repeatEventTyper: val
                })
              }
            }
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
          <Textarea styles={{
            input: {
              border: `1px solid ${"#D6D8F6"}`,
              borderRadius: 10,
            },
          }}
            size="md" placeholder='Deskripsi' label="Deskripsi"
          // value={isDataCalender?.desc}
            defaultValue={isDataCalender?.desc}
            onChange={
              (event) => {
                setDataCalender({
                  ...isDataCalender,
                  desc: event.target.value
                })
              }
            }
          />
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
          <Box mt={"xl"}>
            <Button
              c={"white"}
              bg={WARNA.biruTua}
              size="lg"
              radius={30}
              fullWidth
              onClick={() => setModal(true)}
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

