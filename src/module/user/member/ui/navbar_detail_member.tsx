'use client'
import { LayoutNavbarHome, LayoutIconBack, WARNA, LayoutDrawer, SkeletonDetailProfile } from "@/module/_global";
import { Box, Group, ActionIcon, Stack, Text, Center, Avatar, Skeleton } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import { HiUser } from "react-icons/hi2";
import DrawerDetailMember from "./drawer_detail_member";
import { useState } from "react";
import { RiIdCardFill } from "react-icons/ri";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMaleFemale } from "react-icons/io5";
import { useShallowEffect } from "@mantine/hooks";
import Link from "next/link";
import { funGetOneMember } from "../lib/api_member";
import toast from "react-hot-toast";
import { IListMember, IMember } from "../lib/type_member";


export default function NavbarDetailMember({ id }: IMember) {
   const [isOpen, setOpen] = useState(false)
   const [dataOne, setDataOne] = useState<IListMember>()
   const [selectId, setSelectId] = useState<string>('');
   const [active, setActive] = useState<boolean>(false)
   const [loading, setLoading] = useState(true)

   useShallowEffect(() => {
      featchGetOne()
   }, [])


   async function featchGetOne() {
      try {
         setLoading(true)
         const respose = await funGetOneMember(id)
         if (respose.success) {
            setDataOne(respose.data)
            setActive(respose.data?.isActive)
            setSelectId(respose.data?.id)
         } else {
            toast.error(respose.message)
         }

         setLoading(false)
      } catch (error) {
         console.error(error)
         toast.error("Gagal mendapatkan detail user, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }


   return (
      <Box>
         <Box>
            <LayoutNavbarHome>
               <Group justify="space-between">
                  <LayoutIconBack />
                  <ActionIcon onClick={() => setOpen(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Info">
                     <HiMenu size={20} color='white' />
                  </ActionIcon>
               </Group>
               <Stack
                  align="center"
                  justify="center"
                  gap="xs"
               >
                  <Center>
                     <Avatar src={'https://i.pravatar.cc/1000?img=25'} alt="it's me" size="xl" />
                  </Center>
                  {loading ? 
                     <>
                     <Skeleton height={25} mt={10} width={"40%"} />
                     <Skeleton height={15} mt={12} width={"30%"} />
                     </>
                  :
                     <>
                        <Text c={'white'} fw={'bold'} fz={25}>{dataOne?.name}</Text>
                        <Text c={'white'} fw={'lighter'} fz={15}>{dataOne?.group} - {dataOne?.position}</Text>
                     </>
                  }
               </Stack>
            </LayoutNavbarHome>
            {loading
               ? 
               <SkeletonDetailProfile />
               :
               <Box p={20}>
                  <Group justify="space-between" grow py={5}>
                     <Group>
                        <RiIdCardFill size={28} />
                        <Text fz={18}>NIK</Text>
                     </Group>
                     <Text fz={18} fw={'bold'} ta={"right"}>{dataOne?.nik}</Text>
                  </Group>
                  <Group justify="space-between" grow py={5}>
                     <Group>
                        <FaSquarePhone size={28} />
                        <Text fz={18}>No Telepon</Text>
                     </Group>
                     <Text fz={18} fw={'bold'} ta={"right"}>{dataOne?.phone}</Text>
                  </Group>
                  <Group justify="space-between" grow py={5}>
                     <Group>
                        <MdEmail size={28} />
                        <Text fz={18}>Email</Text>
                     </Group>
                     <Text fz={18} fw={'bold'} ta={"right"}>{dataOne?.email}</Text>
                  </Group>
                  <Group justify="space-between" grow py={5}>
                     <Group>
                        <IoMaleFemale size={28} />
                        <Text fz={18}>Gender</Text>
                     </Group>
                     <Text fz={18} fw={'bold'} ta={"right"}>
                        {dataOne?.gender === 'M' ? 'Laki-laki' : dataOne?.gender === 'F' ? 'Perempuan' : ''}
                     </Text>
                  </Group>
               </Box>
            }
            <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
               <DrawerDetailMember id={selectId} status={active} onDeleted={() => setOpen(false)} />
            </LayoutDrawer>
         </Box>
      </Box>
   )
} 