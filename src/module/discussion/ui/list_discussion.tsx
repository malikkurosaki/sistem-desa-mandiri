'use client'
import { WARNA } from "@/module/_global";
import { Avatar, Badge, Box, Divider, Flex, Group, Skeleton, Spoiler, Text, TextInput } from "@mantine/core";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GrChatOption } from "react-icons/gr";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { funGetAllDiscussion } from "../lib/api_discussion";
import { useShallowEffect } from "@mantine/hooks";
import { IDataDiscussion } from "../lib/type_discussion";

export default function ListDiscussion({ id }: { id: string }) {
   const [isData, setData] = useState<IDataDiscussion[]>([])
   const [searchQuery, setSearchQuery] = useState('')
   const param = useParams<{ id: string }>()
   const [loading, setLoading] = useState(true)

   const getData = async () => {
      try {
         setLoading(true)
         const response = await funGetAllDiscussion('?division=' + id + '&search=' + searchQuery)
         setData(response.data)
         setLoading(false)
      } catch (error) {
         console.log(error)
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
                  color: WARNA.biruTua,
                  borderRadius: WARNA.biruTua,
                  borderColor: WARNA.biruTua,
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
                     <Box pl={10} pr={10}>
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
            isData.map((v, i) => {
               return (
                  <Box key={i} pl={10} pr={10}>
                     <Flex
                        justify={"space-between"}
                        align={"center"}
                        mt={20}
                        onClick={() => {
                           router.push(`/division/${param.id}/discussion/${v.id}`)
                        }}
                     >
                        <Group>
                           <Avatar alt="it's me" size="lg" />
                           <Box>
                              <Text c={WARNA.biruTua} fw={"bold"}>
                                 {v.user_name}
                              </Text>
                              <Badge color={v.status === 1 ? "green" : "red"} size="sm">{v.status === 1 ? "BUKA" : "TUTUP"}</Badge>
                           </Box>
                        </Group>
                        <Text c={"grey"} fz={13}>{v.createdAt}</Text>
                     </Flex>
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