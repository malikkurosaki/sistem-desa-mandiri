'use client'
import { LayoutNavbarHome, LayoutIconBack, WARNA, LayoutDrawer, API_ADDRESS } from "@/module/_global";
import { Box, Group, ActionIcon, Stack, Text, Center, Avatar } from "@mantine/core";
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

interface IdMember {
   id: string
}

interface DataMember {
   id: string
   name: string
   nik: string
   email: string
   phone: string
   gender: string
   position: string
   group: string
   isActive: boolean | undefined
}

export default function NavbarDetailMember({ id }: IdMember) {
   const [isOpen, setOpen] = useState(false)
   const [dataOne, setDataOne] = useState<DataMember>()

   useShallowEffect(() => {
      featchGetOne()
   }, [])


   async function featchGetOne() {
      try {
         const response = await fetch(API_ADDRESS.apiGetOneUser + `&userID=${id}`)
         const data = await response.json()
         setDataOne(data)
      } catch (error) {
         console.error(error)
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
                  <Text c={'white'} fw={'bold'} fz={25}>{dataOne?.name}</Text>
                  <Text c={'white'} fw={'lighter'} fz={15}>{dataOne?.group} - {dataOne?.position}</Text>
               </Stack>
            </LayoutNavbarHome>
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
            <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
               <DrawerDetailMember id={dataOne?.id} status={dataOne?.isActive} onDeleted={() => setOpen(false)} />
            </LayoutDrawer>
         </Box>
      </Box>
   )
} 