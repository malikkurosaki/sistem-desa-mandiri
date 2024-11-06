'use client'
import { keyWibu, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funGetProfileByCookies } from "@/module/user/profile/lib/api_profile";
import { useHookstate } from "@hookstate/core";
import { Avatar, Box, Button, Grid, rem, Textarea } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { useWibuRealtime } from "wibu-realtime";
import { funCreateDiscussion } from "../lib/api_discussion";

export default function FormCreateDiscussion({ id }: { id: string }) {
   const [isValModal, setValModal] = useState(false)
   const [loadingModal, setLoadingModal] = useState(false)
   const router = useRouter()
   const param = useParams<{ id: string, detail: string }>()
   const [loading, setLoading] = useState(true)
   const [img, setIMG] = useState<any | null>()
   const tema = useHookstate(TEMA)
   const [touched, setTouched] = useState({
      desc: false,
   });
   const [isData, setData] = useState({
      desc: "",
      idDivision: id
   })
   const [data, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })

   async function getData() {
      try {
         setLoading(true)
         const res = await funGetProfileByCookies()
         setIMG(`https://wibu-storage.wibudev.com/api/files/${res.data.img}`)
         setLoading(false)
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getData()
   }, [])

   async function createDiscussion(val: boolean) {
      try {
         if (val) {
            setLoadingModal(true)
            const response = await funCreateDiscussion({
               desc: isData.desc,
               idDivision: id
            })

            if (response.success) {
               setDataRealtime(response.notif)
               toast.success(response.message)
               router.push(`/division/${param.id}/discussion/`)
            } else {
               toast.error(response.message)
            }
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal menambahkan diskusi, coba lagi nanti");
      } finally {
         setLoadingModal(false)
         setValModal(false)
      }
   }


   return (
      <Box >
         <Box p={20} >
            <Grid pt={10}>
               <Grid.Col span={2}>
                  <Avatar src={img} alt="it's me" size="lg" />
               </Grid.Col>
               <Grid.Col span={10}>
                  <Box>
                     <Textarea
                        placeholder="Tuliskan apa yang ingin anda diskusikan"
                        styles={{
                           input: {
                              border: 'none',
                              backgroundColor: 'transparent',
                              height: "50vh"
                           }
                        }}
                        value={isData.desc}
                        onChange={(e) => setData({ ...isData, desc: e.target.value })}
                     // onBlur={() => setTouched({ ...touched, desc: true })}
                     // error={
                     //    touched.desc && (
                     //       isData.desc == "" ? "Form Tidak Boleh Kosong" : null
                     //    )
                     // }
                     />
                  </Box>
               </Grid.Col>
            </Grid>
         </Box>
         <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${tema.get().bgUtama}`,
         }}>
            <Button
               color="white"
               bg={tema.get().utama}
               size="lg"
               radius={30}
               fullWidth
               onClick={() => {
                  if (
                     isData.desc !== ""
                  ) {
                     setValModal(true)
                  } else {
                     toast.error("Form Tidak Boleh Kosong");
                  }
               }}
            >
               Simpan
            </Button>
         </Box>

         <LayoutModal loading={loadingModal} opened={isValModal} onClose={() => setValModal(false)}
            description="Apakah Anda yakin ingin menambah data?"
            onYes={(val) => {
               createDiscussion(val)
            }} />
      </Box>
   )
}  