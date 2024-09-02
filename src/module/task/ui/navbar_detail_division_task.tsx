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
import { FaFileCirclePlus, FaPencil, FaUsers } from "react-icons/fa6";
import { MdCancel } from "react-icons/md";

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
         <LayoutNavbarNew back={`/division/${param.id}/task/`} title={name} menu={
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
                           router.push(param.detail + '/add-task')
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
                           router.push(param.detail + '/add-member')
                        }}
                     >
                        <Box>
                           <FaUsers size={30} color={WARNA.biruTua} />
                        </Box>
                        <Box>
                           <Text c={WARNA.biruTua} ta='center'>Tambah anggota</Text>
                        </Box>
                     </Flex>

                     <Flex justify={'center'} align={'center'} direction={'column'}
                        style={{
                           cursor: 'pointer'
                        }}
                        onClick={() => {
                           router.push(param.detail + '/add-file')
                        }}
                     >
                        <Box>
                           <FaFileCirclePlus size={30} color={WARNA.biruTua} />
                        </Box>
                        <Box>
                           <Text c={WARNA.biruTua} ta='center'>Tambah file</Text>
                        </Box>
                     </Flex>

                     <Flex justify={'center'} align={'center'} direction={'column'}
                        style={{
                           cursor: 'pointer'
                        }}
                        onClick={() => { router.push(param.detail + '/edit') }}
                     >
                        <Box>
                           <FaPencil size={30} color={WARNA.biruTua} />
                        </Box>
                        <Box>
                           <Text c={WARNA.biruTua} ta='center'>Edit</Text>
                        </Box>
                     </Flex>

                     <Flex justify={'center'} align={'center'} direction={'column'}
                        style={{
                           cursor: 'pointer'
                        }}
                        onClick={() => { router.push(param.detail + '/cancel') }}
                     >
                        <Box>
                           <MdCancel size={30} color={WARNA.biruTua} />
                        </Box>
                        <Box>
                           <Text c={WARNA.biruTua} ta='center'>Batal</Text>
                        </Box>
                     </Flex>

                  </SimpleGrid>
               </Stack>
            </Box>
         </LayoutDrawer>
      </>
   )
}