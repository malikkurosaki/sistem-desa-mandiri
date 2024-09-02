"use client"
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import { Avatar, Box, Button, Flex, Indicator, Modal, rem, Select, Skeleton, Stack, Text, TextInput } from "@mantine/core";
import toast from "react-hot-toast";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useRef, useState } from "react";
import { IEditDataProfile, IProfileById } from "../lib/type_profile";
import { funEditProfileByCookies, funGetProfileByCookies } from "../lib/api_profile";
import { useShallowEffect } from "@mantine/hooks";
import { FaCamera, FaShare } from "react-icons/fa6";
import { Dropzone } from "@mantine/dropzone";
import _ from "lodash";
import { useRouter } from "next/navigation";

export default function EditProfile() {
  const [isValModal, setValModal] = useState(false)
  const [isDataEdit, setDataEdit] = useState<IProfileById[]>([])
  const openRef = useRef<() => void>(null)
  const [img, setIMG] = useState<any | null>()
  const [imgForm, setImgForm] = useState<any>()
  const router = useRouter()
  const [loading, setLoading] = useState(true)

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
    img: "",
  })


  async function getAllProfile() {
    try {
      setLoading(true)
      const res = await funGetProfileByCookies()
      setData(res.data)
      setIMG(`/api/file/img?cat=user&file=${res.data.img}`)
      setLoading(false)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false)
    }
  }

  useShallowEffect(() => {
    getAllProfile()
  }, [])

  async function onEditProfile(val: boolean) {
    try {
      if (val) {
        const fd = new FormData();
        fd.append("file", imgForm)
        fd.append("data", JSON.stringify(data))

        const res = await funEditProfileByCookies(fd)
        if (res.success) {
          setValModal(false)
          toast.success(res.message)
          router.push('/profile')
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
        <Dropzone
          openRef={openRef}
          onDrop={async (files) => {
            if (!files || _.isEmpty(files))
              return toast.error('Tidak ada gambar yang dipilih')
            setImgForm(files[0])
            const buffer = URL.createObjectURL(new Blob([new Uint8Array(await files[0].arrayBuffer())]))
            setIMG(buffer)
          }}
          activateOnClick={false}
          maxSize={1 * 1024 ** 2}
          accept={['image/png', 'image/jpeg', 'image/heic']}
          onReject={(files) => {
            return toast.error('File yang diizinkan: .png, .jpg, dan .heic  dengan ukuran maksimal 1 MB')
          }}
        >
        </Dropzone>

        {loading ?
          <Skeleton height={150} width={150} radius={"100"} />
          :
          <Indicator offset={20} withBorder inline color={WARNA.borderBiruMuda} position="bottom-end" label={<FaCamera size={20} />} size={40} onClick={() => openRef.current?.()}>
            <Avatar
              size="150"
              radius={"100"}
              src={img}
            />
          </Indicator>
        }
        {loading ?
          <>
            <Skeleton height={40} mt={20} radius={30} />
            <Skeleton height={40} mt={20} radius={30} />
            <Skeleton height={40} mt={20} radius={30} />
            <Skeleton height={40} mt={20} radius={30} />
            <Skeleton height={40} mt={20} radius={30} />
          </>
          :
          <>
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
              size="md" type="number" radius={30} placeholder="8xx xxxx xxxx" withAsterisk label="Nomor Telepon" w={"100%"}
              styles={{
                input: {
                  color: WARNA.biruTua,
                  borderRadius: WARNA.biruTua,
                  borderColor: WARNA.biruTua,
                },
              }}
              leftSection={<Text>+62</Text>}
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
                  data.gender == "" ? "Jenis Kelamin Tidak Boleh Kosong" : null
                )
              }
            />
          </>
        }
      </Stack>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${WARNA.bgWhite}`,
      }}>
        {loading ? 
           <Skeleton height={50} radius={30} />
          :
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
        }
      </Box>
      <LayoutModal opened={isValModal} onClose={() => setValModal(false)}
        description="Apakah Anda yakin ingin
        melakukan perubahan data?"
        onYes={(val) => { onEditProfile(val) }} />
    </Box>
  )
}

