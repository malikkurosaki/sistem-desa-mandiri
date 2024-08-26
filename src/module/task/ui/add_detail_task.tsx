"use client";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import {
   Avatar,
   Box,
   Button,
   Flex,
   Group,
   Input,
   SimpleGrid,
   Stack,
   Text,
   TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { DatePicker } from "@mantine/dates";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { IFormDateTask } from "../lib/type_task";
import moment from "moment";
import { funCreateDetailTask } from "../lib/api_task";
import LayoutModal from "@/module/_global/layout/layout_modal";


export default function AddDetailTask() {
   const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
   const router = useRouter()
   const [title, setTitle] = useState("")
   const [openModal, setOpenModal] = useState(false)
   const param = useParams<{ id: string, detail: string }>()
   const [touched, setTouched] = useState({
      title: false,
   });

   function onVerification() {
      if (value[0] == null || value[1] == null)
         return toast.error("Error! harus memilih tanggal")

      if (title == "")
         return toast.error("Error! harus memasukkan judul tugas")

      setOpenModal(true)
   }

   async function onSubmit() {
      try {
         const res = await funCreateDetailTask(param.detail, {
            title,
            dateStart: (value[0] != null) ? value[0] : new Date,
            dateEnd: (value[1] != null) ? value[1] : new Date,
            idDivision: param.id
         })

         if (res.success) {
            toast.success(res.message)
            setOpenModal(false)
            router.push(`/division/${param.id}/task/${param.detail}`)
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.log(error)
         toast.error("Gagal menambahkan tugas, coba lagi nanti")
      }
   }



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
                  c={WARNA.biruTua}
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
                  <Text c={WARNA.biruTua}>Tanggal Berakhir</Text>
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
            <Stack pt={15}>
               <TextInput
                  styles={{
                     input: {
                        border: `1px solid ${"#D6D8F6"}`,
                        borderRadius: 10,
                     },
                  }}
                  label="Tahapan"
                  placeholder="Input Nama Tahapan"
                  size="md"
                  required
                  value={title}
                  onChange={(e) => {
                     setTitle(e.target.value)
                     setTouched({ ...touched, title: false })
                     }
                  }
                  onBlur={() => setTouched({ ...touched, title: true })}
                  error={touched.title ? "Tahapan wajib diisi" : undefined}
               />
            </Stack>
            <Box mt={"xl"}>
               <Button
                  c={"white"}
                  bg={WARNA.biruTua}
                  size="lg"
                  radius={30}
                  fullWidth
                  onClick={() => { onVerification() }}
               >
                  Simpan
               </Button>
            </Box>
         </Box>


         <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin menambahkan tugas?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               }
               setOpenModal(false)
            }} />
      </Box>
   );
}
