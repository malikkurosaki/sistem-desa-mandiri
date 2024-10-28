"use client"
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Flex, Group, rem, SimpleGrid, Skeleton, Stack, Text, TextInput } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useShallowEffect } from '@mantine/hooks';
import moment from 'moment';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { funEditDetailProject, funGetDetailProject } from '../lib/api_project';

export default function EditDetailTaskProject() {
   const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
   const [name, setName] = useState("")
   const [idProject, setIdProject] = useState("")
   const param = useParams<{ id: string }>()
   const [openModal, setOpenModal] = useState(false)
   const [loading, setLoading] = useState(true)
   const [loadingModal, setLoadingModal] = useState(false)
   const tema = useHookstate(TEMA)
   const [touched, setTouched] = useState({
      title: false,
      date: false,
   });
   const router = useRouter()

   async function onSubmit() {
      if (value[0] == null || value[1] == null)
         return toast.error("Error! harus memilih tanggal")

      if (name == "")
         return toast.error("Error! harus memasukkan judul tugas")

      try {
         setLoadingModal(true)
         const res = await funEditDetailProject(param.id, {
            title: name,
            dateStart: value[0],
            dateEnd: value[1],

         })

         if (res.success) {
            toast.success(res.message);
            router.push('/project/' + idProject)
         } else {
            toast.error(res.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal edit detail tugas Kegiatan, coba lagi nanti");
      } finally {
         setLoadingModal(false)
         setOpenModal(false)
      }
   }

   async function getOneData() {
      try {
         setLoading(true)
         const res = await funGetDetailProject(param.id);
         if (res.success) {
            setIdProject(res.data.idProject)
            setName(res.data.title)
            setValue([
               new Date(moment(res.data.dateStart).format('YYYY-MM-DD')),
               new Date(moment(res.data.dateEnd).format('YYYY-MM-DD')),
            ])
         } else {
            toast.error(res.message);
         }
         setLoading(false);
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan detail tugas Kegiatan, coba lagi nanti");
      } finally {
         setLoading(false);
      }
   }

   useShallowEffect(() => {
      getOneData();
   }, [param.id])

   function onCheck() {
      if (Object.values(touched).some((v) => v == true))
         return false
      setOpenModal(true)
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
      onValidation('date', String(value))
   }, [value])

   return (
      <Box>
         <LayoutNavbarNew back="" title={"Edit Tanggal dan tugas"} menu />
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
                  {loading ?
                     <Skeleton height={45} mt={20} radius={10} />
                     :
                     <>
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
                     </>
                  }
               </Box>
               <Box>
                  {loading ?
                     <Skeleton height={45} mt={20} radius={10} />
                     :
                     <>
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
                     </>
                  }
               </Box>
            </SimpleGrid>
            {
               (!loading && touched && touched.date)
                  ? <Text size="sm" c={"red"}>Tanggal Tidak Boleh Kosong</Text>
                  : <></>
            }
            <Stack pt={15} pb={100}>
               {loading ?
                  <Skeleton height={40} mt={20} radius={10} />
                  :
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
                     onChange={(e) => { onValidation('title', e.target.value) }}
                     error={
                        touched.title && (
                           name == "" ? "Judul Tugas Tidak Boleh Kosong" : null
                        )
                     }
                  />
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
                  onClick={() => { onCheck() }}
               >
                  Simpan
               </Button>
            }
         </Box>

         <LayoutModal loading={loadingModal} opened={openModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin mengubah data?"
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
