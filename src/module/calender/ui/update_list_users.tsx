"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { funGetDivisionById, IDataMemberDivision } from '@/module/division_new';
import { useHookstate } from '@hookstate/core';
import { Avatar, Box, Button, Center, Divider, Flex, Group, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { globalCalender } from '../lib/val_calender';
import toast from 'react-hot-toast';
import { useShallowEffect } from '@mantine/hooks';
import { FaCheck } from 'react-icons/fa6';

const dataUser = [
  {
    id: 1,
    img: "https://i.pravatar.cc/500?img=3",
    name: "Doni Setiawan",
  },
  {
    id: 2,
    img: "https://i.pravatar.cc/500?img=10",
    name: "Ilham Udin",
  },
  {
    id: 3,
    img: "https://i.pravatar.cc/500?img=11",
    name: "Didin Anang",
  },
  {
    id: 4,
    img: "https://i.pravatar.cc/500?img=1",
    name: "Angga Saputra",
  },
  {
    id: 5,
    img: "https://i.pravatar.cc/500?img=2",
    name: "Marcel Widianto",
  },
  {
    id: 6,
    img: "https://i.pravatar.cc/500?img=7",
    name: "Bagas Nusantara",
  },
];

export default function UpdateListUsers({ onClose }: { onClose: (val: any) => void }) {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const [isData, setData] = useState<IDataMemberDivision[]>([])
  const member = useHookstate(globalCalender)
  const [selectAll, setSelectAll] = useState(false)

  async function getData() {
    try {
      const response = await funGetDivisionById(param.id)
      if (response.success) {
        setData(response.data.member)
        if (member.length > 0) {
          setSelectedFiles(JSON.parse(JSON.stringify(member.get())))
        }
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal mendapatkan anggota, coba lagi nanti");
    }
  }


  useShallowEffect(() => {
    getData()
  }, []);

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
        if (!selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
          const newArr = {
            idUser: isData[index].idUser, name: isData[index].name
          }
          setSelectedFiles((selectedFiles: any) => [...selectedFiles, newArr])
        }

      }
    } else {
      setSelectedFiles([]);
    }
  };


  function onSubmit() {
    if (selectedFiles.length == 0) {
      return toast.error("Error! silahkan pilih anggota")
    }
    member.set(selectedFiles)
    onClose(true)
  }

  return (
    <Box>
    <LayoutNavbarNew
      // back=""
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
      <Box mt={15}>
        {isData.map((v, i) => {
          const isSelected = selectedFiles.some((i: any) => i?.idUser == v.idUser);
          return (
            <Box mb={15} key={i} onClick={() => handleFileClick(i)}>
              <Flex justify={"space-between"} align={"center"}>
                <Group>
                  <Avatar src={"v.image"} alt="it's me" size="lg" />
                  <Text style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}>
                    {v.name}
                  </Text>
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
      <Box mt={"xl"}>
        <Button
          c={"white"}
          bg={WARNA.biruTua}
          size="lg"
          radius={30}
          fullWidth
          onClick={() => {onSubmit()}}
        >
          Simpan
        </Button>
      </Box>
    </Box>
  </Box>
  );
}

