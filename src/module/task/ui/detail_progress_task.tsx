'use client'
import { TEMA } from "@/module/_global";
import { Box, Grid, ActionIcon, Progress, Text, Skeleton } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { HiMiniPresentationChartBar } from "react-icons/hi2";
import { funGetTaskDivisionById } from "../lib/api_task";
import { useState } from "react";
import { globalRefreshTask } from "../lib/val_task";
import { useHookstate } from "@hookstate/core";

export default function ProgressDetailTask() {
   const [valProgress, setValProgress] = useState(0)
   const [valLastUpdate, setValLastUpdate] = useState('')
   const param = useParams<{ id: string, detail: string }>()
   const refresh = useHookstate(globalRefreshTask)
   const [loading, setLoading] = useState(true)
   const isMobile = useMediaQuery('(max-width: 369px)');  
   const tema = useHookstate(TEMA)

   async function getOneData() {
      try {
         setLoading(true)
         const res = await funGetTaskDivisionById(param.detail, 'progress');
         if (res.success) {
            setValProgress(res.data.progress);
            setValLastUpdate(res.data.lastUpdate);
         } else {
            toast.error(res.message);
         }
         setLoading(false)
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan progress tugas divisi, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }

   function onRefresh() {
      if (refresh.get()) {
         getOneData()
         refresh.set(false)
      }
   }


   useShallowEffect(() => {
      onRefresh()
   }, [refresh.get()])

   useShallowEffect(() => {
      getOneData();
   }, [param.detail])

   return (
      <Box mt={10}>
         {loading ?
            <Skeleton width={"100%"} height={100} radius={"md"} />
            :
            <Box
               p={20}
               bg={tema.get().bgTotalKegiatan}
               style={{
                  borderRadius: 10,
               }}
            >
               <Grid gutter={"lg"}>
                  <Grid.Col span={3}>
                     <ActionIcon
                        variant="gradient"
                        size={isMobile ? 50 : 68}
                        aria-label="Gradient action icon"
                        radius={100}
                        // gradient={{ from: "#DFDA7C", to: "#F2AF46", deg: 174 }}
                        bg={tema.get().bgFiturDivision}
                     >
                        <HiMiniPresentationChartBar size={isMobile ? 25 : 35} color={tema.get().utama} />
                     </ActionIcon>
                  </Grid.Col>
                  <Grid.Col span={9}>
                     <Box>
                        <Text fz={isMobile ? 14 : 16}>Kemajuan Kegiatan {valProgress}%</Text>
                        <Progress
                           style={{
                              border: `1px solid ${"#BDBDBD"}`,
                           }}
                           w={"100%"}
                           color={tema.get().bgFiturDivision}
                           radius="md"
                           size={isMobile ? "lg" : "xl"}
                           value={valProgress}
                        />
                     </Box>
                  </Grid.Col>
               </Grid>
            </Box>
         }
      </Box>
   )
}