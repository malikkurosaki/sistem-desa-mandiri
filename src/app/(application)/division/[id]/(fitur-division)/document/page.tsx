import { NavbarDocumentDivision } from '@/module/document';
import { Box } from '@mantine/core';
import React from 'react';

function Page({ searchParams }: { searchParams: any }) {
  return (
    <Box>
      <NavbarDocumentDivision />
    </Box>
  );
}

export default Page;
