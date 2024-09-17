"use client"
import { ActionIcon, Box, Center, Flex, Grid, Group, List, Skeleton, Spoiler, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { BsCardText } from "react-icons/bs";
import { TfiAnnouncement } from "react-icons/tfi";
import { IAnnouncement } from "../lib/type_announcement";
import { funGetAnnouncementById } from "../lib/api_announcement";
import toast from "react-hot-toast";


export default function DetailAnnouncement({ id }: { id: string }) {
   const [isData, setIsData] = useState<IAnnouncement>()
   const [isMember, setIsMember] = useState<any>({})
   const [loading, setLoading] = useState(true)

   async function fetchOneAnnouncement() {
      try {
         setLoading(true)
         const res = await funGetAnnouncementById(id)
         if (res.success) {
            setIsData(res.data)
            setIsMember(res.member)
         } else {
            toast.error(res.message)
         }

      } catch (error) {
         console.error(error)
         toast.error("Gagal mendapatkan pengumuman, coba lagi nanti")
      } finally {
         setLoading(false)
      }
   }


   useShallowEffect(() => {
      fetchOneAnnouncement()
   }, [])

   return (
      <Box py={30} px={20}>
         <Box p={20} style={{ borderRadius: 10, border: '1px solid #E5E5E5' }} bg={'white'} >
            {loading ?
               <Stack>
                  <Group>
                     <ActionIcon
                        variant="light"
                        bg={"#DCEED8"}
                        size={30}
                        radius={100}
                        aria-label="icon"
                     >
                        <Skeleton height={25} width={40} />
                     </ActionIcon>
                     <Box>
                        <Skeleton height={18} width={150} />
                     </Box>
                  </Group>
                  <Group>
                     <ActionIcon
                        variant="light"
                        bg={"#DCEED8"}
                        size={30}
                        radius={100}
                        aria-label="icon"
                     >
                        <Skeleton height={25} width={40} />
                     </ActionIcon>
                     <Box>
                        <Skeleton height={18} width={150} />
                     </Box>
                  </Group>

               </Stack>
               :
               <Stack>
                  <Grid gutter={'md'}>
                     <Grid.Col span={2}>
                        <Center>
                           <TfiAnnouncement size={30} />
                        </Center>
                     </Grid.Col>
                     <Grid.Col span={10}>
                        <Spoiler maxHeight={100} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                           <Text fw={'bold'}>{isData?.title}</Text>
                        </Spoiler>
                     </Grid.Col>
                  </Grid>
                  <Grid gutter={'md'}>
                     <Grid.Col span={2}>
                        <Center>
                           <BsCardText size={30} />
                        </Center>
                     </Grid.Col>
                     <Grid.Col span={10}>
                        <Spoiler maxHeight={100} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                           <Text>{isData?.desc}</Text>
                        </Spoiler>
                     </Grid.Col>
                  </Grid>
               </Stack>
            }
         </Box>
         <Box my={15} p={20} style={{ borderRadius: 10, border: '1px solid #E5E5E5' }} bg={'white'} >

            {
               loading ? Array(6)
                  .fill(null)
                  .map((_, i) => (
                     <Skeleton key={i} height={10} radius="md" mb={5} width={"100%"} />
                  ))

                  : Object.keys(isMember).map((v: any, i: any) => {
                     return (
                        <Box key={i} mb={10}>
                           <Text>{isMember[v]?.[0].group}</Text>
                           <List ml={10}>
                              {
                                 isMember[v].map((item: any, x: any) => {
                                    return <List.Item key={x}>
                                       <Text lineClamp={1}>{item.division}</Text>
                                    </List.Item>
                                 })
                              }
                           </List>
                        </Box>
                     )

                  })
            }
         </Box>
      </Box>
   )
}