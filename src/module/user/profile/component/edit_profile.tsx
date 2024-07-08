"use client"
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { Box, Button, Flex, Modal, Stack, Text, TextInput } from "@mantine/core";
import { HiUser } from "react-icons/hi2";
import toast from "react-hot-toast";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useState } from "react";

export default function EditProfile() {
  const [isValModal, setValModal] = useState(false)

  function onTrue(val: boolean) {
    if (val) {
      toast.success("Sukses! Data tersimpan");
    }
    setValModal(false)
  }

  return (
    <Box>
      <LayoutNavbarNew back='' title='Edit Profil' menu='' />
      <Stack
        align="center"
        justify="center"
        gap="xs"
        pt={30}
        px={20}
      >
        <Box bg={WARNA.biruTua} py={30} px={50}
          style={{
            borderRadius: 10,
          }}>
          <HiUser size={100} color={WARNA.bgWhite} />
        </Box>
        <TextInput
          size="md" type="number" radius={30} placeholder="NIK" withAsterisk label="NIK" w={"100%"}
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
        />
        <TextInput
          size="md" type="text" radius={30} placeholder="Nama" withAsterisk label="Nama" w={"100%"}
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
        />
        <TextInput
          size="md" type="email" radius={30} placeholder="Email" withAsterisk label="Email" w={"100%"}
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
        />
        <TextInput
          size="md" type="number" radius={30} placeholder="+62...." withAsterisk label="Nomor Telepon" w={"100%"}
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
        />
      </Stack>
      <Box mt={30} mx={20} pb={20}>
        <Button
          c={"white"}
          bg={WARNA.biruTua}
          size="md"
          radius={30}
          fullWidth
          onClick={() => setValModal(true)}
        >
          Simpan
        </Button>
      </Box>
      <LayoutModal opened={isValModal} onClose={() => setValModal(false)}
        description="Apakah Anda yakin ingin
        melakukan perubahan data?"
        onYes={(val) => { onTrue(val) }} />
    </Box>
  )
}

