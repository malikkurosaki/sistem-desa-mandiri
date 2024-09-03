'use client'
import { WARNA } from "@/module/_global";
import { Carousel } from "@mantine/carousel";
import { Box, Card, Flex, Title, Text, Skeleton } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IDataHomeDivision } from "../lib/type_home";
import { funGetHome } from "../lib/api_home";
import toast from "react-hot-toast";
import { useShallowEffect } from "@mantine/hooks";

export default function ListDivisi() {
   const router = useRouter()
   const [isData, setData] = useState<IDataHomeDivision[]>([])
   const [loading, setLoading] = useState(true);

   const fetchData = async () => {
      try {
         setData([]);
         setLoading(true);
         const response = await funGetHome('?cat=division')

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


   return (
      <>
         <Box pt={10}>
            <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Divisi Teraktif</Text>
            {loading ?
               <Box pb={20}>
                  <Skeleton width={"100%"} height={200} radius={"md"} />
               </Box>
               :
               _.isEmpty(isData)
                  ?
                  <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                     <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada divisi</Text>
                  </Box>
                  :
                  <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
                     {isData.map((v) =>
                        <Carousel.Slide key={v.id}>
                           <Box w={{ base: 300, md: 400 }}>
                              <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`/division/${v.id}`)}>
                                 <Card.Section>
                                    <Box h={120} bg={`linear-gradient(180deg, rgba(223,218,124,1) 25%, rgba(242,175,70,1) 100%)`}>
                                       <Flex justify={'center'} align={'center'} h={"100%"} pl={20} pr={20}>
                                          <Title order={3} c={WARNA.biruTua} ta={"center"} lineClamp={2}>{v.name}</Title>
                                       </Flex>
                                    </Box>
                                 </Card.Section>
                                 <Box pt={10} mih={150}>
                                    <Text fw={'bold'} fz={18}>KEGIATAN</Text>
                                    <Text fw={'bolder'} ta={'center'} fz={70}>{v.jumlah}</Text>
                                 </Box>
                              </Card>
                           </Box>
                        </Carousel.Slide>
                     )}
                  </Carousel>
            }
         </Box>
      </>
   )
}