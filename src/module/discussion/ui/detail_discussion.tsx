"use client"
import { ActionIcon, Avatar, Badge, Box, Center, Divider, Flex, Grid, Group, Text, TextInput } from "@mantine/core";
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
import { useParams } from "next/navigation";
import toast from "react-hot-toast";

export default function DetailDiscussion({ id, idDivision }: { id: string, idDivision: string }) {
   const [isData, setData] = useState<IDetailDiscussion>()
   const [isComent, setIsComent] = useState("")
   const param = useParams<{ id: string, detail: string }>()
   const [isLoad, setIsLoad] = useState(false)

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
   }, [])

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
      <>
         <NavbarDetailDiscussion id={id} status={Number(isData?.status)} idDivision={idDivision} />
         <Box p={20}>
            {isLoad ?
               Array(1)
                  .fill(null)
                  .map((_, i) => (
                     <Box key={i} p={10}>
                        <SkeletonDetailDiscussionMember/>
                     </Box>
                  )) :
               <Box>
                  <Flex
                     justify={"space-between"}
                     align={"center"}
                     mt={20}
                  >
                     {isData?.username ?
                        <Group>
                           <Avatar src={'https://i.pravatar.cc/1000?img=5'} alt="it's me" size="lg" />
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
                     <Text fw={"bold"}>{isData?.desc}</Text>
                  </Box>
                  <Group justify="space-between" mt={20} c={'#8C8C8C'}>
                     {isData?.totalComments ? <Group gap={5} align="center">
                        <GrChatOption size={18} />
                        <Text fz={13}>{isData?.totalComments} Komentar</Text>
                     </Group > : ""}

                  </Group>
               </Box>
            }
            <Box p={10}>
               {isLoad ?
                  Array(6)
                     .fill(0)
                     .map((_, i) => (
                        <Box key={i} p={10}>
                          <SkeletonDetailDiscussionComment />
                        </Box>
                     )) :
                  isData?.DivisionDisscussionComment.map((v, i) => {
                     return (
                        <Box key={i} p={10}>
                           <Flex
                              justify={"space-between"}
                              align={"center"}
                           >
                              <Group>
                                 <Avatar alt="it's me" size="md" />
                                 <Box>
                                    <Text c={WARNA.biruTua} fw={"bold"} fz={15}>
                                       {v.username}
                                    </Text>
                                 </Box>
                              </Group>
                              <Text c={"grey"} fz={13}>{moment(v.createdAt).format("LL")}</Text>
                           </Flex>
                           <Box mt={10}>{v.comment}</Box>
                           <Box mt={20}>
                              <Divider size={"xs"} />
                           </Box>
                        </Box>
                     );
                  })
               }
            </Box>
            <Box h={60} pos={"fixed"} bottom={0} w={{ base: "90%", md: "35.5%" }} style={{
               zIndex: 999
            }}>
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
      </>
   )
}

