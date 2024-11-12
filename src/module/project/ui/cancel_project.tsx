"use client"
import { keyWibu, LayoutNavbarNew, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Button, rem, Stack, Textarea } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useWibuRealtime } from 'wibu-realtime';
import { funCancelProject } from '../lib/api_project';

export default function CancelProject() {
  const router = useRouter()
  const [alasan, setAlasan] = useState("")
  const [openModal, setOpenModal] = useState(false)
  const [loadingModal, setLoadingModal] = useState(false)
  const param = useParams<{ id: string }>()
  const tema = useHookstate(TEMA)
  const [touched, setTouched] = useState({
    reason: false,
  });
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })

  function onCheck() {
    const cek = checkAll()
    if (!cek)
      return false

    setOpenModal(true)
  }

  function checkAll() {
    let nilai = true
    if (alasan == "") {
      setTouched(touched => ({ ...touched, reason: true }))
      nilai = false
    }
    return nilai
  }


  function onValidation(kategori: string, val: string) {
    if (kategori == 'reason') {
      setAlasan(val)
      if (val == "") {
        setTouched({ ...touched, reason: true })
      } else {
        setTouched({ ...touched, reason: false })
      }
    }
  }

  async function onSubmit() {
    try {
      setLoadingModal(true)
      const res = await funCancelProject(param.id, { reason: alasan })
      if (res.success) {
        setDataRealtime([{
          category: "project-detail-status",
          id: param.id,
        }])
        toast.success(res.message)
        router.push("/project/" + param.id)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal membatalkan Kegiatan, coba lagi nanti")
    } finally {
      setLoadingModal(false)
      setOpenModal(false)
    }
  }

  return (
    <Box >
      <LayoutNavbarNew back="" title={"Pembatalan Kegiatan"} menu />
      <Box p={20}>
        <Stack pt={15}>
          <Textarea styles={{
            input: {
              border: `1px solid ${"#D6D8F6"}`,
              borderRadius: 10,
            },
          }}
            value={alasan}
            size="md" placeholder='Contoh : Kegiatan tidak sesuai' label="Alasan Pembatalan"
            onChange={(event) => {
              onValidation('reason', event.target.value)
            }}
            error={
              touched.reason && (
                alasan == "" ? "Alasan Tidak Boleh Kosong" : null
              )
            }
            onBlur={() => setTouched({ ...touched, reason: true })}
          />
        </Stack>
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${tema.get().bgUtama}`,
      }}>
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
      </Box>


      <LayoutModal loading={loadingModal} opened={openModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin membatalkan kegiatan ini? Pembatalan kegiatan bersifat permanen"
        onYes={(val) => {
          if (val) {
            onSubmit()
          } else {
            setOpenModal(false)
          }
        }} />
    </Box>
  );
}

