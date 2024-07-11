"use client"
import { LayoutNavbarNew } from '@/module/_global';
import { Box, Select, Stack } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useState } from 'react';

export default function CreateReport() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Box>
      <LayoutNavbarNew back="/division" title="Report Divisi" menu />
      <Box p={20}>
        <Stack>
          <Select
            placeholder="Grup"
            label="Grup"
            size="md"
            required
            radius={10}
          />
          <DateInput
            value={value}
            onChange={setValue}
            radius={10}
            size="md"
            required
            label="Date input"
            placeholder="Date input"
          />
        </Stack>
      </Box>
    </Box>
  );
}

