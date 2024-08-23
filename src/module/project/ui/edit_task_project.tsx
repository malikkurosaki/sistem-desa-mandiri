"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { funEditProject, funGetOneProjectById } from '../lib/api_project';
import { useShallowEffect } from '@mantine/hooks';
import { Box, Button, Input, Stack } from '@mantine/core';
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';

export default function EditTaskProject() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const param = useParams<{ id: string }>()

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
      toast.error("Gagal mengedit proyek, coba lagi nanti")
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
      toast.error("Gagal mendapatkan data proyek, coba lagi nanti");
    }
  }

  useShallowEffect(() => {
    getOneData();
  }, [param.id])

  return (
    <Box>
      <LayoutNavbarNew back="" title={"Edit Judul Proyek"} menu />
      <Box p={20}>
        <Stack pt={15}>
          <Input
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            placeholder="Tugas"
            size="md"
            value={name}
            onChange={(e) => { setName(e.target.value) }}
          />
        </Stack>
        <Box mt={"xl"}>
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

