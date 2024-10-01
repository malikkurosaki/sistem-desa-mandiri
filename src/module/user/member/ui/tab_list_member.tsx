import { currentScroll, globalRole, SkeletonSingle, SkeletonUser, TEMA } from "@/module/_global"
import { Box, Text, TextInput, Divider, Avatar, Grid, Group, ActionIcon, Skeleton } from "@mantine/core"
import { useMediaQuery, useShallowEffect } from "@mantine/hooks"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { HiMagnifyingGlass } from "react-icons/hi2"
import { IListMember } from "../lib/type_member"
import { funGetAllmember } from "../lib/api_member"
import toast from "react-hot-toast"
import _ from "lodash"
import { useHookstate } from "@hookstate/core"


export default function TabListMember() {
   const router = useRouter()
   const [loading, setLoading] = useState(true);
   const [dataMember, setDataMember] = useState<IListMember[]>([])
   const searchParams = useSearchParams()
   const [searchQuery, setSearchQuery] = useState('')
   const group = searchParams.get('group')
   const status = searchParams.get('active')
   const roleLogin = useHookstate(globalRole)
   const [nameGroup, setNameGroup] = useState('')
   const tema = useHookstate(TEMA)
   const { value: containerRef } = useHookstate(currentScroll);
   const [isPage, setPage] = useState(1)
   const isMobile2 = useMediaQuery("(max-width: 438px)");


   async function getAllUser(loading: boolean) {
      try {
         if (loading)
            setLoading(true)
         const res = await funGetAllmember('?active=' + status + '&group=' + group + '&search=' + searchQuery + '&page=' + isPage)
         if (res.success) {
            setNameGroup(res.filter.name)
            if (isPage == 1) {
               setDataMember(res.data)
            } else {
               setDataMember([...dataMember, ...res.data])
            }

         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal memuat data, coba lagi nanti")
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      setPage(1)
      getAllUser(true)
   }, [status, searchQuery])

   useShallowEffect(() => {
      getAllUser(false)
   }, [isPage])

   useEffect(() => {
      const handleScroll = async () => {
         if (containerRef && containerRef.current) {
            const scrollTop = containerRef.current.scrollTop;
            const containerHeight = containerRef.current.clientHeight;
            const scrollHeight = containerRef.current.scrollHeight;

            if (scrollTop + containerHeight + 1 >= scrollHeight) {
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

   return (
      <>
         <Box>
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
               onChange={(e) => setSearchQuery(e.target.value)}
               my={20}
            />
            {roleLogin.get() == 'supadmin' && <Text mt={10}>Filter by: {nameGroup}</Text>}
            {loading
               ?
               Array(6)
                  .fill(null)
                  .map((_, i) => (
                     <Box key={i} mb={10}>
                        <SkeletonUser />
                     </Box>
                  ))
               :
               <Box>
                  {dataMember.length == 0 ?
                     <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
                        <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada anggota</Text>
                     </Box>
                     :
                     dataMember.map((v, i) => {
                        return (
                           <Box my={10} key={i}>
                              <Box onClick={() => {
                                 router.push(`/member/${v.id}`)
                              }}>
                                 <Grid p={5} align="center">
                                    <Grid.Col
                                       span={{
                                          base: 1,
                                          xs: 1,
                                          sm: 1,
                                          md: 1,
                                          lg: 1,
                                          xl: 1,
                                       }}
                                    >
                                       <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} size={50} alt="image" />
                                    </Grid.Col>
                                    <Grid.Col
                                       span={{
                                          base: 11,
                                          xs: 11,
                                          sm: 11,
                                          md: 11,
                                          lg: 11,
                                          xl: 11,
                                       }}
                                    >
                                       <Text fw={'bold'} pl={isMobile2 ? 40 : 30} c={tema.get().utama} lineClamp={1}>{_.startCase(v.name)}</Text>
                                       <Text fw={'lighter'} pl={isMobile2 ? 40 : 30} fz={12}>{v.group + ' - ' + v.position}</Text>
                                    </Grid.Col>
                                 </Grid>
                              </Box>
                              <Box mt={10}>
                                 <Divider size={"xs"} />
                              </Box>
                           </Box>
                        )
                     })
                  }
               </Box>
            }
         </Box>
      </>
   )
}