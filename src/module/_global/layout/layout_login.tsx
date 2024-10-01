import { Image, rem, Stack, Title } from "@mantine/core";
import React from "react";
import { WARNA } from "../fun/WARNA";
import { useHookstate } from "@hookstate/core";
import { TEMA } from "../bin/val_global";

export default function LayoutLogin({
  children,
}: {
  children: React.ReactNode;
  }) {
    const tema = useHookstate(TEMA)
  return (
    <>
      <Stack justify="center" align="center" pt={rem(50)}>
        <Image w={102} h={103} src={"/assets/img/logo/logo-1.png"} alt="logo" />
        <Title c={tema.get().utama} order={4}>
          PERBEKEL DARMASABA
        </Title>
      </Stack>
      {children}
    </>
  );
}
