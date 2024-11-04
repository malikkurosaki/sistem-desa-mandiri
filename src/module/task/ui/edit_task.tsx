"use client";
import { keyWibu, LayoutNavbarNew, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";
import { Box, Button, rem, Skeleton, Stack, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useWibuRealtime } from "wibu-realtime";
import { funEditTask, funGetTaskDivisionById } from "../lib/api_task";


export default function EditTask() {
   const router = useRouter()
   const [title, setTitle] = useState("")
   const [openModal, setOpenModal] = useState(false)
   const [loadingModal, setLoadingModal] = useState(false)
   const param = useParams<{ id: string, detail: string }>()
   const [loading, setLoading] = useState(true)
   const tema = useHookstate(TEMA)
   const [touched, setTouched] = useState({
      title: false,
   });
   const [dataRealTime, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })

   function onVerification() {
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

   async function onSubmit() {
      try {
         setLoadingModal(true)
         const res = await funEditTask(param.detail, { title })
         if (res.success) {
            setDataRealtime([{
               category: "tugas-detail",
               id: param.detail,
            }])
            toast.success(res.message)
            router.push("./")
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal mengedit tugas, coba lagi nanti")
      } finally {
         setLoadingModal(false)
         setOpenModal(false)
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
                     onChange={(e) => { onValidation('title', e.target.value) }}
                     error={
                        touched.title && (
                           title == "" ? "Judul Tugas Tidak Boleh Kosong" : null
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
                  onClick={() => { onVerification() }}
               >
                  Simpan
               </Button>
            }

         </Box>


         <LayoutModal loading={loadingModal} opened={openModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin mengedit tugas ini?"
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
