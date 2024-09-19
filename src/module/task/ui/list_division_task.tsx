import { currentScroll, TEMA } from "@/module/_global";
import { ActionIcon, Avatar, Box, Card, Center, Divider, Flex, Grid, Group, Progress, Skeleton, Text, TextInput, Title } from "@mantine/core";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { HiMagnifyingGlass, HiMiniPresentationChartBar, HiOutlineListBullet, HiSquares2X2 } from "react-icons/hi2";
import { MdAccountCircle } from "react-icons/md";
import { IDataTask } from "../lib/type_task";
import { funGetAllTask } from "../lib/api_task";
import toast from "react-hot-toast";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useHookstate } from "@hookstate/core";

export default function ListDivisionTask() {
   const [isList, setIsList] = useState(false)
   const router = useRouter()
   const [isData, setData] = useState<IDataTask[]>([])
   const param = useParams<{ id: string }>()
   const searchParams = useSearchParams()
   const status = searchParams.get('status')
   const [searchQuery, setSearchQuery] = useState('')
   const [loading, setLoading] = useState(true);
   const tema = useHookstate(TEMA)
   const paddingLift = useMediaQuery('(max-width: 505px)')
   const { value: containerRef } = useHookstate(currentScroll)
   const [isPage, setPage] = useState(1)
   const [totalData, setTotalData] = useState(0)

   const handleList = () => {
      setIsList(!isList)
   }

   const fetchData = async (loading: boolean) => {
      try {
         if (loading)
            setLoading(true)
         const response = await funGetAllTask('?division=' + param.id + '&status=' + status + '&search=' + searchQuery + '&page=' + isPage)
         if (response.success) {
            setTotalData(response.total)
            if (isPage == 1) {
               setData(response?.data)
            } else {
               setData([...isData, ...response.data])
            }
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
      setPage(1)
      fetchData(true);
   }, [status, searchQuery]);


   useShallowEffect(() => {
      fetchData(false)
   }, [isPage])

   useEffect(() => {
      const handleScroll = async () => {
         if (containerRef && containerRef.current) {
            const scrollTop = containerRef.current.scrollTop;
            const containerHeight = containerRef.current.clientHeight;
            const scrollHeight = containerRef.current.scrollHeight;

            if (scrollTop + containerHeight >= scrollHeight) {
               setPage(isPage + 1)
            }
         }
      };

      const container = containerRef?.current;
      container?.addEventListener("scroll", handleScroll);

      return () => {
         container?.removeEventListener("scroll", handleScroll);
      };
   }, [containerRef, isPage]);

   return (
      <Box py={20}>
         <Grid justify='center' align='center'>
            <Grid.Col span={10}>
               <TextInput
                  styles={{
                     input: {
                        color: tema.get().utama,
                        borderRadius: '#A3A3A3',
                        borderColor: '#A3A3A3',
                     },
                  }}
                  size="md"
                  radius={30}
                  leftSection={<HiMagnifyingGlass size={20} />}
                  placeholder="Pencarian"
                  onChange={(val) => setSearchQuery(val.target.value)}
               />
            </Grid.Col>
            <Grid.Col span={'auto'}>
               <Flex justify={'center'}>
                  {isList ? (
                     <HiOutlineListBullet size={35} color={tema.get().utama} onClick={handleList} />
                  ) : (
                     <HiSquares2X2 size={35} color={tema.get().utama} onClick={handleList} />
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
               <Box bg={tema.get().bgTotalKegiatan} p={10} style={{ borderRadius: 10 }}>
                  <Text fw={'bold'} c={tema.get().utama}>Total Kegiatan</Text>
                  <Flex justify={'center'} align={'center'} h={'100%'}>
                     <Text fz={40} fw={'bold'} c={tema.get().utama}>{totalData}</Text>
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
                                 base: 1,
                                 xs: 1,
                                 sm: 1,
                                 md: 1,
                                 lg: 1,
                                 xl: 1
                              }}>
                                 <Group onClick={() => router.push(`task/${v.id}`)}>
                                    <Center>
                                       <ActionIcon
                                          variant="gradient"
                                          size={50}
                                          aria-label="Gradient action icon"
                                          radius={100}
                                          bg={tema.get().bgFiturDivision}
                                       >
                                          <HiMiniPresentationChartBar size={25} color={tema.get().utama} />
                                       </ActionIcon>
                                    </Center>
                                 </Group>
                              </Grid.Col>
                              <Grid.Col span={{
                                 base: 11,
                                 xs: 11,
                                 sm: 11,
                                 md: 11,
                                 lg: 11,
                                 xl: 11,
                              }}>
                                 <Box>
                                    <Box w={{
                                       base: 280,
                                       xl: 430
                                    }}>
                                       <Text truncate="end" pl={paddingLift ? 30 : 20}>
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
                                       <Box h={120} bg={tema.get().utama}>
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
                                                <MdAccountCircle size={32} color={tema.get().utama} />
                                             </Avatar>
                                             <Avatar>{(v.member == 0) ? "0" : "+" + (v.member - 1)}</Avatar>
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