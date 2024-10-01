"use client";
import { LayoutNavbarNew, TEMA } from "@/module/_global";
import {
   Box,
   Button,
   rem,
   Stack,
   Textarea,
} from "@mantine/core";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { funCancelTask } from "../lib/api_task";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";


export default function CancelTask() {
   const router = useRouter()
   const [alasan, setAlasan] = useState("")
   const [openModal, setOpenModal] = useState(false)
   const tema = useHookstate(TEMA)
   const param = useParams<{ id: string, detail: string }>()
   const [touched, setTouched] = useState({
      reason: false,
   });

   function onVerification() {
      if (alasan == "")
         return toast.error("Error! harus memasukkan alasan pembatalan tugas")

      setOpenModal(true)
   }

   async function onSubmit() {
      try {
         const res = await funCancelTask(param.detail, { reason: alasan })
         if (res.success) {
            toast.success(res.message)
            router.push("./")
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal membatalkan tugas, coba lagi nanti")
      }
   }



   return (
      <Box>
         <LayoutNavbarNew back="" title={"Pembatalan Tugas"} menu />
         <Box p={20}>
            <Stack pt={15}>
               <Textarea styles={{
                  input: {
                     border: `1px solid ${"#D6D8F6"}`,
                     borderRadius: 10,
                  },
               }}
                  value={alasan}
                  size="md" placeholder='Contoh : Tugas tidak sesuai' label="Alasan Pembatalan"
                  required
                  onChange={(event) => {
                     setAlasan(event.target.value)
                     setTouched({ ...touched, reason: false })
                  }}
                  error={touched.reason ? "Error! harus memasukkan alasan pembatalan tugas" : ""}
                  onBlur={() => setTouched({ ...touched, reason: true })}
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


         <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin membatalkan tugas ini? Pembatalan tugas bersifat permanen"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               }
               setOpenModal(false)
            }} />
      </Box>
   );
}
