"use client"
import { API_ADDRESS, LayoutNavbarNew, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Avatar, Box, Button, Checkbox, Divider, Flex, Group, Stack, Text, TextInput } from '@mantine/core';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { globalMemberDivision } from '../../lib/val_division';
import toast from 'react-hot-toast';

export default function NavbarAdminDivision({ data, onSuccess }: { data: any, onSuccess: (val: any) => void }) {
  const router = useRouter()
  const member = useHookstate(globalMemberDivision)
  const [value, setValue] = useState<string[]>([]);

  async function onSubmit() {
    if (value.length === 0) {
      return toast.error("Error! Silahkan pilih admin divisi")
    }

    try {
      const res = await fetch(API_ADDRESS.apiCreateDivision, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          data: data,
          member: member.get(),
          admin: value
        })
      })

      const errorData = await res.json();

      if (res.status == 201) {
        toast.success('Sukses! data tersimpan')
        onSuccess(true)
      } else {
        toast.error(errorData.message);
        onSuccess(false)
      }
    } catch (error) {
      toast.error('Error')
      onSuccess(false)
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
                      <Checkbox value={v.id} />
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
