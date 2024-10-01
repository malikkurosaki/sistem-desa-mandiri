import { useHookstate } from '@hookstate/core';
import { Box, Center, Grid, Group, SimpleGrid, Skeleton } from '@mantine/core';
import React from 'react';
import { TEMA } from '../bin/val_global';

export default function SkeletonDetailListTugasTask() {
  const tema = useHookstate(TEMA)
  return (
    <Box>
      <Skeleton width={30} height={30} radius={"md"} />
      <Grid>
        <Grid.Col span={"auto"}>
          <Center>
          </Center>
        </Grid.Col>
        <Grid.Col span={12}>
          <Box
            style={{
              borderRadius: 10,
              border: `1px solid ${tema.get().bgTotalKegiatan}`,
              padding: 10,
            }}
          >
            <Group>
              <Skeleton width={25} height={25} radius={"md"} />
              <Skeleton width={"50%"} height={20} radius={"md"} />
            </Group>
          </Box>
          <Box>
            <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} mt={20}>
              <Box>
                <Skeleton width={"50%"} height={20} radius={"md"} />
                <Group
                  bg={"white"}
                  mt={3}
                  h={45}
                  style={{
                    borderRadius: 10,
                    border: `1px solid ${tema.get().bgTotalKegiatan}`,
                  }}
                >
                  <Skeleton ml={5} width={"80%"} height={20} radius={"md"} />
                </Group>
              </Box>
              <Box>
                <Skeleton width={"50%"} height={20} radius={"md"} />
                <Group
                  bg={"white"}
                  mt={3}
                  h={45}
                  style={{
                    borderRadius: 10,
                    border: `1px solid ${tema.get().bgTotalKegiatan}`,
                  }}
                >
                  <Skeleton ml={5} width={"80%"} height={20} radius={"md"} />
                </Group>
              </Box>
            </SimpleGrid>
          </Box>
        </Grid.Col>
      </Grid>
    </Box>
  );
}
