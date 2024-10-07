"use client";
import { LayoutNavbarNew, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";
import { Box, Button, Group, rem, SimpleGrid, Skeleton, Stack, Text, TextInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { useShallowEffect } from "@mantine/hooks";
import moment from "moment";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { funEditDetailTask, funGetDetailTask } from "../lib/api_task";


export default function EditDetailTask() {
   const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
   const router = useRouter()
   const [title, setTitle] = useState("")
   const param = useParams<{ id: string, detail: string }>()
   const [openModal, setOpenModal] = useState(false)
   const [loading, setLoading] = useState(true)
   const [idTugas, setIdTugas] = useState("")
   const tema = useHookstate(TEMA)
   const [touched, setTouched] = useState({
      title: false,
   });

   async function onSubmit() {
      if (value[0] == null || value[1] == null)
         return toast.error("Error! harus memilih tanggal")

      if (title == "")
         return toast.error("Error! harus memasukkan judul tugas")

      try {
         const res = await funEditDetailTask(param.detail, {
            title: title,
            dateStart: value[0],
            dateEnd: value[1],
         })

         if (res.success) {
            toast.success(res.message);
            router.push(`/division/${param.id}/task/${idTugas}`)
         } else {
            toast.error(res.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal edit detail tugas divisi, coba lagi nanti");
      }

   }

   async function getOneData() {
      try {
         setLoading(true)
         const res = await funGetDetailTask(param.detail);
         if (res.success) {
            setIdTugas(res.data.idProject)
            setTitle(res.data.title)
            setValue([
               new Date(moment(res.data.dateStart).format('YYYY-MM-DD')),
               new Date(moment(res.data.dateEnd).format('YYYY-MM-DD')),
            ])
         } else {
            toast.error(res.message);
         }
         setLoading(false)
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan detail tugas divisi, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getOneData();
   }, [param.detail])

   function onCheck() {
      if (Object.values(touched).some((v) => v == true))
         return false
      setOpenModal(true)
   }


   function onValidation(kategori: string, val: string) {
      if (kategori == 'title') {
         setTitle(val)
         if (val === "") {
            setTouched({ ...touched, title: true })
         } else {
            setTouched({ ...touched, title: false })
         }
      }
   }

   return (
      <Box>
         <LayoutNavbarNew back="" title={"Edit Tanggal dan Tugas"} menu />
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
                        <Text>Tanggal Mulai</Text>
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
                        <Text c={tema.get().utama}>Tanggal Berakhir</Text>
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
                     label={"Judul Tahapan"}
                     required
                     placeholder="Input Judul Tahapan"
                     size="md"
                     value={title}
                     error={
                        touched.title &&
                        (title == "" ? "Error! harus memasukkan Judul Tahapan" : ""
                        )
                     }
                     onChange={(e) => {
                        onValidation('title', e.target.value)
                     }}
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

         <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin mengubah data?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               }
               setOpenModal(false)
            }} />
      </Box>
   );
}
