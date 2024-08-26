"use client";
import { LayoutDrawer, WARNA } from "@/module/_global";
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
import { useShallowEffect } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaToggleOff } from "react-icons/fa6";
import { IoAddCircle, IoCloseCircleOutline } from "react-icons/io5";
import { funEditGroup, funEditStatusGroup, funGetGroupById } from "../lib/api_group";

export default function EditDrawerGroup({ onUpdated, id, isActive, }: { onUpdated: (val: boolean) => void; id: string; isActive: boolean; }) {
  const [openDrawerGroup, setOpenDrawerGroup] = useState(false);
  const [isModal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState({
    name: false,
  });

  async function getOneGroup() {
    try {
      const res = await funGetGroupById(id);
      if (res.success) {
        setName(res.data.name);
      } else {
        toast.error(res.message);
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal mendapatkan grup, coba lagi nanti");
    }
  }



  useShallowEffect(() => {
    getOneGroup();
  }, []);

  async function isUpdate() {
    try {
      setLoading(true)
      const res = await funEditGroup(id, { name });
      if (res.success) {
        toast.success(res.message);
        setOpenDrawerGroup(false);
        onUpdated(true);
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.error(error);
      toast.error("Edit grup gagal, coba lagi nanti");
    } finally {
      setLoading(false);
    }
  }

  async function nonActive(val: boolean) {
    try {
      if (val) {
        const res = await funEditStatusGroup(id, { isActive: isActive });
        if (res.success) {
          toast.success(res.message);
          setOpenDrawerGroup(false);
          onUpdated(true);
        } else {
          toast.error(res.message)
        }
      }
      setModal(false);
    } catch (error) {
      setModal(false);
      console.error(error);
      toast.error("Edit grup gagal, coba lagi nanti");
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
              <Text c={WARNA.biruTua}>{isActive == false ? "Aktifkan" : "Non Aktifkan"}</Text>
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
            onChange={(e) => {
              setName(e.target.value)
              setTouched({ ...touched, name: false })
            }}
            onBlur={() => setTouched({ ...touched, name: true })}
            error={touched.name ? "Error! harus memasukkan grup" : ""}
            radius={10}
            placeholder="Grup"
            label="Grup"
            required


          />
          <Box mt={"xl"}>
            <Button
              c={"white"}
              bg={WARNA.biruTua}
              size="lg"
              radius={30}
              fullWidth
              onClick={isUpdate}
              loading={loading}
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
