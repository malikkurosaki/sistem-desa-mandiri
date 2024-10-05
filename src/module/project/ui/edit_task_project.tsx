"use client"
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Button, rem, Skeleton, Stack, TextInput } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { funEditProject, funGetOneProjectById } from '../lib/api_project';

export default function EditTaskProject() {
  const router = useRouter()
  const [name, setName] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const param = useParams<{ id: string }>()
  const [loading, setLoading] = useState(true)
  const tema = useHookstate(TEMA)
  const [touched, setTouched] = useState({
    name: false,
  });

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
      console.error(error)
      toast.error("Gagal mengedit Kegiatan, coba lagi nanti")
    }
  }

  function onCheck() {
    if (name == "") {
      setTouched({ ...touched, name: true })
      return false
    }
    setOpenModal(true)
  }



  function onValidation(kategori: string, val: string) {
    if (kategori == 'title') {
      setName(val)
      if (val === "") {
        setTouched({ ...touched, name: true })
      } else {
        setTouched({ ...touched, name: false })
      }
    }
  }

  async function getOneData() {
    try {
      setLoading(true)
      const res = await funGetOneProjectById(param.id, 'data');
      if (res.success) {
        setName(res.data.title);
      } else {
        toast.error(res.message);
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan data Kegiatan, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  }

  useShallowEffect(() => {
    getOneData();
  }, [param.id])

  return (
    <Box >
      <LayoutNavbarNew back="" title={"Edit Judul Kegiatan"} menu />
      <Box p={20}>
        <Stack pt={15}>
          {loading ?
            <Skeleton height={40} mt={20} radius={10} />
            :
            <TextInput
              styles={{
                input: {
                  border: `1px solid ${"#D6D8F6"}`,
                  borderRadius: 10,
                },
              }}
              placeholder="Nama Kegiatan"
              label="Kegiatan"
              required
              size="md"
              value={name}
              onChange={(e) => { onValidation('title', e.target.value) }}
              error={
                touched.name && (
                  name == "" ? "Kegiatan Tidak Boleh Kosong" : null
                )
              }
            />
          }
        </Stack>
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${tema.get().bgUtama}`,
      }}>
        {loading ?
          <Skeleton height={50} radius={30} />
          :
          <Button
            c={"white"}
            bg={tema.get().utama}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => { onCheck() }}
          >
            Simpan
          </Button>
        }
      </Box>


      <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin mengedit Kegiatan ini?"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }
          setOpenModal(false)
        }} />
    </Box>
  );
}

