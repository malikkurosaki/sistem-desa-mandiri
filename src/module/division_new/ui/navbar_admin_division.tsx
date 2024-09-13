"use client"
import { LayoutNavbarNew, TEMA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { ActionIcon, Avatar, Box, Button, Checkbox, Divider, Flex, Grid, Group, rem, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiChevronLeft, HiMagnifyingGlass } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { globalMemberDivision } from '../lib/val_division';
import { funCreateDivision } from '../lib/api_division';
import { IFormMemberDivision } from '../lib/type_division';

export default function NavbarAdminDivision({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
  const router = useRouter()
  const member = useHookstate(globalMemberDivision)
  const memberValue = member.get() as IFormMemberDivision[]
  const [value, setValue] = useState<string[]>([]);
  const tema = useHookstate(TEMA)

  async function onSubmit() {
    if (value.length === 0) {
      return toast.error("Error! Silahkan pilih admin divisi")
    }

    try {
      const response = await funCreateDivision({ data: data, member: memberValue, admin: value })

      if (response.success) {
        toast.success(response.message);
        router.push("/division")
        onSuccess(true)
      } else {
        toast.error(response.message)
        onSuccess(false)
      }

    } catch (error) {
      console.error(error);
      onSuccess(false)
      toast.error("Gagal menambahkan divisi, coba lagi nanti");
    }
  }

  return (
    <Box>
      <LayoutNavbarNew title="Pilih Admin Divisi" menu state={
        <Box>
        </Box>
      } />
      <Box p={20}>
        <TextInput
          styles={{
            input: {
              color: tema.get().utama,
              borderRadius: '#A3A3A3',
              borderColor: '#A3A3A3',
            },
          }}
          size="md"
          radius={30}
          leftSection={<HiMagnifyingGlass size={20} />}
          placeholder="Pencarian"
        />
        <Box pt={20}>
          <Checkbox.Group value={value} onChange={setValue}>
            {
              (member.length === 0) ? (
                <Text c="dimmed" ta={"center"} fs={"italic"}>Belum ada anggota</Text>
              ) : member.get().map((v: any, i: any) => {
                return (
                  <Box key={i}>
                    <Grid align='center' mt={10}
                    >
                      <Grid.Col span={10}>
                        <Group>
                          <Avatar src={`https://wibu-storage.wibudev.com/api/files/${v.img}`} alt="it's me" size="lg" />
                          <Box w={{
                            base: 200,
                            xl: 270
                          }}>
                            <Text c={tema.get().utama} fw={"bold"} lineClamp={1}>
                              {v.name}
                            </Text>
                          </Box>
                        </Group>
                      </Grid.Col>
                      <Grid.Col span={2}>
                        <Flex justify={'end'}>
                          <Checkbox value={v.idUser} />
                        </Flex>
                      </Grid.Col>
                    </Grid>
                    <Box mt={10}>
                      <Divider size={"xs"} />
                    </Box>
                  </Box>
                );
              })
            }
          </Checkbox.Group>
        </Box>
      </Box>
      <Box pos={'fixed'} bottom={0} p={rem(20)} w={"100%"} style={{
        maxWidth: rem(550),
        zIndex: 999,
        backgroundColor: `${tema.get().bgUtama}`,
      }}>
        <Button
          color="white"
          bg={tema.get().utama}
          size="lg"
          radius={30}
          fullWidth
          onClick={() => { onSubmit() }}
        >
          Simpan
        </Button>
      </Box>
    </Box>
  );
}
