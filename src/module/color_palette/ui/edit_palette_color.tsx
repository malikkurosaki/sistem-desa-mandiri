"use client"
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Badge, Box, Button, Center, ColorInput, Flex, Pill, rem, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';

export default function EditPaletteColor() {
  const tema = useHookstate(TEMA)
  const [isWarna, setWarna] = useState({
    judulTema: '',
    warnaUtama: '',
    backgroundUtama: '',
    backgroundIcon: '',
    backgroundFiturHome: '',
    backgroundFiturDivisi: '',
    backgroundTotalKegiatan: '',
  })
  return (
    <Box>
      <LayoutNavbarNew back='/color-palette' title='Edit Tema' menu />
      <Box p={20}>
        <Stack>
        <TextInput
            label={'Judul Tema'}
            placeholder='Judul Tema'
            required
            size="md"
            radius="md"
            onChange={
              (e) => setWarna({ ...isWarna, judulTema: e.target.value })
            }
          />
          <ColorInput
            label={'Warna Utama'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChangeEnd={
              (color) => setWarna({ ...isWarna, warnaUtama: color })
            }
          />
          <ColorInput
            label={'Background Utama'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChangeEnd={
              (color) => setWarna({ ...isWarna, backgroundUtama: color })
            }
          />
          <ColorInput
            label={'Background Icon'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChangeEnd={
              (color) => setWarna({ ...isWarna, backgroundIcon: color })
            }
          />
          <ColorInput
            label={'Background Fitur Home'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChangeEnd={
              (color) => setWarna({ ...isWarna, backgroundFiturHome: color })
            }
          />
          <ColorInput
            label={'Background Fitur Divisi'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChangeEnd={
              (color) => setWarna({ ...isWarna, backgroundFiturDivisi: color })
            }
          />
          <ColorInput
            label={'Background Total Kegiatan'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChangeEnd={
              (color) => setWarna({ ...isWarna, backgroundTotalKegiatan: color })
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
                <Box bg={isWarna.warnaUtama} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.warnaUtama.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.warnaUtama}</Pill>
              }
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.backgroundUtama} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.backgroundUtama.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.backgroundUtama}</Pill>
              }
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.backgroundIcon} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.backgroundIcon.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.backgroundIcon}</Pill>
              }
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.backgroundFiturHome} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.backgroundFiturHome.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.backgroundFiturHome}</Pill>
              }
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.backgroundFiturDivisi} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.backgroundFiturDivisi.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.backgroundFiturDivisi}</Pill>
              }
            </Flex>
            <Flex justify={"center"} direction={"column"}>
              <Center>
                <Box bg={isWarna.backgroundTotalKegiatan} w={35} h={35} style={{
                  borderRadius: 10
                }} />
              </Center>
              {isWarna.backgroundTotalKegiatan.length == 0 ? "" :
                <Pill size="xs" ta={"center"}>{isWarna.backgroundTotalKegiatan}</Pill>
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
        // onClick={() => { onSubmit() }}
        >
          Simpan
        </Button>
      </Box>
    </Box>
  );
}
