'use client'
import { SkeletonDetailListTugasTask, WARNA } from "@/module/_global";
import { Box, Group, Skeleton, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsFiletypeCsv, BsFiletypeHeic, BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from "react-icons/bs";
import { funGetTaskDivisionById } from "../lib/api_task";
import { IDataFileTaskDivision } from "../lib/type_task";

export default function ListFileDetailTask() {
   const [isData, setData] = useState<IDataFileTaskDivision[]>([])
   const [loading, setLoading] = useState(true)
   const param = useParams<{ id: string, detail: string }>()
   async function getOneData() {
      try {
         setLoading(true)
         const res = await funGetTaskDivisionById(param.detail, 'file');
         if (res.success) {
            setData(res.data)
         } else {
            toast.error(res.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan file tugas divisi, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getOneData();
   }, [param.detail])

   return (
      <Box pt={20}>
         <Text fw={'bold'} c={WARNA.biruTua}>File</Text>
         <Box bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${"#D6D8F6"}`,
            padding: 20
         }}>
            {

               loading ?
                  Array(1)
                     .fill(null)
                     .map((_, i) => (
                        <Box key={i} mb={10}>
                           <Group>
                              <Skeleton width={30} height={30} radius={"md"} />
                              <Skeleton width={"50%"} height={30} radius={"md"} />
                           </Group>
                        </Box>
                     ))
                  :
                  isData.length === 0 ? <Text>Tidak ada file</Text> :
                     isData.map((item, index) => {
                        return (
                           <Box
                              key={index}
                              style={{
                                 borderRadius: 10,
                                 border: `1px solid ${"#D6D8F6"}`,
                                 padding: 10
                              }}
                              mb={10}
                           >
                              <Group>
                                 {item.extension == "pdf" && <BsFiletypePdf size={25} />}
                                 {item.extension == "csv" && <BsFiletypeCsv size={25} />}
                                 {item.extension == "png" && <BsFiletypePng size={25} />}
                                 {item.extension == "jpg" || item.extension == "jpeg" && <BsFiletypeJpg size={25} />}
                                 {item.extension == "heic" && <BsFiletypeHeic size={25} />}
                                 <Text>{item.name}</Text>
                              </Group>
                           </Box>
                        )
                     })
            }
         </Box>
      </Box>
   )
}