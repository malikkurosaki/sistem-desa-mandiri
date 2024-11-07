'use client'
import { TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Carousel } from "@mantine/carousel";
import { Badge, Box, Card, Flex, Group, Progress, Skeleton, Stack, Text, Title } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { funGetHome } from "../lib/api_home";
import { IDataHomeKegiatan } from "../lib/type_home";

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
            <Text c={tema.get().utama} mb={10} fw={'bold'} fz={16}>Kegiatan Terupdate</Text>
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
                                       <Progress.Section value={_.isNull(v.progress) ? 0 : v.progress} color="yellow" striped >
                                          <Progress.Label>{_.isNull(v.progress) ? 0 : v.progress}%</Progress.Label>
                                       </Progress.Section>
                                    </Progress.Root>
                                    <Group align='center' pt={10} justify='space-between'>
                                       <Text c={tema.get().utama} fz={isMobile ? 14 : 16}>{v.createdAt}</Text>
                                       <Badge color={
                                          v.status === 0 ? '#1372C4' :
                                             v.status === 1 ? '#C5771A' :
                                                v.status === 2 ? '#0B6025' :
                                                   v.status === 3 ? '#BB1F1F' :
                                                      "grey"
                                       }>
                                          {
                                             v.status === 0 ? 'Segera' :
                                                v.status === 1 ? 'Dikerjakan' :
                                                   v.status === 2 ? 'Selesai' :
                                                      v.status === 3 ? 'Dibatalkan' :
                                                         "Segera"
                                          }
                                       </Badge>
                                    </Group>
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