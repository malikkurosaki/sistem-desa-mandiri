'use client'
import { WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { Avatar, Box, Button, Center, Grid, Group, rem, Text, Textarea } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import { funCreateDiscussion } from "../lib/api_discussion";
import { useParams, useRouter } from "next/navigation";

export default function FormCreateDiscussion({ id }: { id: string }) {
   const [isValModal, setValModal] = useState(false)
   const router = useRouter()
   const param = useParams<{ id: string }>()
   const [touched, setTouched] = useState({
      desc: false,
   });
   const [isData, setData] = useState({
      desc: "",
      idDivision: id
   })

   async function createDiscussion(val: boolean) {
      try {
         if (val) {
            const response = await funCreateDiscussion({
               desc: isData.desc,
               idDivision: id
            })

            if (response.success) {
               toast.success(response.message)
               router.push(`/division/${param.id}/discussion/`)
               setValModal(false)
               router.back()
            } else {
               toast.error(response.message)
            }
         }
      } catch (error) {
         console.log(error);
         toast.error("Gagal menambahkan diskusi, coba lagi nanti");
      } finally {
         setValModal(false)
      }
   }



   return (
      <Box >
         <Box p={20} >
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
                        value={isData.desc}
                        onChange={(e) => setData({ ...isData, desc: e.target.value })}
                        onBlur={() => setTouched({ ...touched, desc: true })}
                        error={
                           touched.desc && (
                              isData.desc == "" ? "Form Tidak Boleh Kosong" : null
                           )
                        }
                     />
                  </Box>
               </Grid.Col>
            </Grid>
         </Box>
         <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${WARNA.bgWhite}`,
         }}>
            <Button
               color="white"
               bg={WARNA.biruTua}
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

         <LayoutModal opened={isValModal} onClose={() => setValModal(false)}
            description="Apakah Anda yakin ingin
        menambah data?"
            onYes={(val) => { createDiscussion(val) }} />
      </Box>
   )
}  