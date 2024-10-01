import { LayoutDrawer, TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import {
  Box,
  Button,
  Flex,
  SimpleGrid,
  Stack,
  Text,
  TextInput
} from "@mantine/core";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoAddCircle } from "react-icons/io5";
import { funCreateGroup } from "../lib/api_group";
import { globalRefreshGroup } from "../lib/val_group";

export default function DrawerGroup({ onSuccess, }: { onSuccess: (val: boolean) => void; }) {
  const [openDrawerGroup, setOpenDrawerGroup] = useState(false);
  const [namaGroup, setNamaGroup] = useState("");
  const tema = useHookstate(TEMA)
  const refresh = useHookstate(globalRefreshGroup)
  const [touched, setTouched] = useState({
    name: false,
  });


  async function createData() {
    try {
      const response = await funCreateGroup({ name: namaGroup })

      if (response.success) {
        toast.success(response.message);
        refresh.set(!refresh.get())
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

  function onCheck() {
    if (Object.values(touched).some((v) => v == true))
      return false
    createData()
  }

  function onValidation(kategori: string, val: string) {
    if (kategori == 'name') {
      setNamaGroup(val)
      if (val == "" || val.length < 3) {
        setTouched({ ...touched, name: true })
      } else {
        setTouched({ ...touched, name: false })
      }
    } 
  }

  return (
    <Box>
      <Stack pt={10}>
        <SimpleGrid
          cols={{ base: 3, sm: 3, lg: 3 }}
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
              onValidation('name', e.target.value)
            }}
            error={
              touched.name &&
              (namaGroup == "" ? "Error! harus memasukkan grup" :
                namaGroup.length < 3 ? "Masukkan Minimal 3 karakter" : ""
              )
            }
          />
          <Box mt={"xl"}>
            <Button
              c={"white"}
              bg={tema.get().utama}
              size="lg"
              radius={30}
              fullWidth
              onClick={() => { onCheck() }}
            >
              Simpan
            </Button>
          </Box>
        </Box>
      </LayoutDrawer>
    </Box>
  );
}
