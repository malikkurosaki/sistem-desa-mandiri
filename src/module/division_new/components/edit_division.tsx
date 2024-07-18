"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Box, Button, Select, Stack, Textarea, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';


export default function EditDivision() {
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()

  function onTrue(val: boolean) {
    if (val) {
      toast.success("Sukses! Data tersimpan");
    }
    setOpenModal(false)
    router.push('/division/info/1')
  }
  return (
    <Box>
      <LayoutNavbarNew back="/division/info/1" title="Edit Divisi"
        menu
      />
      <Box p={20}>
        <Stack>
          <Select
            placeholder="Grup"
            label="Grup"
            size="md"
            required
            radius={40}
          />
          <TextInput
            placeholder="Judul"
            label="Judul"
            size="md"
            required
            radius={40}
          />
          <Textarea placeholder="Deskripsi" label="Deskripsi" size="md" radius={10} />
          <Box mt="xl">
            <Button
              color="white"
              bg={WARNA.biruTua}
              size="lg"
              radius={30}
              fullWidth
              onClick={() => { setOpenModal(true) }}
            >
              Simpan
            </Button>
          </Box>
        </Stack>
      </Box>
      <LayoutModal opened={openModal} onClose={() => setOpenModal(false)} description='Apakah Anda yakin ingin edit data' onYes={(val) => { onTrue(val) }} />
    </Box>
  )
}

