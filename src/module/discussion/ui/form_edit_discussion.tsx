'use client'
import { WARNA } from "@/module/_global"
import LayoutModal from "@/module/_global/layout/layout_modal"
import { Box, Group, Avatar, Textarea, Button, Grid } from "@mantine/core"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { funEditDiscussion, funGetDiscussionById } from "../lib/api_discussion"
import { useShallowEffect } from "@mantine/hooks"

export default function FormEditDiscussion() {
   const [isValModal, setValModal] = useState(false)
   const router = useRouter()
   const param = useParams<{ id: string, detail: string }>()
   const [isDataOne, setDataOne] = useState("")
   const [touched, setTouched] = useState({
      desc: false,
    });

   async function fetchGetOneDiscussion() {
      try {
         const response = await funGetDiscussionById(param.detail)
         setDataOne(response.data.desc)
      } catch (error) {
         console.log(error);
         toast.error("Gagal menampilkan discussion, coba lagi nanti");
      }
   }

   async function fetchEditDiscussion(val: boolean) {
      try {
         if (val) {
            const response = await funEditDiscussion(param.detail, {
               desc: isDataOne
            })
            if (response.success) {
               toast.success(response.message)
               setValModal(false)
               router.push(`/division/${param.id}/discussion/${param.detail}`)
            } else {
               toast.error(response.message)
            }
         }
         setValModal(false)
      } catch (error) {
         console.log(error);
         setValModal(false)
         toast.error("Gagal menambahkan diskusi, coba lagi nanti");
      } finally {
         setValModal(false)
      }
   }

   useShallowEffect(() => {
      fetchGetOneDiscussion()
   }, [])

   return (
      <Box pos={"relative"} h={"89vh"}>
         <Box p={20}>
            <Grid gutter={0} pt={10}>
               <Grid.Col span={"auto"}>
                  <Avatar src={'https://i.pravatar.cc/1000?img=32'} alt="it's me" size="lg" />
               </Grid.Col>
               <Grid.Col span={10}>
                  <Box>
                     <Textarea
                        placeholder="Tuliskan apa yang ingin anda diskusikan"
                        styles={{
                           input: {
                              border: 'none',
                              backgroundColor: 'transparent',
                              height: "60vh"
                           }
                        }}
                        value={isDataOne}
                        onChange={(e) => setDataOne(e.target.value)}
                        onBlur={() => setTouched({ ...touched, desc: true })}
                        error={
                           touched.desc && (
                             isDataOne == "" ? "Form Tidak Boleh Kosong" : null
                           )
                         }
                     />
                  </Box>
               </Grid.Col>
            </Grid>
            <Box pos={"absolute"} bottom={10} left={0} right={0} p={20}>
               <Button
                  color="white"
                  bg={WARNA.biruTua}
                  size="lg"
                  radius={30}
                  fullWidth
                  onClick={() => {
                     if (
                        isDataOne !== ""
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
         </Box>

         <LayoutModal opened={isValModal} onClose={() => setValModal(false)}
            description="Apakah Anda yakin ingin mengubah data?"
            onYes={(val) => { fetchEditDiscussion(val) }} />
      </Box>
   )
}