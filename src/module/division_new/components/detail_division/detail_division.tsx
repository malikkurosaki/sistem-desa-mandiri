import { Box, Stack } from '@mantine/core';
import React from 'react';
import CarouselDivision from './carousel_division';
import { LayoutNavbarNew } from '@/module/_global';
import FeatureDetailDivision from './feature_detail_division';
import ListDiscussionOnDetailDivision from './list_discussion';

export default function DetailDivision() {
  return (
    <Box>
      <LayoutNavbarNew back="/division" title={"Divisi kerohanian"} menu />
      <Box p={20}>
        <Stack>
          <CarouselDivision />
          <FeatureDetailDivision />
          <ListDiscussionOnDetailDivision />
        </Stack>
      </Box>
    </Box>
  );
}

