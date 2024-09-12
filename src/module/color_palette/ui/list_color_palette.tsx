"use client"
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Box, Checkbox, Flex, Group, Text } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaCircleCheck } from 'react-icons/fa6';
import { HiMenu } from 'react-icons/hi';
import DrawerCreatePalette from './drawer_create_palette';
import DrawerPaletEditEndDefault from './drawer_palet_edit_end_default';

const paletWarna = [
  {
    id: 1,
    name: 'Tema Bawaan 1',
    color: ['#ff69b4', '#33cc33', '#7D8A7DFF', '#0B730BFF', '#16ACE3FF', '#532CC1FF']
  },
  {
    id: 2,
    name: 'Tema Bawaan 2',
    color: ['#EF8A62FF', '#532CC1FF', '#16ACE3FF', '#760B2DFF', '#F67280FF', '#C06C84FF']
  },
  {
    id: 3,
    name: 'Tema Bawaan 3',
    color: ['#F8B195FF', '#F67280FF', '#C06C84FF', '#6C5B7BFF', '#7D8A7DFF', '#0B730BFF']
  },
]

const paletTambahan = [
  {
    id: 1,
    name: 'Tema Tambah 1',
    color: ['#ABD220FF', '#E409E8FF', '#08A2A4FF', '#C11515FF', '#F67280FF', '#C06C84FF']
  }
]

export default function ListColorPalette() {
  const router = useRouter()
  const [isOpen, setOpen] = useState(false)
  const [isOpenTambahan, setOpenTambahan] = useState(false)
  return (
    <Box>
      <LayoutNavbarNew back='/home' title='Tema Aplikasi' menu={
        <ActionIcon onClick={() => { setOpen(true) }} variant="light" bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiMenu size={20} color='white' />
        </ActionIcon>
      } />
      <Box p={20}>
        {paletWarna.map((v, i) => (
          <Box mb={20} key={i}>
            <Box style={{
              borderWidth: "3px",
              borderStyle: "solid",
              borderImage: `linear-gradient(to right, ${v.color} ) 1 `,
            }} pt={10} pb={10} pl={20} pr={20}
            onClick={() => { setOpenTambahan(true) }}
            >
              <Group justify='space-between' align='center'>
                <Text>{v.name}</Text>
                <Checkbox
                  radius="xl"
                  color="teal"
                />
              </Group>
              <Box pt={10}>
                <Flex gap={10}>
                  <Box bg={v.color[0]} w={30} h={30} style={{
                    borderRadius: "100%"
                  }} />
                  <Box bg={v.color[1]} w={30} h={30} style={{
                    borderRadius: "100%"
                  }} />
                  <Box bg={v.color[2]} w={30} h={30} style={{
                    borderRadius: "100%"
                  }} />
                  <Box bg={v.color[3]} w={30} h={30} style={{
                    borderRadius: "100%"
                  }} />
                  <Box bg={v.color[4]} w={30} h={30} style={{
                    borderRadius: "100%"
                  }} />
                  <Box bg={v.color[5]} w={30} h={30} style={{
                    borderRadius: "100%"
                  }} />
                </Flex>
              </Box>
            </Box>
          </Box>
        ))}
        <Box>
          <Text fw={"bold"}>Tema Tambahan</Text>
          {paletTambahan.map((v, i) => (
            <Box mb={20} key={i}>
              <Box style={{
                borderWidth: "3px",
                borderStyle: "solid",
                borderImage: `linear-gradient(to right, ${v.color} ) 1 `,
              }} pt={10} pb={10} pl={20} pr={20}
              onClick={() => { setOpenTambahan(true) }}
              >
                <Group justify='space-between' align='center'>
                  <Text>{v.name}</Text>
                  <Checkbox
                    radius="xl"
                    color="teal"
                  />
                </Group>
                <Box pt={10}>
                  <Flex gap={10}>
                    <Box bg={v.color[0]} w={30} h={30} style={{
                      borderRadius: "100%"
                    }} />
                    <Box bg={v.color[1]} w={30} h={30} style={{
                      borderRadius: "100%"
                    }} />
                    <Box bg={v.color[2]} w={30} h={30} style={{
                      borderRadius: "100%"
                    }} />
                    <Box bg={v.color[3]} w={30} h={30} style={{
                      borderRadius: "100%"
                    }} />
                    <Box bg={v.color[4]} w={30} h={30} style={{
                      borderRadius: "100%"
                    }} />
                    <Box bg={v.color[5]} w={30} h={30} style={{
                      borderRadius: "100%"
                    }} />
                  </Flex>
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
      <LayoutDrawer opened={isOpen} title={'Menu'} onClose={() => setOpen(false)}>
        <DrawerCreatePalette />
      </LayoutDrawer>

      <LayoutDrawer opened={isOpenTambahan} title={'Menu'} onClose={() => setOpenTambahan(false)}>
        <DrawerPaletEditEndDefault />
      </LayoutDrawer>
    </Box>
  );
}
