"use client"
import { WARNA } from '@/module/_global';
import { Box, Center, Grid, Group, SimpleGrid, Text } from '@mantine/core';
import React from 'react';
import { AiOutlineFileSync } from "react-icons/ai";
import { IFormDateTask } from '../lib/type_task';
import moment from 'moment';

export default function ResultsDateAndTask(data: IFormDateTask) {
  return (
    <Box pt={5}>
      <Box bg={"white"} style={{
        borderRadius: 10,
        border: `1px solid ${"#D6D8F6"}`,
        padding: 20
      }}>
        <Box style={{
          borderRadius: 10,
          border: `1px solid ${"#D6D8F6"}`,
          padding: 10
        }}>
          <Grid gutter={"sm"} justify='flex-start' align='flex-start'>
            <Grid.Col span={"auto"}>
              <Center >
                <AiOutlineFileSync size={30} />
              </Center>
            </Grid.Col>
            <Grid.Col span={10}>
              <Text>{data.title}</Text>
            </Grid.Col>
          </Grid>
        </Box>
        <Box>
          <SimpleGrid cols={{ base: 2, sm: 2, lg: 2 }} mt={20}>
            <Box>
              <Text>Tanggal Mulai</Text>
              <Group
                justify="center"
                bg={"white"}
                h={45}
                style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
              >
                <Text>{moment(data.dateStart).format('DD-MM-YYYY')}</Text>
              </Group>
            </Box>
            <Box>
              <Text >Tanggal Berakhir</Text>
              <Group
                justify="center"
                bg={"white"}
                h={45}
                style={{ borderRadius: 10, border: `1px solid ${"#D6D8F6"}` }}
              >
                <Text>{moment(data.dateEnd).format('DD-MM-YYYY')}</Text>
              </Group>
            </Box>
          </SimpleGrid>
        </Box>
      </Box>
    </Box>
  );
}

