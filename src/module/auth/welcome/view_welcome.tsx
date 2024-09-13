"use client";
import {
  Anchor,
  Box,
  Button,
  Center,
  Flex,
  Group,
  Image,
  Stack,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { WARNA } from "@/module/_global";

const listTextWellcome = [
  {
    id: "1",
    text: "Selamat Datang di Aplikasi Desa Darmasaba Optimalkan Kegiatan Desa dengan Fitur Kolaboratif Manajemen Kegiatan yang Efisien untuk Masa Depan Yang Lebih Baik",
    img: "/assets/img/welcome/wellcome-1.png",
  },
  {
    id: "2",
    text: "Monitor Progres Tugas Secara Real-time Kolaborasi Tim yang Dinamis untuk Sukses Bersama Perencanaan Tugas yang Terstruktur untuk Pertumbuhan Desa",
    img: "/assets/img/welcome/wellcome-2.png",
  },
  {
    id: "3",
    text: "Mulai Membangun Desa dengan Teknologi Canggih Manfaatkan Fitur Analytics untuk Keputusan yang Lebih Baik Selamat Bergabung di Komunitas Desa Darmasaba yang Progresif",
    img: "/assets/img/welcome/wellcome-3.png",
  },
];

export function ViewWelcome() {
  const [index, setIndex] = useState(0);
  const router = useRouter();

  function onLanjutkan() {
    if (index === listTextWellcome.length - 1) {
      return router.replace("/home");
      // return window.location.href = "/home"
    }
    setIndex(index + 1);
  }

  function onSebelumnya() {
    if (index === 0) {
      return;
    }
    setIndex(index - 1);
  }
  return (
    <Stack>
      <Flex justify={'right'} mr={30} mt={20}>
        <Anchor onClick={() => router.replace("/home")}>Lewati</Anchor>
      </Flex>

      <Stack gap={"xl"} p={"xl"} pt={50}>
        <WelcomeItem index={index} listTextWellcome={listTextWellcome} />
      </Stack>
      <Flex
        w={"100%"}
        pos={"absolute"}
        bottom={0}
        justify={"space-between"}
        left={0}
        right={0}
        p={"xl"}
        align={"center"}
        maw={550}
        m={"0 auto"}
      >
        <Button
          display={index === 0 ? "none" : "block"}
          onClick={onSebelumnya}
          radius={100}
          size="md"
          color={WARNA.biruTua}
        >
          Sebelumnya
        </Button>
        <Text>
          {index + 1}/{listTextWellcome.length}
        </Text>
        <Button
          onClick={onLanjutkan}
          radius={100}
          size="md"
          color={WARNA.biruTua}
        >
          Lanjutkan
        </Button>
      </Flex>
    </Stack>
  );
}

function WelcomeItem({
  index,
  listTextWellcome,
}: {
  index: number;
  listTextWellcome: any[];
}) {
  return (
    <Stack align="center" justify="center">
      <Center>
        <Image
          w={"90%"}
          src={listTextWellcome[index].img}
          alt="gambar wellcome"
        />
      </Center>
      <Text
        style={{
          textAlign: "center",
        }}
      >
        {listTextWellcome[index].text}
      </Text>
    </Stack>
  );
}
