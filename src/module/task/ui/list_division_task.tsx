import { WARNA } from "@/module/_global";
import { ActionIcon, Avatar, Badge, Box, Card, Center, Divider, Flex, Grid, Group, Progress, Skeleton, Text, TextInput, Title } from "@mantine/core";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { HiMagnifyingGlass, HiMiniPresentationChartBar, HiOutlineListBullet, HiSquares2X2 } from "react-icons/hi2";
import { MdAccountCircle } from "react-icons/md";
import { IDataTask } from "../lib/type_task";
import { funGetAllTask } from "../lib/api_task";
import toast from "react-hot-toast";
import { useShallowEffect } from "@mantine/hooks";
import _ from "lodash";

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
            {loading ?
               <Box>
                  <Skeleton width={"100%"} height={100} radius={"md"} />
               </Box>
               :
               <Box bg={"#DCEED8"} p={10} style={{ borderRadius: 10 }}>
                  <Text fw={'bold'} c={WARNA.biruTua}>Total Kegiatan</Text>
                  <Flex justify={'center'} align={'center'} h={'100%'}>
                     <Text fz={40} fw={'bold'} c={WARNA.biruTua}>{isData.length}</Text>
                  </Flex>
               </Box>
            }
            {isList ? (
               <Box pt={20}>
                  {isData.map((v, i) => {
                     return (
                        <Box key={i}>
                           <Grid align='center'>
                              <Grid.Col span={{
                                 base: 2,
                                 xl: 1
                              }}>
                                 <Group onClick={() => router.push(`task/${v.id}`)}>
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
                                 </Group>
                              </Grid.Col>
                              <Grid.Col span={{
                                 base: 10,
                                 xl: 11
                              }}>
                                 <Box>
                                    <Box w={{
                                       base: 280,
                                       xl: 430
                                    }}>
                                       <Text truncate="end" pl={20}>
                                          {v.title}
                                       </Text>
                                    </Box>
                                 </Box>
                              </Grid.Col>
                           </Grid>
                           <Divider my="sm" />
                        </Box>
                     );
                  })}
               </Box>
            ) : (
               <Box pt={20}>
                  {loading ?
                     Array(3)
                        .fill(null)
                        .map((_, i) => (
                           <Box key={i} mb={20}>
                              <Skeleton width={"100%"} height={200} radius={"md"} />
                           </Box>
                        ))
                     :
                     _.isEmpty(isData)
                        ?
                        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                           <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada Tugas</Text>
                        </Box>
                        :
                        isData.map((v: any, i: any) => {
                           return (
                              <Box key={i} mb={20}>
                                 <Card shadow="sm" padding="md" component="a" radius={10} onClick={() => router.push(`task/${v.id}`)}>
                                    <Card.Section>
                                       <Box h={120} bg={WARNA.biruTua}>
                                          <Flex justify={'center'} align={'center'} h={"100%"} pl={20} pr={20}>
                                             <Title order={3} c={"white"} ta={"center"} lineClamp={2}>{v.title}</Title>
                                          </Flex>
                                       </Box>
                                    </Card.Section>
                                    <Box pt={10}>
                                       <Progress.Root size="xl" radius="xl" style={{ border: `1px solid ${'#BDBDBD'}` }}>
                                          <Progress.Section value={v.progress} color="yellow" striped >
                                             <Progress.Label>{v.progress}%</Progress.Label>
                                          </Progress.Section>
                                       </Progress.Root>
                                       <Text my={10}>{v.desc}</Text>
                                       <Group align='center' pt={10} justify='space-between'>
                                          <Avatar.Group>
                                             <Avatar>
                                                <MdAccountCircle size={32} color={WARNA.biruTua} />
                                             </Avatar>
                                             <Avatar>+{v.member - 1}</Avatar>
                                          </Avatar.Group>
                                       </Group>
                                    </Box>
                                 </Card>
                              </Box>
                           );
                        })
                  }
               </Box>
            )}
         </Box>
      </Box>
   )
}