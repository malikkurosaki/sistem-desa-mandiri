"use client"
import { isModal, WARNA } from "@/module/_global";
import { Box, Button, Flex, Modal, Stack, Text, TextInput } from "@mantine/core";
import HeaderEditProfile from "../component/ui/header_edit_profile";
import { HiUser } from "react-icons/hi2";
import { useHookstate } from "@hookstate/core";
import { BsQuestionCircleFill } from "react-icons/bs"
import toast from "react-hot-toast";
import LayoutModal from "@/module/_global/layout/layout_modal";

export default function EditProfile() {
  const openModal = useHookstate(isModal)

  function onTrue() {
    toast.success("Sukses! Data tersimpan");
    openModal.set(false)
  }
  return (
    <Box>
      <HeaderEditProfile />
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
          onClick={() => openModal.set(true)}
        >
          Simpan
        </Button>
      </Box>
      <LayoutModal opened={openModal.get()} onClose={() => openModal.set(false)}
        description="Apakah Anda Ingin Mengganti
        Status Aktivasi Data?"
        onYes={onTrue} />
    </Box>
  )
}

