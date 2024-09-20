'use client'
import { LayoutNavbarHome, TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { ActionIcon, Box, Group, Indicator, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiMagnifyingGlass, HiOutlineBell, HiOutlineUser } from "react-icons/hi2";
import { funGetHome } from "../lib/api_home";
import { useShallowEffect } from "@mantine/hooks";

export default function HeaderHome() {
   const router = useRouter()
   const tema = useHookstate(TEMA)
   const [isDesa, setDesa] = useState("")
   const [isNotif, setNotif] = useState(0)


   const fetchData = async () => {
      try {
         const response = await funGetHome('?cat=header')
         if (response.success) {
            setDesa(response.data.village)
            setNotif(response.data.totalNotif)
         } else {
            toast.error(response.message);
         }
      } catch (error) {
         toast.error("Gagal mendapatkan data, coba lagi nanti");
         console.error(error);
      }
   };


   useShallowEffect(() => {
      fetchData();
   }, []);


   return (
      <LayoutNavbarHome>
         <Group justify='space-between'>
            <Text fw={'bold'} c={'white'}>{isDesa}</Text>
            <Box>
               <Group>
                  <ActionIcon onClick={() => router.push('/home?cat=search')} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
                     <HiMagnifyingGlass size={20} color='white' />
                  </ActionIcon>
                  {
                     isNotif > 0 ?
                        <Indicator inline label={isNotif} size={18} color={"red"} offset={3}>
                           <ActionIcon onClick={() => router.push('/home?cat=notification')} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
                              <HiOutlineBell size={20} color='white' />
                           </ActionIcon>
                        </Indicator>
                        :
                        <ActionIcon onClick={() => router.push('/home?cat=notification')} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
                           <HiOutlineBell size={20} color='white' />
                        </ActionIcon>
                  }

                  <ActionIcon onClick={() => router.push('/profile')} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
                     <HiOutlineUser size={20} color='white' />
                  </ActionIcon>
               </Group>
            </Box>
         </Group>
      </LayoutNavbarHome>
   )
}