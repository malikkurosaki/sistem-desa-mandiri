'use client'
import { LayoutIconBack, LayoutNavbarHome } from '@/module/_global';
import { Box, Grid, Text } from '@mantine/core';
import React from 'react';

export default function HeaderEditProfile() {
   return (
      <Box>
         <LayoutNavbarHome>
            <Grid justify='center' align='center'>
               <Grid.Col span="auto">
                  <LayoutIconBack />
               </Grid.Col>
               <Grid.Col span={6}>
                  <Text ta={'center'} fw={'bold'} c={'white'}>EDIT PROFIL</Text>
               </Grid.Col>
               <Grid.Col span="auto"></Grid.Col>
            </Grid>
         </LayoutNavbarHome>
      </Box>
   );
}

