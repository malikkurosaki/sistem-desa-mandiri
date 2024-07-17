'use client'
import { WARNA } from "@/module/_global";
import { Carousel } from "@mantine/carousel";
import { Avatar, Box, Group, Text } from "@mantine/core";
import { CiClock2 } from "react-icons/ci";
import { MdAccountCircle } from "react-icons/md";

const dataTask = [
   {
      id: 1,
      title: 'Melakukan Tugas Mengenai Darmasaba',
      date: '21 Juni 2024',
      jumlah: 5
   },
   {
      id: 2,
      title: 'Pembuatan Laporan Kegiatan',
      date: '21 Juni 2024',
      jumlah: 3
   },
   {
      id: 3,
      title: 'Meeting Pembahasan Proposal',
      date: '21 Juni 2024',
      jumlah: 8
   },
   {
      id: 4,
      title: 'Laporan Anggaran Tahunan',
      date: '21 Juni 2024',
      jumlah: 4
   }
]

export default function ListTaskOnDetailDivision() {
   return (
      <Box pt={10}>
         <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Tugas Hari Ini</Text>
         <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
            {dataTask.map((v, i) =>
               <Carousel.Slide key={v.id}>
                  <Box p={20} w={{ base: 300, md: 400 }} bg={WARNA.biruTua} style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}>
                     <Text fw={'bold'} c={WARNA.bgWhite} truncate="end">{v.title}</Text>
                     <Group justify="space-between" mt={20} c={'#aeaeae'}>
                        <Group gap={5} align="center">
                           <CiClock2 size={18} />
                           <Text fz={13}>{v.date}</Text>
                        </Group >
                        <Group gap={5} align="center">
                           <Avatar.Group>
                              <Avatar>
                                 <MdAccountCircle size={32} color={WARNA.biruTua} />
                              </Avatar>
                              <Avatar>+{v.jumlah}</Avatar>
                           </Avatar.Group>
                        </Group>
                     </Group>
                  </Box>
               </Carousel.Slide>
            )}
         </Carousel>
      </Box>
   )
}