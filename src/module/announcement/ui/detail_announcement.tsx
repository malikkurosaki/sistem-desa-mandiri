"use client"
import { API_ADDRESS } from "@/module/_global";
import { Box, Flex, Grid, Group, Spoiler, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import { BsCardText } from "react-icons/bs";
import { TfiAnnouncement } from "react-icons/tfi";
import { IRootAllAnnouncement } from "../lib/type_announcement";
import { funGetAnnouncementById } from "../lib/api_announcement";
import toast from "react-hot-toast";




export default function DetailAnnouncement({ id }: { id: string }) {
   const [isData, setIsData] = useState<IRootAllAnnouncement>()

   async function fetchOneAnnouncement() {
      try {
         const res = await funGetAnnouncementById(id)
         if (res.success) {
            setIsData(res)
         } else {
            toast.error(res.message)
         }

      } catch (error) {
         console.error(error)
        toast.error("Gagal mendapatkan announcement, coba lagi nanti")
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