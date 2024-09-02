"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Box, Button, rem, Select, Skeleton, Stack, Textarea, TextInput } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { funEditDivision, funGetDivisionById } from '../lib/api_division';
import { funGetAllGroup, IDataGroup } from '@/module/group';
import { funGetUserByCookies } from '@/module/auth';


export default function EditDivision() {
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()
  const param = useParams<{ id: string }>()
  const [loading, setLoading] = useState(false)
  const [body, setBody] = useState<any>({
    idGroup: "",
    name: "",
    desc: "",
  });

  const [touched, setTouched] = useState({
    name: false,
  });


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
      const res = await funEditDivision(param.id, body)
      if (res.success) {
        toast.success(res.message)
      } else {
        toast.error(res.message)
      }
      setOpenModal(false)
    } catch (error) {
      console.log(error)
      setOpenModal(false)
      toast.error("Gagal mengedit divisi, coba lagi nanti");
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
                placeholder="Judul"
                label="Judul"
                size="md"
                required
                radius={40}
                value={body.name}
                onChange={(e) => {
                  setBody({ ...body, name: e.target.value })
                  setTouched({ ...touched, name: false })
                }}
                onBlur={() => setTouched({ ...touched, name: true })}
                error={
                  touched.name && (
                    body.name == "" ? "Judul Tidak Boleh Kosong" : null
                  )
                }
              />
              <Textarea placeholder="Deskripsi" label="Deskripsi" size="md" radius={10}
                value={body.desc}
                onChange={(e) => { setBody({ ...body, desc: e.currentTarget.value }) }}
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
        backgroundColor: `${WARNA.bgWhite}`,
      }}>
        {loading ?
          <Skeleton height={50} radius={30} />
          :
          <Button
            color="white"
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => {
              if (
                body.name !== ""
              ) {
                setOpenModal(true)
              } else {
                toast.error("Judul Tidak Boleh Kosong")
              }
            }}
          >
            Simpan
          </Button>
        }
      </Box>
      <LayoutModal opened={openModal} onClose={() => setOpenModal(false)} description='Apakah Anda yakin ingin edit data'
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

