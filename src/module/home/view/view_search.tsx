import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, TextInput } from '@mantine/core';
import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

export default function ViewSearch() {
  return (
    <>
      <LayoutNavbarNew back='/home' title='Pencarian' menu={<></>} />
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

