import { isDrawer, LayoutDrawer, WARNA } from '@/module/_global';
import { ActionIcon, Box, Group, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import EditDrawerGroup from './ui/edit_drawer_group';

const dataGroup = [
  {
    id: 1,
    name: 'No Active Desa'
  },
  {
    id: 2,
    name: 'No Active Desa'
  },
  {
    id: 3,
    name: 'No Active Desa'
  },
  {
    id: 4,
    name: 'No Active Desa'
  },
  {
    id: 5,
    name: 'No Active Desa'
  },
  {
    id: 6,
    name: 'No Active Desa'
  },
  {
    id: 7,
    name: 'No Active Desa'
  },
  {
    id: 8,
    name: 'No Active Desa'
  },
]

export default function ListGroupNonActive() {
  const [openDrawer, setOpenDrawer] = useState(false)
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
            <Group align='center' style={{
              border: `1px solid ${"#DCEED8"}`,
              padding: 10,
              borderRadius: 10
            }} onClick={() => setOpenDrawer(true)}>
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
      <LayoutDrawer opened={openDrawer} onClose={() => setOpenDrawer(false)} title="LEMBAGA PENGKREDITAN DESA">
        <EditDrawerGroup />
      </LayoutDrawer>
    </Box>
  );
}
