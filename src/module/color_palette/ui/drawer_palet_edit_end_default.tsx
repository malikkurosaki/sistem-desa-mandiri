import { keyWibu, TEMA } from '@/module/_global';
import LayoutModal from '@/module/_global/layout/layout_modal';
import { useHookstate } from '@hookstate/core';
import { Box, Flex, SimpleGrid, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { FaPencil, FaTrash } from 'react-icons/fa6';
import { IoColorPalette } from 'react-icons/io5';
import { funChangeTheme, funDeleteTheme } from '../lib/api_theme';
import { globalRefreshTheme } from '../lib/val_theme';
import { useWibuRealtime } from 'wibu-realtime';

export default function DrawerPaletEditEndDefault({ id, idVillage, isUse }: { id: string, idVillage: string, isUse: boolean }) {
  const router = useRouter()
  const [isModal, setModal] = useState(false)
  const [isModalDel, setModalDel] = useState(false)
  const tema = useHookstate(TEMA)
  const refresh = useHookstate(globalRefreshTheme)
  const [loadingApply, setLoadingApply] = useState(false)
  const [loadingDelete, setLoadingDelete] = useState(false)
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })

  async function onChangeTheme() {
    try {
      setLoadingApply(true)
      const res = await funChangeTheme(id)
      if (res.success) {
        setDataRealtime([{
          category: "applied-theme",
          village: res.data.village,
          user: res.data.user,
          theme: res.theme
        }])
        tema.set(res.theme)
        refresh.set(!refresh.get())
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal mengubah tema, coba lagi nanti");
    } finally {
      setLoadingApply(false)
      setModal(false)
    }
  }

  async function onDelete() {
    try {
      setLoadingDelete(true)
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
    } finally {
      setLoadingDelete(false)
      setModalDel(false)
    }
  }

  return (
    <Box>
      <SimpleGrid cols={{ base: 2, sm: 3, lg: 3 }}>
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
            <Flex justify={'center'} align={'center'} direction={'column'} onClick={() => {
              isUse !== true ? setModalDel(true) : undefined
            }}>
              <Box>
                <FaTrash size={30} color={isUse !== true ? tema.get().utama : "gray"} />
              </Box>
              <Box>
                <Text ta={'center'} c={isUse !== true ? tema.get().utama : "gray"}>Hapus</Text>
              </Box>
            </Flex>
          </>

        }
      </SimpleGrid>

      <LayoutModal loading={loadingApply} opened={isModal} onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin mengubah Tema Aplikasi?"
        onYes={(val) => {
          if (val) {
            onChangeTheme()
          } else {
            setModal(false)
          }
        }} />


      <LayoutModal loading={loadingDelete} opened={isModalDel} onClose={() => setModalDel(false)}
        description="Apakah Anda yakin ingin menghapus Tema Aplikasi?"
        onYes={(val) => {
          if (val) {
            onDelete()
          } else {
            setModalDel(false)
          }
        }} />
    </Box>
  );
}

