"use client"
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Button, rem, Skeleton, Stack, Textarea, TextInput } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { funEditDivision, funGetDivisionById } from '../lib/api_division';

export default function EditDivision() {
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const tema = useHookstate(TEMA)
  const [loadingModal, setLoadingModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [body, setBody] = useState<any>({
    name: "",
    desc: "",
  });

  const [touched, setTouched] = useState({
    name: false,
  });

  function onValidation(kategori: string, val: any) {
    if (kategori == 'name') {
      setBody({ ...body, name: val })
      if (val === "") {
        setTouched({ ...touched, name: true })
      } else {
        setTouched({ ...touched, name: false })
      }
    } else if (kategori == "desc") {
      setBody({ ...body, desc: val })
    }
  }

  function onCheck() {
    const cek = checkAll()
    if (!cek)
      return false
    setOpenModal(true)
  }

  function checkAll() {
    let nilai = true
    if (body.name === "") {
      setTouched(touched => ({ ...touched, name: true }))
      nilai = false
    }
    return nilai
  }



  async function getOneData() {
    try {
      setLoading(true);
      const res = await funGetDivisionById(param.id);
      if (res.success) {
        setBody({
          ...body,
          idGroup: res.data.division.idGroup,
          name: res.data.division.name,
          desc: res.data.division.desc
        })
      } else {
        toast.error(res.message);
      }
      setLoading(false);

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan divisi, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  }


  async function onUpdate() {
    try {
      setLoadingModal(true)
      const res = await funEditDivision(param.id, body)
      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal mengedit divisi, coba lagi nanti");
    } finally {
      setLoadingModal(false)
      setOpenModal(false)
    }

  }

  useShallowEffect(() => {
    getOneData();
  }, [param.id])

  return (
    <Box pos={"relative"} h={"100vh"}>
      <LayoutNavbarNew back="" title="Edit Divisi" menu />
      <Box p={20}>
        <Stack>
          {loading ?
            <>
              <Skeleton height={40} mt={20} radius={30} />
              <Skeleton height={"40vh"} mt={20} radius={10} />
            </>
            :
            <>
              <TextInput
                placeholder="Nama Divisi"
                label="Nama Divisi"
                size="md"
                required
                radius={10}
                value={body.name}
                onChange={(e) => { onValidation('name', e.currentTarget.value) }}
                error={
                  touched.name && (
                    body.name == "" ? "Nama Divisi Tidak Boleh Kosong" : null
                  )
                }
              />
              <Textarea placeholder="Deskripsi" label="Deskripsi" size="md" radius={10}
                value={body.desc}
                onChange={(e) => { onValidation('desc', e.currentTarget.value) }}
                styles={{
                  input: {
                    height: "40vh"
                  }
                }}
              />
            </>
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
            color="white"
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
      <LayoutModal loading={loadingModal} opened={openModal} onClose={() => setOpenModal(false)} description='Apakah Anda yakin ingin edit data'
        onYes={(val) => {
          if (val) {
            onUpdate()
          } else {
            setOpenModal(false)
          }
        }} />
    </Box>
  )
}

