"use client"
import { LayoutNavbarNew, SkeletonSingle, WARNA } from "@/module/_global";
import { funGetDivisionById, IDataMemberDivision } from "@/module/division_new";
import { useHookstate } from "@hookstate/core";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Grid,
  Group,
  rem,
  Skeleton,
  Text,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { globalMemberTask } from "../lib/val_task";
import { FaCheck } from "react-icons/fa6";
import { RiListCheck } from "react-icons/ri";
import { BsListCheck } from "react-icons/bs";

export default function CreateUsersProject({ onClose }: { onClose: (val: any) => void }) {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const [isData, setData] = useState<IDataMemberDivision[]>([])
  const member = useHookstate(globalMemberTask)
  const [selectAll, setSelectAll] = useState(false)
  const [loading, setLoading] = useState(true)


  async function getData() {
    try {
      setLoading(true)
      const response = await funGetDivisionById(param.id)
      if (response.success) {
        setData(response.data.member)
        if (member.length > 0) {
          setSelectedFiles(JSON.parse(JSON.stringify(member.get())))
        }
      } else {
        toast.error(response.message)
      }
      setLoading(false)
    } catch (error) {
      console.log(error)
      toast.error("Gagal mendapatkan anggota, coba lagi nanti");
    } finally {
      setLoading(false)
    }
  }


  useShallowEffect(() => {
    getData()
  }, []);

  const handleFileClick = (index: number) => {
    if (selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
      setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != isData[index].idUser))
    } else {
      setSelectedFiles([...selectedFiles, { idUser: isData[index].idUser, name: isData[index].name, img: isData[index].img }])
    }
  };



  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      for (let index = 0; index < isData.length; index++) {
        if (!selectedFiles.some((i: any) => i.idUser == isData[index].idUser)) {
          const newArr = {
            idUser: isData[index].idUser, name: isData[index].name, img: isData[index].img
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
        {loading ?
          <Skeleton height={20} width={"100%"} mt={20} />
          :
          <Group justify="space-between" mt={20} onClick={handleSelectAll}>
            <Text c={WARNA.biruTua} fw={"bold"}>
              Pilih Semua Anggota
            </Text>
            <BsListCheck size={25} style={{ marginRight: 5 }} color={WARNA.biruTua} />
          </Group>
        }
        <Box mt={15} mb={100}>
          {loading ?
            Array(8)
              .fill(null)
              .map((_, i) => (
                <Box key={i} mb={15}>
                  <SkeletonSingle />
                </Box>
              ))
            :
            isData.map((v, i) => {
              const isSelected = selectedFiles.some((i: any) => i?.idUser == v.idUser);
              return (
                <Box mb={15} key={i} onClick={() => handleFileClick(i)}>
                  <Grid align='center'>
                    <Grid.Col span={{
                      base: 3,
                      xl: 2
                    }}>
                      <Avatar src={`/api/file/img?jenis=image&cat=user&file=${v.img}`} alt="it's me" size="lg" />
                    </Grid.Col>
                    <Grid.Col span={{
                      base: 9,
                      xl: 10
                    }}>
                      <Flex justify='space-between' align={"center"}>
                        <Flex direction={'column'} align="flex-start" justify="flex-start">
                          <Text lineClamp={1}>{v.name}</Text>
                        </Flex>
                        {isSelected ? <FaCheck /> : null}
                      </Flex>
                    </Grid.Col>
                  </Grid>
                  <Box mt={10}>
                    <Divider size={"xs"} />
                  </Box>
                </Box>
              );
            })
          }
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
          onClick={() => { onSubmit() }}
        >
          Simpan
        </Button>
      </Box>
    </Box>
  );
}
