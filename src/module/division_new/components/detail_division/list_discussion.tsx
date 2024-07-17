import { WARNA } from "@/module/_global"
import { Box, Group, Text } from "@mantine/core"
import { CiUser, CiClock2 } from "react-icons/ci"
import { GoDiscussionClosed } from "react-icons/go"


const dataDiskusi = [
   {
       id: 1,
       judul: 'Mengatasi Limbah Makanan ',
       user: 'Fibra Marcell',
       date: '21 Juni 2024'
   },
   {
       id: 2,
       judul: 'Pentingnya Menjaga Kelestarian Hutan ',
       user: 'Bayu Tegar',
       date: '15 Juni 2024'
   },
   {
       id: 3,
       judul: 'Mengatasi Limbah Industri ',
       user: 'Nian Putri',
       date: '11 Mei 2024'
   },
   {
       id: 4,
       judul: 'Manfaat Sampah Plastik',
       user: 'Budi Prasetyo',
       date: '10 Mei 2024'
   },
]

export default function ListDiscussionOnDetailDivision() {
   return (
      <>
         <Box pt={10}>
            <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Diskusi Terbaru</Text>
            <Box bg={"white"} style={{
               borderRadius: 10,
               border: `1px solid ${"#D6D8F6"}`,
               padding: 20
            }}>
               {
                  dataDiskusi.map((v, i) => {
                     return (
                        <Box key={i} style={{
                           borderRadius: 10,
                           border: `1px solid ${"#D6D8F6"}`,
                           padding: 10
                        }} mb={10}>
                           <Group>
                              <GoDiscussionClosed size={25} />
                              <Box w={{ base: 230, md: 400 }}>
                                 <Text fw={'bold'} truncate="end">{v.judul}</Text>
                              </Box>
                           </Group>
                           <Group justify="space-between" mt={20} c={'#8C8C8C'}>
                              <Group gap={5} align="center">
                                 <CiUser size={18} />
                                 <Text fz={13}>{v.user}</Text>
                              </Group >
                              <Group gap={5} align="center">
                                 <CiClock2 size={18} />
                                 <Text fz={13}>{v.date}</Text>
                              </Group>
                           </Group>
                        </Box>
                     )
                  })
               }
            </Box>
         </Box>
      </>
   )
}