import { Box, Divider, Grid, Skeleton } from '@mantine/core';
import React from 'react';

export default function SkeletonUser() {
  return (
    <div>
      <Box>
        <Grid p={10} align="center">
          <Grid.Col span={2}>
            <Skeleton w={50} h={50} radius={100} />
          </Grid.Col>
          <Grid.Col span={9}>
            <Skeleton w={"50%"} h={20} />
            <Skeleton mt={5} w={"30%"} h={10} />
          </Grid.Col>
        </Grid>
      </Box>
      <Divider my={10} />
    </div>
  );
}

