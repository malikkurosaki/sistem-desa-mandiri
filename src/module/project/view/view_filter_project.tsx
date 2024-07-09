'use client'
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, Button, Divider, Group, Text } from '@mantine/core';
import React, { useState } from 'react';
import { FaCheck } from "react-icons/fa6";

const dataFilter = [
  {
    id: 1,
    name: 'Semua Proyek'
  },
  {
    id: 2,
    name: 'Proyek Dinas'
  },
  {
    id: 3,
    name: 'Proyek Lpd'
  },
  {
    id: 4,
    name: 'Proyek Lembaga 1'
  },
  {
    id: 5,
    name: 'Proyek Lembaga 2'
  },
  {
    id: 6,
    name: 'Proyek Lembaga 3'
  },
]


export default function ProjectFilter() {
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleFilterClick = (filterName: string) => {
    setSelectedFilter(filterName);
  };

  return (
    <Box>
      <LayoutNavbarNew back='/project' title='Filter' menu />
      <Box p={20}>
        {dataFilter.map((filter) => (
          <Box key={filter.id}>
            <Group
              justify="space-between"
              align="center"
              mb={10}
              onClick={() => handleFilterClick(filter.name)}
            >
              <Text fw={selectedFilter === filter.name ? 'bold' : 'normal'}>
                {filter.name}
              </Text>
              {selectedFilter === filter.name && <FaCheck size={25} />}
            </Group>
            <Divider my={"sm"} />
          </Box>
        ))}
        <Button
          fullWidth
          radius={100}
          size="lg"
          color={WARNA.biruTua}
        >
          Terapkan
        </Button>
      </Box>
    </Box>
  );
}
