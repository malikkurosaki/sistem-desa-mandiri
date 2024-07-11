'use client'
import { WARNA } from "@/module/_global";
import { Carousel } from "@mantine/carousel";
import { Box, Card, Flex, Title, Text, Progress, Stack } from "@mantine/core";
import { useRouter } from "next/navigation";

const dataProject = [
   {
      id: 4,
      title: 'Project 4',
      description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
      status: 'PROSES',
      progress: 60,
      date: '05 Mei 2024'
   },
   {
      id: 5,
      title: 'Project5',
      description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
      status: 'PROSES',
      progress: 80,
      date: '08 Juni 2024'
   },
   {
      id: 6,
      title: 'Project 6',
      description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
      status: 'PROSES',
      progress: 47,
      date: '10 Mei 2024'
   },
]
export default function ListProjects() {
   const router = useRouter()

   return (
      <>
         <Box pt={10}>
            <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Proyek Terbaru</Text>
            <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
               {dataProject.map((v) =>
                  <Carousel.Slide key={v.id}>
                     <Box w={{ base: 300, md: 400 }}>
                        <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`/project/${v.id}`)}>
                           <Card.Section>
                              <Box h={120} bg={WARNA.biruTua}>
                                 <Flex justify={'center'} align={'center'} h={"100%"}>
                                    <Title order={3} c={"white"}>{v.title}</Title>
                                 </Flex>
                              </Box>
                           </Card.Section>
                           <Stack h={150} align="stretch" justify="center">
                              <Progress.Root size="xl" radius="xl" style={{ border: `1px solid ${'#BDBDBD'}` }}>
                                 <Progress.Section value={v.progress} color="yellow" striped >
                                    <Progress.Label>{v.progress}%</Progress.Label>
                                 </Progress.Section>
                              </Progress.Root>
                              <Text c={WARNA.biruTua}>Progres {v.date}</Text>
                           </Stack>
                        </Card>
                     </Box>
                  </Carousel.Slide>
               )}
            </Carousel>
         </Box>
      </>
   )
}