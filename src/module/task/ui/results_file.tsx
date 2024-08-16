import { WARNA } from '@/module/_global';
import { Box, Group, Text } from '@mantine/core';
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
      <Group>
        {extension == "pdf" && <BsFiletypePdf size={25} />}
        {extension == "csv" && <BsFiletypeCsv size={25} />}
        {extension == "png" && <BsFiletypePng size={25} />}
        {extension == "jpg" || extension == "jpeg" && <BsFiletypeJpg size={25} />}
        {extension == "heic" && <BsFiletypeHeic size={25} />}
        <Text>{name}</Text>
      </Group>
    </Box>
  );
}