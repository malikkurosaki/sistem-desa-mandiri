import { LayoutDrawer, TEMA, WARNA } from "@/module/_global";
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
import { IoAddCircle } from "react-icons/io5";
import { funCreateGroup } from "../lib/api_group";
import toast from "react-hot-toast";
import { useHookstate } from "@hookstate/core";

export default function DrawerGroup({ onSuccess, }: { onSuccess: (val: boolean) => void; }) {
  const [openDrawerGroup, setOpenDrawerGroup] = useState(false);
  const [namaGroup, setNamaGroup] = useState("");
  const tema = useHookstate(TEMA)
  const [touched, setTouched] = useState({
    name: false,
  });


  async function createData() {
    try {
      const response = await funCreateGroup({ name: namaGroup })

      if (response.success) {
        toast.success(response.message);
        setOpenDrawerGroup(false)
        onSuccess(true)
      } else {
        toast.error(response.message)
      }

    } catch (error) {
      console.error(error);
      toast.error("Gagal menambahkan grup, coba lagi nanti");
    }
  }

  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 2, sm: 3, lg: 3 }}
          onClick={() => setOpenDrawerGroup(true)}
        >
          <Flex justify={"center"} align={"center"} direction={"column"}>
            <Box>
              <IoAddCircle size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text c={tema.get().utama}>Tambah Grup</Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutDrawer
        opened={openDrawerGroup}
        onClose={() => setOpenDrawerGroup(false)}
        title={"Tambah Grup"}
      >
        <Box pt={10}>
          <TextInput
            styles={{
              input: {
                color: tema.get().utama,
                borderRadius: tema.get().utama,
                borderColor: tema.get().utama,
              },
            }}
            size="lg"
            radius={10}
            label="Grup"
            required
            placeholder="Grup"
            onChange={(e) => {
              setNamaGroup(e.target.value)
              setTouched({ ...touched, name: false })
            }}
            error={touched.name ? "Error! harus memasukkan grup" : ""}
            onBlur={() => setTouched({ ...touched, name: true })}
          />
          <Box mt={"xl"}>
            <Button
              c={"white"}
              bg={tema.get().utama}
              size="lg"
              radius={30}
              fullWidth
              onClick={createData}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      </LayoutDrawer>
    </Box>
  );
}
