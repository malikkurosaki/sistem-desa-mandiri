import { Box, Group, Skeleton, Stack } from '@mantine/core';
import React from 'react';

export default function SkeletonDetailEvent() {
  return (
    <Box style={{
      border: `1px solid ${"#D8D8F1"}`,
      padding: 20,
      borderRadius: 10
    }}>
      <Stack ml={10}>
        <Group mb={10} gap={30}>
          <Skeleton height={30} width={30} radius="md" />
          <Skeleton height={20} width={"60%"} radius="md" />
        </Group>
        <Group mb={10} gap={30}>
          <Skeleton height={30} width={30} radius="md" />
          <Skeleton height={20} width={"60%"} radius="md" />
        </Group>
        <Group mb={10} gap={30}>
          <Skeleton height={30} width={30} radius="md" />
          <Skeleton height={20} width={"60%"} radius="md" />
        </Group>
        <Group mb={10} gap={30}>
          <Skeleton height={30} width={30} radius="md" />
          <Skeleton height={20} width={"60%"} radius="md" />
        </Group>
        <Group mb={10} gap={30}>
          <Skeleton height={30} width={30} radius="md" />
          <Skeleton height={20} width={"60%"} radius="md" />
        </Group>
        <Group gap={30}>
          <Skeleton height={30} width={30} radius="md" />
          <Skeleton height={20} width={"60%"} radius="md" />
        </Group>
      </Stack>
    </Box>
  );
}

