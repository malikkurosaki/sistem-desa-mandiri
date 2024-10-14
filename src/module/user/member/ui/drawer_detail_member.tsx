"use client";
import { keyWibu, TEMA } from "@/module/_global";
import LayoutModal from "@/module/_global/layout/layout_modal";
import { useHookstate } from "@hookstate/core";
import { Box, Flex, SimpleGrid, Stack, Text } from "@mantine/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaPencil, FaToggleOff } from "react-icons/fa6";
import { useWibuRealtime } from "wibu-realtime";
import { funEditStatusMember } from "../lib/api_member";

export default function DrawerDetailMember({ onDeleted, id, status, }: { onDeleted: (val: boolean) => void; id: string; status: boolean; }) {
  const router = useRouter();
  const [isModal, setModal] = useState(false);
  const tema = useHookstate(TEMA)
  const [dataRealTime, setDataRealtime] = useWibuRealtime({
    WIBU_REALTIME_TOKEN: keyWibu,
    project: "sdm"
  })

  async function nonActive(val: boolean) {
    try {
      if (val) {
        const res = await funEditStatusMember(id, {
          isActive: status ? true : false,
        });
        if (res.success) {
          setDataRealtime([{
            category: "data-member",
            group: res.data.idGroup,
          }])
          toast.success(res.message);
          router.push("/member?active=true");
          onDeleted(true);
        } else {
          onDeleted(false);
        }
      }
      setModal(false);
    } catch (error) {
      console.error(error);
      setModal(false);
      toast.error("Terjadi kesalahan");
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
            style={{ cursor: "pointer" }}
            onClick={() => {
              setModal(true);
            }}
          >
            <Box>
              <FaToggleOff size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text c={tema.get().utama} ta="center">
                {" "}
                {status === false ? "Aktifkan" : "Non Aktifkan"}
              </Text>
            </Box>
          </Flex>

          <Flex
            justify={"center"}
            align={"center"}
            direction={"column"}
            style={{ cursor: "pointer" }}
            onClick={() => {
              router.push(`/member/edit/${id}`);
            }}
          >
            <Box>
              <FaPencil size={30} color={tema.get().utama} />
            </Box>
            <Box>
              <Text c={tema.get().utama} ta="center">
                Edit
              </Text>
            </Box>
          </Flex>
        </SimpleGrid>
      </Stack>
      <LayoutModal
        opened={isModal}
        onClose={() => setModal(false)}
        description="Apakah Anda yakin ingin mengubah status aktifasi anggota?"
        onYes={(val) => {
          nonActive(val);
        }}
      />
    </Box>
  );
}
