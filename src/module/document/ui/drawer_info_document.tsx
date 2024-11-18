import { SkeletonDetailProfile } from "@/module/_global";
import { Accordion, Box, Divider, Grid, Group, List, ScrollArea, Skeleton, Stack, Text } from "@mantine/core";
import { useMediaQuery, useShallowEffect } from "@mantine/hooks";
import _ from "lodash";
import { useState } from "react";
import toast from "react-hot-toast";
import { CiCalendarDate } from "react-icons/ci";
import { FcDocument, FcFolder, FcImageFile } from "react-icons/fc";
import { GrLocationPin } from "react-icons/gr";
import { HiOutlineDocumentText } from "react-icons/hi2";
import { MdOutlineCategory } from "react-icons/md";
import { PiUsersThree } from "react-icons/pi";
import { TbLockAccess } from "react-icons/tb";
import { funGetInfoDocument } from "../lib/api_document";
import { IFormDetailMoreItem, IInfoDocument, IInfoShare } from "../lib/type_document";

export default function DrawerInfoDocument({ data }: { data: IFormDetailMoreItem[] }) {
   const [dataInfo, setDataInfo] = useState<IInfoDocument>();
   const [dataShare, setDataShare] = useState<IInfoShare[]>([])
   const [loading, setLoading] = useState(true);
   const isMobile = useMediaQuery("(max-width: 369px)");


   async function getOneData(loading: boolean) {
      try {
         setLoading(loading);
         const respon = await funGetInfoDocument("?item=" + data[0].id);
         if (respon.success) {
            setDataInfo(respon.data);
            setDataShare(respon.share)
         } else {
            toast.error(respon.message);
         }
      } catch (error) {
         console.error(error);
         toast.error("Gagal mendapatkan item, coba lagi nanti");
      } finally {
         setLoading(false);
      }
   }

   useShallowEffect(() => {
      getOneData(true);
   }, []);

   return (
      <Box>
         <Box pb={60}>
            <Box>
               <Stack
                  align="center"
                  justify="center"
                  gap="xs"
               >
                  {loading ? <Skeleton height={100} radius={"10"} width={100} /> :
                     dataInfo?.category == "FOLDER"
                        ? (<FcFolder size={isMobile ? 80 : 100} />)
                        : dataInfo?.extension == "pdf" || dataInfo?.extension == "csv"
                           ? (<FcDocument size={isMobile ? 80 : 100} />)
                           : (<FcImageFile size={isMobile ? 80 : 100} />)
                  }
               </Stack>
            </Box>
            <ScrollArea
               h={{
                  base: "55vh",
                  xl: "56vh",
                  md: "56vh",
                  sm: "56vh",
               }}
               type="scroll"
               scrollbarSize={2}
               scrollHideDelay={0}
               scrollbars="y"
            >
               {loading ? (
                  <SkeletonDetailProfile />
               ) : (
                  <Stack py={20}>
                     <Grid>
                        <Grid.Col span={6}>
                           <Group>
                              {
                                 !isMobile ?
                                    <HiOutlineDocumentText size={25} />
                                    : ''
                              }
                              <Text fz={15}>Nama Dokumen</Text>
                           </Group>
                        </Grid.Col>
                        <Grid.Col span={6}>
                           <Text lineClamp={1} fz={15} ta={"right"}>{dataInfo?.category == "FOLDER" ? dataInfo?.name : dataInfo?.name + '.' + dataInfo?.extension}</Text>
                        </Grid.Col>
                     </Grid>
                     <Divider size="xs" />
                     <Grid>
                        <Grid.Col span={5}>
                           <Group>
                              {
                                 !isMobile ?
                                    <MdOutlineCategory size={25} />
                                    : ''
                              }
                              <Text fz={15}>Tipe</Text>
                           </Group>
                        </Grid.Col>
                        <Grid.Col span={7}>
                           <Text fz={15} ta={"right"}>{_.lowerCase(dataInfo?.category)}</Text>
                        </Grid.Col>
                     </Grid>
                     <Divider size="xs" />
                     <Grid>
                        <Grid.Col span={4}>
                           <Group>
                              {
                                 !isMobile ?
                                    <GrLocationPin size={25} />
                                    : ''
                              }
                              <Text fz={15}>Lokasi</Text>
                           </Group>
                        </Grid.Col>
                        <Grid.Col span={8}>
                           <Text lineClamp={1} fz={15} ta={"right"}>{dataInfo?.path}</Text>
                        </Grid.Col>
                     </Grid>
                     <Divider size="xs" />
                     <Grid>
                        <Grid.Col span={4}>
                           <Group>
                              {
                                 !isMobile ?
                                    <PiUsersThree size={25} />
                                    : ''
                              }
                              <Text fz={15}>Pemilik</Text>
                           </Group>
                        </Grid.Col>
                        <Grid.Col span={8}>
                           <Text lineClamp={1} fz={15} ta={"right"}> {dataInfo?.division} </Text>
                        </Grid.Col>
                     </Grid>
                     <Divider size="xs" />
                     <Grid>
                        <Grid.Col span={6}>
                           <Group>
                              {
                                 !isMobile ?
                                    <CiCalendarDate size={25} />
                                    : ''
                              }
                              <Text fz={15}>Tanggal Dibuat</Text>
                           </Group>
                        </Grid.Col>
                        <Grid.Col span={6}>
                           <Text fz={15} ta={"right"}>
                              {dataInfo?.createdAt}
                           </Text>
                        </Grid.Col>
                     </Grid>
                     <Divider size="xs" />
                     <Accordion p={0} mt={-15}>
                        <Accordion.Item value="share" p={0}>
                           <Accordion.Control p={0} icon={
                              !isMobile ?
                                 <TbLockAccess size={25} />
                                 : ''
                           } fz={15}>Yang Memiliki Akses</Accordion.Control>
                           <Accordion.Panel>
                              <List
                                 spacing="xs"
                                 size="sm"
                                 center
                                 icon={
                                    <PiUsersThree size={20} />
                                 }
                              >
                                 <List.Item>{dataInfo?.division}</List.Item>
                                 {
                                    dataShare.map((i: any) => {
                                       return (
                                          <List.Item key={i.id}>{i.division}</List.Item>
                                       )
                                    })
                                 }
                              </List>
                           </Accordion.Panel>
                        </Accordion.Item>
                     </Accordion>
                  </Stack>
               )}
            </ScrollArea>
         </Box>
      </Box>
   );
}
