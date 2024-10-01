'use client'
import { LayoutDrawer, SkeletonDetailListTugasTask, TEMA } from "@/module/_global"
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
import "moment/locale/id"

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
   const tema = useHookstate(TEMA)
   const [reason, setReason] = useState("")

   async function getOneDataCancel() {
      try {
         const res = await funGetTaskDivisionById(param.detail, 'data');
         if (res.success) {
            setReason(res.data.reason);
         } else {
            toast.error(res.message);
         }

      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan data tugas divisi, coba lagi nanti");
      }
   }

   useShallowEffect(() => {
      getOneDataCancel();
   }, [param.detail])

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
         <Text fw={"bold"} c={tema.get().utama}>
            Tanggal & Tugas
         </Text>
         <Box
            bg={"white"}
            style={{
               borderRadius: 10,
               border: `1px solid ${"#D6D8F6"}`,
               padding:20
            }}
         >
            {
               loading ?
                  <>
                     <Box pl={5} pr={5} pt={20} pb={20}>
                        <SkeletonDetailListTugasTask />
                     </Box>
                  </>
                  :
                  isData.length === 0 ? <Text c={"dimmed"} ta={"center"} fs={"italic"}>Tidak ada tugas</Text> :
                     isData.map((item, index) => {
                        return (
                           <Box key={index}>
                              <Box onClick={() => {
                                 setIdData(item.id)
                                 setStatusData(item.status)
                                 reason == null ?
                                    setOpenDrawer(true)
                                    : setOpenDrawer(false)
                              }} my={18}>
                                 <Checkbox color="teal" size="md" checked={(item.status === 1) ? true : false} disabled
                                    label={item.status === 1 ? 'Sudah Selesai' : 'Belum Selesai'}
                                 />
                                 <Box mt={20}>
                                    <Box style={{
                                       borderRadius: 10,
                                       border: `1px solid ${"#D6D8F6"}`,
                                       padding: 10
                                    }}>
                                       <Grid gutter={"sm"} justify='flex-start' align='flex-start'
                                       >
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
                                       <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} my={20}>
                                          <Box>
                                             <Text>Tanggal Mulai</Text>
                                             <Group
                                                justify="center"
                                                bg={"white"}
                                                h={45}
                                                style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
                                             >
                                                <Text>{item.dateStart}</Text>
                                             </Group>
                                          </Box>
                                          <Box>
                                             <Text >Tanggal Berakhir</Text>
                                             <Group
                                                justify="center"
                                                bg={"white"}
                                                h={45}
                                                style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
                                             >
                                                <Text>{item.dateEnd}</Text>
                                             </Group>
                                          </Box>
                                       </SimpleGrid>
                                    </Box>
                                 </Box>
                              </Box>
                              <Divider my={20} />
                           </Box>
                        )
                     })
            }
         </Box>

         <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <Box>
               <Stack pt={10}>
                  <SimpleGrid
                     cols={{ base: 2, sm: 3, lg: 3 }}
                     style={{
                        alignContent: 'flex-start',
                        alignItems: 'flex-start',
                     }}
                  >
                     <Flex onClick={() => { setOpenDrawerStatus(true) }} justify={'center'} align={'center'} direction={'column'}
                        pb={20}
                     >
                        <Box>
                           <AiOutlineFileDone size={30} color={tema.get().utama} />
                        </Box>
                        <Box>
                           <Text c={tema.get().utama}>Update status</Text>
                        </Box>
                     </Flex>

                     <Flex onClick={() => { router.push('edit/' + idData) }} justify={'center'} align={'center'} direction={'column'} >
                        <Box>
                           <FaPencil size={30} color={tema.get().utama} />
                        </Box>
                        <Box>
                           <Text c={tema.get().utama}>Edit tugas</Text>
                        </Box>
                     </Flex>

                     <Flex onClick={() => { setOpenModal(true) }} justify={'center'} align={'center'} direction={'column'} >
                        <Box>
                           <FaTrash size={30} color={tema.get().utama} />
                        </Box>
                        <Box>
                           <Text c={tema.get().utama}>Hapus tugas</Text>
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