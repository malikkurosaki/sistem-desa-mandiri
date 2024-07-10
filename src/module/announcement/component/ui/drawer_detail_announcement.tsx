import { WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Box, Flex, SimpleGrid, Stack, Text, } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPencil, FaTrash } from 'react-icons/fa6';

export default function DrawerDetailAnnouncement({ onDeleted }: { onDeleted: (val: boolean) => void }) {
   const router = useRouter()
   const [isOpen, setOpen] = useState(false)

   function onTrue(val: boolean) {
      if (val) {
         toast.success('Sukses! Data terhapus')
         onDeleted(true)
      }
      setOpen(false)
   }
   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 3, sm: 3, lg: 3 }}
            >
               <Flex style={{ cursor: 'pointer' }} justify={'center'} align={'center'} direction={'column'} onClick={() => setOpen(true)}>
                  <Box>
                     <FaTrash size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'>Hapus</Text>
                  </Box>
               </Flex>

               <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => {
                  router.push('edit/123')
               }} style={{ cursor: 'pointer' }}>
                  <Box>
                     <FaPencil size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'>Edit</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
         <LayoutModal opened={isOpen} onClose={() => setOpen(false)}
            description="Apakah Anda yakin ingin menghapus data?"
            onYes={(val) => { onTrue(val) }} />
      </Box>
   );
}
