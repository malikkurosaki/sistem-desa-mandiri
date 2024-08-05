import React, { useEffect } from 'react';
import DetailDivision from '../components/detail_division/detail_division';
import { Box, Stack } from '@mantine/core';
import CarouselDivision from '../components/detail_division/carousel_division';
import FeatureDetailDivision from '../components/detail_division/feature_detail_division';
import ListDiscussionOnDetailDivision from '../components/detail_division/list_discussion';
import ListDocumentOnDetailDivision from '../components/detail_division/list_document';
import ListTaskOnDetailDivision from '../components/detail_division/list_task';
import NavbarDetailDivision from '../components/ui/navbar_detail_division';
import { API_ADDRESS } from '@/module/_global';

export default async function ViewDetailDivision({ id }: { id: string }) {

  const res = await fetch(`${process.env.URL + API_ADDRESS.apiGetOneDetailDivision}&divisionId=${id}`);
  const data = await res.json();

  return (
    // <DetailDivision />
    <Box>
      <NavbarDetailDivision title={data?.division?.name} />
      <Box p={20}>
        <Stack>
          <CarouselDivision />
          <FeatureDetailDivision id={id}/>
          <ListTaskOnDetailDivision />
          <ListDocumentOnDetailDivision />
          <ListDiscussionOnDetailDivision />
        </Stack>
      </Box>
    </Box>
  );
}

