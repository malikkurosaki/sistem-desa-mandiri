'use client'
import { WARNA } from "@/module/_global";
import { Carousel } from "@mantine/carousel";
import { Box, Image, Text, Center, Paper, Stack, UnstyledButton, Skeleton, Group } from "@mantine/core";
import * as ICON from '../lib/file_icon'
import { useParams, useRouter } from "next/navigation";
import { useShallowEffect } from "@mantine/hooks";
import toast from "react-hot-toast";
import { funGetDetailDivisionById } from "../lib/api_division";
import { IDataKalenderOnDetailDivision } from "../lib/type_division";
import { useState } from "react";

const iconContainer = (icon: string) => 'data:image/svg+xml;base64,' + btoa(icon)

export default function ListDocumentOnDetailDivision() {
   const router = useRouter()
   const param = useParams<{ id: string }>()
   const [data, setData] = useState<IDataKalenderOnDetailDivision[]>([])
   const [loading, setLoading] = useState(true);

   async function fetchData() {
      try {
         setLoading(true);
         const res = await funGetDetailDivisionById(param.id, 'new-file');
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
         <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Dokumen Terbaru</Text>
         <Group justify="center" grow>
            {
               loading
                  ?
                  Array(4)
                     .fill(null)
                     .map((_, i) => (
                        <Stack align="stretch" justify="center" key={i}>
                           <Skeleton height={80} radius="md" m={0} />
                           <Skeleton height={10} radius="md" m={0} />
                        </Stack>
                     ))
                  : (data.length === 0) ?
                     <Stack align="stretch" justify="center" w={"100%"}>
                        <Text c="dimmed" ta={"center"} fs={"italic"}>Belum ada file</Text>
                     </Stack>
                     : <></>
            }
         </Group>
         <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
            {
               data.map((v) =>
                  <Carousel.Slide key={v.id}>
                     <UnstyledButton onClick={() => router.push(`/document`)}>
                        <Stack gap={0}>
                           <Paper withBorder shadow="sm" radius={12} >
                              <Center p={"md"}>
                                 <Image w={"75"} src={(v.extension == "pdf") ? iconContainer(ICON.PDF) : iconContainer(ICON.IMAGE)} alt="image" />
                              </Center>
                           </Paper>
                           <Box p={"sm"}>
                              <Text c={"dimmed"} truncate="end" ta={"center"}>{v.name + '.' + v.extension}</Text>
                           </Box>
                        </Stack>
                     </UnstyledButton>
                  </Carousel.Slide>
               )}
         </Carousel>
      </Box>
   )
}