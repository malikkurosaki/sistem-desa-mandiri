'use client'
import { SkeletonSingle, WARNA } from '@/module/_global';
import { ActionIcon, Box, Center, Divider, Grid, Group, Spoiler, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { TfiAnnouncement } from "react-icons/tfi";
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';
import { useShallowEffect } from '@mantine/hooks';
import { IListDataAnnouncement } from '../lib/type_announcement';
import { funGetAllAnnouncement } from '../lib/api_announcement';
import toast from 'react-hot-toast';


export default function ListAnnouncement() {
   const [isData, setIsData] = useState<IListDataAnnouncement[]>([])
   const [searchQuery, setSearchQuery] = useState('')
   const router = useRouter()
   const [loading, setLoading] = useState(true);

   const fetchData = async () => {
      try {
         setLoading(true);
         const response = await funGetAllAnnouncement('?search=' + searchQuery)

         if (response.success) {
            setIsData(response?.data)
         } else {
            toast.error(response.message);
         }
         setLoading(false);
      } catch (error) {
         toast.error("Gagal mendapatkan announcement, coba lagi nanti");
         console.error(error);
      } finally {
         setLoading(false);
      }
   }

   useShallowEffect(() => {
      fetchData()
   }, [searchQuery])

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
            onChange={(e) => setSearchQuery(e.target.value)}
         />
         {loading
            ? Array(6)
               .fill(null)
               .map((_, i) => (
                  <Box key={i}>
                     <SkeletonSingle />
                  </Box>
               ))
            : (isData.length === 0) ?
               <Stack align="stretch" justify="center" w={"100%"} h={"60vh"}>
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada pengumuman</Text>
               </Stack>
               :
               isData.map((v, i) => {
                  return (
                     <Box key={i} mt={20}>
                        <Box >
                           <Grid>
                              <Grid.Col span={2}>
                                 <Center>
                                    <ActionIcon variant="light" bg={'#FCAA4B'} size={50} radius={100} aria-label="icon">
                                       <TfiAnnouncement color={WARNA.biruTua} size={25} />
                                    </ActionIcon>
                                 </Center>
                              </Grid.Col>
                              <Grid.Col span={10}>
                                 <Group justify='space-between' mb={5} onClick={() => {
                                    router.push(`/announcement/${v.id}`)
                                 }}>
                                    <Text fw={'bold'} c={WARNA.biruTua}>{v.title}</Text>
                                    <Text fw={'lighter'} c={WARNA.biruTua} fz={13}>{v.createdAt}</Text>
                                 </Group>
                                 {/* <Text c={WARNA.biruTua} lineClamp={2}>{v.desc}</Text> */}
                                 <Spoiler maxHeight={50} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                                    <Text c={WARNA.biruTua} onClick={() => {
                                       router.push(`/announcement/${v.id}`)
                                    }} >{v.desc}</Text>
                                 </Spoiler>
                              </Grid.Col>
                           </Grid>
                        </Box>
                        <Divider my={15} />
                     </Box>
                  )
               })}
      </Box>
   );
}
