"use client";
import { LayoutDrawer, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";
import { Box, Button, Flex, SimpleGrid, Stack, Text, TextInput } from "@mantine/core";
import { useShallowEffect } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaToggleOff } from "react-icons/fa6";
import { funEditGroup, funEditStatusGroup, funGetGroupById } from "../lib/api_group";
import { globalRefreshGroup } from "../lib/val_group";

export default function EditDrawerGroup({ onUpdated, id, isActive, }: { onUpdated: (val: boolean) => void; id: string; isActive: boolean; }) {
  const [openDrawerGroup, setOpenDrawerGroup] = useState(false);
  const [isModal, setModal] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false)
  const refresh = useHookstate(globalRefreshGroup)
  const tema = useHookstate(TEMA)
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
        refresh.set(!refresh.get())
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

  function onCheck() {
    if (Object.values(touched).some((v) => v == true))
      return false
    isUpdate()
  }

  function onValidation(kategori: string, val: string) {
    if (kategori == 'name') {
      setName(val)
      if (val == "" || val.length < 3) {
        setTouched({ ...touched, name: true })
      } else {
        setTouched({ ...touched, name: false })
      }
    }
  }

  async function nonActive(val: boolean) {
    try {
      if (val) {
        setLoadingModal(true)
        const res = await funEditStatusGroup(id, { isActive: isActive });
        if (res.success) {
          toast.success(res.message);
          setOpenDrawerGroup(false);
          onUpdated(true);
        } else {
          toast.error(res.message)
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Edit grup gagal, coba lagi nanti");
    } finally {
      setLoadingModal(false)
      setModal(false);
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
              <FaToggleOff size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text c={tema.get().utama}>{isActive == false ? "Aktifkan" : "Non Aktifkan"}</Text>
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
              <FaPencil size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text c={tema.get().utama}>Edit</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutDrawer
        opened={openDrawerGroup}
        onClose={() => setOpenDrawerGroup(false)}
        title={"Edit Grup"}
      >
        <Box pos={"relative"} h={"28.5vh"}>
          <TextInput
            styles={{
              input: {
                color: tema.get().utama,
                borderRadius: tema.get().utama,
                borderColor: tema.get().utama,
              },
            }}
            size="md"
            value={name}
            onChange={(e) => {
              onValidation('name', e.target.value)
            }}
            error={
              touched.name &&
              (name == "" ? "Grup Tidak Boleh Kosong" :
                name.length < 3 ? "Masukkan Minimal 3 karakter" : ""
              )
            }
            radius={10}
            placeholder="Grup"
            label="Grup"
            required
          />
          <Box pos={"absolute"} bottom={10} left={0} right={0}>
            <Button
              c={"white"}
              bg={tema.get().utama}
              size="lg"
              radius={30}
              fullWidth
              onClick={() => { onCheck() }}
              loading={loading}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      </LayoutDrawer>

      <LayoutModal
        loading={loadingModal}
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
