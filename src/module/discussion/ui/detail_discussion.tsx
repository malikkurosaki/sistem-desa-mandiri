"use client"
import { globalRole, keyWibu, LayoutDrawer, LayoutNavbarNew, TEMA } from "@/module/_global";
import { globalIsAdminDivision } from "@/module/division_new";
import { useHookstate } from "@hookstate/core";
import { ActionIcon, Avatar, Badge, Box, Center, Divider, Flex, Grid, Group, rem, Skeleton, Spoiler, Text, TextInput } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import moment from "moment";
import "moment/locale/id";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { GrChatOption } from "react-icons/gr";
import { HiMenu } from "react-icons/hi";
import { LuSendHorizonal } from "react-icons/lu";
import { useWibuRealtime } from "wibu-realtime";
import { funCreateComent, funGetDiscussionById } from "../lib/api_discussion";
import { IDetailDiscussion } from "../lib/type_discussion";
import { globalRefreshDiscussion } from "../lib/val_discussion";
import DrawerDetailDiscussion from "./drawer_detail_discussion";

export default function DetailDiscussion({ id, idDivision }: { id: string, idDivision: string }) {
   const [isData, setData] = useState<IDetailDiscussion>()
   const [isComent, setIsComent] = useState("")
   const param = useParams<{ id: string, detail: string }>()
   const [isLoad, setIsLoad] = useState(true)
   const refresh = useHookstate(globalRefreshDiscussion)
   const roleLogin = useHookstate(globalRole)
   const [isCreator, setCreator] = useState(false)
   const [isUser, setUser] = useState('')
   const adminLogin = useHookstate(globalIsAdminDivision)
   const tema = useHookstate(TEMA)
   const router = useRouter()
   const isMobile = useMediaQuery('(max-width: 369px)');
   const isMobile2 = useMediaQuery("(max-width: 438px)");
   const [dataRealTime, setDataRealtime] = useWibuRealtime({
      WIBU_REALTIME_TOKEN: keyWibu,
      project: "sdm"
   })

   const getData = async (loading: boolean) => {
      try {
         setIsLoad(loading)
         const response = await funGetDiscussionById(id)
         setData(response.data)
         setIsLoad(false)
         setCreator(response.data.isCreator)
         setUser(response.user)
      } catch (error) {
         console.error(error)
      } finally {
         setIsLoad(false)
      }
   }

   useShallowEffect(() => {
      getData(true)
   }, [refresh.get()])

   useShallowEffect(() => {
      if (dataRealTime && dataRealTime.some((i: any) => i.category == 'discussion-detail' && i.id == id)) {
         getData(false)
      }

      if (dataRealTime && dataRealTime.some((i: any) => i.category == 'discussion-delete' && i.id == id && i.user != isUser)) {
         toast.error("Data telah di hapus, anda akan beralih ke halaman list diskusi")
         setTimeout(() => {
            router.push(`/division/${param.id}/discussion`)
         }, 1000)
      }
   }, [dataRealTime])

   async function reloadData() {
      try {
         const response = await funGetDiscussionById(id)
         setData(response.data)
      } catch (error) {
         console.error(error)
      }
   }

   const sendComent = async () => {
      try {
         if (isComent.trim() == "") {
            return toast.error("Masukkan Komentar Anda")
         }
         const response = await funCreateComent(id, { comment: isComent, idDiscussion: param.detail })

         if (response.success) {
            setIsComent("")
            setDataRealtime([{
               category: "discussion-detail",
               id: id,
            }])
            reloadData()
         } else {
            toast.error(response.message)
         }
      } catch (error) {
         console.error(error)
      }
   }

   const [openDrawer, setOpenDrawer] = useState(false)



   return (
      <Box>
         {/* <NavbarDetailDiscussion id={id} status={Number(isData?.status)} idDivision={idDivision} /> */}
         <LayoutNavbarNew back={`/division/${param.id}/discussion/`} title="Diskusi "
            menu={
               ((roleLogin.get() != 'user' && roleLogin.get() != 'coadmin') || adminLogin.get() || isCreator) ?
                  <ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
                     <HiMenu size={20} color='white' />
                  </ActionIcon>
                  : <></>
            }
         />
         <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
            <DrawerDetailDiscussion onSuccess={(val) => setOpenDrawer(false)} id={id} status={Number(isData?.status)} idDivision={idDivision} />
         </LayoutDrawer>


         <Box p={20}>
            {isLoad ?
               Array(1)
                  .fill(null)
                  .map((_, i) => (
                     <Box key={i} pl={5} pr={5}>
                        <Box>
                           <Flex
                              justify={"space-between"}
                              align={"center"}

                           >
                              <Group>
                                 <Skeleton width={60} height={60} radius={100} />
                                 <Box>
                                    <Skeleton width={80} height={20} radius={"md"} />
                                    <Skeleton mt={8} width={60} height={20} radius={"md"} />
                                 </Box>
                              </Group>
                              <Skeleton width={"20%"} height={20} radius={"md"} />
                           </Flex>
                           <Box mt={10}>
                              <Skeleton width={"100%"} height={100} radius={"md"} />
                           </Box>
                        </Box>
                     </Box>
                  )) :
               <>
                  {isData?.totalComments == 0 ?
                     <Box mb={60} pl={5} pr={5}>
                        <Grid align='center'>
                           <Grid.Col span={1}>
                              <Avatar src={`https://wibu-storage.wibudev.com/api/files/${isData?.user_img}`} alt="it's me" size={'lg'} />
                           </Grid.Col>
                           <Grid.Col span={8}>
                              <Box pl={isMobile2 ? 40 : 30}>
                                 <Text lineClamp={1} fz={isMobile ? 15 : 16}>{isData?.username}</Text>
                                 <Badge color={isData?.status === 1 ? "green" : "red"} size="sm">{isData?.status === 1 ? "BUKA" : "TUTUP"}</Badge>
                              </Box>
                           </Grid.Col>
                           <Grid.Col span={3}>
                              <Text c={tema.get().utama} ta={'end'} fz={isMobile ? 15 : 16}>
                                 {isData?.createdAt}
                              </Text>
                           </Grid.Col>
                        </Grid>
                        <Box mt={10}>
                           <Spoiler maxHeight={50} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                              <Text
                                 style={{
                                    overflowWrap: "break-word"
                                 }}
                                 fw={"bold"}
                              >
                                 {isData?.desc}
                              </Text>
                           </Spoiler>
                        </Box>
                        <Group justify="space-between" mt={30} c={'#8C8C8C'}>
                           {isData?.totalComments ? <Group gap={5} align="center">
                              <GrChatOption size={18} />
                              <Text fz={13}>{isData?.totalComments} Komentar</Text>
                           </Group > : ""}

                        </Group>
                     </Box> :
                     <Box mb={20}>
                        <Grid align='center'>
                           <Grid.Col span={1}>
                              <Avatar src={`https://wibu-storage.wibudev.com/api/files/${isData?.user_img}`} alt="it's me" size={'lg'} />
                           </Grid.Col>
                           <Grid.Col span={8}>
                              <Box pl={isMobile2 ? 40 : 30}>
                                 <Text lineClamp={1} fz={isMobile ? 15 : 16}>{isData?.username}</Text>
                                 <Badge color={isData?.status === 1 ? "green" : "red"} size="sm">{isData?.status === 1 ? "BUKA" : "TUTUP"}</Badge>
                              </Box>
                           </Grid.Col>
                           <Grid.Col span={3}>
                              <Text c={tema.get().utama} ta={'end'} fz={isMobile ? 15 : 16}>
                                 {isData?.createdAt}
                              </Text>
                           </Grid.Col>
                        </Grid>
                        <Box mt={10}>
                           <Spoiler maxHeight={50} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                              <Text
                                 style={{
                                    overflowWrap: "break-word"
                                 }}
                                 fw={"bold"}
                              >
                                 {isData?.desc}
                              </Text>
                           </Spoiler>
                        </Box>
                        <Group justify="space-between" mt={30} c={'#8C8C8C'}>
                           {isData?.totalComments ? <Group gap={5} align="center">
                              <GrChatOption size={18} />
                              <Text fz={13}>{isData?.totalComments} Komentar</Text>
                           </Group > : ""}

                        </Group>
                     </Box>
                  }
               </>
            }
            <Box pl={10} pr={10} mb={60}>
               {isLoad ?
                  Array(2)
                     .fill(0)
                     .map((_, i) => (
                        <Box key={i} p={10}>
                           <Box>
                              <Flex
                                 justify={"space-between"}
                                 align={"center"}
                                 mt={20}
                              >
                                 <Group>
                                    <Skeleton width={40} height={40} radius={100} />
                                    <Box>
                                       <Skeleton width={60} height={20} radius={"md"} />
                                    </Box>
                                 </Group>
                                 <Skeleton width={"50%"} height={20} radius={"md"} />
                              </Flex>
                              <Box mt={10}>
                                 <Skeleton width={"100%"} height={50} radius={"md"} />
                              </Box>
                              <Group justify="space-between" mt={20} c={'#8C8C8C'}>
                                 <Skeleton width={"30%"} height={20} radius={"md"} />
                              </Group>
                           </Box>
                           <Box mt={20}>
                              <Skeleton width={"100%"} height={1} radius={"md"} />
                           </Box>
                        </Box>
                     )) :
                  isData?.DivisionDisscussionComment.map((v, i) => {
                     return (
                        <Box key={i} p={10} >
                           <Grid align="center">
                              <Grid.Col span={1}>
                                 <Avatar alt="it's me" size="md" src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} />
                              </Grid.Col>
                              <Grid.Col span={8}>
                                 <Box>
                                    <Text c={tema.get().utama} fw={"bold"} lineClamp={1} pl={isMobile2 ? 25 : 15} fz={isMobile ? 15 : 16}>
                                       {v.username}
                                    </Text>
                                 </Box>
                              </Grid.Col>
                              <Grid.Col span={3}>
                                 <Text c={"grey"} ta={"end"} fz={13}>{moment(v.createdAt).format("ll")}</Text>
                              </Grid.Col>
                           </Grid>
                           <Box mt={10}>
                              <Spoiler maxHeight={50} showLabel="Lebih banyak" hideLabel="Lebih sedikit">
                                 <Text
                                    style={{
                                       overflowWrap: "break-word"
                                    }}
                                 >
                                    {v.comment}
                                 </Text>
                              </Spoiler>
                           </Box>
                           <Box mt={20}>
                              <Divider size={"xs"} />
                           </Box>
                        </Box>
                     );
                  })
               }
            </Box>
         </Box>
         {isLoad ?
            <Skeleton width={"100%"} height={50} radius={100} />
            :
            <Box pos={'fixed'} bottom={0} w={"100%"} style={{
               maxWidth: rem(550)
            }} pl={rem(15)} pr={rem(15)} bg={tema.get().bgUtama}>
               <Box bg={tema.get().bgUtama} >
                  <Group justify="flex-end">
                     <Text fz={13}>{300 - isComent.length} karakter tersisa</Text>
                  </Group>
                  <Box mb={20} bg={tema.get().bgUtama}>
                     <Grid bg={"white"} style={{
                        border: '1px solid gray',
                        borderRadius: 40
                     }} justify="center" align="center">
                        <Grid.Col span={10}>
                           <TextInput
                              styles={{
                                 input: {
                                    color: tema.get().utama,
                                    border: "none",
                                    backgroundColor: "transparent"
                                 },
                              }}
                              size="md"
                              placeholder="Kirim Komentar"
                              disabled={isData?.status === 2}
                              onChange={(e) => setIsComent(e.target.value)}
                              value={isComent}
                              maxLength={300}
                           />

                        </Grid.Col>
                        <Grid.Col span={2}>
                           <Center>
                              <ActionIcon
                                 onClick={sendComent}
                                 variant="subtle" aria-label="submit" disabled={isData?.status === 2}>
                                 <LuSendHorizonal size={30} />
                              </ActionIcon>
                           </Center>
                        </Grid.Col>
                     </Grid>
                  </Box>
               </Box>
            </Box>
         }
      </Box>
   )
}

