'use client'
import { LayoutNavbarHome, LayoutIconBack, WARNA, LayoutDrawer, SkeletonDetailProfile, globalRole } from "@/module/_global";
import { Box, Group, ActionIcon, Stack, Text, Center, Avatar, Skeleton, Grid } from "@mantine/core";
import { HiMenu } from "react-icons/hi";
import DrawerDetailMember from "./drawer_detail_member";
import { useState } from "react";
import { RiIdCardFill } from "react-icons/ri";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMaleFemale } from "react-icons/io5";
import { useShallowEffect } from "@mantine/hooks";
import { funGetOneMember } from "../lib/api_member";
import toast from "react-hot-toast";
import { IListMember, IMember } from "../lib/type_member";
import { useHookstate } from "@hookstate/core";
import { valueRoleUser } from "../../lib/val_user";


export default function NavbarDetailMember({ id }: IMember) {
   const [isOpen, setOpen] = useState(false)
   const [dataOne, setDataOne] = useState<IListMember>()
   const [selectId, setSelectId] = useState<string>('');
   const [active, setActive] = useState<boolean>(false)
   const [loading, setLoading] = useState(true)
   const [isEdit, setEdit] = useState(false)
   const roleLogin = useHookstate(globalRole)

   useShallowEffect(() => {
      featchGetOne()
   }, [])


   async function featchGetOne() {
      try {
         setLoading(true)
         const respose = await funGetOneMember(id)
         if (respose.success) {
            setDataOne(respose.data)
            setActive(respose.data?.isActive)
            setSelectId(respose.data?.id)
            setEdit(valueRoleUser.filter((v) => v.login == roleLogin.get())[0]?.data.some((i: any) => i.id == respose.data.idUserRole))
         } else {
            toast.error(respose.message)
         }

         setLoading(false)
      } catch (error) {
         console.error(error)
         toast.error("Gagal mendapatkan detail user, coba lagi nanti");
      } finally {
         setLoading(false)
      }
   }


   return (
      <Box>
         <Box>
            <LayoutNavbarHome>
               <Group justify="space-between">
                  <LayoutIconBack />
                  {
                     (roleLogin.get() != "user") && isEdit &&
                     <ActionIcon onClick={() => setOpen(true)} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Info">
                        <HiMenu size={20} color='white' />
                     </ActionIcon>
                  }
               </Group>
               <Stack
                  align="center"
                  justify="center"
                  gap="xs"
               >
                  <Center>
                     <Avatar src={`https://wibu-storage.wibudev.com/api/files/${dataOne?.img}`} alt="it's me" size="xl" />
                  </Center>
                  {loading ?
                     <>
                        <Skeleton height={25} mt={10} width={"40%"} />
                        <Skeleton height={15} mt={12} width={"30%"} />
                     </>
                     :
                     <>
                        <Text c={'white'} fw={'bold'} fz={25} ta={"center"}>{dataOne?.name}</Text>
                        <Text c={'white'} fw={'lighter'} fz={15}>{dataOne?.group} - {dataOne?.position}</Text>
                     </>
                  }
               </Stack>
            </LayoutNavbarHome>
            {loading
               ?
               <SkeletonDetailProfile />
               :
               <Stack p={20}>
                  <Group justify="space-between" grow py={5}>
                     <Text fw={'bold'} fz={20}>Informasi</Text>
                  </Group>
                  <Grid>
                     <Grid.Col span={4}>
                        <Group>
                           <RiIdCardFill size={25} />
                           <Text fz={15}>NIK</Text>
                        </Group>
                     </Grid.Col>
                     <Grid.Col span={8}>
                        <Text fz={15} fw={'bold'} ta={"right"}>{dataOne?.nik}</Text>
                     </Grid.Col>
                  </Grid>
                  <Grid>
                     <Grid.Col span={5}>
                        <Group>
                           <FaSquarePhone size={25} />
                           <Text fz={15}>No Telpon</Text>
                        </Group>
                     </Grid.Col>
                     <Grid.Col span={7}>
                        <Text fz={15} fw={'bold'} ta={"right"}>+62{dataOne?.phone}</Text>
                     </Grid.Col>
                  </Grid>
                  <Grid>
                     <Grid.Col span={4}>
                        <Group>
                           <MdEmail size={25} />
                           <Text fz={15}>Email</Text>
                        </Group>
                     </Grid.Col>
                     <Grid.Col span={8}>
                        <Text fz={15} fw={'bold'} ta={"right"} lineClamp={1}>{dataOne?.email}</Text>
                     </Grid.Col>
                  </Grid>
                  <Grid>
                     <Grid.Col span={6}>
                        <Group>
                           <IoMaleFemale size={25} />
                           <Text fz={15}>Jenis Kelamin</Text>
                        </Group>
                     </Grid.Col>
                     <Grid.Col span={6}>
                        <Text fz={15} fw={'bold'} ta={"right"}>
                           {dataOne?.gender === 'M' ? 'Laki-laki' : dataOne?.gender === 'F' ? 'Perempuan' : ''}
                        </Text>
                     </Grid.Col>
                  </Grid>
               </Stack>
            }
            <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
               <DrawerDetailMember id={selectId} status={active} onDeleted={() => setOpen(false)} />
            </LayoutDrawer>
         </Box>
      </Box>
   )
} 