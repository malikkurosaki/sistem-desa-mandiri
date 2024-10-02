'use client'
import { LayoutDrawer, SkeletonSingle, TEMA, WARNA } from '@/module/_global';
import { useHookstate } from '@hookstate/core';
import { Anchor, Box, Flex, Group, Image, SimpleGrid, Stack, Text, TextInput } from '@mantine/core';
import _ from 'lodash';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { FaFile, FaPencil, FaTrash } from 'react-icons/fa6';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { IoAddCircle } from 'react-icons/io5';

function ListBanner() {
  const tema = useHookstate(TEMA)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true);
  const [isData, setData] = useState([]);
  const [valChoose, setValChoose] = useState("");
  const router = useRouter();


  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Box pt={20}>
      <Box>
        <Anchor underline='never'>
          <Stack align='center' justify='center'>
            {[...Array(5)].map((_, index) => (
              <div key={index} onClick={() => { setOpenDrawer(true) }}>
                <Text c={"dark"} ta={"center"}>Banner {index + 1}</Text>
                <Image radius={"lg"} src={`/assets/img/banner/Banner-${index + 1}.png`} alt='' w={380} h={194.5} />
              </div>
            ))}

          </Stack>
        </Anchor>
      </Box>

      <LayoutDrawer
        opened={openDrawer}
        onClose={() => setOpenDrawer(false)}
        title={<Text lineClamp={1}>{"Menu"}</Text>}
      >
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
        >
          <Box>
            <Anchor underline='never'>
            <Flex direction={"column"}>
              <FaPencil size={30} color={WARNA.biruTua} />
              <Text c={"dark"} mt={10}>Edit</Text>
            </Flex>
            </Anchor>
          </Box>
          <Box>
            <Anchor underline='never'>
            <Flex direction={"column"}>
              <FaFile size={30} color={WARNA.biruTua} />
              <Text c={"dark"} mt={10}>View File</Text>
            </Flex>
            </Anchor>
          </Box>
          <Box >
            <Anchor underline='never'>
            <Flex direction={"column"}>
              <FaTrash size={30} color={WARNA.biruTua} />
              <Text ta="center" c={"dark"} mt={10}>Hapus</Text>
            </Flex>
            </Anchor>
          </Box>
        </SimpleGrid>
      </LayoutDrawer>
    </Box>
  );
}

export default ListBanner;
