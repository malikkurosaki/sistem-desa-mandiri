"use client"
import { LayoutLogin, WARNA } from "@/module/_global";
import {
  Box,
  Button,
  Checkbox,
  Image,
  rem,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import ViewVerification from "../../varification/view/view_verification";
import { useFocusTrap } from "@mantine/hooks";

function ViewLogin() {
  const focusTrapRef = useFocusTrap()
  const router = useRouter()
  const textInfo =
    "Kami akan mengirim kode verifikasi melalui WhatsApp, guna mengonfirmasikan nomor Anda.";

  const [isPhone, setPhone] = useState("")
  const [isOTP, setOTP] = useState<any>(null)
  const [isValPhone, setValPhone] = useState<any>(null)
  const [isUser, setUser] = useState<any>(null)
  const [isVerif, setVerif] = useState(false)
  const [isLoading, setLoading] = useState(false)

  async function onLogin() {
    if (isPhone == "")
      return toast.error('Please fill in completely')
    const cek = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ phone: isPhone })
    })
    const json = await cek.json()
    console.log(json)

    const code = Math.floor(Math.random() * 1000) + 1000

    setLoading(true)
    const res = await fetch(`https://wa.wibudev.com/code?nom=${json.phone}&text=${code}`).then(
      async (res) => {
        if (res.status == 200) {
          setValPhone(json.phone)
          setOTP(code)
          setUser(json.id)
          setVerif(true)
          setLoading(false)
          toast.success('OTP sent successfully')
        } else {
          toast.error('OTP not sent')
          setLoading(false)
        }
        console.log("code", code)
      }
    )


  }

  if (isVerif) return <ViewVerification otp={isOTP} phone={isValPhone} user={isUser} />

  return (
    <>
      <Box p={10}>
        <LayoutLogin>
          <Stack pt={30}>
            <Box p={10} ref={focusTrapRef}>
              <TextInput
                styles={{
                  input: {
                    color: WARNA.biruTua,
                    borderRadius: WARNA.biruTua,
                    borderColor: WARNA.biruTua,
                  },
                }}
                size="md"
                type="number"
                radius={30}
                leftSection={<Text>+62</Text>}
                placeholder="XXX XXX XXX"
                onChange={(val) => { setPhone(val.target.value) }}
              />
              <Text fz={10} mt={10} c={WARNA.biruTua}>
                {textInfo}
              </Text>
              <Checkbox
                mt={20}
                label={
                  <Text fz={10} c={WARNA.biruTua}>
                    Ingat saya
                  </Text>
                }
              />
              <Box mt={20}>
                <Button
                  c={"white"}
                  bg={WARNA.biruTua}
                  size="md"
                  radius={30}
                  fullWidth
                  loading={isLoading}
                  onClick={() => {
                    onLogin()
                  }}
                >
                  MASUK
                </Button>
              </Box>
            </Box>
          </Stack>
        </LayoutLogin>
      </Box>
    </>
  );
}

export default ViewLogin;
