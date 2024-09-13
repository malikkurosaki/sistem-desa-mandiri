
import { Box, Center, Grid, Group, Text } from '@mantine/core';
import React from 'react';
import { BsFiletypeCsv, BsFiletypeHeic, BsFiletypeJpg, BsFiletypePdf, BsFiletypePng } from 'react-icons/bs';
import { IListFileTaskProject } from '../lib/type_project';

export default function ResultsFile({ name, extension }: IListFileTaskProject) {
  return (
    <Box style={{
      borderRadius: 10,
      border: `1px solid ${"#D6D8F6"}`,
      padding: 10
    }} mb={10}>
      <Grid gutter={"sm"} justify='flex-start' align='flex-start'>
        <Grid.Col span={"auto"}>
          <Center >
            {extension == "pdf" && <BsFiletypePdf size={30} />}
            {extension == "csv" && <BsFiletypeCsv size={30} />}
            {extension == "png" && <BsFiletypePng size={30} />}
            {extension == "jpg" || extension == "jpeg" && <BsFiletypeJpg size={30} />}
            {extension == "heic" && <BsFiletypeHeic size={30} />}
          </Center>
        </Grid.Col>
        <Grid.Col span={10}>
          <Text lineClamp={1}
            style={{
              overflowWrap: "break-word"
            }}
          >{name}</Text>
        </Grid.Col>
      </Grid>
      <Group>
      </Group>
    </Box>
  );
}