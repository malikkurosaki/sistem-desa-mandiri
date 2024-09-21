"use client"
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import { Box, Button, Group, rem, Select, SimpleGrid, Skeleton, Stack, Text, Textarea, TextInput } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import LayoutModal from '@/module/_global/layout/layout_modal';
import toast from 'react-hot-toast';
import { funEditCalenderById, funGetOneCalender, funGetOneCalenderByIdCalendar, } from '../lib/api_calender';
import { useShallowEffect } from '@mantine/hooks';
import { IDetailByIdCalender } from '../lib/type_calender';
import moment from 'moment';
import "moment/locale/id";
import UpdateListUsers from './update_list_users';
import { useHookstate } from '@hookstate/core';

export default function UpdateDivisionCalender() {
  const [isModal, setModal] = useState(false)
  const param = useParams<{ id: string, detail: string }>()
  const [isDataCalender, setDataCalender] = useState<IDetailByIdCalender>()
  const [openMember, setOpenMember] = useState(false)
  const [loading, setLoading] = useState(true)
  const tema = useHookstate(TEMA)
  const [touched, setTouched] = useState({
    title: false,
    dateStart: false,
    timeStart: false,
    timeEnd: false,
    repeatEventTyper: false,
    desc: false,
    repeatValue: false
  })

  const fetchGetOne = async () => {
    try {
      setLoading(true)
      const response = await funGetOneCalenderByIdCalendar(param.detail)
      if (response.success) {
        setDataCalender(response.data)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Terjadi kesalahan! Silahkan coba kembali");
    } finally {
      setLoading(false)
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
          repeatValue: isDataCalender?.repeatValue
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
      console.error(error)
      toast.error("Terjadi kesalahan! Silahkan coba kembali");
      setModal(false)
    } finally {
      setModal(false)
    }
  }

  if (openMember) return <UpdateListUsers onClose={() => setOpenMember(false)} />

  return (
    <Box>
      <LayoutNavbarNew back='' title="Edit acara" menu />
      <Box p={20}>
        <Stack mb={100}>
          {loading ?
            <>
              <Skeleton height={40} mt={25} radius={10} />
              <Group justify='space-between'>
                <Skeleton height={40} width={"47%"} mt={20} radius={10} />
                <Skeleton height={40} width={"47%"} mt={20} radius={10} />
              </Group>
              <Skeleton height={40} mt={25} radius={10} />
              <Skeleton height={40} mt={25} radius={10} />
              <Skeleton height={80} mt={25} radius={10} />
            </>
            :
            <>
              <TextInput
                styles={{
                  input: {
                    border: `1px solid ${"#D6D8F6"}`,
                    borderRadius: 10,
                  },
                }}
                size="md"
                placeholder="Acara"
                label="Acara"
                defaultValue={isDataCalender?.title}
                onChange={
                  (event) => {
                    setDataCalender({
                      ...isDataCalender,
                      title: event.target.value
                    })
                    setTouched({ ...touched, title: false })
                  }
                }
                onBlur={() => setTouched({ ...touched, title: true })}
                required
                error={
                  touched.title && (
                    isDataCalender?.title == "" ? "Nama Acara Tidak Boleh Kosong" : null
                  )
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
                    setTouched({ ...touched, dateStart: false })
                  }
                }
                placeholder="Input Tanggal"
                label="Tanggal"
                minDate={new Date()}
                onBlur={() => setTouched({ ...touched, dateStart: true })}
                error={
                  touched.dateStart && (
                    isDataCalender?.dateStart == "" ? "Tanggal Tidak Boleh Kosong" : null
                  )
                }
                required
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
                  onBlur={() => setTouched({ ...touched, timeStart: true })}
                  error={touched.timeStart && !isDataCalender?.timeStart ? "Waktu Awal Tidak Boleh Kosong" : null}
                  required
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
                  onBlur={() => setTouched({ ...touched, timeEnd: true })}
                  required
                  error={
                    touched.timeEnd && (
                      isDataCalender?.timeEnd == "" ? "Waktu Akhir Tidak Boleh Kosong" : null
                    ) ||
                    (String(isDataCalender?.timeStart) > String(isDataCalender?.timeEnd) ? "Waktu Akhir Tidak Tepat" : null)
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
                placeholder="Ulangi Acara"
                label="Ulangi Acara"
                data={[
                  { value: 'once', label: 'Acara 1 Kali' },
                  { value: 'daily', label: 'Setiap Hari' },
                  // { value: 'weekdays', label: 'Hari Kerja (Sen - Jum)' },
                  { value: 'weekly', label: 'Mingguan' },
                  { value: 'monthly', label: 'Bulanan' },
                  { value: 'yearly', label: 'Tahunan' },
                ]}
                value={isDataCalender?.repeatEventTyper}
                defaultValue={isDataCalender?.repeatEventTyper}
                onChange={
                  (val: any) => {
                    setDataCalender({
                      ...isDataCalender,
                      repeatEventTyper: val
                    })
                    setTouched({ ...touched, repeatEventTyper: false })
                  }
                }
                onBlur={() => setTouched({ ...touched, repeatEventTyper: true })}
                error={
                  touched.repeatEventTyper && (
                    isDataCalender?.repeatEventTyper == "" ? "Ulangi Acara Tidak Boleh Kosong" : null
                  )
                }
                required
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
                defaultValue={isDataCalender?.repeatValue}
                onChange={(event) => {
                  setDataCalender({ ...isDataCalender, repeatValue: String(event.currentTarget.value) })
                  setTouched({ ...touched, repeatValue: false })
                }}
                onBlur={() => setTouched({ ...touched, repeatValue: true })}
                error={
                  touched.repeatValue && (
                    isDataCalender?.repeatValue == "" ? "Jumlah pengulangan tidak boleh kosong" : null 
                    // || Number(isDataCalender?.repeatValue) <= 0 ? "Jumlah pengulangan tidak boleh dibawah 1" : null
                  )
                }
              />
              <Textarea styles={{
                input: {
                  border: `1px solid ${"#D6D8F6"}`,
                  borderRadius: 10,
                },
              }}
                size="md" placeholder='Deskripsi' label="Deskripsi"
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
            </>
          }
        </Stack>
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${tema.get().bgUtama}`,
      }}>
        {loading ?
          <Skeleton height={50} radius={30} />
          :
          <Button
            c={"white"}
            bg={tema.get().utama}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => setModal(true)}
          >
            Simpan
          </Button>
        }
      </Box>
      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin mengubah data acara ini? Data ini akan mempengaruhi semua data yang terkait"
        onYes={(val) => { onSubmit(val) }} />
    </Box>
  );
}

