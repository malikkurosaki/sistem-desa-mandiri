'use client'
import { LayoutNavbarNew, TEMA, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { Box, Button, Flex, Group, List, rem, Skeleton, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { funEditAnnouncement, funGetAnnouncementById } from "../lib/api_announcement";
import { useParams, useRouter } from "next/navigation";
import { useHookstate } from "@hookstate/core";
import { globalMemberEditAnnouncement } from "../lib/val_announcement";
import { GroupData, GroupDataEditAnnouncement } from "../lib/type_announcement";
import EditChooseMember from "./edit_choose_member";
import { IoIosArrowForward } from "react-icons/io";

export default function EditAnnouncement() {
   const [isOpen, setOpen] = useState(false)
   const [isChooseDivisi, setChooseDivisi] = useState(false)
   const param = useParams<{ id: string }>()
   const [loading, setLoading] = useState(true)
   const [loadingSubmit, setLoadingSubmit] = useState(false)
   const router = useRouter()
   const tema = useHookstate(TEMA)
   const [touched, setTouched] = useState({
      title: false,
      desc: false
   });
   const [body, setBody] = useState({
      title: "",
      desc: "",
   })
   const memberGroup = useHookstate(globalMemberEditAnnouncement)


   async function fetchOneAnnouncement() {
      try {
         setLoading(true)
         memberGroup.set([])
         const res = await funGetAnnouncementById(param.id)
         if (res.success) {
            setBody({
               title: res.data.title,
               desc: res.data.desc
            })

            const arrNew: GroupData[] = []
            const coba = Object.keys(res.member).map((v: any, i: any) => {
               const newObject = {
                  "id": res.member[v][0].idGroup,
                  "name": v,
                  "Division": res.member[v]
               }

               res.member[v].map((v: any, i: any) => {
                  newObject["Division"][i] = {
                     "id": v.idDivision,
                     "name": v.division
                  }
               })
               arrNew.push(newObject)
            })


            memberGroup.set(arrNew)

         } else {
            toast.error(res.message)
         }

         setLoading(false)

      } catch (error) {
         console.error(error)
         toast.error("Gagal mendapatkan pengumuman, coba lagi nanti")
      } finally {
         setLoading(false)
      }
   }


   useShallowEffect(() => {
      fetchOneAnnouncement()
   }, [])

   async function onSubmit() {
      try {
         setLoadingSubmit(true)
         const response = await funEditAnnouncement(param.id, {
            title: body.title,
            desc: body.desc,
            groups: memberGroup.get() as GroupData[]
         })

         if (response.success) {
            toast.success(response.message)
            setLoadingSubmit(false)
            router.push(`/announcement/${param.id}`)
         } else {
            toast.error(response.message)
         }
         setLoadingSubmit(false)
      } catch (error) {
         console.error(error)
         toast.error("Gagal mengedit pengumuman, coba lagi nanti");
      } finally {
         setLoadingSubmit(false)
      }
      setOpen(false)
   }




   if (isChooseDivisi) return <EditChooseMember onClose={() => { setChooseDivisi(false) }} />


   function onCheck() {
      if (Object.values(touched).some((v) => v == true))
         return false
      setOpen(true)
   }


   function onValidation(kategori: string, val: string) {
      if (kategori == 'title') {
         setBody({ ...body, title: val })
         if (val === "") {
            setTouched({ ...touched, title: true })
         } else {
            setTouched({ ...touched, title: false })
         }
      } else if (kategori == 'desc') {
         setBody({ ...body, desc: val })
         if (val === "") {
            setTouched({ ...touched, desc: true })
         } else {
            setTouched({ ...touched, desc: false })
         }
      }
   }

   return (
      <>
         <LayoutNavbarNew back="" title="Edit Pengumuman" menu={<></>} />
         <Stack
            align="center"
            justify="center"
            gap="xs"
            pt={30}
            px={20}
         >
            {loading ?

               <>
                  <Skeleton height={40} mt={20} radius={30} />
                  <Skeleton height={75} mt={20} radius={10} />
                  <Skeleton height={40} mt={10} radius={10} />
               </>
               :
               <>
                  <TextInput
                     size="md" type="text" radius={30} placeholder="Judul Pengumuman" withAsterisk label="Judul" w={"100%"}
                     styles={{
                        input: {
                           color: tema.get().utama,
                           borderRadius: tema.get().utama,
                           borderColor: tema.get().utama,
                        },
                     }}
                     value={body.title}
                     onChange={(e) => { onValidation('title', e.target.value) }}
                     error={
                        touched.title && (
                           body.title == "" ? "Judul Tidak Boleh Kosong" : null
                        )
                     }
                  />
                  <Textarea
                     size="md"
                     radius={10}
                     w={"100%"}
                     label="Pengumuman"
                     withAsterisk
                     placeholder="Deskripsi Pengumuman"
                     styles={{
                        input: {
                           color: tema.get().utama,
                           borderRadius: tema.get().utama,
                           borderColor: tema.get().utama,
                        },
                     }}
                     value={body.desc}
                     onChange={(e) => { onValidation('desc', e.target.value) }}
                     error={
                        touched.desc && (
                           body.desc == "" ? "Pengumuman Tidak Boleh Kosong" : null
                        )
                     }
                  />
                  <Box pt={10} w={"100%"}>
                     <Group justify="space-between" style={{
                        border: `1px solid ${tema.get().utama}`,
                        maxWidth: rem(550),
                        padding: 10,
                        borderRadius: 10
                     }}

                        onClick={() => { setChooseDivisi(true) }}
                     >
                        <Text size="sm">
                           Tambah divisi penerima pengumuman
                        </Text>
                        <IoIosArrowForward />
                     </Group>
                  </Box>
               </>
            }

         </Stack>
         <Box mb={60} p={20}>
            {loading ?
               Array(3)
                  .fill(null)
                  .map((_, i) => (
                     <Box key={i} mb={20}>
                        <Skeleton height={20} radius={10} mt={20} width={"30%"} />
                        <Skeleton height={20} ml={40} radius={10} mt={10} width={"80%"} />
                        <Skeleton height={20} ml={40} radius={10} mt={20} width={"80%"} />
                     </Box>
                  ))

               :
               memberGroup.get().map((v: any, i: any) => {
                  return (
                     <Box key={i} mt={10}>
                        <Text fw={"bold"}>{v.name}</Text>
                        <Box pl={20} pr={10}>
                           <Flex direction={"column"} gap={"md"}>
                              <List>
                                 {
                                    v.Division.map((division: any) => {
                                       return <List.Item key={division.id}>
                                          <Text lineClamp={1}>{division.name}</Text>
                                       </List.Item>
                                    })
                                 }
                              </List>
                           </Flex>
                        </Box>
                     </Box>
                  );

               }
               )
            }

         </Box>

         <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${tema.get().bgUtama}`,
         }}>
            {loading ?
               <Skeleton height={40} radius={30} />
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
         <LayoutModal opened={isOpen} loading={loadingSubmit} onClose={() => setOpen(false)}
            description="Apakah Anda yakin ingin mengubah data?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               }
               setOpen(false)
            }} />
      </>
   )
}