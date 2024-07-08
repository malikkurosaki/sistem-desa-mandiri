import { isDrawer, LayoutDrawer, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Center, Flex, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";

export default function DrawerAnnouncement() {
   const openDrawer = useHookstate(isDrawer)
   const router = useRouter()

   function onCLose() {
      openDrawer.set(false)
   }
   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 3, sm: 3, lg: 3 }}
            >
               <Flex justify={'center'} align={'center'} direction={'column'}
                  onClick={() => {
                     router.push('/announcement/create')
                     onCLose()
                  }}
               >
                  <Box>
                     <IoAddCircle size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'>Tambah Pengumuman</Text>
                  </Box>
               </Flex>

               <Flex justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <RiFilter2Line size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'>Filter</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
      </Box>
   );
}
