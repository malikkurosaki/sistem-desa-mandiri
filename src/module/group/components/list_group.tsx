import { WARNA } from '@/module/_global';
import { ActionIcon, Box, Group, Text, TextInput } from '@mantine/core';
import React from 'react';
import { HiOutlineOfficeBuilding } from 'react-icons/hi';
import { HiMagnifyingGlass } from 'react-icons/hi2';

const dataGroup = [
  {
    id: 1,
    name: 'Lembaga Pengkreditan Desa'
  },
  {
    id: 2,
    name: 'Lembaga Pengkreditan Desa'
  },
  {
    id: 3,
    name: 'Lembaga Pengkreditan Desa'
  },
  {
    id: 4,
    name: 'Lembaga Pengkreditan Desa'
  },
  {
    id: 5,
    name: 'Lembaga Pengkreditan Desa'
  },
  {
    id: 6,
    name: 'Lembaga Pengkreditan Desa'
  },
  {
    id: 7,
    name: 'Lembaga Pengkreditan Desa'
  },
  {
    id: 8,
    name: 'Lembaga Pengkreditan Desa'
  },
]

export default function ListGroup() {
  return (
    <Box p={20}>
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
            }}>
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
    </Box>
  );
}
