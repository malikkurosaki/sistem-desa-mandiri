'use client'
import { isDrawer, LayoutDrawer, WARNA } from '@/module/_global';
import { ActionIcon, Anchor, Box, Group, Text, TextInput } from '@mantine/core';
import React from 'react';
import { TfiAnnouncement } from "react-icons/tfi";
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

const dataPengumuman = [
   {
      id: 1,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara ben...'
   },
   {
      id: 2,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara ben...'
   },
   {
      id: 3,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara ben...'
   },
   {
      id: 4,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara ben...'
   },
   {
      id: 5,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara ben...'
   },
   {
      id: 6,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara ben...'
   },
   {
      id: 7,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara ben...'
   },
   {
      id: 8,
      name: 'Lembaga Pengkreditan Desa',
      desc: 'Diharapkan semua untuk melakukan upacara ben...'
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
               <Box pt={20} key={i} onClick={() => {
                  router.push(`/announcement/${v.id}`)
               }}>
                  <Group align='center' style={{
                     borderBottom: `1px solid #D9D9D9`,
                     padding: 10,
                  }} >
                     <Box>
                        <ActionIcon variant="light" bg={'#FCAA4B'} size={50} radius={100} aria-label="icon">
                           <TfiAnnouncement color={WARNA.biruTua} size={25} />
                        </ActionIcon>
                     </Box>
                     <Box>
                        <Text fw={'bold'} c={WARNA.biruTua}>{v.name}</Text>
                     </Box>
                  </Group>
               </Box>
            )
         })}
      </Box>
   );
}
