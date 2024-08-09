import { NavbarDetailDivision, CarouselDivision, FeatureDetailDivision, ListTaskOnDetailDivision, ListDocumentOnDetailDivision, ListDiscussionOnDetailDivision } from '@/module/division_new';
import { Box, Stack } from '@mantine/core';
import React from 'react';

function Page({ params }: { params: { id: string } }) {
  return (
    <Box>
      <NavbarDetailDivision />
      <Box p={20}>
        <Stack>
          <CarouselDivision />
          <FeatureDetailDivision/>
          <ListTaskOnDetailDivision />
          <ListDocumentOnDetailDivision />
          <ListDiscussionOnDetailDivision />
        </Stack>
      </Box>
    </Box>
  );
}

export default Page;
