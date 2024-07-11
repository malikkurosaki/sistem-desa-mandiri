"use client";
import { LayoutNavbarNew, WARNA } from "@/module/_global";
import {
    Avatar,
    Box,
    Button,
    Flex,
    Group,
    Select,
    Stack,
    Text,
    Textarea,
    TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";
import { IoIosArrowDropright } from "react-icons/io";
const dataUser = [
    {
        id: 1,
        img: "https://i.pravatar.cc/1000?img=3",
        name: "Doni Setiawan",
    },
    {
        id: 2,
        img: "https://i.pravatar.cc/1000?img=10",
        name: "Ilham Udin",
    },
    {
        id: 3,
        img: "https://i.pravatar.cc/1000?img=11",
        name: "Didin Anang",
    },
    {
        id: 4,
        img: "https://i.pravatar.cc/1000?img=21",
        name: "Angga Saputra",
    },
    {
        id: 5,
        img: "https://i.pravatar.cc/1000?img=32",
        name: "Marcel Widianto",
    },
    {
        id: 6,
        img: "https://i.pravatar.cc/1000?img=37",
        name: "Bagas Nusantara",
    },
];

export default function CreateDivision() {
    const router = useRouter();
    return (
        <Box>
            <LayoutNavbarNew back="/division" title="Tambah Divisi" menu />
            <Box p={20}>
                <Stack>
                    <Select
                        placeholder="Grup"
                        label="Grup"
                        size="md"
                        required
                        radius={40}
                    />
                    <TextInput
                        placeholder="Judul"
                        label="Judul"
                        size="md"
                        required
                        radius={40}
                    />
                    <Textarea placeholder="Deskripsi" label="Deskripsi" radius={10} />
                    <Box onClick={() => router.push("/division/create?page=anggota")}>
                        <Group
                            justify="space-between"
                            p={10}
                            style={{
                                border: `1px solid ${"#D6D8F6"}`,
                                borderRadius: 10,
                            }}
                        >
                            <Text>Tambah Anggota</Text>
                            <IoIosArrowDropright size={25} />
                        </Group>
                    </Box>
                    <Box pt={20}>
                        <Group justify="space-between">
                            <Text c={WARNA.biruTua}>Anggota Terpilih</Text>
                            <Text c={WARNA.biruTua}>Total 10 Anggota</Text>
                        </Group>
                        <Box pt={10}>
                            <Box mb={20}>
                                <Box
                                    style={{
                                        border: `1px solid ${"#C7D6E8"}`,
                                        borderRadius: 10,
                                    }}
                                    px={20}
                                    py={10}
                                >
                                    {dataUser.map((v, i) => {
                                        return (
                                            <Flex
                                                justify={"space-between"}
                                                align={"center"}
                                                mt={20}
                                                key={i}
                                            >
                                                <Group>
                                                    <Avatar src={v.img} alt="it's me" size="lg" />
                                                    <Box>
                                                        <Text c={WARNA.biruTua} fw={"bold"}>
                                                            {v.name}
                                                        </Text>
                                                    </Box>
                                                </Group>
                                                <Text c={WARNA.biruTua} fw={"bold"}>
                                                    Anggota
                                                </Text>
                                            </Flex>
                                        );
                                    })}
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                    <Box mt="xl">
                        <Button
                            color="white"
                            bg={WARNA.biruTua}
                            size="lg"
                            radius={30}
                            fullWidth
                            onClick={() => router.push("/division/create?page=pilih-admin")}
                        >
                            Simpan
                        </Button>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
}
