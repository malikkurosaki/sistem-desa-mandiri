"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { IDataMemberProject, IDataMemberProjectDetail } from '../lib/type_project';
import toast from 'react-hot-toast';
import { funAddMemberProject, funGetAllMemberById, funGetOneProjectById } from '../lib/api_project';
import { useShallowEffect } from '@mantine/hooks';
import { Avatar, Box, Button, Divider, Flex, Group, rem, Stack, Text } from '@mantine/core';
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { FaCheck } from 'react-icons/fa6';
import LayoutModal from '@/module/_global/layout/layout_modal';

export default function AddMemberDetailProject() {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const [isData, setData] = useState<IDataMemberProjectDetail[]>([])
  const [isDataMember, setDataMember] = useState<IDataMemberProject[]>([])
  const [selectAll, setSelectAll] = useState(false)
  const [openModal, setOpenModal] = useState(false)


  async function getData() {
    try {
      const response = await funGetAllMemberById(param.id)
      if (response.success) {
        setData(response.data.member)
      } else {
        toast.error(response.message)
      }

      const res = await funGetOneProjectById(param.id, 'member');
      if (res.success) {
        setDataMember(res.data)
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal mendapatkan anggota, coba lagi nanti");
    }
  }

  const handleFileClick = (index: number) => {
    if (selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
      setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != isData[index].idUser))
    } else {
      setSelectedFiles([...selectedFiles, { idUser: isData[index].idUser, name: isData[index].name }])
    }
  };



  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      for (let index = 0; index < isData.length; index++) {
        if (!isDataMember.some((i: any) => i.idUser == isData[index].idUser)) {
          if (!selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
            const newArr = {
              idUser: isData[index].idUser, name: isData[index].name
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

  useShallowEffect(() => {
    getData()
  }, []);

  async function onSubmit() {
    try {
      const res = await funAddMemberProject(param.id, { member: selectedFiles });
      if (res.success) {
        toast.success(res.message)
        router.back()
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal menambahkan anggota, coba lagi nanti");
    }
  }

  return (
    <Box>
      <LayoutNavbarNew
        back=""
        title="Pilih Anggota"
        menu
      />
      <Box p={20}>
        <Group justify="space-between" mt={20} onClick={handleSelectAll}>
          <Text c={WARNA.biruTua} fw={"bold"}>
            Pilih Semua Anggota
          </Text>
          {selectAll ? <FaCheck style={{ marginRight: 10 }} /> : ""}
        </Group>
        <Box mt={15} mb={100}>
          {isData.map((v, i) => {
            const isSelected = selectedFiles.some((i: any) => i?.idUser == v.idUser);
            const found = isDataMember.some((i: any) => i.idUser == v.idUser)
            return (
              <Box mb={15} key={i} onClick={() => (!found) ? handleFileClick(i) : null}>
                <Flex justify={"space-between"} align={"center"}>
                  <Group>
                    <Avatar src={"v.image"} alt="it's me" size="lg" />
                    <Stack align="flex-start" justify="flex-start">
                      <Text style={{
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        {v.name}
                      </Text>
                      <Text c={"dimmed"}>{(found) ? "sudah menjadi anggota" : ""}</Text>
                    </Stack>
                  </Group>
                  <Text
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 20,
                    }}
                  >
                    {isSelected ? <FaCheck style={{ marginRight: 10 }} /> : ""}
                  </Text>
                </Flex>
                <Divider my={"md"} />
              </Box>
            );
          })}
        </Box>
      </Box>
        <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
            maxWidth: rem(550),
            zIndex: 999,
            backgroundColor: `${WARNA.bgWhite}`,
         }}>
          <Button
            c={"white"}
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => { onVerifikasi() }}
          >
            Simpan
          </Button>
        </Box>

      <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin menambahkan anggota?"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }
          setOpenModal(false)
        }} />
    </Box>
  );
}
