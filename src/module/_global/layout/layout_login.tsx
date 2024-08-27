import { Image, rem, Stack, Title } from "@mantine/core";
import React from "react";
import { WARNA } from "../fun/WARNA";

export default function LayoutLogin({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Stack justify="center" align="center" pt={rem(50)}>
        <Image w={102} h={103} src={"/assets/img/logo/logo-1.png"} alt="logo" />
        <Title c={WARNA.biruTua} order={4}>
          PERBEKEL DARMASABA
        </Title>
      </Stack>
      {children}
    </>
  );
}
