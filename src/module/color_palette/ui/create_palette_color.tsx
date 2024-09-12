"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Badge, Box, Button, Center, ColorInput, Flex, Pill, rem, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';

export default function CreatePaletteColor() {
  const [isWarna, setWarna] = useState({
    warnaSatu: '',
    warnaDua: '',
    warnaTiga: '',
    warnaEmpat: '',

  })
  return (
    <Box>
      <LayoutNavbarNew back='/color-palette' title='Tambah Palet' menu />
      <Box p={20}>
        <Stack>
          <ColorInput
            label={'Warna 1'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChangeEnd={
              (color) => setWarna({ ...isWarna, warnaSatu: color })
            }
          />
          <ColorInput
            label={'Warna 2'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChangeEnd={
              (color) => setWarna({ ...isWarna, warnaDua: color })
            }
          />
          <ColorInput
            label={'Warna 3'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChangeEnd={
              (color) => setWarna({ ...isWarna, warnaTiga: color })
            }
          />
          <ColorInput
            label={'Warna 4'}
            placeholder='Pilih Warna'
            required
            size="md"
            radius="md"
            onChangeEnd={
              (color) => setWarna({ ...isWarna, warnaEmpat: color })
            }
          />
        </Stack>
        <Flex justify={'center'} align={"center"} w={"auto"} gap={10} mt={30}>
          <Box>
            <Center>
            <Box bg={isWarna.warnaSatu} w={50} h={50} style={{
              borderRadius: 10
            }} />
            </Center>
            {isWarna.warnaSatu.length == 0 ? "" :
              <Pill size="xs" ta={"center"}>{isWarna.warnaSatu}</Pill>
            }
          </Box>
          <Box>
            <Box bg={isWarna.warnaDua} w={50} h={50} style={{
              borderRadius: 10
            }} />
            {isWarna.warnaDua.length == 0 ? "" :
              <Pill size="xs" ta={"center"}>{isWarna.warnaDua}</Pill>
            }
          </Box>
          <Box>
            <Box bg={isWarna.warnaTiga} w={50} h={50} style={{
              borderRadius: 10
            }} />
            {isWarna.warnaTiga.length == 0 ? "" :
              <Pill size="xs" ta={"center"}>{isWarna.warnaTiga}</Pill>
            }
          </Box>
          <Box>
            <Box bg={isWarna.warnaEmpat} w={50} h={50} style={{
              borderRadius: 10
            }} />
            {isWarna.warnaEmpat.length == 0 ? "" :
              <Pill size="xs" ta={"center"}>{isWarna.warnaEmpat}</Pill>
            }
          </Box>
        </Flex>
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${WARNA.bgWhite}`,
      }}>
        <Button
          color="white"
          bg={WARNA.biruTua}
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
