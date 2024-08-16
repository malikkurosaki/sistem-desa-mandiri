'use client'
import { WARNA } from "@/module/_global";
import { Box, Group, Flex, Avatar, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { funGetTaskDivisionById } from "../lib/api_task";
import { IDataMemberTaskDivision } from "../lib/type_task";


export default function ListAnggotaDetailTask() {
   const [isData, setData] = useState<IDataMemberTaskDivision[]>([])
   const [loading, setLoading] = useState(true)
   const param = useParams<{ id: string, detail: string }>()
   async function getOneData() {
      try {
         setLoading(true)
         const res = await funGetTaskDivisionById(param.detail, 'member');
         if (res.success) {
            setData(res.data)
         } else {
            toast.error(res.message);
         }

      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan member tugas divisi, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getOneData();
   }, [param.detail])


   return (
      <Box pt={20}>
         <Group justify="space-between">
            <Text c={WARNA.biruTua}>Anggota Terpilih</Text>
            <Text c={WARNA.biruTua}>Total {isData.length} Anggota</Text>
         </Group>
         <Box pt={10}>
            <Box mb={20}>
               <Box
                  style={{
                     border: `1px solid ${"#C7D6E8"}`,
                     borderRadius: 10,
                  }}
                  px={20}
                  py={10}
               >
                  {
                     loading ? <Text>loading</Text> :
                        isData.length === 0 ? <Text>Tidak ada anggota</Text> :
                           isData.map((v, i) => {
                              return (
                                 <Flex
                                    justify={"space-between"}
                                    align={"center"}
                                    mt={20}
                                    key={i}
                                 >
                                    <Group>
                                       <Avatar src={""} alt="it's me" size="lg" />
                                       <Box>
                                          <Text c={WARNA.biruTua} fw={"bold"}>
                                             {v.name}
                                          </Text>
                                          <Text c={"#5A687D"} fz={14}>
                                             {v.email}
                                          </Text>
                                       </Box>
                                    </Group>
                                    <Text c={WARNA.biruTua} fw={"bold"}>
                                       Anggota
                                    </Text>
                                 </Flex>
                              );
                           })}
               </Box>
            </Box>
         </Box>
      </Box>
   )
}