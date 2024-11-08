"use client"
import { keyWibu, LayoutNavbarNew, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Flex, Group, rem, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useShallowEffect } from '@mantine/hooks';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useWibuRealtime } from 'wibu-realtime';
import { funCreateDetailProject } from '../lib/api_project';

export default function AddDetailTaskProject() {
   const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
   const router = useRouter()
   const [name, setName] = useState("")
   const [openModal, setOpenModal] = useState(false)
   const [loadingModal, setLoadingModal] = useState(false)
   const param = useParams<{ id: string }>()
   const tema = useHookstate(TEMA)
   const [acuan, setAcuan] = useState(false)
   const [touched, setTouched] = useState({
      title: false,
      date: false
   });
   const [dataRealTime, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })

   async function onSubmit() {
      try {
         setLoadingModal(true)
         const res = await funCreateDetailProject(param.id, {
            name,
            dateStart: (value[0] != null) ? moment(value[0]).format('YYYY-MM-DD') : moment(new Date).format('YYYY-MM-DD'),
            dateEnd: (value[1] != null) ? moment(value[1]).format('YYYY-MM-DD') : moment(new Date).format('YYYY-MM-DD'),
         })

         if (res.success) {
            setDataRealtime([{
               category: "project-detail-task",
               id: param.id,
            }])
            toast.success(res.message)
            router.push(`/project/${param.id}`)
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal menambahkan tugas, coba lagi nanti")
      } finally {
         setOpenModal(false)
         setLoadingModal(false)
      }
   }

   function onCheck() {
      const cek = checkAll()
      if (!cek)
         return false
      setOpenModal(true)
   }

   function checkAll() {
      let nilai = true

      if (name == "") {
         setTouched(touched => ({ ...touched, title: true }))
         nilai = false
      }

      if (value[0] == null || value[1] == null) {
         setTouched(touched => ({ ...touched, date: true }))
         nilai = false
      }

      return nilai

   }

   function onValidation(kategori: string, val: string) {
      if (kategori == 'title') {
         setName(val)
         if (val === "") {
            setTouched({ ...touched, title: true })
         } else {
            setTouched({ ...touched, title: false })
         }
      } else if (kategori == 'date') {
         const array = val.split(",")
         if (array[0] == '' || array[1] == '') {
            setTouched({ ...touched, date: true })
         } else {
            setTouched({ ...touched, date: false })
         }
      }
   }

   useShallowEffect(() => {
      if (acuan) {
         onValidation('date', String(value))
      } else {
         setAcuan(true)
      }
   }, [value])

   return (
      <Box>
         <LayoutNavbarNew back="" title={"Tambah Tugas"} menu />
         <Box p={20}>
            <Group
               justify="center"
               bg={"white"}
               py={20}
               style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
            >
               <DatePicker
                  styles={{}}
                  type="range"
                  value={value}
                  onChange={setValue}
                  size="md"
                  c={tema.get().utama}
               />
            </Group>
            <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} mt={20}>
               <Box>
                  <Flex justify="flex-start" align="flex-start" direction="row" wrap="nowrap" gap={5}>
                     <Text fw={500}>Tanggal Mulai</Text> <Text c={"red"}>*</Text>
                  </Flex>
                  <Group
                     justify="center"
                     bg={"white"}
                     h={45}
                     style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
                  >
                     <Text>{value[0] ? `${moment(value[0]).format('DD-MM-YYYY')}` : ""}</Text>
                  </Group>
               </Box>
               <Box>
                  <Flex justify="flex-start" align="flex-start" direction="row" wrap="nowrap" gap={5}>
                     <Text fw={500}>Tanggal Berakhir</Text> <Text c={"red"}>*</Text>
                  </Flex>
                  <Group
                     justify="center"
                     bg={"white"}
                     h={45}
                     style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
                  >
                     <Text>{value[1] ? `${moment(value[1]).format('DD-MM-YYYY')}` : ""}</Text>
                  </Group>
               </Box>
            </SimpleGrid>
            {
               (touched && touched.date)
                  ? <Text size="sm" c={"red"}>Tanggal Tidak Boleh Kosong</Text>
                  : <></>
            }
            <Stack pt={15} pb={100}>
               <TextInput
                  styles={{
                     input: {
                        border: `1px solid ${"#D6D8F6"}`,
                        borderRadius: 10,
                     },
                  }}
                  placeholder="Input Judul Tugas"
                  label="Judul Tugas"
                  required
                  size="md"
                  value={name}
                  onChange={(e) => {
                     onValidation('title', e.target.value)
                  }}
                  error={
                     touched.title && (
                        name == "" ? "Judul Tugas Tidak Boleh Kosong" : null
                     )
                  }
               />
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


         <LayoutModal loading={loadingModal} opened={openModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin menambahkan tugas?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               } else {
                  setOpenModal(false)
               }
            }} />
      </Box>
   );
}

