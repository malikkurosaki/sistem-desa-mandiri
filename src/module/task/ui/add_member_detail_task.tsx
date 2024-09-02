"use client"
import { LayoutNavbarNew, SkeletonSingle, WARNA } from "@/module/_global";
import { funGetDivisionById, IDataMemberDivision } from "@/module/division_new";
import {
   Anchor,
   Avatar,
   Box,
   Button,
   Checkbox,
   Divider,
   Flex,
   Group,
   rem,
   Stack,
   Text,
   TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { funAddMemberTask, funGetTaskDivisionById } from "../lib/api_task";
import { IDataMemberTaskDivision } from "../lib/type_task";
import LayoutModal from "@/module/_global/layout/layout_modal";

export default function AddMemberDetailTask() {
   const router = useRouter()
   const param = useParams<{ id: string, detail: string }>()
   const [selectedFiles, setSelectedFiles] = useState<any>([])
   const [isData, setData] = useState<IDataMemberDivision[]>([])
   const [isDataMember, setDataMember] = useState<IDataMemberTaskDivision[]>([])
   const [selectAll, setSelectAll] = useState(false)
   const [openModal, setOpenModal] = useState(false)
   const [loading, setLoading] = useState(true)


   async function getData() {
      try {
         setLoading(true)
         const response = await funGetDivisionById(param.id)
         if (response.success) {
            setData(response.data.member)
         } else {
            toast.error(response.message)
         }

         const res = await funGetTaskDivisionById(param.detail, 'member');
         if (res.success) {
            setDataMember(res.data)
         } else {
            toast.error(res.message);
         }

         setLoading(false)
      } catch (error) {
         console.log(error)
         toast.error("Gagal mendapatkan anggota, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }


   useShallowEffect(() => {
      getData()
   }, []);

   const handleFileClick = (index: number) => {
      if (selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
         setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != isData[index].idUser))
      } else {
         setSelectedFiles([...selectedFiles, { idUser: isData[index].idUser, name: isData[index].name }])
      }
   };



   const handleSelectAll = () => {
      setSelectAll(!selectAll);
      if (!selectAll) {
         for (let index = 0; index < isData.length; index++) {
            if (!isDataMember.some((i: any) => i.idUser == isData[index].idUser)) {
               if (!selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
                  const newArr = {
                     idUser: isData[index].idUser, name: isData[index].name
                  }
                  setSelectedFiles((selectedFiles: any) => [...selectedFiles, newArr])
               }
            }

         }
      } else {
         setSelectedFiles([]);
      }
   };


   function onVerifikasi() {
      if (selectedFiles.length == 0) {
         return toast.error("Error! silahkan pilih anggota")
      }

      setOpenModal(true)
   }

   async function onSubmit() {
      try {
         const res = await funAddMemberTask(param.detail, { idDivision: param.id, member: selectedFiles });
         if (res.success) {
            toast.success(res.message)
            router.back()
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.log(error)
         toast.error("Gagal menambahkan anggota, coba lagi nanti");
      }
   }


   return (
      <Box>
         <LayoutNavbarNew
            back=""
            title="Pilih Anggota"
            menu
         />
         <Box p={20}>
            <Group justify="space-between" mt={20} onClick={handleSelectAll}>
               <Text c={WARNA.biruTua} fw={"bold"}>
                  Pilih Semua Anggota
               </Text>
               {selectAll ? <FaCheck style={{ marginRight: 10 }} /> : ""}
            </Group>
            {loading ? Array(8)
               .fill(null)
               .map((_, i) => (
                  <Box key={i}>
                     <SkeletonSingle />
                  </Box>
               ))
               :
               <Box mt={15} mb={60}>
                  {isData.map((v, i) => {
                     const isSelected = selectedFiles.some((i: any) => i?.idUser == v.idUser);
                     const found = isDataMember.some((i: any) => i.idUser == v.idUser)
                     return (
                        <Box mb={15} key={i} onClick={() => (!found) ? handleFileClick(i) : null}>
                           <Flex justify={"space-between"} align={"center"}>
                              <Group>
                                 <Avatar src={`/api/file/img?cat=user&file=${v.img}`} alt="it's me" size="lg" />
                                 <Stack align="flex-start" justify="flex-start">
                                    <Text style={{
                                       cursor: 'pointer',
                                       display: 'flex',
                                       alignItems: 'center',
                                    }}>
                                       {v.name}
                                    </Text>
                                    <Text c={"dimmed"}>{(found) ? "sudah menjadi anggota" : ""}</Text>
                                 </Stack>
                              </Group>
                              <Text
                                 style={{
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    paddingLeft: 20,
                                 }}
                              >
                                 {isSelected ? <FaCheck style={{ marginRight: 10 }} /> : ""}
                              </Text>
                           </Flex>
                           <Divider my={"md"} />
                        </Box>
                     );
                  })}
               </Box>
            }
         </Box>
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
               onClick={() => { onVerifikasi() }}
            >
               Simpan
            </Button>
         </Box>

         <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin menambahkan anggota?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               }
               setOpenModal(false)
            }} />
      </Box>
   );
}
