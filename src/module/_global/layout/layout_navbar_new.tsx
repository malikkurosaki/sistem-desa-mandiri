'use client'
import { useHookstate } from '@hookstate/core';
import { Box, Grid, Group, Title } from '@mantine/core';
import _ from 'lodash';
import React from 'react';
import { TEMA } from '../bin/val_global';
import LayoutIconBack from './layout_icon_back';

export const LayoutNavbarNew = ({ back, state, title, menu }: { back?: string, title: string, menu: React.ReactNode, state?: React.ReactNode }) => {
   const tema = useHookstate(TEMA)
   return (
      <Box pt={25} pl={20} pr={20} m={0} pos={'sticky'} top={0} pb={25} bg={tema.get().utama}
         style={{
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            zIndex: 900,
            boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)"
         }}
      >
         <Grid justify='center' align='center'>
            {
               state != undefined &&
               <Grid.Col span="auto">
                  {state}
               </Grid.Col>
            }
            {
               back != undefined &&
               <Grid.Col span="auto">
                  <LayoutIconBack back={back} />
               </Grid.Col>
            }
            <Grid.Col span={8}>
               <Title c={tema.get().bgUtama} ta={'center'} order={5} lineClamp={1}>{_.startCase(title)}</Title>
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