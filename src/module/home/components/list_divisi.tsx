'use client'
import { WARNA } from "@/module/_global";
import { Carousel } from "@mantine/carousel";
import { Box, Card, Flex, Title, Text } from "@mantine/core";
import _ from "lodash";
import { useRouter } from "next/navigation";

const dataProject = [
   {
      id: 4,
      title: 'Divisi Keuangan',
      total: 24
   },
   {
      id: 5,
      title: 'Divisi Kesekretariatan',
      total: 18
   },
   {
      id: 6,
      title: 'Divisi Kemasyarakatan',
      total: 12
   },
]
export default function ListDivisi() {
   const router = useRouter()

   return (
      <>
         <Box pt={10}>
            <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Divisi Teraktif</Text>
            <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
               {dataProject.map((v) =>
                  <Carousel.Slide key={v.id}>
                     <Box w={{ base: 300, md: 400 }}>
                        <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`/division/${v.id}`)}>
                           <Card.Section>
                              <Box h={120} bg={`linear-gradient(180deg, rgba(223,218,124,1) 25%, rgba(242,175,70,1) 100%)`}>
                                 <Flex justify={'center'} align={'center'} h={"100%"}>
                                    <Title order={3} c={WARNA.biruTua}>{_.toUpper(v.title)}</Title>
                                 </Flex>
                              </Box>
                           </Card.Section>
                           <Box pt={10} mih={150}>
                              <Text fw={'bold'} fz={18}>PROYEK</Text>
                              <Text fw={'bolder'} ta={'center'} fz={70}>{v.total}</Text>
                           </Box>
                        </Card>
                     </Box>
                  </Carousel.Slide>
               )}
            </Carousel>
            {/* {dataProject.map((v, i) => {
               return (
                  <Box key={i} mb={20} >
                     <Card shadow="sm" padding="md" component="a" radius={10}>
                        <Card.Section>
                           <Box h={120} bg={`linear-gradient(180deg, rgba(223,218,124,1) 25%, rgba(242,175,70,1) 100%)`}>
                              <Flex justify={'center'} align={'center'} h={"100%"}>
                                 <Title order={3} c={WARNA.biruTua}>{_.toUpper(v.title)}</Title>
                              </Flex>
                           </Box>
                        </Card.Section>
                        <Box pt={10} mih={150}>
                           <Text fw={'bold'} fz={18}>PROYEK</Text>
                           <Text fw={'bolder'} ta={'center'} fz={70}>{v.total}</Text>
                        </Box>
                     </Card>
                  </Box>
               );
            })} */}
         </Box>
      </>
   )
}