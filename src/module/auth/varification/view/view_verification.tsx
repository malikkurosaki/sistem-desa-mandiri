"use client";
import { LayoutLogin, WARNA } from "@/module/_global";
import { Box, Button, PinInput, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

export default function ViewVerification() {
  const router = useRouter();

  function onNext() {
    // router.push("/welcome");
    window.location.href = "/welcome"
  }
  return (
    <>
      <Box p={10}>
        <LayoutLogin>
          <Stack pt={30}>
            <Box p={10}>
              <Title order={5} c={WARNA.biruTua}>
                Verifikasi Nomor Telepon
              </Title>
              <Text fz={12} c={WARNA.biruTua}>
                Masukkan kode yang kami kirimkan melalui WhatsApp
              </Text>
              <Text fz={12} c={WARNA.biruTua} fw={"bold"}>
                +6287701790942
              </Text>
              <Box pt={30}>
                <PinInput
                  style={{ justifyContent: "center" }}
                  placeholder=""
                  size="lg"
                  styles={{
                    input: {
                      color: WARNA.biruTua,
                      // backgroundColor: WARNA.biruTua,
                      borderRadius: 15,
                      borderColor: WARNA.biruTua,
                    },
                  }}
                />
              </Box>
              <Box mt={40}>
                <Button
                  c={"white"}
                  bg={WARNA.biruTua}
                  size="md"
                  radius={30}
                  fullWidth
                  onClick={onNext}
                >
                  Lanjut
                </Button>
              </Box>
            </Box>
          </Stack>
        </LayoutLogin>
      </Box>
    </>
  );
}
