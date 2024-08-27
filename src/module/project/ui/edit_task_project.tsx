"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { funEditProject, funGetOneProjectById } from '../lib/api_project';
import { useShallowEffect } from '@mantine/hooks';
import { Box, Button, Input, Stack, TextInput } from '@mantine/core';
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';

export default function EditTaskProject() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const param = useParams<{ id: string }>()
  const [touched, setTouched] = useState({
    name: false,
 });

  function onVerification() {
    if (name == "")
      return toast.error("Error! harus memasukkan judul tugas")

    setOpenModal(true)
  }

  async function onSubmit() {
    try {
      const res = await funEditProject(param.id, { name })
      if (res.success) {
        toast.success(res.message)
        router.push("./")
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal mengedit Kegiatan, coba lagi nanti")
    }
  }

  async function getOneData() {
    try {
      const res = await funGetOneProjectById(param.id, 'data');
      if (res.success) {
        setName(res.data.title);
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan data Kegiatan, coba lagi nanti");
    }
  }

  useShallowEffect(() => {
    getOneData();
  }, [param.id])

  return (
    <Box pos={"relative"} h={"100vh"}>
      <LayoutNavbarNew back="" title={"Edit Judul Kegiatan"} menu />
      <Box p={20}>
        <Stack pt={15}>
          <TextInput
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            placeholder="Tugas"
            required
            size="md"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              setTouched({ ...touched, name: false })
             }}
            error={
              touched.name && (
                 name == "" ? "Judul Tidak Boleh Kosong" : null
              )
           }
            onBlur={() => setTouched({ ...touched, name: true })}
          />
        </Stack>
        <Box pos={"absolute"} bottom={10} left={0} right={0} p={20}>
          <Button
            c={"white"}
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => { onVerification() }}
          >
            Simpan
          </Button>
        </Box>
      </Box>


      <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin mengedit tugas ini?"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }
          setOpenModal(false)
        }} />
    </Box>
  );
}

