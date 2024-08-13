"use client";
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { funGetGroupDivision } from '@/module/group/lib/api_group';
import { Box, Button, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { GroupData } from '../lib/type_announcement';
import { useHookstate } from '@hookstate/core';
import { globalMemberAnnouncement } from '../lib/val_announcement';



interface CheckedState {
  [key: string]: string[];
}

export default function CreateUsersAnnouncement() {
  const [checked, setChecked] = useState<CheckedState>({});
  const [selectAll, setSelectAll] = useState(false);
  const [isData, setIsData] = useState<GroupData[]>([])
  const memberGroup = useHookstate(globalMemberAnnouncement)

  const handleCheck = (groupId: string, divisionId: string) => {
    const newChecked = { ...checked };
    if (newChecked[groupId]) {
      if (newChecked[groupId].includes(divisionId)) {
        newChecked[groupId] = newChecked[groupId].filter(item => item !== divisionId);
      } else {
        newChecked[groupId].push(divisionId);
      }
    } else {
      newChecked[groupId] = [divisionId];
    }
    setChecked(newChecked);
    console.log(newChecked)
  };

  const handleGroupCheck = (groupId: string) => {
    const newChecked = { ...checked };
    if (newChecked[groupId]) {
      delete newChecked[groupId];
    } else {
      newChecked[groupId] = isData.find(item => item.id === groupId)?.Division.map(item => item.id) || [];
    }
    setChecked(newChecked);
    console.log(newChecked)
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const newChecked: CheckedState = {};
      isData.forEach(item => {
        newChecked[item.id] = item.Division.map(division => division.id);
      });
      setChecked(newChecked);
      console.log(newChecked)
    } else {
      setChecked({});
    }
  };

  async function getData() {
    const response = await funGetGroupDivision()
    console.log(response)
    setIsData(response.data)
  }
  const handleSubmit = () => {
    const selectedGroups: GroupData[] = [];
    Object.keys(checked).forEach((groupId) => {
      if (checked[groupId]) {
        selectedGroups.push();
      }
    });
    memberGroup.set(selectedGroups);
  };

  useShallowEffect(() => {
    getData()
  }, [])

  return (
    <div>
      <LayoutNavbarNew back="" title="Tambah Anggota" menu={<></>} />
      <Box p={20}>
        <Group justify='flex-end' mb={20}>
          <Text
            onClick={handleSelectAll}
            style={{
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            fw={selectAll ? 'bold' : 'normal'}
          >
            Pilih Semua
          </Text>
        </Group>
        {isData.map((item) => (
          <Stack mb={30} key={item.id}>
            <Group onClick={() => handleGroupCheck(item.id)} justify='space-between' align='center'>
              <Text
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                fw={checked[item.id] && checked[item.id].length === item.Division.length ? 'bold' : 'normal'}
              >
                {item.name}
              </Text>
              <Text
              >
                {checked[item.id] && checked[item.id].length === item.Division.length ? <FaCheck style={{ marginRight: 10 }} /> : ""}
              </Text>
            </Group>
            <Divider />
            {item.Division.map((division) => (
              <Box key={division.id}>
                <Group onClick={() => handleCheck(item.id, division.id)} justify='space-between' align='center'>
                  <Text
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 20,
                    }}
                  >
                    {division.name}
                  </Text>
                  <Text
                    style={{
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      paddingLeft: 20,
                    }}
                  >
                    {checked[item.id] && checked[item.id].includes(division.id) ? <FaCheck style={{ marginRight: 10 }} /> : ""}
                  </Text>
                </Group>
                <Box pt={15}>
                  <Divider />
                </Box>
              </Box>

            ))}
          </Stack>
        ))}

        <Box mt="xl">
          <Button
            color="white"
            bg={WARNA.biruTua}

            size="lg"
            radius={30}
            fullWidth
            onClick={() => {
              handleSubmit()
            }}
          >
            Simpan
          </Button>
        </Box>

      </Box>
    </div>
  );
}