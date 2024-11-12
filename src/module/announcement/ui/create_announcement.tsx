'use client'
import { keyWibu, LayoutNavbarNew, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";
import { Box, Button, Flex, Group, rem, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowForward } from "react-icons/io";
import { useWibuRealtime } from "wibu-realtime";
import { funCreateAnnouncement } from "../lib/api_announcement";
import { GroupData } from "../lib/type_announcement";
import { globalMemberAnnouncement } from "../lib/val_announcement";
import CreateUsersAnnouncement from "./create_users_announcement";

export default function CreateAnnouncement() {
   const [isOpen, setOpen] = useState(false)
   const memberGroup = useHookstate(globalMemberAnnouncement)
   const memberValue = memberGroup.get() as GroupData[]
   const [selectedFiles, setSelectedFiles] = useState<any>([])
   const [loadingKonfirmasi, setLoadingKonfirmasi] = useState(false)
   const router = useRouter()
   const tema = useHookstate(TEMA)
   const [data, setData] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })
   const [isChooseMember, setIsChooseMember] = useState(false)
   const [isData, setisData] = useState({
      title: "",
      desc: "",
   })
   const [touched, setTouched] = useState({
      title: false,
      desc: false
   });


   async function onSubmit() {
      try {
         setLoadingKonfirmasi(true)
         const response = await funCreateAnnouncement({
            title: isData.title,
            desc: isData.desc,
            groups: memberValue
         })

         if (response.success) {
            toast.success(response.message)
            setData(response.notif)
            memberGroup.set([])
            router.push('/announcement')
         } else {
            toast.error(response.message)
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal menambahkan pengumuman, coba lagi nanti");
      } finally {
         setLoadingKonfirmasi(false)
         setOpen(false)
      }

   }

   async function loadData() {
      setSelectedFiles(JSON.parse(JSON.stringify(memberGroup.get())))
   }

   useShallowEffect(() => {
      loadData()
   }, [])


   function onCheck() {
      const cek = checkAll()
      if (!cek)
         return false

      if (memberValue.length == 0)
         return toast.error("Error! silahkan pilih divisi")

      setOpen(true)
   }

   function checkAll() {
      let nilai = true
      if (isData.title === "") {
         setTouched(touched => ({ ...touched, title: true }))
         nilai = false
      }
      if (isData.desc === "") {
         setTouched(touched => ({ ...touched, desc: true }))
         nilai = false
      }
      return nilai
   }


   function onValidation(kategori: string, val: string) {
      if (kategori == 'title') {
         setisData({ ...isData, title: val })
         if (val === "") {
            setTouched({ ...touched, title: true })
         } else {
            setTouched({ ...touched, title: false })
         }
      } else if (kategori == 'desc') {
         setisData({ ...isData, desc: val })
         if (val === "") {
            setTouched({ ...touched, desc: true })
         } else {
            setTouched({ ...touched, desc: false })
         }
      }
   }

   if (isChooseMember) return <CreateUsersAnnouncement onClose={() => { setIsChooseMember(false) }} />

   return (
      <Box>
         <LayoutNavbarNew back="/announcement/" title="Tambah Pengumuman" menu={<></>} />
         <Stack
            p={20}
         >
            <TextInput
               size="md" type="text" radius={10} placeholder="Judul Pengumuman" withAsterisk label="Judul" w={"100%"}
               styles={{
                  input: {
                     color: tema.get().utama,
                     borderRadius: tema.get().utama,
                     borderColor: tema.get().utama,
                  },
               }}
               value={isData.title}
               onChange={(e) => { onValidation('title', e.target.value) }}
               error={
                  touched.title && (
                     isData.title == "" ? "Judul Tidak Boleh Kosong" : null
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
               value={isData.desc}
               onChange={(e) => { onValidation('desc', e.target.value) }}
               error={
                  touched.desc && (
                     isData.desc == "" ? "Pengumuman Tidak Boleh Kosong" : null
                  )
               }
            />
            <Box pt={10}>
               <Group justify="space-between" style={{
                  border: `1px solid ${tema.get().utama}`,
                  padding: 10,
                  borderRadius: 10
               }}
                  onClick={() => { setIsChooseMember(true) }}
               >
                  <Text size="sm">
                     Tambah divisi penerima pengumuman
                  </Text>
                  <IoIosArrowForward />
               </Group>
            </Box>
            <Box pt={20} mb={100}>
               <Text c={tema.get().utama} mb={10}>Divisi Terpilih</Text>
               {(memberGroup.length === 0) ? (
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Belum ada divisi yang dipilih</Text>
               ) : memberGroup.get().map((v: any, i: any) => {
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
               })}
            </Box>
         </Stack>
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
               onClick={() => { onCheck() }}
            >
               Simpan
            </Button>
         </Box>
         <LayoutModal loading={loadingKonfirmasi} opened={isOpen} onClose={() => setOpen(false)}
            description="Apakah Anda yakin ingin menambahkan data?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               } else {
                  setOpen(false)
               }
            }} />
      </Box>

   )
}