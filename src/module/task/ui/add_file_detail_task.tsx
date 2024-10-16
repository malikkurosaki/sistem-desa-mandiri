"use client";
import { keyWibu, LayoutDrawer, LayoutNavbarNew, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";
import { Box, Button, Flex, Group, rem, SimpleGrid, Stack, Text, } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import _ from "lodash";
import { useParams, useRouter } from "next/navigation";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa6";
import { IoIosArrowDropright } from "react-icons/io";
import { funAddFileTask, funCekNamFileUploadTask } from "../lib/api_task";
import { IListFileTask } from "../lib/type_task";
import ResultsFile from "./results_file";
import { useWibuRealtime } from "wibu-realtime";


export default function AddFileDetailTask() {
   const router = useRouter()
   const [openModal, setOpenModal] = useState(false)
   const [fileForm, setFileForm] = useState<any[]>([])
   const [listFile, setListFile] = useState<IListFileTask[]>([])
   const param = useParams<{ id: string, detail: string }>()
   const [indexDelFile, setIndexDelFile] = useState<number>(0)
   const [openDrawerFile, setOpenDrawerFile] = useState(false)
   const tema = useHookstate(TEMA)
   const openRef = useRef<() => void>(null)
   const [dataRealTime, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })

   function deleteFile(index: number) {
      setListFile([...listFile.filter((val, i) => i !== index)])
      setFileForm([...fileForm.filter((val, i) => i !== index)])
      setOpenDrawerFile(false)
   }


   async function cekFileName(data: any) {
      try {
         const fd = new FormData();
         fd.append(`file`, data);
         const res = await funCekNamFileUploadTask(param.detail, fd)
         if (res.success) {
            setFileForm([...fileForm, data])
            setListFile([...listFile, { name: data.name, extension: data.type.split("/")[1] }])
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal menambahkan file, coba lagi nanti")
      }
   }

   async function onSubmit() {
      try {
         const fd = new FormData();
         for (let i = 0; i < fileForm.length; i++) {
            fd.append(`file${i}`, fileForm[i]);
         }

         const response = await funAddFileTask(param.detail, fd)
         if (response.success) {
            setDataRealtime([{
               category: "tugas-detail-file",
               id: param.detail,
            }])
            toast.success(response.message)
            setFileForm([])
            setListFile([])
            router.push(`/division/${param.id}/task/${param.detail}`)
         } else {
            toast.error(response.message)
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal menambahkan tugas divisi, coba lagi nanti");
      }
   }



   return (
      <Box>
         <LayoutNavbarNew back="" title={"Tambah File"} menu />

         <Box p={20}>
            <Stack>
               <Dropzone
                  openRef={openRef}
                  onDrop={async (files) => {
                     if (!files || _.isEmpty(files))
                        return toast.error('Tidak ada file yang dipilih')
                     cekFileName(files[0])
                  }}
                  activateOnClick={false}
                  maxSize={3 * 1024 ** 2}
                  accept={['image/png', 'image/jpeg', 'image/heic', 'application/pdf']}
                  onReject={(files) => {
                     return toast.error('File yang diizinkan: .png, .jpg, .heic, .pdf dengan ukuran maksimal 3 MB')
                  }}
               >
               </Dropzone>
               <Group
                  justify="space-between"
                  p={10}
                  style={{
                     border: `1px solid ${"#D6D8F6"}`,
                     borderRadius: 10,
                  }}
                  onClick={() => openRef.current?.()}
               >
                  <Text>Upload File</Text>
                  <IoIosArrowDropright size={25} />
               </Group>
            </Stack>
            {
               listFile.length > 0 &&
               <Box pt={20}>
                  <Text fw={'bold'} c={tema.get().utama}>File</Text>
                  <Box bg={"white"} style={{
                     borderRadius: 10,
                     border: `1px solid ${"#D6D8F6"}`,
                     padding: 20
                  }}>
                     {
                        listFile.map((v, i) => {
                           return (
                              <Box key={i} onClick={() => {
                                 setIndexDelFile(i)
                                 setOpenDrawerFile(true)
                              }}>
                                 <ResultsFile name={v.name} extension={v.extension} />
                              </Box>
                           )
                        })
                     }
                  </Box>
               </Box>
            }
         </Box>
         <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${tema.get().bgUtama}`,
         }}>
            <Button
               color="white"
               bg={tema.get().utama}
               size="lg" radius={30}
               fullWidth
               onClick={() => {
                  if (fileForm.length > 0) {
                     setOpenModal(true)
                  } else {
                     toast.error("Silahkan pilih file yang akan diupload")
                  }
               }}>
               Simpan
            </Button>
         </Box>

         <LayoutDrawer
            opened={openDrawerFile}
            onClose={() => setOpenDrawerFile(false)}
            title={""}
         >
            <Stack pt={10}>
               <SimpleGrid cols={{ base: 3, sm: 3, lg: 3 }} >
                  <Flex style={{ cursor: 'pointer' }} justify={'center'} align={'center'} direction={'column'} onClick={() => deleteFile(indexDelFile)}>
                     <Box>
                        <FaTrash size={30} color={tema.get().utama} />
                     </Box>
                     <Box>
                        <Text c={tema.get().utama} ta='center'>Hapus File</Text>
                     </Box>
                  </Flex>
               </SimpleGrid>
            </Stack>
         </LayoutDrawer>

         <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin menambahkan file?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               }
               setOpenModal(false)
            }} />

      </Box>
   );
}
