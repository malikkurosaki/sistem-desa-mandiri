import { ListAnggotaDetailProject, ListFileDetailProject, ListTugasDetailProject, NavbarDetailProject, ProgressDetailProject, ViewDetailProject } from '@/module/project';
import { Box } from '@mantine/core';
import React from 'react';

function Page() {
  return (
    <Box>
      <NavbarDetailProject />
      <Box p={20}>
        <ProgressDetailProject />
        <ListTugasDetailProject />
        <ListFileDetailProject />
        <ListAnggotaDetailProject />
      </Box>
    </Box>
  );
}

export default Page;
