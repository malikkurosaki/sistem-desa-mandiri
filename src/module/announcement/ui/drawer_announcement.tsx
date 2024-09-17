import { TEMA, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IoAddCircle } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";

export default function DrawerAnnouncement() {
   const router = useRouter()
   const tema = useHookstate(TEMA)

   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 2, sm: 3, lg: 3 }}
            >
               <Flex justify={'center'} align={'center'} direction={'column'}
                  style={{
                     cursor: 'pointer'
                  }}
                  onClick={() => {
                     router.push('/announcement/create')
                  }}
               >
                  <Box>
                     <IoAddCircle size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text c={tema.get().utama} ta='center'>Tambah Pengumuman</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
      </Box>
   );
}
