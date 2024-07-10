'use client'
import { WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { Box, Flex, SimpleGrid, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPencil } from "react-icons/fa6";
import { ImUserCheck } from "react-icons/im";

export default function DrawerDetailMember({ onDeleted }: { onDeleted: (val: boolean) => void }) {
   const router = useRouter()
   const [isModal, setModal] = useState(false)

   function onTrue(val: boolean) {
      if (val) {
         toast.success('Sukses! data tersimpan')
         onDeleted(true)
      }

      setModal(false)
   }

   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 3, sm: 3, lg: 3 }}
            >
               <Flex justify={'center'} align={'center'} direction={'column'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                     setModal(true)
                  }}
               >
                  <Box>
                     <ImUserCheck size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'>Status</Text>
                  </Box>
               </Flex>

               <Flex justify={'center'} align={'center'} direction={'column'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                     router.push('/member/edit/123')
                  }}
               >
                  <Box>
                     <FaPencil size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'>Edit</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>
         <LayoutModal opened={isModal} onClose={() => setModal(false)}
            description="Apakah Anda yakin ingin mengubah status aktifasi anggota?"
            onYes={(val) => { onTrue(val) }} />
      </Box>
   )
}