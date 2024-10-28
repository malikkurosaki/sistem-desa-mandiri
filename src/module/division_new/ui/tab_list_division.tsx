"use client";
import { globalRole, TEMA } from "@/module/_global";
import { useHookstate } from "@hookstate/core";
import { Box, rem, Tabs } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import ListDivision from "./list_division";

export default function TabListDivision() {
   const iconStyle = { width: rem(20), height: rem(20) };
   const router = useRouter();
   const searchParams = useSearchParams();
   const status = searchParams.get("active");
   const group = searchParams.get("group");
   const tema = useHookstate(TEMA)
   const roleLogin = useHookstate(globalRole)

   return (
      <Box p={20}>
         <Tabs
            variant="pills"
            color={tema.get().bgFiturHome}
            radius="xl"
            defaultValue={status == "false" ? "false" : "true"}
         >
            {
               roleLogin.get() != '' ?
                  (roleLogin.get() != "user" && roleLogin.get() != "coadmin") &&
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
                           router.push("/division?active=true&group=" + group);
                        }}
                     >
                        Aktif
                     </Tabs.Tab>
                     <Tabs.Tab
                        value="false"
                        w={"53%"}
                        leftSection={<IoCloseCircleOutline style={iconStyle} />}
                        onClick={() => {
                           router.push("/division?active=false&group=" + group);
                        }}
                     >
                        Tidak Aktif
                     </Tabs.Tab>
                  </Tabs.List>
                  : <></>
            }
            <ListDivision />
         </Tabs>
      </Box>
   );
}
