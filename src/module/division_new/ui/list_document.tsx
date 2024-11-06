'use client'
import { TEMA, } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Carousel } from "@mantine/carousel";
import { Box, Center, Group, Image, Skeleton, Stack, Text, UnstyledButton } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { funGetDetailDivisionById } from "../lib/api_division";
import * as ICON from '../lib/file_icon';
import { IDataKalenderOnDetailDivision } from "../lib/type_division";

const iconContainer = (icon: string) => 'data:image/svg+xml;base64,' + btoa(icon)

export default function ListDocumentOnDetailDivision() {
   const router = useRouter()
   const param = useParams<{ id: string }>()
   const [data, setData] = useState<IDataKalenderOnDetailDivision[]>([])
   const [loading, setLoading] = useState(true);
   const tema = useHookstate(TEMA)

   async function fetchData() {
      try {
         setLoading(true);
         const res = await funGetDetailDivisionById(param.id, 'new-file');
         if (res.success) {
            setData(res.data)
         } else {
            toast.error(res.message);
         }
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
         <Text c={tema.get().utama} mb={10} fw={'bold'} fz={16}>Dokumen Terbaru</Text>
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
                        <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada dokumen</Text>
                     </Stack>
                     : <></>
            }
         </Group>
         <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
            {
               data.map((v) =>
                  <Carousel.Slide key={v.id}>
                     <UnstyledButton onClick={() => router.push(`/division/${param.id}/document?path=${v.path}`)}>
                        <Stack gap={0} w={isMobile ? 100 : 170}>
                           <Box bg={"white"} style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }} >
                              <Center p={"md"}>
                                 <Image w={isMobile ? 50 : 75} src={(v.extension == "pdf") ? iconContainer(ICON.PDF) : iconContainer(ICON.IMAGE)} alt="image" />
                              </Center>
                           </Box>
                           <Box>
                              <Text c={"dimmed"} ta={"center"} lineClamp={1} fz={isMobile ? 14 : 16}>{v.name + '.' + v.extension}</Text>
                           </Box>
                        </Stack>
                     </UnstyledButton>
                  </Carousel.Slide>
               )}
         </Carousel>
      </Box>
   )
}