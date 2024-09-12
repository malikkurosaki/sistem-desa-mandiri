"use client"
import { LayoutIconBack, LayoutNavbarHome, SkeletonDetailProfile, WARNA } from "@/module/_global";
import { ActionIcon, Avatar, Box, Grid, Group, Skeleton, Stack, Text } from "@mantine/core";
import { RiIdCardFill } from "react-icons/ri";
import { FaSquarePhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { IoMaleFemale } from "react-icons/io5";
import toast from "react-hot-toast";
import { LuLogOut } from "react-icons/lu";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useState } from "react";
import { funGetProfileByCookies } from "../lib/api_profile";
import { useShallowEffect } from "@mantine/hooks";
import { IProfileById } from "../lib/type_profile";
import { useRouter } from "next/navigation";

export default function Profile() {
  const [openModal, setOpenModal] = useState(false);
  const [isData, setData] = useState<IProfileById>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [img, setIMG] = useState<any | null>()

  async function getData() {
    try {
      setLoading(true)
      const res = await funGetProfileByCookies()
      setData(res.data)
      setIMG(`https://wibu-storage.wibudev.com/api/files/${res.data.img}`)
      setLoading(false)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useShallowEffect(() => {
    getData()
  }, [])

  async function onLogout(val: boolean) {
    try {
      if (val) {
        await fetch('/api/auth/logout', {
          method: 'DELETE',
        });
        toast.success('Logout Sukses')
        window.location.href = '/';
      }

      setOpenModal(false)

    } catch (error) {
      console.error(error);
    }
  }
  return (
    <>
      <Box >
        <LayoutNavbarHome  >
          <Group justify="space-between">
            <LayoutIconBack back="/home" />
            <ActionIcon onClick={() => { setOpenModal(true) }} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Info">
              <LuLogOut size={20} color='white' />
            </ActionIcon>
          </Group>
          <Stack
            align="center"
            justify="center"
            gap="xs"
          >
            <Avatar
              size="100"
              radius={"100"}
              src={img}
            />
            {loading ?
              <Skeleton height={62} mt={10} width={"40%"} />
              :
              <>
                <Text c={'white'} fw={'bold'} fz={25} ta={"center"}>{isData?.name}</Text>
                <Text c={'white'} fw={'lighter'} fz={15}>{isData?.group} - {isData?.position}</Text>
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
              <Group justify="flex-end">
                <Text style={{ cursor: 'pointer' }} ta={"right"} c={"blue"} onClick={() => router.push(`/profile/edit/`)}>Edit</Text>
              </Group>
            </Group>
            <Grid>
              <Grid.Col span={4}>
                <Group>
                  <RiIdCardFill size={25} />
                  <Text fz={15}>NIK</Text>
                </Group>
              </Grid.Col>
              <Grid.Col span={8}>
                <Text fz={15} fw={'bold'} ta={"right"}>{isData?.nik}</Text>
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
                <Text fz={15} fw={'bold'} ta={"right"}>+62{isData?.phone}</Text>
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
                <Text fz={15} fw={'bold'} ta={"right"} lineClamp={1}>{isData?.email}</Text>
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
                  {isData?.gender === 'M' ? 'Laki-laki' : isData?.gender === 'F' ? 'Perempuan' : ''}
                </Text>
              </Grid.Col>
            </Grid>
          </Stack>
        }
      </Box>
      <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin keluar?"
        onYes={(val) => onLogout(val)} />
    </>
  )
}

