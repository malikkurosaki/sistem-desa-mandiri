'use client'
import { WARNA } from "@/module/_global";
import { Avatar, Badge, Box, Divider, Flex, Group, Text, TextInput } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { GrChatOption } from "react-icons/gr";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { funGetAllDiscussion } from "../lib/api_discussion";
import { useShallowEffect } from "@mantine/hooks";
import { IDataDiscussion } from "../lib/type_discussion";

export default function ListDiscussion({ id }: { id: string }) {
   const [isData, setData] = useState<IDataDiscussion[]>([])
   const [searchQuery, setSearchQuery] = useState('')

   const getData = async () => {
      try {
         const response = await funGetAllDiscussion('?division=' + id + '&search=' + searchQuery)
         setData(response.data)
      } catch (error) {
         console.log(error)
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
         {isData.map((v, i) => {
            return (
               <Box key={i} pl={10} pr={10}
                  onClick={() => {
                     router.push(`/division/${v.id}/discussion/${v.id}`)
                  }}
               >
                  <Flex
                     justify={"space-between"}
                     align={"center"}
                     mt={20}
                  >
                     <Group>
                        <Avatar alt="it's me" size="lg" />
                        <Box>
                           <Text c={WARNA.biruTua} fw={"bold"}>
                              {v.user_name}
                           </Text>
                           <Badge color={(v.status) ? "green" : "red"} size="sm">{(v.status) ? "BUKA" : "TUTUP"}</Badge>
                        </Box>
                     </Group>
                     <Text c={"grey"}>{v.createdAt}</Text>
                  </Flex>
                  <Box mt={10}>{v.desc}</Box>
                  <Group justify="space-between" mt={20} c={'#8C8C8C'}>
                     <Group gap={5} align="center">
                        <GrChatOption size={18} />
                        <Text fz={13}>Diskusikan</Text>
                     </Group >
                     <Group gap={5} align="center">
                        <Text fz={13}>{v.total_komentar} Komentar</Text>
                     </Group>
                  </Group>
                  <Box mt={20}>
                     <Divider size={"xs"} />
                  </Box>
               </Box>
            );
         })}
      </Box>
   )
}