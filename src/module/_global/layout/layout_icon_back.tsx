'use client'
import { ActionIcon, Box } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React from 'react';
import { HiChevronLeft } from 'react-icons/hi2';
import { WARNA } from '../fun/WARNA';
import _ from 'lodash';

function LayoutIconBack({ back }: { back?: string }) {
  const router = useRouter()
  return (
    <Box>
      <ActionIcon variant="light" onClick={() => {
        if (!_.isUndefined(back) && !_.isNull(back)) {
          return router.push(back)
        } else {
          return router.back()
        }

      }} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
        <HiChevronLeft size={20} color='white' />
      </ActionIcon>
    </Box>
  );
}

export default LayoutIconBack;
