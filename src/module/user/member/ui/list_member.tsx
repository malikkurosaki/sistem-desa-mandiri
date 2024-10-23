"use client";
import { TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Box, rem, Tabs } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import TabListMember from "./tab_list_member";

export default function ListMember() {
  const iconStyle = { width: rem(20), height: rem(20) };
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("active");
  const group = searchParams.get("group");
  const tema = useHookstate(TEMA)

  return (
    <Box p={20}>
      <Tabs
        variant="pills"
        color={tema.get().bgFiturHome}
        radius="xl"
        defaultValue={status == "false" ? "false" : "true"}
      >
        <Tabs.List
          bg={"white"}
          style={{
            border: `1px solid ${"#EDEDED"}`,
            padding: 5,
            borderRadius: 100,
          }}
        >
          <Tabs.Tab
            value="true"
            w={"45%"}
            leftSection={<IoMdCheckmarkCircleOutline style={iconStyle} />}
            onClick={() => {
              router.push("/member?active=true&group=" + group);
            }}
          >
            Aktif
          </Tabs.Tab>
          <Tabs.Tab
            value="tidak-aktif"
            w={"53%"}
            leftSection={<IoCloseCircleOutline style={iconStyle} />}
            onClick={() => {
              router.push("/member?active=false&group=" + group);
            }}
          >
            Tidak Aktif
          </Tabs.Tab>
        </Tabs.List>
        <TabListMember />
      </Tabs>
    </Box>
  );
}
