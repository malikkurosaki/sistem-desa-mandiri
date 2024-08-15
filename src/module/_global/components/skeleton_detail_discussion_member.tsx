import { ActionIcon, Box, Flex, Group, Skeleton } from '@mantine/core';
import React from 'react';

export default function SkeletonDetailDiscussionMember() {
  return (
    <>
      <Flex justify="space-between" align="center" mt={20}>
        <Group>
          <Box>
            <ActionIcon
              variant="light"
              bg={"#DCEED8"}
              size={50}
              radius={100}
              aria-label="icon"
            >
              <Skeleton height={25} width={25} />
            </ActionIcon>
          </Box>
          <Box>
            <Skeleton height={8} mt={6} width="50%" radius="xl" />
            <Skeleton height={8} mt={6} width="30%" radius="xl" />
          </Box>
        </Group>
        <Skeleton height={8} mt={6} width="30%" radius="xl" />
      </Flex>
      <Box mt={10}>
        <Skeleton height={8} radius="xl" />
      </Box>
      <Group justify="space-between" mt={20} c={'#8C8C8C'}>
        <Group gap={5} align="center">
          <Skeleton height={8} mt={6} width="30%" radius="xl" />
        </Group>
      </Group>
    </>
  );
}

