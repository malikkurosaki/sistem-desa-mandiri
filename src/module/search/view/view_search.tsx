
import { LayoutIconBack, LayoutNavbarHome, WARNA } from '@/module/_global';
import { ActionIcon, Box, Grid, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiChevronLeft, HiMagnifyingGlass } from 'react-icons/hi2';
import NavbarSearch from '../components/ui/navbar_search';

export default function ViewSearch() {
  return (
    <>
      <NavbarSearch />
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
      </Box>
    </>
  );
}

