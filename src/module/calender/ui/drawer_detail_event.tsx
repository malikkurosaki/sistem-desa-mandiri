"use client"
import { keyWibu, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { Box, Flex, SimpleGrid, Stack, Text } from '@mantine/core';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { funDeleteCalenderById } from '../lib/api_calender';
import { FaUsers } from 'react-icons/fa6';
import { useHookstate } from '@hookstate/core';
import { useWibuRealtime } from 'wibu-realtime';

export default function DrawerDetailEvent({ idCalendar, close }: { idCalendar: string, close: (val:boolean) => void }) {
  const router = useRouter()
  const [isModal, setModal] = useState(false)
  const param = useParams<{ id: string, detail: string }>()
  const tema = useHookstate(TEMA)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })

  async function fetchDeleteCalender(val: boolean) {
    try {
      if (val) {
        setLoadingDelete(true)
        const response = await funDeleteCalenderById(idCalendar)
        if (response.success) {
          setDataRealtime([
            {
              category: "calendar-detail-delete",
              id: idCalendar,
            },
            {
              category: "calendar-event",
              division: param.id,
              date: response.data.dateStart,
              idUserFrom: response.user
            }
          ])
          toast.success(response.message)
          router.push(`/division/${param.id}/calender`)
        } else {
          toast.error(response.message)
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Gagal hapus acara, coba lagi nanti");
    } finally {
      close(true)
      setLoadingDelete(false)
      setModal(false)
    }
  }

  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
          style={{
            alignContent: 'flex-start',
            alignItems: 'flex-start',
          }}
        >
          <Flex onClick={() => router.push(`/division/${param.id}/calender/${param.detail}/add-member`)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <FaUsers size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text c={tema.get().utama} ta={"center"}>Tambah Anggota</Text>
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
          <Flex onClick={() => setModal(true)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <MdDelete size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text ta={"center"} c={tema.get().utama}>Hapus Acara</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutModal loading={loadingDelete} opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin menghapus data acara ini? Data ini akan mempengaruhi semua data yang terkait"
        onYes={(val) => { fetchDeleteCalender(val) }} />
    </Box>
  );
}
