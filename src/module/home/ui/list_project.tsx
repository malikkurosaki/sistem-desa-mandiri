'use client'
import { TEMA, WARNA } from "@/module/_global";
import { Carousel } from "@mantine/carousel";
import { Box, Card, Flex, Title, Text, Progress, Stack, Skeleton, ActionIcon } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { funGetHome } from "../lib/api_home";
import { IDataHomeKegiatan } from "../lib/type_home";
import _ from "lodash";
import { useHookstate } from "@hookstate/core";
import { MdMoreVert } from "react-icons/md";
import { IoIosArrowDropright } from "react-icons/io";

export default function ListProjects() {
   const router = useRouter()
   const [isData, setData] = useState<IDataHomeKegiatan[]>([])
   const [loading, setLoading] = useState(true);
   const tema = useHookstate(TEMA)

   const fetchData = async () => {
      try {
         setData([]);
         setLoading(true);
         const response = await funGetHome('?cat=kegiatan')

         if (response.success) {
            setData(response.data)
         } else {
            toast.error(response.message);
         }
         setLoading(false);
      } catch (error) {
         toast.error("Gagal mendapatkan data, coba lagi nanti");
         console.error(error);
      } finally {
         setLoading(false);
      }
   };


   useShallowEffect(() => {
      fetchData();
   }, []);

   const isMobile = useMediaQuery('(max-width: 369px)');

   return (
      <>
         <Box pt={10}>
            <Text c={tema.get().utama} mb={10} fw={'bold'} fz={16}>Kegiatan Terbaru</Text>
            {loading ?
               <Box pb={20}>
                  <Skeleton width={"100%"} height={200} radius={"md"} />
               </Box>
               :
               _.isEmpty(isData)
                  ?
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                     <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada kegiatan terbaru</Text>
                  </Box>
                  :
                  <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withControls={false}>
                     {isData.map((v) =>
                        <Carousel.Slide key={v.id} pb={20}>
                           <Box w={{
                              base: isMobile ? 230 : 300,
                              md: 400
                           }}>
                              <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`/project/${v.id}`)}>
                                 <Card.Section>
                                    <Box h={isMobile ? 100 : 120} bg={tema.get().utama}>
                                       <Flex justify={'center'} align={'center'} h={"100%"} pl={20} pr={20}>
                                          <Title order={isMobile ? 4 : 3} c={"white"} ta={"center"} lineClamp={2}>{v.title}</Title>
                                       </Flex>
                                    </Box>
                                 </Card.Section>
                                 <Stack h={isMobile ? 100 : 150} align="stretch" justify="center">
                                    <Progress.Root size="xl" radius="xl" style={{ border: `1px solid ${'#BDBDBD'}` }}>
                                       <Progress.Section value={v.progress} color="yellow" striped >
                                          <Progress.Label>{v.progress}%</Progress.Label>
                                       </Progress.Section>
                                    </Progress.Root>
                                    <Text c={tema.get().utama} fz={isMobile ? 14 : 16}>{v.createdAt}</Text>
                                 </Stack>
                              </Card>
                           </Box>
                        </Carousel.Slide>
                     )}

                     {/* MORE ICON */}
                     {/* <Flex justify={"center"} direction={"column"} align={"center"} onClick={() => { }}>
                        <ActionIcon variant="subtle" color="gray" >
                           <IoIosArrowDropright size={40} />
                        </ActionIcon>
                        <Text ta={"center"} c={"dimmed"}>Lihat</Text>
                        <Text ta={"center"} c={"dimmed"} w={100}>Lebih Banyak</Text>
                     </Flex> */}
                  </Carousel>
            }
         </Box>
      </>
   )
}