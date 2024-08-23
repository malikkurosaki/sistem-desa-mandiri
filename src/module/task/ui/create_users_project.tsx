"use client"
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { funGetDivisionById, IDataMemberDivision } from "@/module/division_new";
import { useHookstate } from "@hookstate/core";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  Group,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { globalMemberTask } from "../lib/val_task";
import { FaCheck } from "react-icons/fa6";

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
        {/* <TextInput
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          size="md"
          radius={30}
          leftSection={<HiMagnifyingGlass size={20} />}
          placeholder="Pencarian"
        /> */}
        {loading ?
          <Skeleton height={20} width={"100%"} mt={20} />
          :
          <Group justify="space-between" mt={20} onClick={handleSelectAll}>
            <Text c={WARNA.biruTua} fw={"bold"}>
              Pilih Semua Anggota
            </Text>
            {selectAll ? <FaCheck style={{ marginRight: 10 }} /> : ""}
          </Group>
        }
        <Box mt={15}>
          {loading ?
            Array(3)
              .fill(null)
              .map((_, i) => (
                <Box key={i} mb={15}>
                  <Group>
                    <Box>
                      <ActionIcon
                        variant="light"
                        bg={"#DCEED8"}
                        size={"lg"}
                        radius={100}
                        aria-label="icon"
                      >
                        <Skeleton height={30} width={30} />
                      </ActionIcon>
                    </Box>
                    <Box>
                      <Skeleton height={20} width={"80%"} />
                    </Box>
                  </Group>
                </Box>
              ))
            :
            isData.map((v, i) => {
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
            })
          }
        </Box>
        <Box mt={"xl"}>
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
    </Box>
  );
}
