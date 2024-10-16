'use client'
import { keyWibu, LayoutDrawer, LayoutModalViewFile, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";
import { Box, Center, Flex, Grid, Group, SimpleGrid, Skeleton, Stack, Text } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsFileTextFill, BsFiletypeCsv, BsFiletypeHeic, BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";
import { funDeleteFileTask, funGetTaskDivisionById } from "../lib/api_task";
import { IDataFileTaskDivision } from "../lib/type_task";
import { useWibuRealtime } from "wibu-realtime";

export default function ListFileDetailTask() {
   const [isData, setData] = useState<IDataFileTaskDivision[]>([])
   const [loading, setLoading] = useState(true)
   const param = useParams<{ id: string, detail: string }>()
   const [openDrawer, setOpenDrawer] = useState(false)
   const [isOpenModal, setOpenModal] = useState(false)
   const [idData, setIdData] = useState('')
   const [idDataStorage, setIdDataStorage] = useState('')
   const [nameStorage, setNameStorage] = useState('')
   const [nameData, setNameData] = useState('')
   const [isOpenModalView, setOpenModalView] = useState(false)
   const [isExtension, setExtension] = useState('')
   const tema = useHookstate(TEMA)
   const [reason, setReason] = useState("")
   const [dataRealTime, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })

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

   async function getOneData(loading: boolean) {
      try {
         setLoading(loading)
         const res = await funGetTaskDivisionById(param.detail, 'file');
         if (res.success) {
            setData(res.data)
         } else {
            toast.error(res.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan file tugas divisi, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }

   useShallowEffect(() => {
      getOneData(true);
   }, [param.detail])


   async function onDelete() {
      try {
         const res = await funDeleteFileTask(idData);
         if (res.success) {
            setDataRealtime([{
               category: "tugas-detail-file",
               id: param.detail,
            }])
            toast.success(res.message)
            getOneData(false)
            setIdData("")
            setIdDataStorage("")
            setOpenDrawer(false)
         } else {
            toast.error(res.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal menghapus file, coba lagi nanti");
      }
   }

   useShallowEffect(() => {
      if (dataRealTime && dataRealTime.some((i: any) => i.category == 'tugas-detail-file' && i.id == param.detail)) {
         getOneData(false)
      } else if (dataRealTime && dataRealTime.some((i: any) => i.category == 'tugas-detail-status' && i.id == param.detail)) {
         getOneDataCancel()
      }
   }, [dataRealTime])

   return (
      <Box pt={20}>
         <Text fw={'bold'} c={tema.get().utama}>File</Text>
         <Box bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${"#D6D8F6"}`,
            padding: 20
         }}>
            {

               loading ?
                  Array(1)
                     .fill(null)
                     .map((_, i) => (
                        <Box key={i} mb={10}>
                           <Group>
                              <Skeleton width={30} height={30} radius={"md"} />
                              <Skeleton width={"50%"} height={30} radius={"md"} />
                           </Group>
                        </Box>
                     ))
                  :
                  isData.length === 0 ? <Text c={"dimmed"} ta={"center"} fs={"italic"}>Tidak ada file</Text> :
                     isData.map((item, index) => {
                        return (
                           <Box
                              key={index}
                              style={{
                                 borderRadius: 10,
                                 border: `1px solid ${"#D6D8F6"}`,
                                 padding: 10
                              }}
                              mb={10}

                              onClick={() => {
                                 setNameData(item.name + '.' + item.extension)
                                 setExtension(item.extension)
                                 setNameStorage(item.nameInStorage)
                                 setIdData(item.id)
                                 setIdDataStorage(item.idStorage)
                                 setOpenDrawer(true)
                              }}
                           >
                              <Grid gutter={"sm"} justify='flex-start' align='flex-start'>
                                 <Grid.Col span={2}>
                                    <Center >
                                       {item.extension == "pdf" && <BsFiletypePdf size={30} />}
                                       {item.extension == "csv" && <BsFiletypeCsv size={30} />}
                                       {item.extension == "png" && <BsFiletypePng size={30} />}
                                       {item.extension == "jpg" && <BsFiletypeJpg size={30} />}
                                       {item.extension == "jpeg" && <BsFiletypeJpg size={30} />}
                                       {item.extension == "PNG" && <BsFiletypePng size={30} />}
                                       {item.extension == "JPG" && <BsFiletypeJpg size={30} />}
                                       {item.extension == "JPEG" && <BsFiletypeJpg size={30} />}
                                       {item.extension == "heic" && <BsFiletypeHeic size={30} />}
                                    </Center>
                                 </Grid.Col>
                                 <Grid.Col span={10}>
                                    <Text truncate={'end'}>{item.name + '.' + item.extension}</Text>
                                 </Grid.Col>
                              </Grid>
                              <Group>
                              </Group>
                           </Box>
                        )
                     })
            }
         </Box>



         <LayoutDrawer opened={openDrawer} title={<Text truncate={'end'}>{nameData}</Text>} onClose={() => setOpenDrawer(false)}>
            <Box>
               <Stack pt={10}>
                  <SimpleGrid
                     cols={{ base: 3, sm: 3, lg: 3 }}
                  >
                     <Flex onClick={() => { setOpenModalView(true) }} justify={'center'} align={'center'} direction={'column'} >
                        <Box>
                           <BsFileTextFill size={30} color={tema.get().utama} />
                        </Box>
                        <Box>
                           <Text c={tema.get().utama}>Lihat file</Text>
                        </Box>
                     </Flex>

                     <Flex onClick={() => {
                        reason == null ?
                           setOpenModal(true)
                           : setOpenModal(false)
                     }} justify={'center'} align={'center'} direction={'column'} >
                        <Box>
                           <FaTrash size={30} color={reason == null ? tema.get().utama : "gray"} />
                        </Box>
                        <Box>
                           <Text c={reason == null ? tema.get().utama : "gray"}>Hapus file</Text>
                        </Box>
                     </Flex>
                  </SimpleGrid>
               </Stack>
            </Box>
         </LayoutDrawer>


         <LayoutModal opened={isOpenModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin menghapus file ini? File yang dihapus tidak dapat dikembalikan"
            onYes={(val) => {
               if (val) {
                  onDelete()
               }
               setOpenModal(false)
            }} />

         <LayoutModalViewFile opened={isOpenModalView} onClose={() => setOpenModalView(false)} file={idDataStorage} extension={isExtension} fitur='task' />
      </Box>
   )
}