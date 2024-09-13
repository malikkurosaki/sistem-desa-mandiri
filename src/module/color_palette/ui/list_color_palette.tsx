"use client"
import { LayoutDrawer, LayoutNavbarNew, TEMA } from '@/module/_global';
import { ActionIcon, Box, Checkbox, Flex, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';
import DrawerCreatePalette from './drawer_create_palette';
import DrawerPaletEditEndDefault from './drawer_palet_edit_end_default';
import { useHookstate } from '@hookstate/core';
import { funGetAllTheme } from '../lib/api_theme';
import { IDataTheme } from '../lib/type_theme';
import toast from 'react-hot-toast';
import { useShallowEffect } from '@mantine/hooks';
import { globalRefreshTheme } from '../lib/val_theme';

export default function ListColorPalette() {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const [isOpenTambahan, setOpenTambahan] = useState(false)
  const tema = useHookstate(TEMA)
  const [isData, setData] = useState<IDataTheme[]>([])
  const [isChooseId, setChooseId] = useState('')
  const [isChooseName, setChooseName] = useState('')
  const [isChooseVillage, setChooseVillage] = useState('')
  const refresh = useHookstate(globalRefreshTheme)

  async function loadData() {
    try {
      const res = await funGetAllTheme()
      if (res.success) {
        setData(res.data)
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error)
      toast.error("Gagal mendapatkan data tema, coba lagi nanti")
    }
  }

  useShallowEffect(() => {
    loadData()
    setOpen(false)
    setOpenTambahan(false)
  }, [refresh.get()])

  return (
    <Box>
      <LayoutNavbarNew back='/home' title='Tema Aplikasi' menu={
        <ActionIcon onClick={() => { setOpen(true) }} variant="light" bg={tema.get().bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiMenu size={20} color='white' />
        </ActionIcon>
      } />
      <Box p={20}>
        {isData.map((v, i) => (
          <Box mb={20} key={i}>
            <Box style={{
              borderRadius: 10,
              border: `1px solid ${"#D6D8F6"}`,
            }} pt={10} pb={10} pl={20} pr={20}
              onClick={() => {
                setChooseId(v.id)
                setChooseName(v.name)
                setChooseVillage(v.idVillage)
                setOpenTambahan(true)
              }}
            >
              <Group justify='space-between' align='center'>
                <Text>{v.name}</Text>
                {v.isUse ? <FaCircleCheck size={20} /> : <></>}
              </Group>
              <Box pt={10}>
                <Flex gap={10}>
                  <Box bg={v.utama} w={30} h={30} style={{
                    borderRadius: "100%",
                    border: "1px solid grey"
                  }} />
                  <Box bg={v.bgUtama} w={30} h={30} style={{
                    borderRadius: "100%",
                    border: "1px solid grey"
                  }} />
                  <Box bg={v.bgIcon} w={30} h={30} style={{
                    borderRadius: "100%",
                    border: "1px solid grey"
                  }} />
                  <Box bg={v.bgFiturHome} w={30} h={30} style={{
                    borderRadius: "100%",
                    border: "1px solid grey"
                  }} />
                  <Box bg={v.bgFiturDivision} w={30} h={30} style={{
                    borderRadius: "100%",
                    border: "1px solid grey"
                  }} />
                  <Box bg={v.bgTotalKegiatan} w={30} h={30} style={{
                    borderRadius: "100%",
                    border: "1px solid grey"
                  }} />
                </Flex>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
        <DrawerCreatePalette />
      </LayoutDrawer>

      <LayoutDrawer opened={isOpenTambahan} title={isChooseName} onClose={() => setOpenTambahan(false)}>
        <DrawerPaletEditEndDefault id={isChooseId} idVillage={isChooseVillage} />
      </LayoutDrawer>
    </Box>
  );
}
