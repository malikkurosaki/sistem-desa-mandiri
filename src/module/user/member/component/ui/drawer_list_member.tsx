import { WARNA } from '@/module/_global';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";
import { RiFilter2Line } from 'react-icons/ri';

export default function DrawerListMember() {
   const router = useRouter()

   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 3, sm: 3, lg: 3 }}
            >
               <Flex justify={'center'} align={'center'} direction={'column'}
                  style={{
                     cursor: 'pointer'
                  }}
                  onClick={() => {
                     router.push('/member/create')
                  }}
               >
                  <Box>
                     <IoAddCircle size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'>Tambah Anggota</Text>
                  </Box>
               </Flex>

               <Flex justify={'center'} align={'center'} direction={'column'}
                  style={{ cursor: 'pointer' }}
               >
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
