import { Box, Center, Grid, Group, Text } from '@mantine/core';
import React from 'react';
import { BsFiletypeCsv, BsFiletypeHeic, BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from 'react-icons/bs';
import { IListFileTask } from '../lib/type_task';

export default function ResultsFile({ name, extension }: IListFileTask) {
  return (
    <Box style={{
      borderRadius: 10,
      border: `1px solid ${"#D6D8F6"}`,
      padding: 10
    }} mb={10}>
      <Grid gutter={"sm"} justify='flex-start' align='flex-start'>
        <Grid.Col span={"auto"}>
          <Center>
            {extension == "pdf" && <BsFiletypePdf size={30} />}
            {extension == "csv" && <BsFiletypeCsv size={30} />}
            {extension == "png" && <BsFiletypePng size={30} />}
            {extension == "jpg" && <BsFiletypeJpg size={30} />}
            {extension == "jpeg" && <BsFiletypeJpg size={30} />}
            {extension == "PNG" && <BsFiletypePng size={30} />}
            {extension == "JPG" && <BsFiletypeJpg size={30} />}
            {extension == "JPEG" && <BsFiletypeJpg size={30} />}
            {extension == "heic" && <BsFiletypeHeic size={30} />}
          </Center>
        </Grid.Col>
        <Grid.Col span={10}>
          <Text truncate={'end'}>{name}</Text>
        </Grid.Col>
      </Grid>
      <Group>
      </Group>
    </Box>
  );
}