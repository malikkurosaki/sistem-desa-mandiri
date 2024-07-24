"use client"
import { LayoutDrawer, LayoutNavbarNew, WARNA } from '@/module/_global';
import { ActionIcon, Avatar, Badge, Box, Card, Center, Divider, Flex, Grid, Group, rem, Tabs, Text, TextInput, Title } from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { HiMenu } from 'react-icons/hi';
import { HiMagnifyingGlass, HiMiniPresentationChartBar, HiOutlineListBullet, HiSquares2X2 } from 'react-icons/hi2';
import { MdAccountCircle } from 'react-icons/md';
import { RiCircleFill } from "react-icons/ri";
import DrawerProject from './drawer_project';
import { useRouter } from 'next/navigation';
import { TbClockPause } from 'react-icons/tb';
import { IoIosCheckmarkCircleOutline } from 'react-icons/io';
import { IoCloseCircleOutline } from 'react-icons/io5';
import ProjectProcess from '../project_process';
import ProjectDone from '../project_done';
import ProjectCencel from '../project_cencel';

export default function NavbarProject() {
  const [openDrawer, setOpenDrawer] = useState(false)

  const iconStyle = { width: rem(20), height: rem(20) };

  const tabsData = [
    {
      value: 'segera',
      label: 'Proyek Proses',
      mobileLabel: 'Proses',
      icon: <TbClockPause style={iconStyle} />,
    },
    {
      value: 'selesai',
      label: 'Proyek Selesai',
      mobileLabel: 'Selesai',
      icon: <IoIosCheckmarkCircleOutline style={iconStyle} />,
    },
    {
      value: 'batal',
      label: 'Proyek Batal',
      mobileLabel: ' Batal',
      icon: <IoCloseCircleOutline style={iconStyle} />,
    },
  ];
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 495) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Box>
      <LayoutNavbarNew back='/home' title='proyek'
        menu={<ActionIcon variant="light" onClick={() => setOpenDrawer(true)} bg={WARNA.bgIcon} size="lg" radius="lg" aria-label="Settings">
          <HiMenu size={20} color='white' />
        </ActionIcon>} />

      <Box p={20}>
        <Tabs variant="pills" radius="xl" defaultValue="segera">
          <Tabs.List grow justify='center'>
            {tabsData.map((tab) => (
              <Tabs.Tab
                key={tab.value}
                value={tab.value}
                color={WARNA.biruTua}
                leftSection={tab.icon}
              >
                {isMobile ? tab.mobileLabel : tab.label}
              </Tabs.Tab>
            ))}
          </Tabs.List>

          <Tabs.Panel value="segera">
            <ProjectProcess />
          </Tabs.Panel>

          <Tabs.Panel value="selesai">
            <ProjectDone />
          </Tabs.Panel>

          <Tabs.Panel value="batal">
            <ProjectCencel />
          </Tabs.Panel>
        </Tabs>
      </Box>

      <LayoutDrawer opened={openDrawer} title={'Menu'} onClose={() => setOpenDrawer(false)}>
        <DrawerProject />
      </LayoutDrawer>
    </Box>
  );
}

