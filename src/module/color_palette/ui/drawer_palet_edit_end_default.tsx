import { TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Flex, SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { IoColorPalette } from 'react-icons/io5';
import { funChangeTheme, funDeleteTheme, funGetThemeById } from '../lib/api_theme';
import { globalRefreshTheme } from '../lib/val_theme';

export default function DrawerPaletEditEndDefault({ id, idVillage }: { id: string, idVillage: string }) {
  const router = useRouter()
  const [isModal, setModal] = useState(false)
  const [isModalDel, setModalDel] = useState(false)
  const tema = useHookstate(TEMA)
  const refresh = useHookstate(globalRefreshTheme)

  async function onChangeTheme() {
    try {
      const res = await funChangeTheme(id)
      if (res.success) {
        tema.set(res.data)
        refresh.set(!refresh.get())
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal mengubah tema, coba lagi nanti");
    }
  }

  async function onDelete() {
    try {
      const res = await funDeleteTheme(id)
      if (res.success) {
        toast.success(res.message);
        refresh.set(!refresh.get())
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal menghapus tema, coba lagi nanti");
    }
  }

  return (
    <Box>
      <SimpleGrid cols={{ base: 3, sm: 3, lg: 3 }}>
        <Flex justify={'center'} align={'center'} direction={'column'}
          onClick={() => setModal(true)}
        >
          <Box>
            <IoColorPalette size={30} color={tema.get().utama} />
          </Box>
          <Box>
            <Text ta={'center'} c={tema.get().utama}>Gunakan Tema</Text>
          </Box>
        </Flex>
        {
          (idVillage != '' && idVillage != null) &&
          <>
            <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => router.push(`/color-palette/edit/${id}`)} >
              <Box>
                <FaPencil size={30} color={tema.get().utama} />
              </Box>
              <Box>
                <Text ta={'center'} c={tema.get().utama}>Edit</Text>
              </Box>
            </Flex>

            <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => { setModalDel(true) }} >
              <Box>
                <FaTrash size={30} color={tema.get().utama} />
              </Box>
              <Box>
                <Text ta={'center'} c={tema.get().utama}>Hapus</Text>
              </Box>
            </Flex>
          </>

        }
      </SimpleGrid>

      <LayoutModal opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin mengubah Tema Aplikasi?"
        onYes={(val) => {
          if (val) {
            onChangeTheme()
          }
          setModal(false)
        }} />


      <LayoutModal opened={isModalDel} onClose={() => setModalDel(false)}
        description="Apakah Anda yakin ingin menghapus Tema Aplikasi?"
        onYes={(val) => {
          if (val) {
            onDelete()
          }
          setModalDel(false)
        }} />
    </Box>
  );
}

