import React, { useState } from 'react';
import { globalCalender } from '../lib/val_calender';
import { useParams, useRouter } from 'next/navigation';
import { funGetDivisionById, IDataMemberDivision } from '@/module/division_new';
import { useHookstate } from '@hookstate/core';
import toast from 'react-hot-toast';
import { useShallowEffect } from '@mantine/hooks';
import { LayoutNavbarNew, SkeletonSingle, WARNA } from '@/module/_global';
import { Avatar, Box, Button, Divider, Flex, Group, rem, Text } from '@mantine/core';
import { FaCheck } from 'react-icons/fa6';

export default function CreateUserCalender({ onClose }: { onClose: (val: any) => void }) {
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [selectedFiles, setSelectedFiles] = useState<any>([])
  const [isData, setData] = useState<IDataMemberDivision[]>([])
  const member = useHookstate(globalCalender)
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
        setLoading(false)
      } else {
        toast.error(response.message)
      }
      
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
      <Group justify="space-between" mt={20} onClick={handleSelectAll}>
        <Text c={WARNA.biruTua} fw={"bold"}>
          Pilih Semua Anggota
        </Text>
        {selectAll ? <FaCheck style={{ marginRight: 10 }} /> : ""}
        </Group>
        {loading ? 
          Array(8)
          .fill(null)
          .map((_, i) => (
             <Box key={i}>
                <SkeletonSingle />
             </Box>
          ))
          :  
      <Box mt={20}>
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
        }
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
          onClick={() => {onSubmit()}}
        >
          Simpan
        </Button>
      </Box>
  </Box>
  );
}
