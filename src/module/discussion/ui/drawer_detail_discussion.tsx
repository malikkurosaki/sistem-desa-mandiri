import { TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { Box, Stack, SimpleGrid, Flex, Text } from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsTrash3 } from "react-icons/bs";
import { FaCheck, FaPencil } from "react-icons/fa6";
import { MdClose } from "react-icons/md";
import { funDeleteDiscussion, funEditStatusDiscussion } from "../lib/api_discussion";
import { useParams, useRouter } from "next/navigation";
import { useHookstate } from "@hookstate/core";
import { globalRefreshDiscussion } from "../lib/val_discussion";

export default function DrawerDetailDiscussion({ onSuccess, id, status, idDivision }: { onSuccess: (val: boolean) => void, id: string, status: number, idDivision: string }) {
   const [isValModal, setValModal] = useState(false)
   const [isValModalStatus, setValModalStatus] = useState(false)
   const router = useRouter()
   const param = useParams<{ id: string, detail: string }>()
   const refresh = useHookstate(globalRefreshDiscussion)
   const tema = useHookstate(TEMA)


   async function fetchStatusDiscussion(val: boolean) {
      try {
         if (val) {
            const response = await funEditStatusDiscussion(id, { status: status })

            if (response.success) {
               toast.success(response.message)
               refresh.set(!refresh.get())
               onSuccess(false)
               setValModalStatus(false)
            } else {
               toast.error(response.message)
            }
         }
         setValModalStatus(false)
      } catch (error) {
         console.error(error);
         setValModalStatus(false)
         toast.error("Gagal menambahkan diskusi, coba lagi nanti");
      } finally {
         setValModalStatus(false)
      }
   }

   async function fetchDeleteDiscussion(val: boolean) {
      try {
         if (val) {
            const response = await funDeleteDiscussion(id)
            if (response.success) {
               toast.success(response.message)
               setValModal(false)
               onSuccess(false)
               router.push(`/division/${param.id}/discussion`)
            } else {
               toast.error(response.message)
            }
         }
         setValModal(false)
      } catch (error) {
         console.error(error);
         setValModal(false)
         toast.error("Gagal hapus diskusi, coba lagi nanti");
      } finally {
         setValModal(false)
      }
   }


   return (
      <Box>
         <Stack pt={10}>
            <SimpleGrid
               cols={{ base: 3, sm: 3, lg: 3 }}
               spacing={{ base: 10, sm: 'xl' }}
               verticalSpacing={{ base: 'md', sm: 'xl' }}
            >
               <Flex onClick={() => setValModal(true)} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <BsTrash3 size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text c={tema.get().utama}>Hapus</Text>
                  </Box>
               </Flex>

               <Flex onClick={() => window.location.href = `/division/${param.id}/discussion/update/${param.detail}`} justify={'center'} align={'center'} direction={'column'} >
                  <Box>
                     <FaPencil size={30} color={tema.get().utama} />
                  </Box>
                  <Box>
                     <Text c={tema.get().utama}>Edit</Text>
                  </Box>
               </Flex>

               <Flex onClick={() => setValModalStatus(true)}  >
                  <Box>
                     {status === 1 ? (
                        <>
                           <Flex justify={'center'} align={'center'} direction={'column'}>
                              <Box>
                                 <MdClose size={30} color={tema.get().utama} />
                              </Box>
                              <Text style={{ color: tema.get().utama }}>Tutup Diskusi</Text>
                           </Flex>
                        </>
                     ) : (
                        <>
                           <Flex justify={'center'} align={'center'} direction={'column'}>

                              <Box>
                                 <FaCheck size={30} color={tema.get().utama} />
                              </Box>
                              <Text style={{ color: tema.get().utama }}>Buka Diskusi</Text>
                           </Flex>
                        </>
                     )}
                  </Box>
               </Flex>
            </SimpleGrid>
         </Stack>

         <LayoutModal opened={isValModal} onClose={() => setValModal(false)}
            description="Apakah Anda yakin ingin menghapus diskusi ini?"
            onYes={(val) => { fetchDeleteDiscussion(val) }} />


         <LayoutModal opened={isValModalStatus} onClose={() => setValModalStatus(false)}
            description="Apakah Anda yakin ingin mengubah status diskusi ini?"
            onYes={(val) => { fetchStatusDiscussion(val) }} />
      </Box>
   )
}