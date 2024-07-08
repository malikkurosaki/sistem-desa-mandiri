'use client'
import { ActionIcon, Box, Grid, Group, Text, Title } from '@mantine/core';
import React from 'react';
import { WARNA } from '../fun/WARNA';
import LayoutIconBack from './layout_icon_back';
import _ from 'lodash';

export const LayoutNavbarNew = ({ back, title, menu }: { back: string, title: string, menu: React.ReactNode }) => {
   return (
      <Box pt={25} pl={20} pr={20} m={0} pos={'sticky'} top={0} pb={25} bg={WARNA.biruTua}
         style={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            zIndex: 100,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
         }}
      >
         <Grid justify='center' align='center'>
            <Grid.Col span="auto">
               <LayoutIconBack back={back} />
            </Grid.Col>
            <Grid.Col span={6}>
               {/* <Text ta={'center'} fw={'bold'} c={'white'}>GROUP</Text> */}
               <Title c={WARNA.bgWhite} ta={'center'} order={3}>{_.startCase(title)}</Title>
            </Grid.Col>
            <Grid.Col span="auto">
               <Group justify='flex-end'>
                  {menu}
               </Group>
            </Grid.Col>
         </Grid>
      </Box>
   );
}
export default LayoutNavbarNew