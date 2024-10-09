"use client"
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Group, rem, Select, SimpleGrid, Skeleton, Stack, Textarea, TextInput } from '@mantine/core';
import { DateInput, TimeInput } from '@mantine/dates';
import { useShallowEffect } from '@mantine/hooks';
import moment from 'moment';
import "moment/locale/id";
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { funEditCalenderById, funGetOneCalenderByIdCalendar } from '../lib/api_calender';
import { IDetailByIdCalender } from '../lib/type_calender';
import UpdateListUsers from './update_list_users';

export default function UpdateDivisionCalender() {
  const [isModal, setModal] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
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

  function onCheck() {
    if (Object.values(touched).some((v) => v == true))
      return false
    setModal(true)
  }

  async function onSubmit() {
    try {
      setLoadingModal(true)
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
        router.push(`/division/${param.id}/calender`)
        toast.success(response.message)
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Terjadi kesalahan! Silahkan coba kembali");
    } finally {
      setModal(false)
      setLoadingModal(false)
    }
  }

  function onValidation(kategori: string, val: any) {
    if (kategori == 'title') {
      setDataCalender({ ...isDataCalender, title: val })
      if (val === "") {
        setTouched({ ...touched, title: true })
      } else {
        setTouched({ ...touched, title: false })
      }
    } else if (kategori == 'dateStart') {
      setValue(val)
      setDataCalender({ ...isDataCalender, dateStart: moment(val).format("YYYY-MM-DD") })
      if (val === "") {
        setTouched({ ...touched, dateStart: true })
      } else {
        setTouched({ ...touched, dateStart: false })
      }
    } else if (kategori == 'timeStart') {
      setDataCalender({ ...isDataCalender, timeStart: val })
      if (val == "") {
        setTouched({ ...touched, timeStart: true })
      } else {
        setTouched({ ...touched, timeStart: false })
      }
    } else if (kategori == 'timeEnd') {
      setDataCalender({ ...isDataCalender, timeEnd: val })
      if (val == "" || String(isDataCalender?.timeStart) > String(val)) {
        setTouched({ ...touched, timeEnd: true })
      } else {
        setTouched({ ...touched, timeEnd: false })
      }
    } else if (kategori == 'repeatEventTyper') {
      setDataCalender(isDataCalender => ({ ...isDataCalender, repeatEventTyper: val }))
      if (val == "once") {
        setDataCalender(isDataCalender => ({ ...isDataCalender, repeatValue: "1" }))
      }
      if (val == "" || String(val) == "null") {
        setTouched({ ...touched, repeatEventTyper: true })
      } else {
        setTouched({ ...touched, repeatEventTyper: false })
      }
    } else if (kategori == 'repeatValue') {
      setDataCalender(isDataCalender => ({ ...isDataCalender, repeatValue: val, }))
      if (val === "" || Number(val) <= 0) {
        setTouched(touched => ({ ...touched, repeatValue: true }))
      } else {
        setTouched({ ...touched, repeatValue: false })
      }
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
                onChange={(event) => { onValidation('title', event.target.value) }}
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
                onChange={(val) => { onValidation('dateStart', val) }}
                placeholder="Input Tanggal"
                label="Tanggal"
                minDate={new Date()}
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
                  defaultValue={isDataCalender?.timeStart}
                  onChange={(event) => { onValidation('timeStart', event.target.value) }}
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
                  defaultValue={isDataCalender?.timeEnd}
                  onChange={(event) => { onValidation('timeEnd', event.target.value) }}
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
                onChange={(event) => { setDataCalender({ ...isDataCalender, linkMeet: event.target.value }) }}
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
                  { value: 'weekly', label: 'Mingguan' },
                  { value: 'monthly', label: 'Bulanan' },
                  { value: 'yearly', label: 'Tahunan' },
                ]}
                value={isDataCalender?.repeatEventTyper}
                defaultValue={isDataCalender?.repeatEventTyper}
                onChange={(val: any) => { onValidation('repeatEventTyper', val) }}
                error={
                  touched.repeatEventTyper && (
                    isDataCalender?.repeatEventTyper == "" || String(isDataCalender?.repeatEventTyper) == "null" ? "Ulangi Acara Tidak Boleh Kosong" : null
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
                min={1}
                disabled={(isDataCalender?.repeatEventTyper == "once") ? true : false}
                placeholder='Jumlah pengulangan'
                defaultValue={isDataCalender?.repeatValue}
                onChange={(event) => { onValidation('repeatValue', event.currentTarget.value) }}
                error={
                  touched.repeatValue && (
                    isDataCalender?.repeatValue == "" ? "Jumlah pengulangan tidak boleh kosong" :
                      Number(isDataCalender?.repeatValue) <= 0 ? "Jumlah pengulangan tidak boleh di bawah 1" : ""
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
            onClick={() => onCheck()}
          >
            Simpan
          </Button>
        }
      </Box>
      <LayoutModal loading={loadingModal} opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin mengubah data acara ini? Data ini akan mempengaruhi semua data yang terkait"
        onYes={(val) => {
          if (val) {
            onSubmit()
          } else {
            setModal(false)
          }
        }} />
    </Box>
  );
}

