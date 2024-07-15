import { WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { Box, Stack, SimpleGrid, Flex, Text } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsTrash3 } from "react-icons/bs";
import { FaPencil } from "react-icons/fa6";
import { MdClose } from "react-icons/md";

export default function DrawerDetailDiscussion({ onSuccess }: { onSuccess: (val: boolean) => void }) {
   const [isValModal, setValModal] = useState(false)
   const [isValModalStatus, setValModalStatus] = useState(false)

   function onTrue(val: boolean) {
      if (val) {
         onSuccess(true)
         toast.success("Sukses! Data terhapus");
      }
      setValModal(false)
   }

   function onTrueStatus(val: boolean) {
      if (val) {
         onSuccess(true)
         toast.success("Sukses! Data terupdate");
      }
      setValModalStatus(false)
   }

   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 3, sm: 3, lg: 3 }}
            >
               <Flex onClick={() => setValModal(true)} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <BsTrash3 size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua}>Hapus</Text>
                  </Box>
               </Flex>

               <Flex onClick={() => window.location.href = "/discussion/edit/2"} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <FaPencil size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua}>Edit</Text>
                  </Box>
               </Flex>

               <Flex onClick={() => setValModalStatus(true)} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <MdClose size={30} color={WARNA.biruTua} />
                  </Box>
                  <Box>
                     <Text c={WARNA.biruTua}>Tutup Diskusi</Text>
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>

         <LayoutModal opened={isValModal} onClose={() => setValModal(false)}
            description="Apakah Anda yakin ingin menghapus diskusi ini?"
            onYes={(val) => { onTrue(val) }} />


         <LayoutModal opened={isValModalStatus} onClose={() => setValModalStatus(false)}
            description="Apakah Anda yakin ingin mengubah status diskusi ini?"
            onYes={(val) => { onTrueStatus(val) }} />
      </Box>
   )
}