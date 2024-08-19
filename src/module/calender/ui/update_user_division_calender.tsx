import { LayoutNavbarNew } from '@/module/_global';
import { Box } from '@mantine/core';
import React from 'react';
import UpdateListUsers from './update_list_users';

export default function UpdateUserDivisionCalender() {
  return (
    <Box>
      <LayoutNavbarNew back="/calender/update" title="Tambah Anggota" menu />
      <Box p={20}>
        <UpdateListUsers />
      </Box>
    </Box>
  );
}

