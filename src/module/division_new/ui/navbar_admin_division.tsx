"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Avatar, Box, Button, Checkbox, Divider, Flex, Group, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import toast from 'react-hot-toast';
import { globalMemberDivision } from '../lib/val_division';
import { funCreateDivision } from '../lib/api_division';
import { IFormMemberDivision } from '../lib/type_division';

export default function NavbarAdminDivision({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
  const router = useRouter()
  const member = useHookstate(globalMemberDivision)
  const memberValue = member.get() as IFormMemberDivision[]
  const [value, setValue] = useState<string[]>([]);

  async function onSubmit() {
    if (value.length === 0) {
      return toast.error("Error! Silahkan pilih admin divisi")
    }

    try {
      const response = await funCreateDivision({ data: data, member: memberValue, admin: value })

      if (response.success) {
        toast.success(response.message);
        onSuccess(true)
      } else {
        toast.error(response.message)
        onSuccess(false)
      }

    } catch (error) {
      console.log(error);
      onSuccess(false)
      toast.error("Gagal menambahkan divisi, coba lagi nanti");
    }
  }

  return (
    <Box>
      <LayoutNavbarNew title="Pilih Admin Divisi" menu />
      <Box p={20}>
        <TextInput
          styles={{
            input: {
              color: WARNA.biruTua,
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
                    <Flex
                      justify={"space-between"}
                      align={"center"}
                    >
                      <Group>
                        <Avatar src={v.img} alt="it's me" size="lg" />
                        <Box>
                          <Text c={WARNA.biruTua} fw={"bold"}>
                            {v.name}
                          </Text>
                        </Box>
                      </Group>
                      <Checkbox value={v.idUser} />
                    </Flex>
                    <Divider my={20} />
                  </Box>
                );
              })
            }
          </Checkbox.Group>
        </Box>
        <Box mt="xl">
          <Button
            color="white"
            bg={WARNA.biruTua}
            size="lg"
            radius={30}
            fullWidth
            onClick={() => { onSubmit() }}
          >
            Simpan
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
