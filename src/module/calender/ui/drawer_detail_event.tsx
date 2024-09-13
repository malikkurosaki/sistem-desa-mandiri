"use client"
import { TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { funDeleteCalenderById } from '../lib/api_calender';
import { FaUsers } from 'react-icons/fa6';
import { useHookstate } from '@hookstate/core';

export default function DrawerDetailEvent({ idCalendar }: { idCalendar: string }) {
  const router = useRouter()
  const [isModal, setModal] = useState(false)
  const param = useParams<{ id: string, detail: string }>()
  const tema = useHookstate(TEMA)

  async function fetchDeleteCalender(val: boolean) {
    try {
      if (val) {
        const response = await funDeleteCalenderById(idCalendar)
        if (response.success) {
          toast.success(response.message)
          setModal(false)
          router.push(`/division/${param.id}/calender`)
        } else {
          toast.error(response.message)
        }
      }
      setModal(false)
    } catch (error) {
      console.error(error);
      setModal(false)
      toast.error("Gagal hapus acara, coba lagi nanti");
    }
  }

  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
        >
          <Flex onClick={() => setModal(true)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <MdDelete size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text ta={"center"} c={tema.get().utama}>Hapus Acara</Text>
            </Box>
          </Flex>
          <Flex onClick={() => router.push(`/division/${param.id}/calender/update/${idCalendar}`)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <MdEdit size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text c={tema.get().utama}>Edit Acara</Text>
            </Box>
          </Flex>
          <Flex onClick={() => router.push(`/division/${param.id}/calender/${param.detail}/add-member`)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <FaUsers size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text c={tema.get().utama} ta={"center"}>Tambah Anggota</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menghapus data acara ini? Data ini akan mempengaruhi semua data yang terkait"
        onYes={(val) => { fetchDeleteCalender(val) }} />
    </Box>
  );
}
