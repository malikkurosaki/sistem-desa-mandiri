"use client"
import { LayoutLogin, WARNA } from "@/module/_global";
import { Box, Button, Stack, Text, TextInput } from "@mantine/core";
import { useFocusTrap } from "@mantine/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import ViewVerification from "../../varification/view/view_verification";

function ViewLogin() {
  const focusTrapRef = useFocusTrap()
  const textInfo = "Kami akan mengirimkan kode verifikasi melalui WhatsApp untuk mengonfirmasi nomor Anda.";
  const [isPhone, setPhone] = useState("")
  const [isOTP, setOTP] = useState<any>(null)
  const [isValPhone, setValPhone] = useState<any>(null)
  const [isUser, setUser] = useState<any>(null)
  const [isVerif, setVerif] = useState(false)
  const [isLoading, setLoading] = useState(false)

  async function onLogin() {
    if (isPhone == "")
      return toast.error('Silakan diisi dengan lengkap')

    if (isPhone.toString().length <= 11)
      return toast.error('Nomor telepon tidak valid')

    try {
      setLoading(true)
      const cek = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ phone: isPhone })
      })
      const cekLogin = await cek.json()
      if (cekLogin.success) {
        const code = Math.floor(Math.random() * 1000) + 1000
        try {
          const res = await fetch(`https://wa.wibudev.com/code?nom=${cekLogin.phone}&text=*DARMASABA*%0A%0A
            JANGAN BERIKAN KODE RAHASIA ini kepada siapa pun TERMASUK PIHAK DARMASABA. Masukkan otentikasi:  *${encodeURIComponent(code)}*`).then(
            async (res) => {
              if (res.status == 200) {
                setValPhone(cekLogin.phone)
                setOTP(code)
                setUser(cekLogin.id)
                setVerif(true)
                toast.success('Kode verifikasi telah dikirim')
              } else {
                console.error(res.status)
                toast.error('Internal Server Error')
              }
            }
          )
        } catch (error) {
          console.error(error)
          toast.error('Internal Server Error')
        }
      } else {
        return toast.error(cekLogin.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('Internal Server Error')
    } finally {
      setLoading(false)
    }



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
                onChange={(val) => { setPhone('62' + val.target.value) }}
              />
              <Text fz={10} mt={10} c={WARNA.biruTua}>
                {textInfo}
              </Text>
              {/* <Checkbox
                mt={20}
                label={
                  <Text fz={10} c={WARNA.biruTua}>
                    Ingat saya
                  </Text>
                }
              /> */}
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
