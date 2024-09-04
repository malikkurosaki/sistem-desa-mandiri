import { globalRole, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react';
import { IoAddCircle } from "react-icons/io5";
import { RiFilter2Line } from 'react-icons/ri';

export default function DrawerListMember() {
   const router = useRouter()
   const roleLogin = useHookstate(globalRole)
   const searchParams = useSearchParams()
   const group = searchParams.get('group')

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
               {
                  roleLogin.get() === 'supadmin' &&
                  <Flex justify={'center'} align={'center'} direction={'column'}
                     style={{ cursor: 'pointer' }}
                     onClick={() => {
                        router.push('/member?page=filter&group=' + group)
                     }}
                  >
                     <Box>
                        <RiFilter2Line size={30} color={WARNA.biruTua} />
                     </Box>
                     <Box>
                        <Text c={WARNA.biruTua} ta='center'>Filter</Text>
                     </Box>
                  </Flex>
               }
            </SimpleGrid>
         </Stack>
      </Box>
   );
}
