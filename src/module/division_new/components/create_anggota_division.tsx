"use client"
import { API_ADDRESS, LayoutNavbarNew, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { funGetUserByCookies } from '@/module/auth';
import { TypeUser } from '@/module/user';
import { useHookstate } from '@hookstate/core';
import { Avatar, Box, Button, Divider, Group, Stack, Text, TextInput } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa6';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { globalMemberDivision } from '../lib/val_division';
import { useShallowEffect } from '@mantine/hooks';
import { funGetAllmember } from '@/module/user/member/lib/api_member';

const dataUser = [
  {
    id: 1,
    img: "https://i.pravatar.cc/1000?img=3",
    name: "Doni Setiawan",
  },
  {
    id: 2,
    img: "https://i.pravatar.cc/1000?img=10",
    name: "Ilham Udin",
  },
  {
    id: 3,
    img: "https://i.pravatar.cc/1000?img=11",
    name: "Didin Anang",
  },
  {
    id: 4,
    img: "https://i.pravatar.cc/1000?img=21",
    name: "Angga Saputra",
  },
  {
    id: 5,
    img: "https://i.pravatar.cc/1000?img=32",
    name: "Marcel Widianto",
  },
  {
    id: 6,
    img: "https://i.pravatar.cc/1000?img=37",
    name: "Bagas Nusantara",
  },
];

export default function CreateAnggotaDivision() {
  const router = useRouter()
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [dataMember, setDataMember] = useState<TypeUser>([])
  const [isOpen, setOpen] = useState(false)
  const param = useParams<{ id: string }>()
  const member = useHookstate(globalMemberDivision)

  const handleFileClick = (index: number) => {
    if (selectedFiles.some((i: any) => i.id == dataMember[index].id)) {
      setSelectedFiles(selectedFiles.filter((i: any) => i.id != dataMember[index].id))
    } else {
      setSelectedFiles([...selectedFiles, { idUser: dataMember[index].id, name: dataMember[index].name }])
    }
  };

  function onTrue(val: boolean) {
    if (val) {
      toast.success("Sukses! Data tersimpan");
    }
    setOpen(false)
    router.push("/division/info/1")
  }

  async function loadData() {
    console.log("masuk")
    const res = await funGetAllmember('?active=true&group=group1');
    const user = await funGetUserByCookies();

    console.log(res)
    // if(res.success){
    //   setDataMember(res.data.filter((i: any) => i.id != user.id))
    // }else{
    //   toast.error(res.message)
    // }
    
    // cek data member sebelumnya
    if (member.length > 0) {
      setSelectedFiles(JSON.parse(JSON.stringify(member.get())))
    }
  }

  useShallowEffect(() => {
    loadData()
  }, []);

  return (
    <Box>
      <LayoutNavbarNew back="" title="tambah anggota"
        menu
      />
      <Box p={20}>
        <Stack>
          <TextInput
            styles={{
              input: {
                color: WARNA.biruTua,
                borderRadius: '#A3A3A3',
                borderColor: '#A3A3A3',
              },
            }}
            size="md"
            radius={30}
            leftSection={<HiMagnifyingGlass size={20} />}
            placeholder="Pencarian"
          />
        </Stack>
        <Box mt={20}>
          {dataUser.map((v, index) => {
            const isSelected = selectedFiles[index];
            return (
              <Box my={10} key={index} onClick={() => handleFileClick(index)}>
                <Group justify='space-between' align='center'>
                  <Group>
                    <Avatar src={v.img} alt="it's me" size="lg" />
                    <Text>{v.name}</Text>
                  </Group>
                  {isSelected ? <FaCheck /> : null}
                </Group>
                <Box mt={10}>
                  <Divider size={"xs"} />
                </Box>
              </Box>
            )
          })}
        </Box>
        <Box mt="xl">
          <Button
            color="white"
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => { setOpen(true) }}
          >
            Simpan
          </Button>
        </Box>
      </Box>
      <LayoutModal opened={isOpen} onClose={() => setOpen(false)}
        description="Apakah Anda yakin ingin menambahkan data?"
        onYes={(val) => { onTrue(val) }} />
    </Box>
  );
}
