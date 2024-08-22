"use client"
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { funEditDetailProject, funGetDetailProject } from '../lib/api_project';
import moment from 'moment';
import { useShallowEffect } from '@mantine/hooks';
import { Box, Button, Group, Input, SimpleGrid, Stack, Text } from '@mantine/core';
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { DatePicker } from '@mantine/dates';
import LayoutModal from '@/module/_global/layout/layout_modal';

export default function EditDetailTaskProject() {
  const [value, setValue] = useState<[Date | null, Date | null]>([null, null]);
  const [name, setName] = useState("")
  const param = useParams<{ id: string}>()
  const [openModal, setOpenModal] = useState(false)

  async function onSubmit() {
    if (value[0] == null || value[1] == null)
      return toast.error("Error! harus memilih tanggal")

    if (name == "")
      return toast.error("Error! harus memasukkan judul tugas")

    try {
      const res = await funEditDetailProject(param.id, {
        name: name,
        dateStart: value[0],
        dateEnd: value[1],

      })

      if (res.success) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal edit detail tugas proyek, coba lagi nanti");
    }
  }

  async function getOneData() {
    try {
      const res = await funGetDetailProject(param.id);
      if (res.success) {
        setName(res.data.name)
        setValue([
          new Date(moment(res.data.dateStart).format('YYYY-MM-DD')),
          new Date(moment(res.data.dateEnd).format('YYYY-MM-DD')),
        ])
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan detail tugas proyek, coba lagi nanti");
    }
  }

  useShallowEffect(() => {
    getOneData();
  }, [param.id])

  return (
    <Box>
    <LayoutNavbarNew back="" title={"Edit Detail Proyek"} menu />
    <Box p={20}>
       <Group
          justify="center"
          bg={"white"}
          py={20}
          style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
       >
          <DatePicker
             styles={{}}
             type="range"
             value={value}
             onChange={setValue}
             size="md"
             c={WARNA.biruTua}
          />
       </Group>
       <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} mt={20}>
          <Box>
             <Text>Tanggal Mulai</Text>
             <Group
                justify="center"
                bg={"white"}
                h={45}
                style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
             >
                <Text>{value[0] ? `${moment(value[0]).format('DD-MM-YYYY')}` : ""}</Text>
             </Group>
          </Box>
          <Box>
             <Text c={WARNA.biruTua}>Tanggal Berakhir</Text>
             <Group
                justify="center"
                bg={"white"}
                h={45}
                style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
             >
                <Text>{value[1] ? `${moment(value[1]).format('DD-MM-YYYY')}` : ""}</Text>
             </Group>
          </Box>
       </SimpleGrid>
       <Stack pt={15}>
          <Input
             styles={{
                input: {
                   border: `1px solid ${"#D6D8F6"}`,
                   borderRadius: 10,
                },
             }}
             placeholder="Input Nama Tahapan"
             size="md"
             value={name}
             onChange={(e) => { setName(e.target.value) }}
          />
       </Stack>
       <Box mt={"xl"}>
          <Button
             c={"white"}
             bg={WARNA.biruTua}
             size="lg"
             radius={30}
             fullWidth
             onClick={() => { setOpenModal(true) }}
          >
             Simpan
          </Button>
       </Box>
    </Box>

    <LayoutModal opened={openModal} onClose={() => setOpenModal(false)}
       description="Apakah Anda yakin ingin mengubah data?"
       onYes={(val) => {
          if (val) {
             onSubmit()
          }
          setOpenModal(false)
       }} />
 </Box>
  );
}
