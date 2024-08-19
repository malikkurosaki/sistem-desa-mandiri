'use client'
import { LayoutDrawer, LayoutNavbarNew, WARNA } from "@/module/_global";
import { ActionIcon, Box, Flex, SimpleGrid, Stack, Text } from "@mantine/core";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { funGetTaskDivisionById } from "../lib/api_task";
import { useShallowEffect } from "@mantine/hooks";
import { HiMenu } from "react-icons/hi";
import { IoAddCircle } from "react-icons/io5";
import { RiFilter2Line } from "react-icons/ri";

export default function NavbarDetailDivisionTask() {
   const router = useRouter()
   const param = useParams<{ id: string, detail: string }>()
   const [name, setName] = useState('')
   const [isOpen, setOpen] = useState(false)

   async function getOneData() {
      try {
         const res = await funGetTaskDivisionById(param.detail, 'data');
         if (res.success) {
            setName(res.data.title);
         } else {
            toast.error(res.message);
         }

      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan data tugas divisi, coba lagi nanti");
      }
   }

   useShallowEffect(() => {
      getOneData();
   }, [param.detail])


   return (
      <>
         <LayoutNavbarNew back="" title={name} menu={
            <ActionIcon
               variant="light"
               bg={WARNA.bgIcon}
               size="lg"
               radius="lg"
               aria-label="Settings"
               onClick={() => { setOpen(true) }}
            >
               <HiMenu size={20} color="white" />
            </ActionIcon>
         } />


         <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
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
                           router.push(param.detail + '/create-task')
                        }}
                     >
                        <Box>
                           <IoAddCircle size={30} color={WARNA.biruTua} />
                        </Box>
                        <Box>
                           <Text c={WARNA.biruTua} ta='center'>Tambah Tugas</Text>
                        </Box>
                     </Flex>

                     <Flex justify={'center'} align={'center'} direction={'column'}
                        style={{
                           cursor: 'pointer'
                        }}
                        onClick={() => {
                           router.push('/announcement?page=filter')
                        }}
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
         </LayoutDrawer>
      </>
   )
}