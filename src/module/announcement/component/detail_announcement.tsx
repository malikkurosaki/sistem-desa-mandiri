"use client"
import { API_ADDRESS } from "@/module/_global";
import { Box, Flex, Grid, Group, Spoiler, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { BsCardText } from "react-icons/bs";
import { TfiAnnouncement } from "react-icons/tfi";

export interface RootAll {
   announcement: Announcement
   allAnnouncementMember: AllAnnouncementMember[]
}

export interface Announcement {
   id: string
   title: string
   desc: string
}

export interface AllAnnouncementMember {
   idAnnouncement: string
   idGroup: string
   idDivision: string
   group: string
}


export default function DetailAnnouncement({ id }: { id: string }) {
   const [isData, setIsData] = useState<RootAll>()

   async function fetchOneAnnouncement() {
      try {
         const res = await fetch(`${API_ADDRESS.apiGetOneAnnouncement}&announcementId=${id}`)
         const data = await res.json()
         setIsData(data)
      } catch (error) {
         console.error(error)
         throw new Error("Error")
      }
   }

   useShallowEffect(() => {
      fetchOneAnnouncement()
   }, [])

   return (
      <Box py={30} px={20}>
         <Box p={20} style={{ borderRadius: 10, border: '1px solid #E5E5E5' }} bg={'white'} >
            <Stack>
               <Group>
                  <TfiAnnouncement size={25} />
                  <Text fw={'bold'}>{isData?.announcement.title}</Text>
               </Group>
               <Grid gutter={'md'}>
                  <Grid.Col span={1}>
                     <BsCardText size={25} />
                  </Grid.Col>
                  <Grid.Col span={11}>
                     <Spoiler maxHeight={100} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                        <Text>{isData?.announcement.desc}</Text>
                     </Spoiler>
                  </Grid.Col>
               </Grid>
            </Stack>
         </Box>
         <Box my={15} p={20} style={{ borderRadius: 10, border: '1px solid #E5E5E5' }} bg={'white'} >
            {isData?.allAnnouncementMember.map((v, i) => {
               return (
                  <Stack key={i}>
                     <Text fw={'bold'}>Anggota</Text>
                     <Flex direction={"column"} gap={10}>
                        <Text>{v.group}</Text>
                     </Flex>
                  </Stack>
               )
            })}
         </Box>
      </Box>
   )
}