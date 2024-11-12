'use client'
import { currentScroll, globalNotifPage, ReloadButtonTop, SkeletonUser, TEMA } from '@/module/_global';
import { funGetUserByCookies } from '@/module/auth';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Box, Center, Divider, Grid, Spoiler, Stack, Text, TextInput } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { TfiAnnouncement } from "react-icons/tfi";
import { funGetAllAnnouncement } from '../lib/api_announcement';
import { IListDataAnnouncement } from '../lib/type_announcement';


export default function ListAnnouncement() {
   const [isData, setIsData] = useState<IListDataAnnouncement[]>([])
   const [user, setUser] = useState('')
   const [searchQuery, setSearchQuery] = useState('')
   const router = useRouter()
   const [loading, setLoading] = useState(true);
   const tema = useHookstate(TEMA)
   const notifLoadPage = useHookstate(globalNotifPage)
   const { value: containerRef } = useHookstate(currentScroll);
   const [isPage, setPage] = useState(1)
   const [isRefresh, setRefresh] = useState(false)


   const fetchData = async (loading: boolean) => {
      try {
         if (loading)
            setLoading(true)
         const response = await funGetAllAnnouncement('?search=' + searchQuery + '&page=' + isPage)
         if (response.success) {
            if (isPage == 1) {
               setIsData(response?.data)
            } else {
               setIsData([...isData, ...response?.data])
            }
         } else {
            toast.error(response.message);
         }
         setLoading(false);
      } catch (error) {
         toast.error("Gagal mendapatkan pengumuman, coba lagi nanti");
         console.error(error);
      } finally {
         setLoading(false);
      }
   }

   async function onUser() {
      const user = await funGetUserByCookies()
      setUser(String(user.id))
   }

   function onSearch(val: string) {
      setSearchQuery(val)
      setPage(1)
   }

   useShallowEffect(() => {
      fetchData(true)
   }, [searchQuery])


   useShallowEffect(() => {
      fetchData(false)
   }, [isPage])


   useShallowEffect(() => {
      onUser()
   }, [])



   useEffect(() => {
      const handleScroll = async () => {
         if (containerRef && containerRef.current) {
            const scrollTop = containerRef.current.scrollTop;
            const containerHeight = containerRef.current.clientHeight;
            const scrollHeight = containerRef.current.scrollHeight;
            if (scrollTop + containerHeight >= scrollHeight) {
               setPage(isPage + 1)
            }
         }
      };

      const container = containerRef?.current;
      container?.addEventListener("scroll", handleScroll);

      return () => {
         container?.removeEventListener("scroll", handleScroll);
      };
   }, [containerRef, isPage]);


   useShallowEffect(() => {
      if (notifLoadPage.get().category == 'announcement' && notifLoadPage.get().load == true) {
         setRefresh(true)
      }
   }, [notifLoadPage.get().load])

   function onRefresh() {
      notifLoadPage.set({
         category: '',
         load: false
      })
      setRefresh(false)
      setPage(1)
      setTimeout(() => {
         fetchData(true)
      }, 500)
   }

   return (
      <Box p={20}>
         {
            isRefresh &&
            <ReloadButtonTop
               onReload={() => { onRefresh() }}
               title='UPDATE'
            />

         }
         <TextInput
            styles={{
               input: {
                  color: tema.get().utama,
                  borderRadius: tema.get().utama,
                  borderColor: tema.get().utama,
               },
            }}
            size="md"
            radius={30}
            leftSection={<HiMagnifyingGlass size={20} />}
            placeholder="Pencarian"
            onChange={(e) => onSearch(e.target.value)}
         />
         {loading
            ? Array(6)
               .fill(null)
               .map((_, i) => (
                  <Box key={i} mt={10}>
                     <SkeletonUser />
                  </Box>
               ))
            : (isData.length === 0) ?
               <Stack align="stretch" justify="center" w={"100%"} h={"60vh"}>
                  <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada pengumuman</Text>
               </Stack>
               :
               isData.map((v, i) => {
                  return (
                     <Box key={i} mt={20}>
                        <Box >
                           <Grid>
                              <Grid.Col span={2}>
                                 <Center>
                                    <ActionIcon variant="light" bg={tema.get().bgFiturHome} size={50} radius={100} aria-label="icon">
                                       <TfiAnnouncement color={tema.get().utama} size={25} />
                                    </ActionIcon>
                                 </Center>
                              </Grid.Col>
                              <Grid.Col span={10}>
                                 <Grid onClick={() => {
                                    router.push(`/announcement/${v.id}`)
                                 }}>
                                    <Grid.Col span={{
                                       base: 7,
                                       xl: 8
                                    }}>
                                       <Text fw={'bold'} c={tema.get().utama} lineClamp={1}>{v.title}</Text>
                                    </Grid.Col>
                                    <Grid.Col span={{
                                       base: 5,
                                       xl: 4
                                    }}>
                                       <Text ta={"end"} fw={'lighter'} c={tema.get().utama} fz={13}>{v.createdAt}</Text>
                                    </Grid.Col>
                                 </Grid>
                                 {/* <Text c={tema.get().utama} lineClamp={2}>{v.desc}</Text> */}
                                 <Spoiler maxHeight={50} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                                    <Text c={tema.get().utama} onClick={() => {
                                       router.push(`/announcement/${v.id}`)
                                    }} >{v.desc}</Text>
                                 </Spoiler>
                              </Grid.Col>
                           </Grid>
                        </Box>
                        <Divider my={20} />
                     </Box>
                  )
               })}
      </Box>
   );
}
