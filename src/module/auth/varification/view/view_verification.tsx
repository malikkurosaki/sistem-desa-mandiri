"use client";
import { LayoutLogin, WARNA } from "@/module/_global";
import { IVerification } from "@/types";
import { Anchor, Box, Button, Group, PinInput, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import funSetCookies from "../../api/funSetCookies";

export default function ViewVerification({ phone, otp, user }: IVerification) {
  const router = useRouter()
  const [isOTP, setOTP] = useState(otp)
  const [inputOTP, setInputOTP] = useState<any>()
  const [isLoading, setLoading] = useState(false)

  async function onResend() {
    const code = Math.floor(Math.random() * 1000) + 1000

    const res = await fetch(`https://wa.wibudev.com/code?nom=${phone}&text=${code}`)
      .then(
        async (res) => {
          if (res.status == 200) {
            toast.success('Kode verifikasi telah dikirim')
            setOTP(code)
          } else {
            toast.error('Internal Server Error')
          }
        }
      );
  }

  async function getVerification() {
    setLoading(true)
    if (isOTP == inputOTP) {
      const setCookies = await funSetCookies({ user: user })

      if (setCookies.success) {
        toast.success(setCookies.message)
        if (setCookies.pertamaLogin == true)
          return router.replace('/welcome')
        console.log(setCookies.pertamaLogin)
        return router.replace('/home')
      } else {
        toast.error(setCookies.message)
      }

      setLoading(false)

    } else {
      toast.error("Kode verifikasi salah")
      setLoading(false)
    }
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
                {'+' + phone}
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
                  onChange={(val) => {
                    setInputOTP(val)
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
                  loading={isLoading}
                  onClick={() => { getVerification() }}
                >
                  Lanjut
                </Button>
              </Box>
              <Group justify="center" mt={5}>
                <Text fz={12} c={WARNA.biruTua}>
                  Tidak menerima kode verifikasi? {""}
                  <Anchor c={WARNA.biruTua}
                    fz={12}
                    onClick={() => { onResend() }}
                  >
                    Kirim Ulang
                  </Anchor>
                </Text>
              </Group>
            </Box>
          </Stack>
        </LayoutLogin>
      </Box>
    </>
  );
}
