import { WARNA } from '@/module/_global';
import { Box, Button, Divider, Flex, Grid, Group, Modal, Text, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { FcFolder } from 'react-icons/fc';
const dataDocuments = [
  {
    id: 1,
    name: 'Administrasi',
    date: '18/06/2024 14.00 PM',
    icon: <FcFolder size={40} />
  },
  {
    id: 2,
    name: 'Administrasi',
    date: '18/06/2024 14.00 PM',
    icon: <FcFolder size={40} />
  },
  {
    id: 3,
    name: 'Administrasi',
    date: '18/06/2024 14.00 PM',
    icon: <FcFolder size={40} />
  },
]

export default function DrawerCutDocuments() {
  const [opened, setOpened] = useState(false);
  function onCreate(val: boolean) {
    if (val) {
      toast.success("Sukses! Membuat Folder");
    }
    setOpened(false)
  }
  return (
    <Box>
      <Box h={60} pos={"fixed"} bottom={0} w={{base: "92%", md: "94%"}} style={{
        zIndex: 999
      }}>
        <Grid justify='center'>
          <Grid.Col span={6}>
            <Button variant="subtle" fullWidth color={WARNA.biruTua} radius={"xl"} onClick={() => setOpened(true)}>BUAT FOLDER BARU</Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button variant="filled" fullWidth  color={WARNA.biruTua} radius={"xl"}>PIDAH</Button>
          </Grid.Col>
        </Grid>
      </Box>
      <Box p={10} pb={60}>
          {dataDocuments.map((v, i) => {
            return (
              <Box key={i}>
                <Box mt={10} mb={10}>
                  <Grid align='center'>
                    <Grid.Col span={12}>
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
                  </Grid>
                </Box>
                <Divider size="xs" />
              </Box>
            )
          })}
      </Box>
      <Modal styles={{
        body: {
          borderRadius: 20
        },
        content: {
          borderRadius: 20,
          border: `2px solid ${"#828AFC"}`
        }
      }} opened={opened} onClose={() => setOpened(false)} centered withCloseButton={false}>
        <Box p={20}>
          <Text ta={"center"} fw={"bold"}>Buat Folder</Text>
          <Box mt={20} mb={20}>
            <TextInput
              styles={{
                input: {
                  color: WARNA.biruTua,
                  borderRadius: '#828AFC',
                  borderColor: '#828AFC',
                },
              }}
              size="md"
              radius={10}
              placeholder="Buat Folder Baru"
            />
          </Box>
          <Grid mt={40}>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color='#969494' onClick={() => setOpened(false)}>Batalkan</Button>
            </Grid.Col>
            <Grid.Col span={6}>
              <Button variant="subtle" fullWidth color={WARNA.biruTua} onClick={(val) => onCreate(true)}>Membuat</Button>
            </Grid.Col>
          </Grid>
        </Box>
      </Modal>
    </Box>
  );
}
