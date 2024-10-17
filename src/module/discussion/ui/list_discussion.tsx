'use client'
import { TEMA} from "@/module/_global";
import { Avatar, Badge, Box, Divider, Flex, Grid, Group, Skeleton, Spoiler, Text, TextInput } from "@mantine/core";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GrChatOption } from "react-icons/gr";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { funGetAllDiscussion } from "../lib/api_discussion";
import { useShallowEffect } from "@mantine/hooks";
import { IDataDiscussion } from "../lib/type_discussion";
import toast from "react-hot-toast";
import _ from "lodash";
import { useHookstate } from "@hookstate/core";

export default function ListDiscussion({ id }: { id: string }) {
   const [isData, setData] = useState<IDataDiscussion[]>([])
   const [searchQuery, setSearchQuery] = useState('')
   const param = useParams<{ id: string }>()
   const [loading, setLoading] = useState(true)
   const tema = useHookstate(TEMA)

   const getData = async () => {
      try {
         setLoading(true)
         const response = await funGetAllDiscussion('?division=' + id + '&search=' + searchQuery)
         if (
            response.success
         ) {
            setData(response.data)
         } else {
            toast.error(response.message)
         }
         setLoading(false)
      } catch (error) {
         console.error(error)
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getData()
   }, [searchQuery])

   const router = useRouter()
   return (
      <Box p={20}>
         <TextInput
            styles={{
               input: {
                  color: tema.get().utama,
                  borderRadius: tema.get().utama,
                  borderColor: tema.get().utama,
               },
            }}
            size="md"
            radius={30}
            leftSection={<HiMagnifyingGlass size={20} />}
            placeholder="Pencarian"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
         />
         {loading ?
            Array(3)
               .fill(null)
               .map((_, i) => (
                  <Box key={i}>
                     <Box pl={5} pr={5}>
                        <Flex
                           justify={"space-between"}
                           align={"center"}
                           mt={20}
                        >
                           <Group>
                              <Skeleton width={60} height={60} radius={100} />
                              <Box>
                                 <Skeleton width={100} height={20} radius={"md"} />
                                 <Skeleton mt={8} width={60} height={20} radius={"md"} />
                              </Box>
                           </Group>
                           <Skeleton width={"40%"} height={20} radius={"md"} />
                        </Flex>
                        <Box mt={10}>
                           <Skeleton width={"100%"} height={100} radius={"md"} />
                        </Box>
                        <Group justify="space-between" mt={20} c={'#8C8C8C'}>
                           <Skeleton width={"20%"} height={20} radius={"md"} />
                           <Skeleton width={"20%"} height={20} radius={"md"} />
                        </Group>
                        <Box mt={20}>
                           <Skeleton width={"100%"} height={1} radius={"md"} />
                        </Box>
                     </Box>
                  </Box>
               ))
            :
            _.isEmpty(isData)
               ?
               <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada Diskusi</Text>
               </Box>
               :
               isData.map((v, i) => {
                  return (
                     <Box key={i} pl={5} pr={5}>
                        <Grid align="center" mt={20} onClick={() => {
                           router.push(`/division/${param.id}/discussion/${v.id}`)
                        }}>
                           <Grid.Col span={2}>
                              <Avatar alt="it's me" src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} size="lg" />
                           </Grid.Col>
                           <Grid.Col span={6}>
                              <Box pl={{
                                 sm: 0,
                                 lg: 0,
                                 xl: 0,
                                 md: 0,
                                 base: 10
                              }}>
                                 <Text c={tema.get().utama} fw={"bold"} lineClamp={1}>
                                    {v.user_name}
                                 </Text>
                                 <Badge color={v.status === 1 ? "green" : "red"} size="sm">{v.status === 1 ? "BUKA" : "TUTUP"}</Badge>
                              </Box>
                           </Grid.Col>
                           <Grid.Col span={4}>
                              <Text c={"grey"} ta={"end"} fz={13}>{v.createdAt}</Text>
                           </Grid.Col>
                        </Grid>
                        <Box mt={10}>
                           <Spoiler maxHeight={50} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                              <Text
                                 style={{
                                    overflowWrap: "break-word"
                                 }}
                                 onClick={() => {
                                    router.push(`/division/${param.id}/discussion/${v.id}`)
                                 }}
                              >
                                 {v.desc}
                              </Text>
                           </Spoiler>
                        </Box>
                        <Group justify="space-between" mt={40} c={'#8C8C8C'}>
                           <Group gap={5} align="center">
                              <GrChatOption size={18} />
                              <Text fz={13}>Diskusikan</Text>
                           </Group >
                           <Group gap={5} align="center">
                              <Text fz={13}>{v.total_komentar} Komentar</Text>
                           </Group>
                        </Group>
                        <Box mt={20}>
                           {isData.length <= 1 ? "" :
                              <Divider size={"xs"} />
                           }
                        </Box>
                     </Box>
                  );
               })
         }

      </Box>
   )
}