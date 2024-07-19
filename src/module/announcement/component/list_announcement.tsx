'use client'
import { WARNA } from '@/module/_global';
import { ActionIcon, Box, Center, Divider, Grid, Group, Text, TextInput } from '@mantine/core';
import React from 'react';
import { TfiAnnouncement } from "react-icons/tfi";
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

const dataPengumuman = [
   {
      id: 1,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara terima kasih yang sangat banyak',
      grup: 'Dinas',
      tgl: '7 Juli 2024'
   },
   {
      id: 2,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara terima kasih yang sangat banyak',
      grup: 'Dinas',
      tgl: '7 Juli 2024'
   },
   {
      id: 3,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara terima kasih yang sangat banyak',
      grup: 'Adat',
      tgl: '7 Juli 2024'
   },
   {
      id: 4,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara terima kasih yang sangat banyak',
      grup: 'Dinas',
      tgl: '7 Juli 2024'
   },
   {
      id: 5,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara terima kasih yang sangat banyak',
      grup: 'PKK',
      tgl: '7 Juli 2024'
   },
   {
      id: 6,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara terima kasih yang sangat banyak',
      grup: 'Karang Taruna',
      tgl: '7 Juli 2024'
   },
   {
      id: 7,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara terima kasih yang sangat banyak',
      grup: 'Dinas',
      tgl: '7 Juli 2024'
   },
   {
      id: 8,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara ben...',
      grup: 'Dinas',
      tgl: '7 Juli 2024'
   },
]

export default function ListAnnouncement() {
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
         />
         {dataPengumuman.map((v, i) => {
            return (
               <Box  key={i} mt={15}>
                  <Box onClick={() => {
                     router.push(`/announcement/${v.id}`)
                  }}>
                     <Grid>
                        <Grid.Col span={2}>
                           <Center>
                              <ActionIcon variant="light" bg={'#FCAA4B'} size={50} radius={100} aria-label="icon">
                                 <TfiAnnouncement color={WARNA.biruTua} size={25} />
                              </ActionIcon>
                           </Center>
                        </Grid.Col>
                        <Grid.Col span={10}>
                           <Text fw={'bold'} c={WARNA.biruTua}>{v.name}</Text>
                           <Text  c={WARNA.biruTua} truncate={'end'}>{v.desc}</Text>
                           <Group justify='space-between' mt={5}>
                              <Text fw={'lighter'} c={WARNA.biruTua} fz={13}>{v.grup}</Text>
                              <Text fw={'lighter'} c={WARNA.biruTua} fz={13}>{v.tgl}</Text>
                           </Group>
                        </Grid.Col>
                     </Grid>
                  </Box>
                  <Divider my={15}/>
               </Box>
            )
         })}
      </Box>
   );
}
