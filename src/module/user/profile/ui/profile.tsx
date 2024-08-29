"use client"
import { LayoutIconBack, LayoutNavbarHome, SkeletonDetailProfile, WARNA } from "@/module/_global";
import { ActionIcon, Anchor, Avatar, Box, Button, Flex, Group, Skeleton, Stack, Text } from "@mantine/core";
import { HiUser } from "react-icons/hi2";
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
      setIMG(`/api/file/img?cat=user&file=${res.data.img}`)
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
        toast.success('Logout Success')
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
        <LayoutNavbarHome>
          <Group justify="space-between">
            <LayoutIconBack />
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
              size="150"
              radius={"100"}
              src={img}
            />
            {loading ?
              <Skeleton height={62} mt={10} width={"40%"} />
              :
              <>
                <Text c={'white'} fw={'bold'} fz={25}>{isData?.name}</Text>
                <Text c={'white'} fw={'lighter'} fz={15}>{isData?.group} - {isData?.position}</Text>
              </>
            }
          </Stack>
        </LayoutNavbarHome>
        {loading
          ?
          <SkeletonDetailProfile />
          :
          <Box p={20}>
            <Group justify="space-between" grow py={5}>
              <Text fw={'bold'} fz={20}>Informasi</Text>
              <Text style={{ cursor: 'pointer' }} ta={"right"} c={"blue"} onClick={() => router.push(`/profile/edit/`)}>Edit</Text>
            </Group>
            <Group justify="space-between" grow py={5}>
              <Group>
                <RiIdCardFill size={28} />
                <Text fz={18}>NIK</Text>
              </Group>
              <Text fz={18} fw={'bold'} ta={"right"}>{isData?.nik}</Text>
            </Group>
            <Group justify="space-between" grow py={5}>
              <Group>
                <FaSquarePhone size={28} />
                <Text fz={18}>No Telepon</Text>
              </Group>
              <Text fz={18} fw={'bold'} ta={"right"}>+62{isData?.phone}</Text>
            </Group>
            <Group justify="space-between" grow py={5}>
              <Group>
                <MdEmail size={28} />
                <Text fz={18}>Email</Text>
              </Group>
              <Text fz={18} fw={'bold'} ta={"right"}>{isData?.email}</Text>
            </Group>
            <Group justify="space-between" grow py={5}>
              <Group>
                <IoMaleFemale size={28} />
                <Text fz={18}>Jenis Kelamin</Text>
              </Group>
              <Text fz={18} fw={'bold'} ta={"right"}>
                {isData?.gender === 'M' ? 'Laki-laki' : isData?.gender === 'F' ? 'Perempuan' : ''}
              </Text>
            </Group>

          </Box>
        }
      </Box>
      <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin keluar?"
        onYes={(val) => onLogout(val)} />
    </>
  )
}

