"use client"
import { keyWibu, LayoutNavbarNew, SkeletonList, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { funGetSearchMemberDivision, IDataMemberDivision } from "@/module/division_new";
import { useHookstate } from "@hookstate/core";
import { Carousel } from "@mantine/carousel";
import { ActionIcon, Avatar, Box, Button, Center, Divider, Flex, Grid, Indicator, rem, Stack, Text, TextInput } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { IoArrowBackOutline, IoClose } from "react-icons/io5";
import { useWibuRealtime } from "wibu-realtime";
import { funAddMemberTask, funGetTaskDivisionById } from "../lib/api_task";
import { IDataMemberTaskDivision } from "../lib/type_task";

export default function AddMemberDetailTask() {
   const router = useRouter()
   const param = useParams<{ id: string, detail: string }>()
   const [selectedFiles, setSelectedFiles] = useState<any>([])
   const [isData, setData] = useState<IDataMemberDivision[]>([])
   const [isDataMember, setDataMember] = useState<IDataMemberTaskDivision[]>([])
   const [selectAll, setSelectAll] = useState(false)
   const [openModal, setOpenModal] = useState(false)
   const [loading, setLoading] = useState(true)
   const [loadingModal, setLoadingModal] = useState(false)
   const [onClickSearch, setOnClickSearch] = useState(false)
   const [searchQuery, setSearchQuery] = useState('')
   const tema = useHookstate(TEMA)
   const isMobile2 = useMediaQuery("(max-width: 438px)");
   const [dataRealTime, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })


   async function getData() {
      try {
         setLoading(true)
         const response = await funGetSearchMemberDivision("?search=", param.id)
         if (response.success) {
            setData(response.data)
         } else {
            toast.error(response.message)
         }

         const res = await funGetTaskDivisionById(param.detail, 'member');
         if (res.success) {
            setDataMember(res.data)
         } else {
            toast.error(res.message);
         }

      } catch (error) {
         console.error(error)
         toast.error("Gagal mendapatkan anggota, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }


   useShallowEffect(() => {
      getData()
   }, []);

   const handleFileClick = (index: number) => {
      if (selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
         setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != isData[index].idUser))
      } else {
         setSelectedFiles([...selectedFiles, { idUser: isData[index].idUser, name: isData[index].name, img: isData[index].img }])
      }
   };



   const handleSelectAll = () => {
      setSelectAll(!selectAll);
      if (!selectAll) {
         for (let index = 0; index < isData.length; index++) {
            if (!isDataMember.some((i: any) => i.idUser == isData[index].idUser)) {
               if (!selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
                  const newArr = {
                     idUser: isData[index].idUser, name: isData[index].name, img: isData[index].img
                  }
                  setSelectedFiles((selectedFiles: any) => [...selectedFiles, newArr])
               }
            }

         }
      } else {
         setSelectedFiles([]);
      }
   };


   function onVerifikasi() {
      if (selectedFiles.length == 0) {
         return toast.error("Error! silahkan pilih anggota")
      }

      setOpenModal(true)
   }

   async function onSubmit() {
      try {
         setLoadingModal(true)
         const res = await funAddMemberTask(param.detail, { idDivision: param.id, member: selectedFiles });
         if (res.success) {
            setDataRealtime([{
               category: "tugas-detail-anggota",
               id: param.detail,
            }])
            toast.success(res.message)
            router.back()
         } else {
            toast.error(res.message)
         }
      } catch (error) {
         console.error(error)
         toast.error("Gagal menambahkan anggota, coba lagi nanti");
      } finally {
         setLoadingModal(false)
         setOpenModal(false)
      }
   }

   const handleSearchClick = () => {
      setOnClickSearch(true);
   };

   const handleClose = () => {
      setOnClickSearch(false);
   };

   function handleXMember(id: number) {
      setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != id))
   }

   async function fetchGetMember(val: string) {
      setSearchQuery(val)
      try {
         setLoading(true)
         const res = await funGetSearchMemberDivision('?search=' + val, param.id);
         if (res.success) {
            setData(res.data)
         } else {
            toast.error(res.message);
         }
      } catch (error) {
         console.error(error);
      } finally {
         setLoading(false)
      }
   }

   return (
      <Box>
         <LayoutNavbarNew
            back=""
            title="Pilih Anggota"
            menu={<ActionIcon onClick={handleSearchClick} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="search">
               <HiMagnifyingGlass size={20} color='white' />
            </ActionIcon>}
         />
         {/* SEARCH */}
         {onClickSearch
            ? (
               <Box
                  pos={'fixed'} top={0} p={rem(20)} w={"100%"} style={{
                     maxWidth: rem(550),
                     zIndex: 9999,
                     backgroundColor: `${tema.get().utama}`,
                     borderBottomLeftRadius: 20,
                     borderBottomRightRadius: 20,
                  }}>
                  <Grid justify='center' align='center' gutter={'lg'}>
                     <Grid.Col span={1}>
                        <ActionIcon onClick={handleClose} variant="subtle" color='white' size="lg" mt={5} radius="lg" aria-label="search">
                           <IoArrowBackOutline size={30} />
                        </ActionIcon>
                     </Grid.Col>
                     <Grid.Col span={11}>
                        <TextInput
                           styles={{
                              input: {
                                 color: "white",
                                 borderRadius: '#A3A3A3',
                                 borderColor: `${tema.get().utama}`,
                                 backgroundColor: `${tema.get().utama}`,
                              },
                           }}
                           size="md"
                           radius={30}
                           placeholder="Pencarian"
                           onChange={(e) => fetchGetMember(e.currentTarget.value)}
                        />
                     </Grid.Col>
                  </Grid>
               </Box>
            )
            : null
         }
         {/* Close User */}
         <Box pos={'fixed'} top={80} pl={rem(20)} pr={rem(20)} pt={rem(20)} pb={rem(5)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 100,
            backgroundColor: `${tema.get().bgUtama}`,
            borderBottom: `1px solid ${"#E0DFDF"}`
         }}>
            {selectedFiles.length > 0 ? (
               <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withControls={false}>
                  {selectedFiles.map((v: any, i: any) => {
                     return (
                        <Carousel.Slide key={i}>
                           <Box w={{
                              base: 70,
                              xl: 70
                           }}
                              onClick={() => { handleXMember(v.idUser) }}
                           >
                              <Center>
                                 <Indicator inline size={25} offset={7} position="bottom-end" color="red" withBorder label={<IoClose />}>
                                    <Avatar style={{
                                       border: `2px solid ${tema.get().utama}`
                                    }} src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size="lg" />
                                 </Indicator>
                              </Center>
                              <Text ta={"center"} lineClamp={1}>{v.name}</Text>
                           </Box>
                        </Carousel.Slide>
                     )
                  })}
               </Carousel>
            ) : (
               <Box h={rem(81)}>
                  <Flex justify={"center"} align={'center'} h={"100%"}>
                     <Text ta={'center'} fz={14}>Tidak ada anggota yang dipilih</Text>
                  </Flex>
               </Box>
            )}
         </Box>


         <Box p={20}>
            {/* <Group justify="space-between" mt={100} onClick={handleSelectAll}>
               <Text c={tema.get().utama} fw={"bold"}>
                  Pilih Semua Anggota
               </Text>
               {selectAll ? <FaCheck style={{ marginRight: 10 }} /> : ""}
            </Group> */}
            {loading ? Array(8)
               .fill(null)
               .map((_, i) => (
                  <Box key={i}>
                     <SkeletonList />
                  </Box>
               ))
               :
               (isData.length === 0) ?
                  <Stack align="stretch" justify="center" w={"100%"} h={"60vh"}>
                     <Text c="dimmed" ta={"center"} fs={"italic"}>Tidak ada anggota</Text>
                  </Stack>
                  :
                  <Box mt={15} mb={100}>
                     {isData.map((v, i) => {
                        const isSelected = selectedFiles.some((i: any) => i?.idUser == v.idUser);
                        const found = isDataMember.some((i: any) => i.idUser == v.idUser)
                        return (
                           <Box mb={15} mt={i === 0 ? 100 : 0} key={i} onClick={() => (!found) ? handleFileClick(i) : null}>
                              <Grid align='center'>
                                 <Grid.Col span={{
                                    base: 1,
                                    xs: 1,
                                    sm: 1,
                                    md: 1,
                                    lg: 1,
                                    xl: 1,
                                 }}>
                                    <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size="lg" />
                                 </Grid.Col>
                                 <Grid.Col span={{
                                    base: 11,
                                    xs: 11,
                                    sm: 11,
                                    md: 11,
                                    lg: 11,
                                    xl: 11,
                                 }}>
                                    <Flex justify='space-between' align={"center"}>
                                       <Flex direction={'column'} align="flex-start" justify="flex-start">
                                          <Text lineClamp={1} pl={isMobile2 ? 40 : 30}>{v.name}</Text>
                                          <Text c={"dimmed"} pl={isMobile2 ? 40 : 30}>{(found) ? "sudah menjadi anggota" : ""}</Text>
                                       </Flex>
                                       {isSelected ? <FaCheck /> : null}
                                    </Flex>
                                 </Grid.Col>
                              </Grid>
                              <Box mt={10}>
                                 <Divider size={"xs"} />
                              </Box>
                           </Box>
                        );
                     })}
                  </Box>
            }
         </Box>
         <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${tema.get().bgUtama}`,
         }}>
            <Button
               c={"white"}
               bg={tema.get().utama}
               size="lg"
               radius={30}
               fullWidth
               onClick={() => { onVerifikasi() }}
            >
               Simpan
            </Button>
         </Box>

         <LayoutModal loading={loadingModal} opened={openModal} onClose={() => setOpenModal(false)}
            description="Apakah Anda yakin ingin menambahkan anggota?"
            onYes={(val) => {
               if (val) {
                  onSubmit()
               } else {
                  setOpenModal(false)
               }
            }} />
      </Box>
   );
}
