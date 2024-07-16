import { ActionIcon, Box, Checkbox, Divider, Flex, Grid, Group, Text } from '@mantine/core';
import React from 'react';
import { FcDocument, FcFolder, FcImageFile } from "react-icons/fc";

const dataDocuments = [
  {
    id: 1,
    name: 'Administrasi',
    date: '18/06/2024 14.00 PM',
    icon: <FcFolder size={60} />
  },
  {
    id: 2,
    name: 'Administrasi',
    date: '18/06/2024 14.00 PM',
    icon: <FcFolder size={60} />
  },
  {
    id: 3,
    name: 'Administrasi',
    date: '18/06/2024 14.00 PM',
    icon: <FcFolder size={60} />
  },
  {
    id: 3,
    name: 'Berkas Kerja',
    date: '18/06/2024 14.00 PM',
    icon: <FcDocument size={60} />
  },
  {
    id: 3,
    name: 'Berkas Kerja',
    date: '18/06/2024 14.00 PM',
    icon: <FcDocument size={60} />
  },
  {
    id: 3,
    name: 'Image Kegiatan',
    date: '18/06/2024 14.00 PM',
    icon: <FcImageFile size={60} />
  },
  {
    id: 3,
    name: 'Image Pelaksanaan',
    date: '18/06/2024 14.00 PM',
    icon: <FcImageFile size={60} />
  },
]

export default function ListDocumentsDivision() {
  return (
    <Box>
      <Box p={20}>
        {dataDocuments.map((v, i) => {
          return (
            <Box key={i}>
              <Box mt={10} mb={10}>
                <Grid align='center'>
                  <Grid.Col span={10}>
                    <Group gap={20}>
                      <Box>
                        {v.icon}
                      </Box>
                      <Flex direction={'column'}>
                        <Text>{v.name}</Text>
                        <Text fz={10}>{v.date}</Text>
                      </Flex>
                    </Group>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Group justify='flex-end'>
                      <Checkbox
                        color="teal"
                        radius="lg"
                        size="md"
                      />
                    </Group>
                  </Grid.Col>
                </Grid>
              </Box>
              <Divider size="xs" />
            </Box>
          )
        })}
      </Box>
    </Box>
  );
}

