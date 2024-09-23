import { Box, Divider, Grid, Skeleton } from '@mantine/core';
import React from 'react';

export default function SkeletonList() {
  return (
    <div>
      <Box>
        <Grid p={10} align="center">
          <Grid.Col span={2}>
            <Skeleton w={50} h={50} radius={100} />
          </Grid.Col>
          <Grid.Col span={9}>
            <Skeleton w={"80%"} h={20} />
          </Grid.Col>
        </Grid>
      </Box>
      <Divider my={2} />
    </div >
  );
}

