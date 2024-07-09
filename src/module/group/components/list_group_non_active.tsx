import { LayoutDrawer, WARNA } from '@/module/_global';
import { ActionIcon, Box, Group, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import EditDrawerGroup from './ui/edit_drawer_group';
import toast from 'react-hot-toast';

const dataGroup = [
  {
    id: 1,
    name: 'Dinas'
  },
  {
    id: 2,
    name: 'Adat'
  },
  {
    id: 3,
    name: 'LPD'
  },
  {
    id: 4,
    name: 'Karang Taruna'
  },
  {
    id: 5,
    name: 'BPD'
  },
  {
    id: 6,
    name: 'LPM'
  },
  {
    id: 7,
    name: 'PKK'
  },
  {
    id: 8,
    name: 'Pengelolaan Penduduk'
  },
]

export default function ListGroupNonActive() {
  const [openDrawer, setOpenDrawer] = useState(false)
  const [valChoose, setValChoose] = useState("")

  return (
    <Box pt={20}>
      <TextInput
        styles={{
          input: {
            color: WARNA.biruTua,
            borderRadius: WARNA.biruTua,
            borderColor: WARNA.biruTua,
          },
        }}
        size="md"
        radius={30}
        leftSection={<HiMagnifyingGlass size={20} />}
        placeholder="Pencarian"
      />
      {dataGroup.map((v, i) => {
        return (
          <Box pt={20} key={i}>
            <Group align='center'
              style={{
                border: `1px solid ${"#DCEED8"}`,
                padding: 10,
                borderRadius: 10,
                cursor: 'pointer'
              }}
              onClick={() => {
                setValChoose(v.name)
                setOpenDrawer(true)
              }}
            >
              <Box>
                <ActionIcon variant="light" bg={'#DCEED8'} size={50} radius={100} aria-label="icon">
                  <HiOutlineOfficeBuilding color={WARNA.biruTua} size={25} />
                </ActionIcon>
              </Box>
              <Box>
                <Text fw={'bold'} c={WARNA.biruTua}>{v.name}</Text>
              </Box>
            </Group>
          </Box>
        )
      })}
      <LayoutDrawer opened={openDrawer} onClose={() => setOpenDrawer(false)} title={valChoose}>
        <EditDrawerGroup onUpdated={(val) => {
          if (val) {
            toast.success('Sukses! data tersimpan')
          }
          setOpenDrawer(false)
        }} />
      </LayoutDrawer>
    </Box>
  );
}
