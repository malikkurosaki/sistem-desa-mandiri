"use client"
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Badge, Box, Button, Center, ColorInput, Flex, Pill, rem, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { funCreateTheme } from '../lib/api_theme';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import LayoutModal from '@/module/_global/layout/layout_modal';

export default function CreatePaletteColor() {
  const [isValModal, setValModal] = useState(false);
  const [loadingKonfirmasi, setLoadingKonfirmasi] = useState(false);
  const tema = useHookstate(TEMA)
  const router = useRouter()
  const [touched, setTouched] = useState({
    name: false,
    utama: false,
    bgUtama: false,
    bgIcon: false,
    bgFiturHome: false,
    bgFiturDivision: false,
    bgTotalKegiatan: false,
  });

  const [isWarna, setWarna] = useState({
    name: '',
    utama: '',
    bgUtama: '',
    bgIcon: '',
    bgFiturHome: '',
    bgFiturDivision: '',
    bgTotalKegiatan: '',
  })

  async function onSubmit(val: boolean) {
    try {
      if (val) {
        setLoadingKonfirmasi(true)
        const res = await funCreateTheme(isWarna)
        if (res.success) {
          setValModal(false);
          toast.success(res.message);
          router.push('/color-palette')
        } else {
          toast.error(res.message);
        }
      }
      setValModal(false);
    } catch (error) {
      toast.error("Gagal menambahkan tema, coba lagi nanti");
    } finally {
      setLoadingKonfirmasi(false)
    }
  }

  function onCheck() {
    if (Object.values(touched).some((v) => v == true))
      return false
    setValModal(true)
  }

  function onValidation(kategori: string, val: string) {
    console.log('ini',val)
    if (kategori == 'name') {
      setWarna({ ...isWarna, name: val })
      if (val === "") {
        setTouched({ ...touched, name: true })
      } else {
        setTouched({ ...touched, name: false })
      }
    } else if (kategori == 'utama') {
      setWarna({ ...isWarna, utama: val })
      if (val === "") {
        setTouched({ ...touched, utama: true })
      } else {
        setTouched({ ...touched, utama: false })
      }
    } else if (kategori == 'bgUtama') {
      setWarna({ ...isWarna, bgUtama: val })
      if (val === "") {
        setTouched({ ...touched, bgUtama: true })
      } else {
        setTouched({ ...touched, bgUtama: false })
      }
    } else if (kategori == 'bgIcon') {
      setWarna({ ...isWarna, bgIcon: val })
      if (val === "") {
        setTouched({ ...touched, bgIcon: true })
      } else  {
        setTouched({ ...touched, bgIcon: false })
      } 
    } else if (kategori == 'bgFiturHome') {
      setWarna({ ...isWarna, bgFiturHome: val })
      if (val === "") {
        setTouched({ ...touched, bgFiturHome: true })
      } else {
        setTouched({ ...touched, bgFiturHome: false })
      }
    } else if (kategori == 'bgFiturDivision') {
      setWarna({ ...isWarna, bgFiturDivision: val })
      if (val === "") {
        setTouched({ ...touched, bgFiturDivision: true })
      } else {
        setTouched({ ...touched, bgFiturDivision: false })
      }
    } else if (kategori == 'bgTotalKegiatan') {
      setWarna({ ...isWarna, bgTotalKegiatan: val })
      if (val === "") {
        setTouched({ ...touched, bgTotalKegiatan: true })
      } else {
        setTouched({ ...touched, bgTotalKegiatan: false })
      }
    } 
  }

  return (
    <Box>
      <LayoutNavbarNew back='/color-palette' title='Tambah Tema' menu />
      <Box p={20}>
        <Stack>
          <TextInput
            label={'Judul Tema'}
            placeholder='Judul Tema'
            required
            size="md"
            radius="md"
            onChange={
              (e) => {
                onValidation('name', e.target.value) 
              }
            }
            error={
              touched.name && (
                isWarna.name == "" ? "Judul Tema Tidak Boleh Kosong" : null
              )
            }
          />
          <ColorInput
            label={'Warna Utama'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChange={
              (e) => {
                onValidation('utama', e) 
              }
            }
            error={
              touched.utama && (
                isWarna.utama == "" ? "Warna Utama Tidak Boleh Kosong" : null
              )
            }
          />
          <ColorInput
            label={'Background Utama'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChange={
              (e) => {
                onValidation('bgUtama', e) 
              }
            }
            error={
              touched.bgUtama && (
                isWarna.bgUtama == "" ? "Background Utama Tidak Boleh Kosong" : null
              )
            }
          />
          <ColorInput
            label={'Background Icon'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChange={
              (e) => {
                onValidation('bgIcon', e) 
              }
            }
            error={
              touched.bgIcon && (
                isWarna.bgIcon == "" ? "Background Icon Tidak Boleh Kosong" : null
              )
            }
          />
          <ColorInput
            label={'Background Fitur Home'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChange={
              (e) => {
                onValidation('bgFiturHome', e) 
              }
            }
            error={
              touched.bgFiturHome && (
                isWarna.bgFiturHome == "" ? "Background Fitur Home Tidak Boleh Kosong" : null
              )
            }
          />
          <ColorInput
            label={'Background Fitur Divisi'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChange={
              (e) => {
                onValidation('bgFiturDivision', e) 
              }
            }
            error={
              touched.bgFiturDivision && (
                isWarna.bgFiturDivision == "" ? "Background Fitur Divisi Tidak Boleh Kosong" : null
              )
            }
          />
          <ColorInput
            label={'Background Total Kegiatan'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChange={
              (e) => {
                onValidation('bgTotalKegiatan', e) 
              }
            }
            error={
              touched.bgTotalKegiatan && (
                isWarna.bgTotalKegiatan == "" ? "Background Total Kegiatan Tidak Boleh Kosong" : null
              )
            }
          />
        </Stack>
        <Flex justify={'center'} align={"center"} w={"auto"} gap={10} mt={20} mb={100}>
          <SimpleGrid
            cols={{ base: 3, sm: 3, lg: 6 }}
            spacing={{ base: 10, sm: 'xl' }}
            verticalSpacing={{ base: 'md', sm: 'xl' }}
          >
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.utama} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.utama.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.utama}</Pill>
              }
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.bgUtama} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.bgUtama.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.bgUtama}</Pill>
              }
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.bgIcon} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.bgIcon.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.bgIcon}</Pill>
              }
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.bgFiturHome} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.bgFiturHome.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.bgFiturHome}</Pill>
              }
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.bgFiturDivision} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.bgFiturDivision.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.bgFiturDivision}</Pill>
              }
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.bgTotalKegiatan} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.bgTotalKegiatan.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.bgTotalKegiatan}</Pill>
              }
            </Flex>
          </SimpleGrid>

        </Flex>
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(535),
        zIndex: 999,
        backgroundColor: `${tema.get().bgUtama}`,
      }}>
        <Button
          color="white"
          bg={tema.get().utama}
          size="lg"
          radius={30}
          fullWidth
          onClick={() => { onCheck() }}
        >
          Simpan
        </Button>
      </Box>
      <LayoutModal
        loading={loadingKonfirmasi}
        opened={isValModal}
        onClose={() => setValModal(false)}
        description="Apakah Anda yakin ingin
        melakukan perubahan data?"
        onYes={(val) => {
          onSubmit(val);
        }}
      />
    </Box>
  );
}
