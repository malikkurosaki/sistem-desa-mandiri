import { WARNA } from "@/module/_global";
import { ActionIcon, Avatar, Badge, Box, Card, Center, Divider, Flex, Grid, Group, Progress, Text, TextInput, Title } from "@mantine/core";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiMagnifyingGlass, HiMiniPresentationChartBar, HiOutlineListBullet, HiSquares2X2 } from "react-icons/hi2";
import { MdAccountCircle } from "react-icons/md";
import { IDataTask } from "../lib/type_task";
import { funGetAllTask } from "../lib/api_task";
import toast from "react-hot-toast";
import { useShallowEffect } from "@mantine/hooks";


const dataProject = [
   {
      id: 1,
      title: 'Project 1',
      description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
      status: 'PROJECT SELESAI',
      color: '#387529'
   },
   {
      id: 2,
      title: 'Project 2',
      description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
      status: 'PROJECT SELESAI',
      color: '#387529'
   },
   {
      id: 3,
      title: 'Project 3',
      description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
      status: 'PROJECT SELESAI',
      color: '#387529'
   },
   {
      id: 4,
      title: 'Project 4',
      description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
      status: 'PROSES',
      color: '#C5771A'
   },
   {
      id: 5,
      title: 'Project5',
      description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
      status: 'PROSES',
      color: '#C5771A'
   },
   {
      id: 6,
      title: 'Project 6',
      description: 'Tempat berkumpul semua anggota / staff perbekal darmasaba',
      status: 'PROSES',
      color: '#C5771A'
   },
]

export default function ListDivisionTask() {
   const [isList, setIsList] = useState(false)
   const router = useRouter()
   const [isData, setData] = useState<IDataTask[]>([])
   const param = useParams<{ id: string }>()
   const searchParams = useSearchParams()
   const status = searchParams.get('status')
   const [searchQuery, setSearchQuery] = useState('')
   const [loading, setLoading] = useState(true);

   const handleList = () => {
      setIsList(!isList)
   }

   const fetchData = async () => {
      try {
         setData([]);
         setLoading(true);

         const response = await funGetAllTask('?division=' + param.id + '&status=' + status + '&search=' + searchQuery)

         if (response.success) {
            setData(response?.data)
         } else {
            toast.error(response.message);
         }

         setLoading(false);
      } catch (error) {
         toast.error("Gagal mendapatkan tugas divisi, coba lagi nanti");
         console.error(error);
      } finally {
         setLoading(false);
      }
   };


   useShallowEffect(() => {
      fetchData();
   }, [status, searchQuery]);

   return (
      <Box py={20}>
         <Grid justify='center' align='center'>
            <Grid.Col span={10}>
               <TextInput
                  styles={{
                     input: {
                        color: WARNA.biruTua,
                        borderRadius: '#A3A3A3',
                        borderColor: '#A3A3A3',
                     },
                  }}
                  size="md"
                  radius={30}
                  leftSection={<HiMagnifyingGlass size={20} />}
                  placeholder="Pencarian"
               />
            </Grid.Col>
            <Grid.Col span={'auto'}>
               <Flex justify={'center'}>
                  {isList ? (
                     <HiOutlineListBullet size={35} color={WARNA.biruTua} onClick={handleList} />
                  ) : (
                     <HiSquares2X2 size={35} color={WARNA.biruTua} onClick={handleList} />
                  )}
               </Flex>
            </Grid.Col>
         </Grid>
         <Box pt={20}>
            <Box bg={"#DCEED8"} p={10} style={{ borderRadius: 10 }}>
               <Text fw={'bold'} c={WARNA.biruTua}>Total Proyek</Text>
               <Flex justify={'center'} align={'center'} h={'100%'}>
                  <Text fz={40} fw={'bold'} c={WARNA.biruTua}>{isData.length}</Text>
               </Flex>
            </Box>
            {isList ? (
               <Box pt={20}>
                  {isData.map((v, i) => {
                     return (
                        <Box key={i}>
                           <Group justify="space-between" mb={10} onClick={() => router.push(`task/${v.id}`)}>
                              <Group>
                                 <Center>
                                    <ActionIcon
                                       variant="gradient"
                                       size={50}
                                       aria-label="Gradient action icon"
                                       radius={100}
                                       gradient={{
                                          from: '#DFDA7C',
                                          to: '#F2AF46',
                                          deg: 174
                                       }}
                                    >
                                       <HiMiniPresentationChartBar size={25} color={WARNA.biruTua} />
                                    </ActionIcon>
                                 </Center>
                                 <Text>{v.title}</Text>
                              </Group>
                           </Group>
                           <Divider my="sm" />
                        </Box>
                     );
                  })}
               </Box>
            ) : (
               <Box pt={20}>
                  {isData.map((v: any, i: any) => {
                     return (
                        <Box key={i} mb={20}>
                           <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`task/${v.id}`)}>
                              <Card.Section>
                                 <Box h={120} bg={WARNA.biruTua}>
                                    <Flex justify={'center'} align={'center'} h={"100%"}>
                                       <Title order={3} c={"white"}>{v.title}</Title>
                                    </Flex>
                                 </Box>
                              </Card.Section>
                              <Box pt={10}>
                                 <Progress.Root size="xl" radius="xl" style={{ border: `1px solid ${'#BDBDBD'}` }}>
                                    <Progress.Section value={v.status} color="yellow" striped >
                                       <Progress.Label>{v.status}%</Progress.Label>
                                    </Progress.Section>
                                 </Progress.Root>
                                 <Text my={10}>{v.desc}</Text>
                                 <Group align='center' pt={10} justify='space-between'>
                                    <Avatar.Group>
                                       <Avatar>
                                          <MdAccountCircle size={32} color={WARNA.biruTua} />
                                       </Avatar>
                                       <Avatar>+{v.member-1}</Avatar>
                                    </Avatar.Group>
                                 </Group>
                              </Box>
                           </Card>
                        </Box>
                     );
                  })}
               </Box>
            )}
         </Box>
      </Box>
   )
}