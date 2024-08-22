"use client"
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { funCancelProject } from '../lib/api_project';
import { Box, Button, Stack, Textarea } from '@mantine/core';
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';

export default function CancelProject() {
  const router = useRouter()
  const [alasan, setAlasan] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const param = useParams<{ id: string }>()

  function onVerification() {
    if (alasan == "")
      return toast.error("Error! harus memasukkan alasan pembatalan proyek")

    setOpenModal(true)
  }

  async function onSubmit() {
    try {
      const res = await funCancelProject(param.id, { reason: alasan })
      if (res.success) {
        toast.success(res.message)
        router.push("/project")
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Gagal membatalkan proyek, coba lagi nanti")
    }
  }

  return (
    <Box>
      <LayoutNavbarNew back="" title={"Pembatalan Proyek"} menu />
      <Box p={20}>
        <Stack pt={15}>
          <Textarea styles={{
            input: {
              border: `1px solid ${"#D6D8F6"}`,
              borderRadius: 10,
            },
          }}
            value={alasan}
            size="md" placeholder='Contoh : proyek tidak sesuai' label="Alasan Pembatalan"
            onChange={(event) => setAlasan(event.target.value)}
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
        description="Apakah Anda yakin ingin membatalkan proyek ini? Pembatalan proyek bersifat permanen"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }
          setOpenModal(false)
        }} />
    </Box>
  );
}

