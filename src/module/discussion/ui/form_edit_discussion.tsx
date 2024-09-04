'use client'
import { WARNA } from "@/module/_global"
import LayoutModal from "@/module/_global/layout/layout_modal"
import { Box, Group, Avatar, Textarea, Button, Grid, rem, Skeleton } from "@mantine/core"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"
import { funEditDiscussion, funGetDiscussionById } from "../lib/api_discussion"
import { useShallowEffect } from "@mantine/hooks"
import { funGetProfileByCookies } from "@/module/user/profile/lib/api_profile"

export default function FormEditDiscussion() {
   const [isValModal, setValModal] = useState(false)
   const router = useRouter()
   const param = useParams<{ id: string, detail: string }>()
   const [isDataOne, setDataOne] = useState("")
   const [loading, setLoading] = useState(true)
   const [img, setIMG] = useState<any | null>()
   const [touched, setTouched] = useState({
      desc: false,
   });

   async function fetchGetOneDiscussion() {
      try {
         setLoading(true)
         const response = await funGetDiscussionById(param.detail)
         setDataOne(response.data.desc)
      } catch (error) {
         console.log(error);
         toast.error("Gagal menampilkan discussion, coba lagi nanti");
      } finally {
         setLoading(false)
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

   async function getData() {
      try {
        setLoading(true)
        const res = await funGetProfileByCookies()
        setIMG(`/api/file/img?jenis=image&cat=user&file=${res.data.img}`)
        setLoading(false)
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false)
      }
    }
   
   useShallowEffect(() => {
      fetchGetOneDiscussion()
      getData()
   }, [])



   return (
      <Box >
         <Box p={20}>
            <Grid gutter={0} pt={10}>
               <Grid.Col span={2}>
                  {loading ? 
                    <Skeleton height={60} width={60} radius={100} />  
               :   
                  <Avatar src={img} alt="it's me" size="lg" />
               }
               </Grid.Col>
               <Grid.Col span={10}>
                  {loading ?
                      Array(10)
                      .fill(null)
                      .map((_, i) => (
                        <Box key={i} mb={20}>
                          <Skeleton height={20} radius={10} />
                        </Box>
                      ))
               :   
                  <Box>
                     <Textarea
                        placeholder="Tuliskan apa yang ingin anda diskusikan"
                        styles={{
                           input: {
                              border: 'none',
                              backgroundColor: 'transparent',
                              height: "70vh"
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
               }
               </Grid.Col>
            </Grid>
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
            }
         </Box>

         <LayoutModal opened={isValModal} onClose={() => setValModal(false)}
            description="Apakah Anda yakin ingin mengubah data?"
            onYes={(val) => { fetchEditDiscussion(val) }} />
      </Box>
   )
}