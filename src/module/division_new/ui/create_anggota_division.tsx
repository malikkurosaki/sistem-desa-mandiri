"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { funGetUserByCookies } from '@/module/auth';
import { funGetAllmember, TypeUser } from '@/module/user';
import { Avatar, Box, Button, Divider, Group, Stack, Text, TextInput } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaCheck } from 'react-icons/fa6';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { useShallowEffect } from '@mantine/hooks';
import { IDataMemberDivision } from '../lib/type_division';
import { funAddDivisionMember, funGetDivisionById } from '../lib/api_division';


export default function CreateAnggotaDivision() {
  const router = useRouter()
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const [dataMember, setDataMember] = useState<TypeUser>([])
  const [memberDb, setMemberDb] = useState<IDataMemberDivision[]>([])
  const [group, setGroup] = useState("")
  const [isOpen, setOpen] = useState(false)
  const param = useParams<{ id: string }>()

  const handleFileClick = (index: number) => {
    if (selectedFiles.some((i: any) => i.idUser == dataMember[index].id)) {
      setSelectedFiles(selectedFiles.filter((i: any) => i.idUser != dataMember[index].id))
    } else {
      setSelectedFiles([...selectedFiles, { idUser: dataMember[index].id, name: dataMember[index].name }])
    }
  };


  async function loadMember(group: string, search: string) {
    const res = await funGetAllmember('?active=true&group=' + group + '&search=' + search);
    const user = await funGetUserByCookies();

    if (res.success) {
      setDataMember(res.data.filter((i: any) => i.id != user.id))
    } else {
      toast.error(res.message)
    }
  }

  async function loadFirst() {
    const respon = await funGetDivisionById(param.id);
    if (respon.success) {
      setMemberDb(respon.data.member)
      setGroup(respon.data.division.idGroup)
      loadMember(respon.data.division.idGroup, "")
    } else {
      toast.error(respon.message);
    }
  }

  async function addMember() {
    try {
      const res = await funAddDivisionMember(param.id, selectedFiles)
      if (res.success) {
        toast.success(res.message)
        router.push("/division/info/" + param.id)
      } else {
        toast.error(res.message)
      }
      setOpen(false)
    } catch (error) {
      setOpen(false)
      console.log(error);
      toast.error("Gagal menambahkan anggota divisi, coba lagi nanti");

    }
  }


  useShallowEffect(() => {
    loadFirst()
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
            onChange={(e: any) => loadMember(group, e.target.value)}
          />
        </Stack>
        <Box mt={20}>
          {dataMember.map((v: any, index: any) => {
            const isSelected = selectedFiles.some((i: any) => i.idUser == dataMember[index].id)
            const found = memberDb.some((i: any) => i.idUser == v.id)
            return (
              <Box my={10} key={index} onClick={() => (!found) ? handleFileClick(index) : null}>
                <Group justify='space-between' align='center'>
                  <Group>
                    <Avatar src={"v.img"} alt="it's me" size="lg" />
                    <Stack align="flex-start" justify="flex-start">
                      <Text>{v.name}</Text>
                      <Text c={"dimmed"}>{(found) ? "sudah menjadi anggota divisi" : ""}</Text>
                    </Stack>
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
        description="Apakah Anda yakin ingin menambahkan anggota divisi?"
        onYes={(val) => {
          if (val) {
            addMember()
          } else {
            setOpen(false)
          }
        }} />
    </Box>
  );
}
