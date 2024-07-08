'use client'
import { isDrawer, LayoutDrawer, WARNA } from '@/module/_global';
import { ActionIcon, Anchor, Box, Group, Text, TextInput } from '@mantine/core';
import React from 'react';
import { HiMagnifyingGlass, HiMiniUser } from 'react-icons/hi2';
import { useRouter } from 'next/navigation';

const dataMember = [
   {
      id: 1,
      name: 'Ali akbar',
      desc: 'Perbekel'
   },
   {
      id: 2,
      name: 'Fibra Marcell',
      desc: 'Kasi Kesejahteraan'
   },
   {
      id: 3,
      name: 'Burhan',
      desc: 'Kasi Kesejahteraan'
   },
   {
      id: 4,
      name: 'Chandra',
      desc: 'Kasi Kesejahteraan'
   },
   {
      id: 5,
      name: 'Ayu',
      desc: 'Kasi Kesejahteraan'
   },
   {
      id: 6,
      name: 'Heriawan',
      desc: 'Kasi Kesejahteraan'
   },
   {
      id: 7,
      name: 'Jinan',
      desc: 'Kasi Kesejahteraan'
   },
   {
      id: 8,
      name: 'Rizal',
      desc: 'Kasi Kesejahteraan'
   },
]

export default function ListMember() {
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
         {dataMember.map((v, i) => {
            return (
               <Box pt={20} key={i} onClick={() => {
                  router.push(`/member/${v.id}`)
               }}>
                  <Group align='center' style={{
                     borderBottom: `1px solid #D9D9D9`,
                     padding: 10,
                  }} >
                     <Box>
                        <ActionIcon variant="light" bg={WARNA.biruTua} size={50} radius={100} aria-label="icon">
                           <HiMiniUser color={'white'} size={25} />
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
