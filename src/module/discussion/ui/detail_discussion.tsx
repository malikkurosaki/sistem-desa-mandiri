"use client"
import { ActionIcon, Avatar, Badge, Box, Center, Divider, Flex, Grid, Group, Input, rem, Skeleton, Spoiler, Text, TextInput } from "@mantine/core";
import { SkeletonDetailDiscussionComment, SkeletonDetailDiscussionMember, SkeletonSingle, WARNA } from "@/module/_global";
import { GrChatOption } from "react-icons/gr";
import { LuSendHorizonal } from "react-icons/lu";
import NavbarDetailDiscussion from "@/module/discussion/ui/navbar_detail_discussion";
import { useState } from "react";
import { funCreateComent, funGetAllDiscussion, funGetDiscussionById } from "../lib/api_discussion";
import { useShallowEffect } from "@mantine/hooks";
import { IDetailDiscussion } from "../lib/type_discussion";
import moment from "moment";
import "moment/locale/id";
import { useParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useHookstate } from "@hookstate/core";
import { globalRefreshDiscussion } from "../lib/val_discussion";

export default function DetailDiscussion({ id, idDivision }: { id: string, idDivision: string }) {
   const [isData, setData] = useState<IDetailDiscussion>()
   const [isComent, setIsComent] = useState("")
   const param = useParams<{ id: string, detail: string }>()
   const [isLoad, setIsLoad] = useState(true)
   const router = useRouter()
   const refresh = useHookstate(globalRefreshDiscussion)

   const getData = async () => {
      try {
         setIsLoad(true)
         const response = await funGetDiscussionById(id)
         setData(response.data)
         setIsLoad(false)
      } catch (error) {
         console.log(error)
      } finally {
         setIsLoad(false)
      }
   }

   useShallowEffect(() => {
      getData()
   }, [refresh.get()])

   const sendComent = async () => {
      try {
         if (isComent.trim() == "") {
            return toast.error("Masukkan Komentar Anda")
         }
         const response = await funCreateComent(id, {
            comment: isComent,
            idDiscussion: param.detail
         })

         if (response.success) {
            setIsComent("")
            getData()
         } else {
            toast.error(response.message)
         }
      } catch (error) {
         console.log(error)
      }
   }



   return (
      <Box>
         <NavbarDetailDiscussion id={id} status={Number(isData?.status)} idDivision={idDivision} />
         <Box p={20}>
            {isLoad ?
               Array(1)
                  .fill(null)
                  .map((_, i) => (
                     <Box key={i}>
                        <Box>
                           <Flex
                              justify={"space-between"}
                              align={"center"}
                              mt={20}
                           >
                              <Group>
                                 <Skeleton width={60} height={60} radius={100} />
                                 <Box>
                                    <Skeleton width={100} height={20} radius={"md"} />
                                    <Skeleton mt={8} width={60} height={20} radius={"md"} />
                                 </Box>
                              </Group>
                              <Skeleton width={"50%"} height={20} radius={"md"} />
                           </Flex>
                           <Box mt={10}>
                              <Skeleton width={"100%"} height={100} radius={"md"} />
                           </Box>
                        </Box>
                     </Box>
                  )) :
               <>
                  {isData?.totalComments == 0 ?
                     <Box mb={60}>
                        <Flex
                           justify={"space-between"}
                           align={"center"}
                           mt={20}
                        >
                           {isData?.username ?
                              <Group>
                                 <Avatar src={`/api/file/img?cat=user&file=${isData?.user_img}`} alt="it's me" size="lg" />
                                 <Box>
                                    <Text c={WARNA.biruTua} fw={"bold"}>
                                       {isData?.username}
                                    </Text>
                                    <Badge color={isData?.status === 1 ? "green" : "red"} size="sm">{isData?.status === 1 ? "BUKA" : "TUTUP"}</Badge>
                                 </Box>
                              </Group> : ""
                           }
                           <Text c={"grey"} fz={13}>{isData?.createdAt}</Text>
                        </Flex>
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
                        <Flex
                           justify={"space-between"}
                           align={"center"}
                           mt={20}
                        >
                           {isData?.username ?
                              <Group>
                                 <Avatar src={`/api/file/img?cat=user&file=${isData?.user_img}`} alt="it's me" size="lg" />
                                 <Box>
                                    <Text c={WARNA.biruTua} fw={"bold"}>
                                       {isData?.username}
                                    </Text>
                                    <Badge color={isData?.status === 1 ? "green" : "red"} size="sm">{isData?.status === 1 ? "BUKA" : "TUTUP"}</Badge>
                                 </Box>
                              </Group> : ""
                           }
                           <Text c={"grey"} fz={13}>{isData?.createdAt}</Text>
                        </Flex>
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
            <Box pl={10} pr={10} mb={30}>
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
                           <Flex
                              justify={"space-between"}
                              align={"center"}
                           >
                              <Group>
                                 <Avatar alt="it's me" size="md" src={`/api/file/img?cat=user&file=${v.img}`} />
                                 <Box>
                                    <Text c={WARNA.biruTua} fw={"bold"} fz={15}>
                                       {v.username}
                                    </Text>
                                 </Box>
                              </Group>
                              <Text c={"grey"} fz={13}>{moment(v.createdAt).format("LL")}</Text>
                           </Flex>
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
               }} pl={rem(15)} pr={rem(15)} bg={WARNA.bgWhite}>
                  <Box bg={WARNA.bgWhite} >
                     <Group justify="flex-end">
                        <Text fz={13}>{300 - isComent.length} karakter tersisa</Text>
                     </Group>
                     <Box mb={20} bg={WARNA.bgWhite}>
                        <Grid bg={"white"} style={{
                           border: '1px solid gray',
                           borderRadius: 40
                        }} justify="center" align="center">
                           <Grid.Col span={10}>
                              <TextInput
                                 styles={{
                                    input: {
                                       color: WARNA.biruTua,
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

