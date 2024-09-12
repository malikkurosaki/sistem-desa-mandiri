import { TEMA, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Box, Flex, SimpleGrid, Stack, Text, } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { funDeleteAnnouncement } from '../lib/api_announcement';
import { useHookstate } from '@hookstate/core';

export default function DrawerDetailAnnouncement({ onDeleted }: { onDeleted: (val: boolean) => void }) {
   const router = useRouter()
   const [isOpen, setOpen] = useState(false)
   const param = useParams<{ id: string }>()
   const tema = useHookstate(TEMA)

   async function onTrue(val: boolean) {
      if (val) {
         const response = await funDeleteAnnouncement(param.id)
         if (response.success) {
            toast.success(response.message)
            onDeleted(true)
         } else {
            toast.error(response.message)
            onDeleted(false)
         }
      } else {
         onDeleted(false)
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
                     <FaTrash size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text c={tema.get().utama} ta='center'>Hapus</Text>
                  </Box>
               </Flex>

               <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => {
                  router.push('edit/' + param.id)
               }} style={{ cursor: 'pointer' }}>
                  <Box>
                     <FaPencil size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text c={tema.get().utama} ta='center'>Edit</Text>
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
