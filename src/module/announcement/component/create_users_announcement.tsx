"use client"
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { Box, Button, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface GroupData {
  group: string;
  divisions: string[];
}

const groupData: GroupData[] = [
  {
    group: "Group 1",
    divisions: ["Division 1", "Division 2", "Division 3"]
  },
  {
    group: "Group 2",
    divisions: ["Division 4", "Division 5"]
  }
];

interface CheckedState {
  [key: string]: string[];
}

export default function CreateUsersAnnouncement() {
  const [checked, setChecked] = useState<CheckedState>({});
  const [selectAll, setSelectAll] = useState(false);

  const handleCheck = (group: string, division: string) => {
    const newChecked = { ...checked };
    if (newChecked[group]) {
      if (newChecked[group].includes(division)) {
        newChecked[group] = newChecked[group].filter(item => item !== division);
      } else {
        newChecked[group].push(division);
      }
    } else {
      newChecked[group] = [division];
    }
    setChecked(newChecked);
    console.log(newChecked)
  };

  const handleGroupCheck = (group: string) => {
    const newChecked = { ...checked };
    if (newChecked[group]) {
      delete newChecked[group];
    } else {
      newChecked[group] = groupData.find(item => item.group === group)?.divisions || [];
    }
    setChecked(newChecked);
    console.log(newChecked)
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const newChecked: CheckedState = {};
      groupData.forEach(item => {
        newChecked[item.group] = item.divisions;
      });
      setChecked(newChecked);
      console.log(newChecked)
    } else {
      setChecked({});
    }
  };

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
        {groupData.map((item) => (
          <Stack mb={30} key={item.group}>
            <Group onClick={() => handleGroupCheck(item.group)} justify='space-between' align='center'>
              <Text
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                }}
                fw={checked[item.group] && checked[item.group].length === item.divisions.length ? 'bold' : 'normal'}
              >
                {item.group}
              </Text>
              <Text
              >
                {checked[item.group] && checked[item.group].length === item.divisions.length ? <FaCheck style={{ marginRight: 10 }} /> : ""}
              </Text>
            </Group>
            <Divider/>
            {item.divisions.map((division) => (
              <Box>
                <Text
                  key={division}
                  onClick={() => handleCheck(item.group, division)}
                  style={{
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    paddingLeft: 20,
                  }}
                >
                  {checked[item.group] && checked[item.group].includes(division) ? <FaCheck style={{ marginRight: 10 }} /> : ""}
                  {division}
                </Text>
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
              ""
            }}
          >
            Simpan
          </Button>
        </Box>

      </Box>
    </div>
  );
}