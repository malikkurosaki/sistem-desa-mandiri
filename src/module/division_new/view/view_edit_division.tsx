"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, Button, Select, Stack, Textarea, TextInput } from '@mantine/core';
import React from 'react';

export default function ViewEditDivision() {
  return (
    <Box>
      <LayoutNavbarNew back="/division/info/1" title="Edit Divisi"
        menu
      />
      <Box p={20}>
        <Stack>
          <Select
            placeholder="Grup"
            label="Grup"
            size="md"
            required
            radius={40}
          />
          <TextInput
            placeholder="Judul"
            label="Judul"
            size="md"
            required
            radius={40}
          />
          <Textarea placeholder="Deskripsi" label="Deskripsi" radius={10} />
          <Box mt="xl">
            <Button
              color="white"
              bg={WARNA.biruTua}
              size="lg"
              radius={30}
              fullWidth
              onClick={() => ""}
            >
              Simpan
            </Button>
          </Box>
        </Stack>
      </Box>
    </Box>
  );
}

