'use client'
import { TEMA } from "@/module/_global";
import { Carousel } from "@mantine/carousel";
import { Avatar, Box, Group, Skeleton, Stack, Text } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { CiClock2 } from "react-icons/ci";
import { funGetDetailDivisionById } from "../lib/api_division";
import { useState } from "react";
import { IDataTaskOnDetailDivision } from "../lib/type_division";
import _ from "lodash";
import { useHookstate } from "@hookstate/core";


export default function ListTaskOnDetailDivision() {
   const router = useRouter()
   const param = useParams<{ id: string }>()
   const [data, setData] = useState<IDataTaskOnDetailDivision[]>([])
   const [loading, setLoading] = useState(true);
   const tema = useHookstate(TEMA)

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

   const isMobile = useMediaQuery('(max-width: 399px)');

   return (
      <Box pt={10}>
         <Text c={tema.get().utama} mb={10} fw={'bold'} fz={16}>Tugas Hari Ini</Text>
         <Group justify="center" grow>
            {
               loading ?
                  Array(2)
                     .fill(null)
                     .map((_, i) => (
                        <Stack align="stretch" justify="center" key={i}>
                           <Skeleton height={80} radius="md" m={0} w={isMobile ? "80%" : "90%"} />
                           <Skeleton height={10} radius="md" m={0} w={isMobile ? "80%" : "90%"} />
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
         <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withControls={false}>
            {data.map((v, i) =>
               <Carousel.Slide key={v.id}>
                  <Box p={20} w={{
                     base: isMobile ? 230 : 300,
                     md: 400
                  }} onClick={() => router.push(`/division/${param.id}/task/${v.idProject}`)} bg={"white"} style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}>
                     <Text fw={'bold'} c={tema.get().utama} lineClamp={1}>{v.title + ' - ' + v.projectTitle}</Text>
                     <Group justify="space-between" mt={20}>
                        <Group gap={5} align="center">
                           <CiClock2 size={18} />
                           <Text fz={13}>{v.dateStart} - {v.dateEnd}</Text>
                        </Group >
                     </Group>
                  </Box>
               </Carousel.Slide>
            )}
         </Carousel>
      </Box>
   )
}