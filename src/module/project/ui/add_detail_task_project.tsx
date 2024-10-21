"use client"
import { keyWibu, LayoutNavbarNew, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Group, rem, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
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
   const [touched, setTouched] = useState({
      name: false,
   });
   const [dataRealTime, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })

   function onVerification() {
      if (value[0] == null || value[1] == null)
         return toast.error("Error! harus memilih tanggal")

      if (name == "")
         return toast.error("Error! harus memasukkan judul tugas")

      setOpenModal(true)
   }

   async function onSubmit() {
      try {
         setLoadingModal(true)
         const res = await funCreateDetailProject(param.id, {
            name,
            dateStart: (value[0] != null) ? value[0] : new Date,
            dateEnd: (value[1] != null) ? value[1] : new Date,
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

   return (
      <Box>
         <LayoutNavbarNew back="" title={"Tambah Kegiatan"} menu />
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
                  <Text>Tanggal Mulai</Text>
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
                  <Text>Tanggal Berakhir</Text>
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
            <Stack pt={15} pb={100}>
               <TextInput
                  styles={{
                     input: {
                        border: `1px solid ${"#D6D8F6"}`,
                        borderRadius: 10,
                     },
                  }}
                  placeholder="Input Nama Tahapan"
                  label="Judul Tahapan"
                  required
                  size="md"
                  value={name}
                  onChange={(e) => {
                     setName(e.target.value)
                     setTouched({ ...touched, name: false })
                  }}
                  onBlur={() => setTouched({ ...touched, name: true })}
                  error={
                     touched.name && (
                        name == "" ? "Judul Tidak Boleh Kosong" : null
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
               onClick={() => { onVerification() }}
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

