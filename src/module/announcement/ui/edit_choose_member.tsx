"use client";
import { LayoutNavbarNew, WARNA } from '@/module/_global';
import { funGetGroupDivision } from '@/module/group/lib/api_group';
import { Box, Button, Divider, Flex, Group, Stack, Text } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';
import { GroupData, GroupDataEditAnnouncement } from '../lib/type_announcement';
import { useHookstate } from '@hookstate/core';
import { globalMemberEditAnnouncement } from '../lib/val_announcement';
import { FaMinus } from 'react-icons/fa6';
import toast from 'react-hot-toast';



interface CheckedState {
   [key: string]: string[];
}

export default function EditChooseMember({ onClose }: { onClose: (val: any) => void }) {
   const [checked, setChecked] = useState<CheckedState>({});
   const [selectAll, setSelectAll] = useState(false);
   const [isData, setIsData] = useState<GroupData[]>([])
   const memberGroup = useHookstate(globalMemberEditAnnouncement)

   const handleCheck = (groupId: string, divisionId: string) => {
      const newChecked = { ...checked };
      if (newChecked[groupId]) {
         if (newChecked[groupId].includes(divisionId)) {
            newChecked[groupId] = newChecked[groupId].filter(item => item !== divisionId);
            if (newChecked[groupId].length === 0) {
               delete newChecked[groupId];
            }
         } else {
            newChecked[groupId].push(divisionId);
         }
      } else {
         newChecked[groupId] = [divisionId];
      }
      setChecked(newChecked);
   };


   const handleGroupCheck = (groupId: string) => {
      const newChecked = { ...checked };
      if (newChecked[groupId]) {
         delete newChecked[groupId];
      } else {
         if (isData.find(item => item.id === groupId)?.Division.length == 0) {
            return toast.error("Tidak ada divisi pada grup ini")
         }
         newChecked[groupId] = isData.find(item => item.id === groupId)?.Division.map(item => item.id) || [];
      }
      setChecked(newChecked);
   };

   const handleSelectAll = () => {
      setSelectAll(!selectAll);
      if (!selectAll) {
         const newChecked: CheckedState = {};
         isData.forEach(item => {
            if (item.Division.length > 0) {
               newChecked[item.id] = item.Division.map(division => division.id);
            }
         });
         setChecked(newChecked);
      } else {
         setChecked({});
      }
   };

   async function getData() {
      const response = await funGetGroupDivision()
      setIsData(response.data)

      if (memberGroup.length > 0) {
         const formatArray = memberGroup.get().reduce((result: any, obj: any) => {
            result[obj.id] = obj.Division.map((item: any) => item.id);
            return result;
         }, {})

         setChecked(formatArray)
      }
   }

   const handleSubmit = () => {
      const selectedGroups: GroupData[] = [];
      Object.keys(checked).forEach((groupId) => {
         const group = isData.find((item) => item.id === groupId);
         if (group) {
            selectedGroups.push({
               id: group.id,
               name: group.name,
               Division: group.Division.filter((division) => checked[groupId].includes(division.id)),
            });
         }
      });

      memberGroup.set(selectedGroups);
      onClose(true);
   };

   useShallowEffect(() => {
      getData()
   }, [])

   return (
      <div>
         <LayoutNavbarNew back="" title="Tambah Divisi Penerima Pengumuman" menu={<></>} />
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
                        {checked[item.id] && checked[item.id].length === item.Division.length ? <FaCheck style={{ marginRight: 10 }} />
                           : (checked[item.id] && checked[item.id].length > 0 && checked[item.id].length < item.Division.length) ? <FaMinus style={{ marginRight: 10 }} /> : ""}
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