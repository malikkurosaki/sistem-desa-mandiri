'use client'
import { LayoutDrawer, SkeletonSingle, WARNA } from "@/module/_global";
import { Box, Group, Flex, Avatar, Text, SimpleGrid, Stack, Grid } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { funDeleteMemberTask, funGetTaskDivisionById } from "../lib/api_task";
import { IDataMemberTaskDivision } from "../lib/type_task";
import { FaUser } from "react-icons/fa6";
import { IoIosCloseCircle } from "react-icons/io";
import LayoutModal from "@/module/_global/layout/layout_modal";


export default function ListAnggotaDetailTask() {
   const [isData, setData] = useState<IDataMemberTaskDivision[]>([])
   const [loading, setLoading] = useState(true)
   const param = useParams<{ id: string, detail: string }>()
   const [openDrawer, setOpenDrawer] = useState(false)
   const [isOpenModal, setOpenModal] = useState(false)
   const [dataChoose, setDataChoose] = useState({ id: '', name: '' })
   const router = useRouter()

   async function getOneData() {
      try {
         setLoading(true)
         const res = await funGetTaskDivisionById(param.detail, 'member');
         if (res.success) {
            setData(res.data)
         } else {
            toast.error(res.message);
         }

      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan member tugas divisi, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getOneData();
   }, [param.detail])


   async function onSubmit() {
      try {
         const res = await funDeleteMemberTask(param.detail, { idUser: dataChoose.id });
         if (res.success) {
            toast.success(res.message)
            setDataChoose({ id: '', name: '' })
            getOneData()
            setOpenDrawer(false)
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal menghapus anggota tugas divisi, coba lagi nanti");
      }
   }


   return (
      <Box pt={20}>
         <Group justify="space-between">
            <Text c={WARNA.biruTua}>Anggota Terpilih</Text>
            <Text c={WARNA.biruTua}>Total {isData.length} Anggota</Text>
         </Group>
         <Box pt={10}>
            <Box mb={20}>
               <Box
                  style={{
                     border: `1px solid ${"#C7D6E8"}`,
                     borderRadius: 10,
                  }}
                  px={20}
                  py={10}
               >
                  {
                     loading ?
                        Array(6)
                           .fill(null)
                           .map((_, i) => (
                              <Box key={i}>
                                 <SkeletonSingle />
                              </Box>
                           ))
                        :
                        isData.length === 0 ? <Text>Tidak ada anggota</Text> :
                           isData.map((v, i) => {
                              return (
                                 <Box key={i}>
                                    <Grid align='center' mt={10}
                                       onClick={() => {
                                          setDataChoose({ id: v.idUser, name: v.name })
                                          setOpenDrawer(true)
                                       }}
                                    >
                                       <Grid.Col span={9}>
                                          <Group>
                                             <Avatar src={`/api/file/img?cat=user&file=${v.img}`} alt="it's me" size="lg" />
                                             <Box w={{
                                                base: 140,
                                                xl: 270
                                             }}>
                                                <Flex direction={'column'} align="flex-start" justify="flex-start">
                                                   <Text lineClamp={1}>{v.name}</Text>
                                                   <Text c={"#5A687D"} fz={14} lineClamp={1}>{v.email}</Text>
                                                </Flex>
                                             </Box>
                                          </Group>
                                       </Grid.Col>
                                       <Grid.Col span={3}>
                                          <Text c={WARNA.biruTua} fw={"bold"} ta={'end'}>
                                             Anggota
                                          </Text>
                                       </Grid.Col>
                                    </Grid>
                                 </Box>
                              );
                           })}
               </Box>
            </Box>
         </Box>


         <LayoutDrawer opened={openDrawer} title={<Text lineClamp={1}>{dataChoose.name}</Text>} onClose={() => setOpenDrawer(false)}>
            <Box>
               <Stack pt={10}>
                  <SimpleGrid
                     cols={{ base: 2, sm: 3, lg: 3 }}
                  >
                     <Flex onClick={() => { router.push('/member/' + dataChoose.id) }} justify={'center'} align={'center'} direction={'column'} >
                        <Box>
                           <FaUser size={30} color={WARNA.biruTua} />
                        </Box>
                        <Box>
                           <Text c={WARNA.biruTua}>Lihat profil</Text>
                        </Box>
                     </Flex>

                     <Flex onClick={() => { setOpenModal(true) }} justify={'center'} align={'center'} direction={'column'} >
                        <Box>
                           <IoIosCloseCircle size={30} color={WARNA.biruTua} />
                        </Box>
                        <Box>
                           <Text c={WARNA.biruTua}>Keluarkan anggota</Text>
                        </Box>
                     </Flex>
                  </SimpleGrid>
               </Stack>
            </Box>
         </LayoutDrawer>

         <LayoutModal opened={isOpenModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin mengeluarkan anggota?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               }
               setOpenModal(false)
            }} />
      </Box>
   )
}