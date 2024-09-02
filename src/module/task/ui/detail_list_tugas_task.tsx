'use client'
import { LayoutDrawer, SkeletonDetailListTugasTask, WARNA } from "@/module/_global"
import { Box, Grid, Center, Checkbox, Group, SimpleGrid, Text, Stack, Flex, Divider } from "@mantine/core"
import { useShallowEffect } from "@mantine/hooks"
import { useParams, useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { AiOutlineFileDone, AiOutlineFileSync } from "react-icons/ai"
import { funDeleteDetailTask, funGetTaskDivisionById, funUpdateStatusDetailTask } from "../lib/api_task"
import { useState } from "react"
import { IDataListTaskDivision } from "../lib/type_task"
import { FaCheck, FaPencil, FaTrash } from "react-icons/fa6"
import LayoutModal from "@/module/_global/layout/layout_modal"
import { globalRefreshTask, valStatusDetailTask } from "../lib/val_task"
import { useHookstate } from "@hookstate/core"

export default function ListTugasDetailTask() {
   const [openDrawer, setOpenDrawer] = useState(false)
   const [openDrawerStatus, setOpenDrawerStatus] = useState(false)
   const [isOpenModal, setOpenModal] = useState(false)
   const [isData, setData] = useState<IDataListTaskDivision[]>([])
   const [loading, setLoading] = useState(true)
   const param = useParams<{ id: string, detail: string }>()
   const [idData, setIdData] = useState('')
   const [statusData, setStatusData] = useState(0)
   const router = useRouter()
   const refresh = useHookstate(globalRefreshTask)
   async function getOneData() {
      try {
         setLoading(true)
         const res = await funGetTaskDivisionById(param.detail, 'task');
         if (res.success) {
            setData(res.data)
         } else {
            toast.error(res.message);
         }

      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan list tugas divisi, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getOneData();
   }, [param.detail])


   async function onDelete() {
      try {
         const res = await funDeleteDetailTask(idData, { idProject: param.detail });
         if (res.success) {
            toast.success(res.message);
            refresh.set(true)
            getOneData();
            setIdData("")
            setOpenDrawer(false)
         } else {
            toast.error(res.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal menghapus tugas divisi, coba lagi nanti");
      }

   }

   async function onUpdateStatus(val: number) {
      try {
         const res = await funUpdateStatusDetailTask(idData, { status: val, idProject: param.detail });
         if (res.success) {
            toast.success(res.message);
            refresh.set(true)
            getOneData();
            setIdData("")
            setOpenDrawerStatus(false)
            setOpenDrawer(false)
         } else {
            toast.error(res.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal mengubah status tugas divisi, coba lagi nanti");
      }
   }

   return (
      <Box pt={20}>
         <Text fw={"bold"} c={WARNA.biruTua}>
            Tanggal & Tugas
         </Text>
         <Box
            bg={"white"}
            style={{
               borderRadius: 10,
               border: `1px solid ${"#D6D8F6"}`,
               padding: 20,
            }}
         >
            {
               loading ?
                  <>
                     <SkeletonDetailListTugasTask />
                  </>
                  :
                  isData.length === 0 ? <Text>Tidak ada tugas</Text> :
                     isData.map((item, index) => {
                        return (
                           <Box key={index}>
                              <Grid
                                 onClick={() => {
                                    setIdData(item.id)
                                    setStatusData(item.status)
                                    setOpenDrawer(true)
                                 }}
                              >
                                 <Grid.Col span={"auto"}>
                                    <Center>
                                       <Checkbox color="teal" size="md" checked={(item.status === 1) ? true : false} disabled />
                                    </Center>
                                 </Grid.Col>
                                 <Grid.Col span={10}>
                                    <Box
                                       style={{
                                          borderRadius: 10,
                                          border: `1px solid ${"#D6D8F6"}`,
                                          padding: 10,
                                       }}
                                    >
                                       <Grid gutter={"sm"} justify='flex-start' align='flex-start'>
                                          <Grid.Col span={"auto"}>
                                             <Center >
                                                <AiOutlineFileSync size={30} />
                                             </Center>
                                          </Grid.Col>
                                          <Grid.Col span={10}>
                                             <Text>{item.title}</Text>
                                          </Grid.Col>
                                       </Grid>
                                    </Box>
                                    <Box>
                                       <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} mt={20}>
                                          <Box>
                                             <Text>Tanggal Mulai</Text>
                                             <Group
                                                justify="center"
                                                bg={"white"}
                                                h={45}
                                                style={{
                                                   borderRadius: 10,
                                                   border: `1px solid ${"#D6D8F6"}`,
                                                }}
                                             >
                                                <Text>{item.dateStart}</Text>
                                             </Group>
                                          </Box>
                                          <Box>
                                             <Text c={WARNA.biruTua}>Tanggal Berakhir</Text>
                                             <Group
                                                justify="center"
                                                bg={"white"}
                                                h={45}
                                                style={{
                                                   borderRadius: 10,
                                                   border: `1px solid ${"#D6D8F6"}`,
                                                }}
                                             >
                                                <Text>{item.dateEnd}</Text>
                                             </Group>
                                          </Box>
                                       </SimpleGrid>
                                    </Box>
                                 </Grid.Col>
                              </Grid>
                              {isData.length >= 1
                                 ? "" :
                                 <Divider my={"lg"} />
                              }
                           </Box>
                        )
                     })
            }
         </Box>

         <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <Box>
               <Stack pt={10}>
                  <SimpleGrid
                     cols={{ base: 3, sm: 3, lg: 3 }}
                  >
                     <Flex onClick={() => { setOpenDrawerStatus(true) }} justify={'center'} align={'center'} direction={'column'} >
                        <Box>
                           <AiOutlineFileDone size={30} color={WARNA.biruTua} />
                        </Box>
                        <Box>
                           <Text c={WARNA.biruTua}>Update status</Text>
                        </Box>
                     </Flex>

                     <Flex onClick={() => { router.push('edit/' + idData) }} justify={'center'} align={'center'} direction={'column'} >
                        <Box>
                           <FaPencil size={30} color={WARNA.biruTua} />
                        </Box>
                        <Box>
                           <Text c={WARNA.biruTua}>Edit tugas</Text>
                        </Box>
                     </Flex>

                     <Flex onClick={() => { setOpenModal(true) }} justify={'center'} align={'center'} direction={'column'} >
                        <Box>
                           <FaTrash size={30} color={WARNA.biruTua} />
                        </Box>
                        <Box>
                           <Text c={WARNA.biruTua}>Hapus tugas</Text>
                        </Box>
                     </Flex>
                  </SimpleGrid>
               </Stack>
            </Box>
         </LayoutDrawer>

         <LayoutModal opened={isOpenModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin menghapus tugas ini?"
            onYes={(val) => {
               if (val) {
                  onDelete()
               }
               setOpenModal(false)
            }} />


         <LayoutDrawer opened={openDrawerStatus} title={'Status'} onClose={() => setOpenDrawerStatus(false)}>
            <Box>
               <Stack pt={10}>
                  {
                     valStatusDetailTask.map((item, index) => {
                        return (
                           <Box mb={5} key={index} onClick={() => { onUpdateStatus(item.value) }}>
                              <Flex justify={"space-between"} align={"center"}>
                                 <Group>
                                    <Text style={{
                                       cursor: 'pointer',
                                       display: 'flex',
                                       alignItems: 'center',
                                    }}>
                                       {item.name}
                                    </Text>
                                 </Group>
                                 <Text
                                    style={{
                                       cursor: 'pointer',
                                       display: 'flex',
                                       alignItems: 'center',
                                       paddingLeft: 20,
                                    }}
                                 >
                                    {statusData === item.value ? <FaCheck style={{ marginRight: 10 }} /> : ""}
                                 </Text>
                              </Flex>
                              <Divider my={"md"} />
                           </Box>
                        )
                     })
                  }

               </Stack>
            </Box>
         </LayoutDrawer>
      </Box>
   )
}