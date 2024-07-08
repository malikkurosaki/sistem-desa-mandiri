import { isDrawer, LayoutDrawer, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Box, Button, Center, Flex, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaPencil, FaTrash } from 'react-icons/fa6';

export default function DrawerDetailAnnouncement() {
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
               <Flex justify={'center'} align={'center'} direction={'column'}>
                  <Box>
                     <FaTrash size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'>Hapus</Text>
                  </Box>
               </Flex>

               <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => {
                  router.push('edit/123')
                  onCLose()
               }}>
                  <Box>
                     <FaPencil size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'>Edit</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
      </Box>
   );
}
