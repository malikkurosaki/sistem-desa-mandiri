'use client'
import { WARNA } from '@/module/_global';
import { Box, rem, Tabs, TextInput } from '@mantine/core';
import React from 'react';
import { HiMagnifyingGlass, HiMiniUser } from 'react-icons/hi2';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { IoCloseCircleOutline } from 'react-icons/io5';
import TabListMember from './ui/tab_list_member';

export default function ListMember() {
   const iconStyle = { width: rem(20), height: rem(20) };

   return (
      <Box p={20}>
         <Tabs variant="pills" color='#FF9861' radius="xl" defaultValue="aktif">
            <Tabs.List bg={"white"} style={{
               border: `1px solid ${"#EDEDED"}`,
               padding: 5,
               borderRadius: 100
            }}>
               <Tabs.Tab value="aktif" w={"45%"} leftSection={<IoMdCheckmarkCircleOutline style={iconStyle} />}>
                  Aktif
               </Tabs.Tab>
               <Tabs.Tab value="tidak-aktif" w={"53%"} leftSection={<IoCloseCircleOutline style={iconStyle} />}>
                  Tidak Aktif
               </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="aktif">
               <TabListMember status={true} />
            </Tabs.Panel>

            <Tabs.Panel value="tidak-aktif">
               <TabListMember status={false} />
               {/* <TabListMember /> */}
            </Tabs.Panel>
         </Tabs>
      </Box>
   );
}
