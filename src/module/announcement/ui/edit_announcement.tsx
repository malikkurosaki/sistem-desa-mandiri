'use client'
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { Box, Button, Flex, List, rem, Skeleton, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { funEditAnnouncement, funGetAnnouncementById } from "../lib/api_announcement";
import { useParams } from "next/navigation";
import { useHookstate } from "@hookstate/core";
import { globalMemberEditAnnouncement } from "../lib/val_announcement";
import { GroupData, GroupDataEditAnnouncement } from "../lib/type_announcement";
import EditChooseMember from "./edit_choose_member";

export default function EditAnnouncement() {
   const [isOpen, setOpen] = useState(false)
   const [isChooseDivisi, setChooseDivisi] = useState(false)
   const param = useParams<{ id: string }>()
   const [loading, setLoading] = useState(true)
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
         const response = await funEditAnnouncement(param.id, {
            title: body.title,
            desc: body.desc,
            groups: memberGroup.get() as GroupData[]
         })

         if (response.success) {
            toast.success(response.message)
         } else {
            toast.error(response.message)
         }
      } catch (error) {
         console.log(error)
         toast.error("Gagal mengedit pengumuman, coba lagi nanti");
      }

      setOpen(false)
   }




   if (isChooseDivisi) return <EditChooseMember onClose={() => { setChooseDivisi(false) }} />


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
                  <Skeleton height={40} mt={10} radius={30} />
               </>
               :
               <>
                  <TextInput
                     size="md" type="text" radius={30} placeholder="Judul Pengumuman" withAsterisk label="Judul" w={"100%"}
                     styles={{
                        input: {
                           color: WARNA.biruTua,
                           borderRadius: WARNA.biruTua,
                           borderColor: WARNA.biruTua,
                        },
                     }}
                     value={body.title}
                     onChange={(val) => {
                        setBody({ ...body, title: val.target.value })
                        setTouched({ ...touched, title: false })
                     }}
                     onBlur={() => setTouched({ ...touched, title: true })}
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
                           color: WARNA.biruTua,
                           borderRadius: WARNA.biruTua,
                           borderColor: WARNA.biruTua,
                        },
                     }}
                     value={body.desc}
                     onChange={(val) => {
                        setBody({ ...body, desc: val.target.value })
                        setTouched({ ...touched, desc: false })
                     }}
                     onBlur={() => setTouched({ ...touched, desc: true })}
                     error={
                        touched.desc && (
                           body.desc == "" ? "Pengumuman Tidak Boleh Kosong" : null
                        )
                     }

                  />
                  <Button onClick={() => { setChooseDivisi(true) }} rightSection={<HiOutlineChevronRight size={14} />} variant="default" fullWidth radius={30} size="md" mt={10}>
                     Pilih Divisi
                  </Button>
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
                        <Box pl={20}>
                           <Flex direction={"column"} gap={"md"}>
                              {v.Division.map((division: any) => (
                                 <li key={division.id}>{division.name}</li>
                              ))}
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
            backgroundColor: `${WARNA.bgWhite}`,
         }}>
            {loading ?
               <Skeleton height={40} radius={30} />
               :
               <Button
                  c={"white"}
                  bg={WARNA.biruTua}
                  size="lg"
                  radius={30}
                  fullWidth
                  onClick={() => {
                     if (
                        body.title !== "" &&
                        body.desc !== ""
                     ) {
                        setOpen(true)
                     } else {
                        toast.error("Isi data dengan lengkap")
                     }
                  }}
               >
                  Simpan
               </Button>
            }
         </Box>
         <LayoutModal opened={isOpen} onClose={() => setOpen(false)}
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