import { LayoutDrawer, WARNA } from '@/module/_global';
import { ActionIcon, Box, Group, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { FaUserTie } from 'react-icons/fa6';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import DrawerDetailPosition from './drawer_detail_position';
import toast from 'react-hot-toast';

const dataGroup = [
   {
      id: 1,
      name: 'Kepala',
      grup: 'Dinas'
   },
   {
      id: 2,
      name: 'Sekretaris',
      grup: 'LPD'
   },
   {
      id: 3,
      name: 'Bendahara',
      grup: 'Dinas'
   },
   {
      id: 4,
      name: 'Anggota',
      grup: 'Karang Taruna'
   },
   {
      id: 5,
      name: 'Kepala Urusan Kemasyarakatan',
      grup: 'Dinas'
   },
   {
      id: 6,
      name: 'Kepala Urusan Pemerintahan',
      grup: 'Dinas'
   },
   {
      id: 7,
      name: 'Kepala Urusan Kependudukan',
      grup: 'Dinas'
   },
   {
      id: 8,
      name: 'Anggota',
      grup: 'Dinas'
   },
]

export default function ListPositionNonActive() {
   const [openDrawer, setOpenDrawer] = useState(false)
   const [isData, setData] = useState("")

   return (
      <Box pt={20}>
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
         {dataGroup.map((v, i) => {
            return (
               <Box pt={20} key={i}>
                  <Group align='center' style={{
                     border: `1px solid ${"#DCEED8"}`,
                     padding: 10,
                     borderRadius: 10
                  }} onClick={() => {
                     setData(v.name)
                     setOpenDrawer(true)
                  }}>
                     <Box>
                        <ActionIcon variant="light" bg={'#DCEED8'} size={50} radius={100} aria-label="icon">
                           <FaUserTie color={WARNA.biruTua} size={25} />
                        </ActionIcon>
                     </Box>
                     <Box>
                        <Text fw={'bold'} c={WARNA.biruTua}>{v.name}</Text>
                        <Text fw={'lighter'} fz={12}>{v.grup}</Text>
                     </Box>
                  </Group>
               </Box>
            )
         })}
         <LayoutDrawer opened={openDrawer} onClose={() => setOpenDrawer(false)} title={isData}>
            <DrawerDetailPosition onUpdated={() => {
               setOpenDrawer(false)
               toast.success('Sukses! data tersimpan')
            }} />
         </LayoutDrawer>
      </Box>
   );
}
