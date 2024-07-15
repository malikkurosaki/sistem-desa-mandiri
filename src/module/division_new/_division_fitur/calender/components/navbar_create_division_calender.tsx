"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, Input, Stack } from '@mantine/core';
import { DateInput } from '@mantine/dates';
import React, { useState } from 'react';
import { BsCalendarDate } from 'react-icons/bs';
import { PiIdentificationCardLight } from "react-icons/pi";

export default function NavbarCreateDivisionCalender() {
  const [value, setValue] = useState<Date | null>(null);
  return (
    <Box>
      <LayoutNavbarNew back="/calender" title="tambah kalender" menu />
      <Box p={20}>
        <Stack>
          <Input
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            placeholder="Event Name"
            size="lg"
            leftSection={<PiIdentificationCardLight size={30} color={WARNA.biruTua} />}
          />
          <DateInput
            styles={{
              input: {
                border: `1px solid ${"#D6D8F6"}`,
                borderRadius: 10,
              },
            }}
            value={value}
            onChange={setValue}
            placeholder="Date input"
            size="lg"
            leftSection={<BsCalendarDate size={25} color={WARNA.biruTua} />}
          />
        </Stack>
      </Box>
    </Box>
  );
} 
