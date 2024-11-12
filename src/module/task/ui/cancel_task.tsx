"use client";
import { keyWibu, LayoutNavbarNew, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";
import { Box, Button, rem, Stack, Textarea, } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { funCancelTask } from "../lib/api_task";
import { useWibuRealtime } from "wibu-realtime";


export default function CancelTask() {
   const router = useRouter()
   const [alasan, setAlasan] = useState("")
   const [openModal, setOpenModal] = useState(false)
   const [loadingModal, setLoadingModal] = useState(false)
   const tema = useHookstate(TEMA)
   const param = useParams<{ id: string, detail: string }>()
   const [touched, setTouched] = useState({
      reason: false,
   });
   const [dataRealTime, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })

   function onVerification() {
      const cek = checkAll()
      if (!cek) {
         return false
      }
      setOpenModal(true)
   }

   function onValidation(kategori: string, val: string) {
      if (kategori == 'alasan') {
         setAlasan(val)
         if (val == "") {
            setTouched({ ...touched, reason: true })
         } else {
            setTouched({ ...touched, reason: false })
         }
      }
   }

   function checkAll() {
      if (alasan == "") {
         setTouched({ ...touched, reason: true })
         return false
      }
      return true
   }

   async function onSubmit() {
      try {
         setLoadingModal(true)
         const res = await funCancelTask(param.detail, { reason: alasan })
         if (res.success) {
            setDataRealtime([{
               category: "tugas-detail-status",
               id: param.detail,
            }])
            toast.success(res.message)
            router.push("./")
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal membatalkan tugas, coba lagi nanti")
      } finally {
         setLoadingModal(false)
         setOpenModal(false)
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
                  onChange={(event) => { onValidation('alasan', event.target.value) }}
                  error={touched.reason ? "Error! harus memasukkan alasan pembatalan tugas" : ""}
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
            description="Apakah Anda yakin ingin membatalkan tugas ini? Pembatalan tugas bersifat permanen"
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
