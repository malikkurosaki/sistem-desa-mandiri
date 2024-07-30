"use client";
import { API_ADDRESS, LayoutDrawer, WARNA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import {
  Box,
  Button,
  Center,
  Flex,
  Group,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaToggleOff } from "react-icons/fa6";
import { IoAddCircle, IoCloseCircleOutline } from "react-icons/io5";

export default function EditDrawerGroup({
  onUpdated,
  id,
  isActive,
  isName,
}: {
  onUpdated: (val: boolean) => void;
  id: string | null;
  isActive: boolean | null;
  isName: string;
}) {
  const [openDrawerGroup, setOpenDrawerGroup] = useState(false);
  const [isModal, setModal] = useState(false);
  const [name, setName] = useState(isName);

  async function isUpdate() {
    try {
      const res = await fetch(API_ADDRESS.apiUpdateGroup, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
          name : name
        }),
      });
      setOpenDrawerGroup(false);
    onUpdated(true);
    } catch (error) {
      console.error(error);
    }
  }

  async function nonActive(val: boolean) {
    try {
      if (val) {
        const res = await fetch(API_ADDRESS.apiDeleteGroup, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id,
            isActive,
          }),
        });

        if (res.status == 200) {
          onUpdated(true);
        } else {
          onUpdated(false);
        }
      }
      setModal(false);
    } catch (error) {
      console.log(error);
      setModal(false);
      toast.error("Terjadi kesalahan");
      onUpdated(false);
    }
  }

  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid cols={{ base: 3, sm: 3, lg: 3 }}>
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            onClick={() => setModal(true)}
            style={{ cursor: "pointer" }}
          >
            <Box>
              <FaToggleOff size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Non Aktifkan</Text>
            </Box>
          </Flex>
          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            onClick={() => setOpenDrawerGroup(true)}
            style={{ cursor: "pointer" }}
          >
            <Box>
              <FaPencil size={30} color={WARNA.biruTua} />
            </Box>
            <Box>
              <Text c={WARNA.biruTua}>Edit</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutDrawer
        opened={openDrawerGroup}
        onClose={() => setOpenDrawerGroup(false)}
        title={"Edit Grup"}
      >
        <Box pt={10}>
          <TextInput
            styles={{
              input: {
                color: WARNA.biruTua,
                borderRadius: WARNA.biruTua,
                borderColor: WARNA.biruTua,
              },
            }}
            size="lg"
            value={name}
            onChange={(e) => setName(e.target.value)}
            radius={10}
            placeholder="Grup"
          />
          <Box mt={"xl"}>
            <Button
              c={"white"}
              bg={WARNA.biruTua}
              size="lg"
              radius={30}
              fullWidth
              onClick={isUpdate}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      </LayoutDrawer>

      <LayoutModal
        opened={isModal}
        onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin mangubah status aktifasi data?"
        onYes={(val) => {
          nonActive(val);
        }}
      />
    </Box>
  );
}
