'use client'
import { WARNA } from "@/module/_global";
import { Box, Grid, ActionIcon, Progress, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import toast from "react-hot-toast";
import { HiMiniPresentationChartBar } from "react-icons/hi2";
import { funGetTaskDivisionById } from "../lib/api_task";
import { useEffect, useState } from "react";
import { globalRefreshTask } from "../lib/val_task";
import { useHookstate } from "@hookstate/core";

export default function ProgressDetailTask() {
   const [valProgress, setValProgress] = useState(0)
   const [valLastUpdate, setValLastUpdate] = useState('')
   const param = useParams<{ id: string, detail: string }>()
   const refresh = useHookstate(globalRefreshTask)

   async function getOneData() {
      try {
         const res = await funGetTaskDivisionById(param.detail, 'progress');
         if (res.success) {
            setValProgress(res.data.progress);
            setValLastUpdate(res.data.lastUpdate);
         } else {
            toast.error(res.message);
         }

      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan progress tugas divisi, coba lagi nanti");
      }
   }

   function onRefresh() {
      if (refresh.get()) {
         getOneData()
         refresh.set(false)
      }
   }

   

   useEffect(() => {
      onRefresh()
   }, [refresh.get()])

   useShallowEffect(() => {
      getOneData();
   }, [param.detail])

   return (
      <Box mt={10}>
         <Box
            p={20}
            bg={"#DCEED8"}
            style={{
               borderRadius: 10,
            }}
         >
            <Grid gutter={"lg"}>
               <Grid.Col span={3}>
                  <ActionIcon
                     variant="gradient"
                     size={68}
                     aria-label="Gradient action icon"
                     radius={100}
                     gradient={{ from: "#DFDA7C", to: "#F2AF46", deg: 174 }}
                  >
                     <HiMiniPresentationChartBar size={35} color={WARNA.biruTua} />
                  </ActionIcon>
               </Grid.Col>
               <Grid.Col span={9}>
                  <Box>
                     <Text>Kemajuan Proyek {valProgress}%</Text>
                     <Progress
                        style={{
                           border: `1px solid ${"#BDBDBD"}`,
                        }}
                        w={"100%"}
                        color="#FCAA4B"
                        radius="md"
                        size="xl"
                        value={valProgress}
                     />
                     {/* <Text c={"dimmed"}>Update terakhir : {valLastUpdate}</Text> */}
                  </Box>
               </Grid.Col>
            </Grid>
         </Box>
      </Box>
   )
}