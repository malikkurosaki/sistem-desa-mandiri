'use client'
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";
import { Avatar, Box, Button, Flex, Group, rem, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoIosArrowForward } from "react-icons/io";
import CreateUsersAnnouncement from "./create_users_announcement";
import { globalMemberAnnouncement } from "../lib/val_announcement";
import { funCreateAnnouncement } from "../lib/api_announcement";
import { GroupData, ICreateData, IGroupData } from "../lib/type_announcement";
import { useRouter } from "next/navigation";



export default function CreateAnnouncement() {
   const [isOpen, setOpen] = useState(false)
   const memberGroup = useHookstate(globalMemberAnnouncement)
   const memberValue = memberGroup.get() as GroupData[]
   const [selectedFiles, setSelectedFiles] = useState<any>([])
   const router = useRouter()


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
         const response = await funCreateAnnouncement({
            title: isData.title,
            desc: isData.desc,
            groups: memberValue
         })

         if (response.success) {
            toast.success(response.message)
            // setisData({
            //    ...isData,
            //    title: "",
            //    desc: "",
            // })
            memberGroup.set([])
            router.push('/announcement')
         } else {
            toast.error(response.message)
         }
      } catch (error) {
         console.log(error)
         toast.error("Gagal menambahkan pengumuman, coba lagi nanti");
      }

      setOpen(false)
   }

   async function loadData() {
      setSelectedFiles(JSON.parse(JSON.stringify(memberGroup.get())))
   }

   useShallowEffect(() => {
      loadData()
   }, [])

   function onToChooseMember() {
      setIsChooseMember(true)
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
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
               value={isData.title}
               onChange={(e) => {
                  setisData({ ...isData, title: e.target.value })
                  setTouched({ ...touched, title: false })
               }}
               onBlur={() => setTouched({ ...touched, title: true })}
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
                     color: WARNA.biruTua,
                     borderRadius: WARNA.biruTua,
                     borderColor: WARNA.biruTua,
                  },
               }}
               value={isData.desc}
               onChange={(e) => {
                  setisData({ ...isData, desc: e.target.value })
                  setTouched({ ...touched, desc: false })
               }}
               onBlur={() => setTouched({ ...touched, desc: true })}
               error={
                  touched.desc && (
                     isData.desc == "" ? "Pengumuman Tidak Boleh Kosong" : null
                  )
                }
            />
            <Box pt={10}>
               <Group justify="space-between" style={{
                  border: `1px solid ${WARNA.biruTua}`,
                  padding: 10,
                  borderRadius: 10
               }}
                  onClick={() => { onToChooseMember() }}
               >
                  <Text size="sm">
                     Tambah divisi penerima pengumuman
                  </Text>
                  <IoIosArrowForward />
               </Group>
            </Box>
            <Box pt={20} mb={60}>
               <Text c={WARNA.biruTua} mb={10}>Divisi Terpilih</Text>
               {(memberGroup.length === 0) ? (
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Belum ada anggota</Text>
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
            backgroundColor: `${WARNA.bgWhite}`,
         }}>
            <Button
               c={"white"}
               bg={WARNA.biruTua}
               size="lg"
               radius={30}
               fullWidth
               onClick={() => { 
                  if (
                     isData.title !== "" &&
                     isData.desc !== "" 
                  ) {
                     setOpen(true)
                  } else {
                     toast.error("Isi data dengan lengkap")
                  }
                }}
            >
               Simpan
            </Button>
         </Box>
         <LayoutModal opened={isOpen} onClose={() => setOpen(false)}
            description="Apakah Anda yakin ingin menambahkan data?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               }
               setOpen(false)
            }} />
      </Box>

   )
}