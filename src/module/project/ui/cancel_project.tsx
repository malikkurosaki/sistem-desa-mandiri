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
  const param = useParams<{ id: string }>()
  const tema = useHookstate(TEMA)
  const [touched, setTouched] = useState({
    reason: false,
  });
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })

  function onVerification() {
    if (alasan == "")
      return toast.error("Error! harus memasukkan alasan pembatalan Kegiatan")

    setOpenModal(true)
  }

  async function onSubmit() {
    try {
      const res = await funCancelProject(param.id, { reason: alasan })
      if (res.success) {
        setDataRealtime([{
          category: "project-detail-status",
          id: param.id,
        }])
        toast.success(res.message)
        router.push("/project")
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal membatalkan Kegiatan, coba lagi nanti")
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
              setAlasan(event.target.value)
              setTouched({ ...touched, reason: false })
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
          onClick={() => { onVerification() }}
        >
          Simpan
        </Button>
      </Box>


      <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
        description="Apakah Anda yakin ingin membatalkan Kegiatan ini? Pembatalan Kegiatan bersifat permanen"
        onYes={(val) => {
          if (val) {
            onSubmit()
          }
          setOpenModal(false)
        }} />
    </Box>
  );
}

