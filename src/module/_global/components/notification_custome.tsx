"use client"
import { Box, Center, Flex, Grid, rem, Text, Transition } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import React, { useState } from 'react';
import { IoCloseOutline, IoNotifications } from 'react-icons/io5';

export default function NotificationCustome({ onClose, title, desc, bg, color, onClick, borderColor }: { onClose: () => void, title: string, desc: string, bg: string, color: string, onClick: () => void, borderColor: string }) {
  const [opened, setOpened] = useState(false);

  useShallowEffect(() => {
    const timer = setTimeout(() => {
      setOpened(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useShallowEffect(() => {
    const timer = setTimeout(() => {
      setOpened(false)
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  function reloadData() {
    onClose()
  }
  return (
    <>
      <Center>
        <Transition
          mounted={opened}
          transition="fade-down"
          duration={400}
          timingFunction="ease"
        >
          {(state) => (
            <div
              style={{
                ...state,
                zIndex: 999,
                position: 'fixed',
                top: 50,
                display: 'flex',
                margin: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Box p={rem(15)} w={"100%"} h={rem(85)} style={{
                maxWidth: rem(450),
                zIndex: 999,
                backgroundColor: bg,
                borderRadius: 15,
                border: `1px solid ${borderColor}`
              }} onClick={onClick}>
                <Grid>
                  <Grid.Col span={2}>
                  <Flex justify={'center'} align={"center"}h={"100%"} >
                    <IoNotifications color={color} size={30}/>
                    </Flex>
                  </Grid.Col>
                  <Grid.Col span={8}>
                    <Text c={color} fw={"bold"} lineClamp={1}>{title}</Text>
                    <Text c={color} lineClamp={1}>{desc}</Text>
                  </Grid.Col>
                  <Grid.Col span={2}>
                    <Flex justify={'center'} align={"center"}h={"100%"} >
                    <IoCloseOutline onClick={reloadData} color={color} size={25}/>
                    </Flex>
                  </Grid.Col>
                </Grid>
              </Box>
            </div>
          )}
        </Transition>
      </Center>
    </>
  );
}
