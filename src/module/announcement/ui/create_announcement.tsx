'use client'
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { globalMemberDivision } from "@/module/division_new/lib/val_division";
import { useHookstate } from "@hookstate/core";
import { Avatar, Box, Button, Flex, Group, Stack, Text, Textarea, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { IoIosArrowForward } from "react-icons/io";
import CreateUsersAnnouncement from "./create_users_announcement";
import { globalMemberAnnouncement } from "../lib/val_announcement";
import { funCreateAnnouncement } from "../lib/api_announcement";
import { group } from "console";
import { GroupData, ICreateData, IGroupData } from "../lib/type_announcement";

export type DataMember = DataGroup[]

export interface DataGroup {
  id: string
  name: string
  Division: Division[]
}

export interface Division {
  id: string
  name: string
}


export default function CreateAnnouncement() {
   const [isOpen, setOpen] = useState(false)
   const memberGroup = useHookstate(globalMemberAnnouncement)
   const memberValue = memberGroup.get() as GroupData[]
   const [selectedFiles, setSelectedFiles] = useState<any>([]);

   const [isChooseMember, setIsChooseMember] = useState(false)
   const [isData, setisData] = useState({
      title: "",
      desc: "",
   })



   function onTrue(val: boolean) {
      if (val) {
         toast.success("Sukses! Data tersimpan");
      }
      setOpen(false)
   }

   async function onSubmit(val: boolean) {
      // const response = await funCreateAnnouncement(
      //    {
      //       title: isData.title,
      //       desc: isData.desc,
      //       groups: memberValue
      //    },
         
      // )
      setOpen(false)
      console.log(isData)
      console.log(memberValue)

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

   if (isChooseMember) return <CreateUsersAnnouncement  onClose={() => { setIsChooseMember(false) }} />

   return (
      <Box>
         <LayoutNavbarNew back="" title="Tambah Pengumuman" menu={<></>} />
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
               onChange={(e) => { setisData({ ...isData, title: e.target.value }) }}
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
               onChange={(e) => { setisData({ ...isData, desc: e.target.value }) }}
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
                     Tambah Anggota
                  </Text>
                  <IoIosArrowForward />
               </Group>
            </Box>
            <Box pt={20}>
            <Text c={WARNA.biruTua} mb={10}>Anggota Terpilih</Text>
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
         <Box mt={30} mx={20}>
            <Button
               c={"white"}
               bg={WARNA.biruTua}
               size="md"
               radius={30}
               fullWidth
               onClick={() => { setOpen(true) }}
            >
               Simpan
            </Button>
         </Box>
         <LayoutModal opened={isOpen} onClose={() => setOpen(false)}
            description="Apakah Anda yakin ingin menambahkan data?"
            onYes={(val) => { onSubmit(val) }} />
      </Box>

   )
}