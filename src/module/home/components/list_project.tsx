'use client'
import { WARNA } from "@/module/_global";
import { Box, Card, Flex, Title, Group, Badge, Avatar, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { MdAccountCircle } from "react-icons/md";

const dataProject = [
   // {
   //    id: 4,
   //    title: 'Project 4',
   //    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
   //    status: 'PROSES',
   //    color: '#C5771A'
   // },
   // {
   //    id: 5,
   //    title: 'Project5',
   //    description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
   //    status: 'PROSES',
   //    color: '#C5771A'
   // },
   {
      id: 6,
      title: 'Project 6',
      description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
      status: 'PROSES',
      color: '#C5771A'
   },
]
export default function ListProjects() {
   const router = useRouter()

   return (
      <>
         <Box pt={10}>
            <Text c={WARNA.biruTua} mb={10} fw={'bold'} fz={16}>Proyek Terbaru</Text>
            {dataProject.map((v, i) => {
               return (
                  <Box key={i} mb={20}>
                     <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`/project/${v.id}`)}>
                        <Card.Section>
                           <Box h={120} bg={WARNA.biruTua}>
                              <Flex justify={'center'} align={'center'} h={"100%"}>
                                 <Title order={3} c={"white"}>{v.title}</Title>
                              </Flex>
                           </Box>
                        </Card.Section>
                        <Box pt={10}>
                           <Text>{v.description}</Text>
                           <Group align='center' pt={10} justify='space-between'>
                              <Badge color={v.color}>{v.status}</Badge>
                              <Avatar.Group>
                                 <Avatar>
                                    <MdAccountCircle size={32} color={WARNA.biruTua} />
                                 </Avatar>
                                 <Avatar>+5</Avatar>
                              </Avatar.Group>
                           </Group>
                        </Box>
                     </Card>
                  </Box>
               );
            })}
         </Box>
      </>
   )
}