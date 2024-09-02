"use client";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import {
   Box,
   Button,
   Input,
   rem,
   Skeleton,
   Stack,
   Textarea,
   TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funEditTask, funGetTaskDivisionById } from "../lib/api_task";
import { useShallowEffect } from "@mantine/hooks";


export default function EditTask() {
   const router = useRouter()
   const [title, setTitle] = useState("")
   const [openModal, setOpenModal] = useState(false)
   const param = useParams<{ id: string, detail: string }>()
   const [loading, setLoading] = useState(true)
   const [touched, setTouched] = useState({
      title: false,
   });

   function onVerification() {
      if (title == "")
         return toast.error("Error! harus memasukkan judul tugas")

      setOpenModal(true)
   }

   async function onSubmit() {
      try {
         const res = await funEditTask(param.detail, { title })
         if (res.success) {
            toast.success(res.message)
            router.push("./")
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.log(error)
         toast.error("Gagal mengedit tugas, coba lagi nanti")
      }
   }

   async function getOneData() {
      try {
         setLoading(true)
         const res = await funGetTaskDivisionById(param.detail, 'data');
         if (res.success) {
            setTitle(res.data.title);
         } else {
            toast.error(res.message);
         }
         setLoading(false);
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan data tugas divisi, coba lagi nanti");
      } finally {
         setLoading(false);
      }
   }

   useShallowEffect(() => {
      getOneData();
   }, [param.detail])



   return (
      <Box >
         <LayoutNavbarNew back="" title={"Edit Judul Tugas"} menu />
         <Box p={20}>
            <Stack pt={15}>
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
                     required
                     placeholder="Tugas"
                     label="Judul Tugas"
                     size="md"
                     value={title}
                     onChange={(e) => {
                        setTitle(e.target.value)
                        setTouched({ ...touched, title: false })
                     }}
                     error={
                        touched.title && (
                           title == "" ? "Error! harus memasukkan judul tugas" : null
                        )
                     }
                     onBlur={() => setTouched({ ...touched, title: true })}
                  />
               }
            </Stack>
         </Box>
         <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${WARNA.bgWhite}`,
         }}>
            {loading ?
               <Skeleton height={50} radius={30} />
               :
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
            }

         </Box>


         <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin mengedit tugas ini?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               }
               setOpenModal(false)
            }} />
      </Box>
   );
}
