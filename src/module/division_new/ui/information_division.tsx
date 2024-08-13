"use client"
import { LayoutDrawer, LayoutNavbarNew, SkeletonSingle, WARNA } from '@/module/_global';
import { ActionIcon, Avatar, Box, Button, Divider, Flex, Group, Skeleton, Stack, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { FaUserTie } from 'react-icons/fa6';
import { IoIosCloseCircle } from 'react-icons/io';
import { LuClipboardEdit } from 'react-icons/lu';
import { funDeleteMemberDivision, funEditStatusAdminDivision, funGetDivisionById } from '../lib/api_division';
import { IDataMemberDivision } from '../lib/type_division';
import LayoutModal from '@/module/_global/layout/layout_modal';


export default function InformationDivision() {
  const router = useRouter()
  const [openDrawer, setDrawer] = useState(false)
  const param = useParams<{ id: string }>()
  const [name, setName] = useState('')
  const [deskripsi, setDeskripsi] = useState('')
  const [member, setMember] = useState<IDataMemberDivision[]>([])
  const [loading, setLoading] = useState(false)
  const [valChooseMember, setChooseMember] = useState("")
  const [valChooseMemberStatus, setChooseMemberStatus] = useState<boolean>(false)
  const [valChooseMemberName, setChooseMemberName] = useState("")
  const [isOpenModal, setOpenModal] = useState(false)

  async function getOneData() {
    try {
      setLoading(true);
      const res = await funGetDivisionById(param.id);
      if (res.success) {
        setName(res.data.division.name);
        setDeskripsi(res.data.division.desc);
        setMember(res.data.member)
      } else {
        toast.error(res.message);
      }
      setLoading(false);

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    getOneData();
  }, [param.id])


  async function onClickMember(id: string, status: boolean) {
    setChooseMember(id)
    setChooseMemberStatus(status)
    setDrawer(true)
  }


  async function deleteMember() {
    try {
      const res = await funDeleteMemberDivision(param.id, { id: valChooseMember })
      if (res.success) {
        toast.success(res.message)
        setDrawer(false)
        getOneData()
      } else {
        toast.error(res.message)
      }
      setOpenModal(false)
    } catch (error) {
      console.error(error);
      setOpenModal(false)
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
    }
  }


  async function editStatusAdmin() {
    try {
      const res = await funEditStatusAdminDivision(param.id, { id: valChooseMember, isAdmin: valChooseMemberStatus })
      if (res.success) {
        toast.success(res.message)
        getOneData()
      } else {
        toast.error(res.message)
      }
      setDrawer(false)
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
    }
  }

  return (
    <Box>
      <LayoutNavbarNew back={"/division/" + param.id} title={name}
        menu={
          <ActionIcon variant="light" onClick={() => {
            router.push('/division/edit/' + param.id)
          }} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
            <LuClipboardEdit size={20} color='white' />
          </ActionIcon>}
      />
      <Box p={20}>
        <Box>
          <Text fw={"bold"}>Deskripsi Divisi</Text>
          <Box p={20} bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${WARNA.borderBiruMuda}`,
          }}>
            {
              loading ?
                Array(3)
                  .fill(null)
                  .map((_, i) => (
                    <Stack align="stretch" justify="center" key={i} mb={10}>
                      <Skeleton height={10} radius="md" m={0} />
                    </Stack>
                  ))
                :
                (deskripsi != null && deskripsi != undefined) ?
                  <Text ta={"justify"}>{deskripsi}</Text>
                  : <></>
            }
          </Box>
        </Box>
        <Box mt={20}>
          <Box p={20} bg={"white"} style={{
            borderRadius: 10,
            border: `1px solid ${WARNA.borderBiruMuda}`,
          }}>
            <Box>
              <Text>{member.length} Anggota</Text>
            </Box>
            <Box mt={15}>
              <Group align='center' onClick={() => router.push('/division/add-member/' + param.id)}>
                <Avatar size="lg">
                  <AiOutlineUserAdd size={30} color={WARNA.biruTua} />
                </Avatar>
                <Text>Tambah Anggota</Text>
              </Group>
            </Box>
            <Box pt={10}>
              <Box mb={10}>
                {loading
                  ? Array(3)
                    .fill(null)
                    .map((_, i) => (
                      <Box key={i}>
                        <SkeletonSingle />
                      </Box>
                    ))
                  : member.map((v, i) => {
                    return (
                      <Box key={i}>
                        <Flex
                          justify={"space-between"}
                          align={"center"}
                          mt={10}
                          onClick={() => { onClickMember(v.id, (v.isAdmin) ? true : false), setChooseMemberName(v.name) }}
                        >
                          <Group>
                            <Avatar src={"v.img"} alt="it's me" size="lg" />
                            <Box>
                              <Text c={WARNA.biruTua} fw={"bold"}>
                                {v.name}
                              </Text>
                            </Box>
                          </Group>
                          <Text c={WARNA.biruTua} fw={"bold"}>
                            {(v.isAdmin) ? 'Admin' : 'Anggota'}
                          </Text>
                        </Flex>
                        <Box mt={10}>
                          <Divider size={"xs"} />
                        </Box>
                      </Box>
                    );
                  })
                }
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      <LayoutDrawer opened={openDrawer} onClose={() => setDrawer(false)} title={valChooseMemberName}>
        <Box>
          <Group align='center' mb={20} onClick={() => editStatusAdmin()}>
            <ActionIcon variant="light" size={60} aria-label="admin" radius="xl">
              <FaUserTie size={30} color={WARNA.biruTua} />
            </ActionIcon>
            <Text c={WARNA.biruTua}>{(valChooseMemberStatus == false) ? "Jadikan admin" : "Memberhentikan sebagai admin"}</Text>
          </Group>
          <Group align='center' onClick={() => setOpenModal(true)}>
            <ActionIcon variant="light" size={60} aria-label="admin" radius="xl">
              <IoIosCloseCircle size={40} color={WARNA.biruTua} />
            </ActionIcon>
            <Text c={WARNA.biruTua}>Keluarkan dari divisi</Text>
          </Group>
        </Box>
      </LayoutDrawer>

      <LayoutModal opened={isOpenModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin mengeluarkan anggota?"
        onYes={(val) => {
          if (!val) {
            setOpenModal(false)
          } else {
            deleteMember()
          }
        }} />
    </Box>
  );
}
