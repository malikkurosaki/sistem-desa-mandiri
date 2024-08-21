import { LayoutDrawer, WARNA } from "@/module/_global";
import { Box, Flex, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import React, { useState } from "react";
import { LuFolders, LuFolderSymlink } from "react-icons/lu";
import DrawerCutDocuments from "./drawer_cut_documents";
import DrawerCopyDocuments from "./drawer_copy_documents";

export default function DrawerMore() {
  const [isCut, setIsCut] = useState(false)
  const [isCopy, setIsCopy] = useState(false)
  return (
    <Box>
      <Stack p={10} >
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
        >
          <Flex onClick={() => setIsCut(true)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <LuFolderSymlink size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Pindah</Text>
            </Box>
          </Flex>
          <Flex onClick={() => setIsCopy(true)} justify={'center'} align={'center'} direction={'column'} >
            <Box>
              <LuFolders size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Salin</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutDrawer opened={isCut} onClose={() => setIsCut(false)} title={'Pilih Lokasi Pemindahan'} size="lg">
        <DrawerCutDocuments />
      </LayoutDrawer>
      <LayoutDrawer opened={isCopy} onClose={() => setIsCopy(false)} title={'Pilih Lokasi Salin'} size="lg">
        <DrawerCopyDocuments />
      </LayoutDrawer>
    </Box>
  );
}
