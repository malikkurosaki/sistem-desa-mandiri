'use client'
import { API_ADDRESS, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { Box, Flex, SimpleGrid, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaToggleOff } from "react-icons/fa6";
import { ImUserCheck } from "react-icons/im";

export default function DrawerDetailMember({ onDeleted, id, status }: { onDeleted: (val: boolean) => void, id: string | undefined, status: boolean |undefined }) {
   const router = useRouter()
   const [isModal, setModal] = useState(false)


   async function nonActive(val: boolean) {
      try {
         const res = await fetch(API_ADDRESS.apiDeleteUser, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({
               id,
               isActive: status
            }),
         })
         if (res.status == 200) {
            onDeleted(true);
         } else {
            onDeleted(false);
         }
         router.push('/member')
         setModal(false)
      } catch (error) {
         console.error(error)
         setModal(false);
         toast.error("Terjadi kesalahan");
      }
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
                     <FaToggleOff size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua} ta='center'> {status === false ? "Aktifkan" : "Non Aktifkan"}</Text>
                  </Box>
               </Flex>

               <Flex justify={'center'} align={'center'} direction={'column'}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                     router.push(`/member/edit/${id}`)
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
            onYes={(val) => { nonActive(val) }} />
      </Box>
   )
}