"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Box, Button, Select, Stack, Textarea, TextInput } from '@mantine/core';
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

  function onTrue(val: boolean) {
    if (val) {
      toast.success("Sukses! Data tersimpan");
    }
    setOpenModal(false)
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
    <Box>
      <LayoutNavbarNew back="" title="Edit Divisi" menu />
      <Box p={20}>

        <Stack>
          {/* <Select
            placeholder="Grup"
            label="Grup"
            size="md"
            required
            radius={40}
          /> */}
          <TextInput
            placeholder="Judul"
            label="Judul"
            size="md"
            required
            radius={40}
            value={body.name}
            onChange={(e) => { setBody({ ...body, name: e.target.value }) }}
          />
          <Textarea placeholder="Deskripsi" label="Deskripsi" size="md" radius={10}
            value={body.desc}
            onChange={(e) => { setBody({ ...body, desc: e.currentTarget.value }) }}
          />
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

