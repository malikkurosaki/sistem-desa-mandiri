'use client'
import { WARNA } from "@/module/_global";
import { Carousel } from "@mantine/carousel";
import { Avatar, Box, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CiClock2 } from "react-icons/ci";
import { funGetDetailDivisionById } from "../lib/api_division";
import { useState } from "react";
import { IDataTaskOnDetailDivision } from "../lib/type_division";
import _ from "lodash";


export default function ListTaskOnDetailDivision() {
   const router = useRouter()
   const param = useParams<{ id: string }>()
   const [data, setData] = useState<IDataTaskOnDetailDivision[]>([])
   const [loading, setLoading] = useState(true);

   async function fetchData() {
      try {
         setLoading(true);
         const res = await funGetDetailDivisionById(param.id, 'today-task');
         if (res.success) {
            setData(res.data)
         } else {
            toast.error(res.message);
         }
         setLoading(false);
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan divisi, coba lagi nanti");
      } finally {
         setLoading(false);
      }
   }

   useShallowEffect(() => {
      fetchData()
   }, [param.id])

   return (
      <Box pt={10}>
         <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Tugas Hari Ini</Text>
         <Group justify="center" grow>
            {
               loading ?
                  Array(2)
                     .fill(null)
                     .map((_, i) => (
                        <Stack align="stretch" justify="center" key={i}>
                           <Skeleton height={80} radius="md" m={0} />
                           <Skeleton height={10} radius="md" m={0} />
                        </Stack>
                     ))
                  :
                  (data.length === 0) ?
                     <Stack align="stretch" justify="center" w={"100%"}>
                        <Text c="dimmed" ta={"center"} fs={"italic"}>Belum ada tugas hari ini</Text>
                     </Stack>
                     : <></>
            }
         </Group>
         <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
            {data.map((v, i) =>
               <Carousel.Slide key={v.id}>
                  <Box p={20} w={{ base: 300, md: 400 }} onClick={() => router.push(`/task/${v.id}`)} bg={WARNA.biruTua} style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}>
                     <Text fw={'bold'} c={WARNA.bgWhite} lineClamp={1}>{_.startCase(v.title)}</Text>
                     <Group justify="space-between" mt={20}>
                        <Group gap={5} align="center" c={"#CFCDCD"}>
                           <CiClock2 size={18} />
                           <Text fz={13}>{v.dateStart}</Text>
                        </Group >
                     </Group>
                  </Box>
               </Carousel.Slide>
            )}
         </Carousel>
      </Box>
   )
}