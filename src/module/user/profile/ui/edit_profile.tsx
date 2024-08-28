"use client"
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { Box, Button, Flex, Modal, Select, Stack, Text, TextInput } from "@mantine/core";
import { HiUser } from "react-icons/hi2";
import toast from "react-hot-toast";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useState } from "react";
import { IEditDataProfile, IProfileById } from "../lib/type_profile";
import { funEditProfileByCookies, funGetProfileByCookies } from "../lib/api_profile";
import { useShallowEffect } from "@mantine/hooks";
import { funGetUserByCookies } from "@/module/auth";

export default function EditProfile() {
  const [isValModal, setValModal] = useState(false)
  const [isDataEdit, setDataEdit] = useState<IProfileById[]>([])
  const [touched, setTouched] = useState({
    nik: false,
    name: false,
    phone: false,
    email: false,
    gender: false,
  });
  const [data, setData] = useState<IEditDataProfile>({
    id: "",
    nik: "",
    name: "",
    phone: "",
    email: "",
    gender: "",
  })

  async function getAllProfile() {
    try {
      const res = await funGetProfileByCookies()
      setData(res.data)
    } catch (error) {
      console.error(error);
    }
  }

  useShallowEffect(() => {
    getAllProfile()
  }, [])

  async function onEditProfile(val: boolean) {
    try {
      if (val) {
        const res = await funEditProfileByCookies({
          id: data.id,
          nik: data.nik,
          name: data.name,
          phone: data.phone,
          email: data.email,
          gender: data.gender,
        })
        if (res.success) {
          setValModal(false)
          toast.success(res.message)
        } else {
          toast.error(res.message)
        }
      }
      setValModal(false)
    } catch (error) {
      console.error(error);
      toast.error("Gagal edit profil, coba lagi nanti");
    }
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
          onChange={(e) => {
            setData({ ...data, nik: e.target.value })
            setTouched({ ...touched, nik: false })
          }}
          value={data.nik}
          onBlur={() => setTouched({ ...touched, nik: true })}
          error={
            touched.nik && (
              data.nik === "" ? "NIK Tidak Boleh Kosong" :
                data.nik.length !== 16 ? "NIK Harus 16 Karakter" : null
            )
          }
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
          onChange={(e) => {
            setData({ ...data, name: e.target.value })
            setTouched({ ...touched, name: false })
          }}
          value={data.name}
          onBlur={() => setTouched({ ...touched, name: true })}
          error={
            touched.name && (
              data.name == "" ? "Nama Tidak Boleh Kosong" : null
            )
          }
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
          onChange={(e) => {
            setData({ ...data, email: e.target.value })
            setTouched({ ...touched, email: false })
          }}
          value={data.email}
          onBlur={() => setTouched({ ...touched, email: true })}
          error={
            touched.email && (
              data.email == "" ? "Email Tidak Boleh Kosong" :
                !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email) ? "Email tidak valid" : null
            )
          }
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
          onChange={(e) => {
            setData({ ...data, phone: e.target.value })
            setTouched({ ...touched, phone: false })
          }}
          value={data.phone}
          onBlur={() => setTouched({ ...touched, phone: true })}
          error={
            touched.phone && (
              data.phone == "" ? "Nomor Telepon Tidak Boleh Kosong" : null
            )
          }
        />
        <Select
          placeholder="Jenis Kelamin" label="Jenis Kelamin" w={"100%"} size="md" required withAsterisk radius={30}
          styles={{
            input: {
              color: WARNA.biruTua,
              borderRadius: WARNA.biruTua,
              borderColor: WARNA.biruTua,
            },
          }}
          data={
            [
              {
                value: "M",
                label: "Laki-laki"
              },
              {
                value: "F",
                label: "Perempuan"
              }
            ]
          }
          onChange={(val: any) => {
            setData({ ...data, gender: val })
            setTouched({ ...touched, gender: false })
          }}
          value={data.gender}
          onBlur={() => setTouched({ ...touched, gender: true })}
          error={
            touched.gender && (
              data.gender == "" ? "Gender Tidak Boleh Kosong" : null
            )
          }
        />
      </Stack>
      <Box mt={30} mx={20} pb={20}>
        <Button
          c={"white"}
          bg={WARNA.biruTua}
          size="md"
          radius={30}
          fullWidth
          onClick={() => {
            if (
              data.nik !== "" &&
              data.name !== "" &&
              data.email !== "" &&
              data.phone !== "" &&
              data.gender !== ""
            ) {
              setValModal(true)
            } else {
              toast.error("Mohon lengkapi semua form");
            }
          }}
        >
          Simpan
        </Button>
      </Box>
      <LayoutModal opened={isValModal} onClose={() => setValModal(false)}
        description="Apakah Anda yakin ingin
        melakukan perubahan data?"
        onYes={(val) => { onEditProfile(val) }} />
    </Box>
  )
}

