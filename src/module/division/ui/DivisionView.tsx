'use client'
import { Carousel } from "@mantine/carousel";
import { Avatar, Box, Center, Flex, Grid, Image, Paper, ScrollArea, SimpleGrid, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import { MdAccountCircle, MdArrowForwardIos, MdCalendarMonth, MdEditCalendar, MdEditDocument, MdFileCopy, MdMessage, MdPeople, MdTimer, MdWhatsapp } from "react-icons/md";
import * as ICON from './../lib/file_icon'
import { WARNA } from "@/module/_global";
const listCaresoul = [
    {
        "id": "1",
        "title": "title 1",
        "description": "description 1",
        "image": "https://cdn.digitaldesa.com/uploads/landing/artikel/thumbs/360175162e868c7d0ae0dc7dbc62adf9.jpg",
    },
    {
        "id": "2",
        "title": "title 2",
        "description": "description 2",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxDUAjhyxqYuPigHXxQev_jX2zVqy9ULX5vQ&s",
    },
    {
        "id": "3",
        "title": "title 3",
        "description": "description 3",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxDUAjhyxqYuPigHXxQev_jX2zVqy9ULX5vQ&s",
    }
]

const listFeatures = [

    {
        "id": "1",
        "title": "tugas",
        "description": "description 1",
        "total": "10",
        "icon": MdEditDocument
    },
    {
        "id": "2",
        "title": "document",
        "description": "description 2",
        "total": "10",
        "icon": MdFileCopy
    },
    {
        "id": "3",
        "title": "diskusi",
        "description": "description 3",
        "total": "10",
        "icon": MdWhatsapp
    },
    {
        "id": "4",
        "title": "kalendar",
        "description": "kalendar",
        "total": "10",
        "icon": MdEditCalendar
    }
]

const iconContainer = (icon: string) => 'data:image/svg+xml;base64,' + btoa(icon)

const listDocument = [

    {
        "id": "1",
        "title": "image 1",
        "description": "description 1",
        "image": iconContainer(ICON.IMAGE),
    },
    {
        "id": "2",
        "title": "data pdf",
        "description": "description 2",
        "image": iconContainer(ICON.PDF),
    },
    {
        "id": "3",
        "title": "data pdf 3",
        "description": "description 3",
        "image": iconContainer(ICON.PDF),
    },
    {
        "id": "4",
        "title": "text 4",
        "description": "description 4",
        "image": iconContainer(ICON.TEXT),
    },
    {
        "id": "5",
        "title": "text 5",
        "description": "description 5",
        "image": iconContainer(ICON.TEXT),
    }
]

const listTugasHariIni = [

    {
        "id": "1",
        "title": "image 1",
        "description": "description 1",
        "image": iconContainer(ICON.IMAGE),
    },
    {
        "id": "2",
        "title": "data pdf",
        "description": "description 2",
        "image": iconContainer(ICON.PDF),
    },
    {
        "id": "3",
        "title": "data pdf 3",
        "description": "description 3",
        "image": iconContainer(ICON.PDF),
    },
    {
        "id": "4",
        "title": "text 4",
        "description": "description 4",
        "image": iconContainer(ICON.TEXT),
    },
]

const diskusiTerbaru = [

    {
        "id": "1",
        "title": "image 1",
        "user": "description 1",
        "date": "10-10-2022"
    },
    {
        "id": "2",
        "title": "data pdf",
        "user": "description 2",
        "date": "10-10-2022"
    },
    {
        "id": "3",
        "title": "data pdf 3",
        "user": "description 3",
        "date": "10-10-2022"
    },
    {
        "id": "4",
        "title": "text 4",
        "user": "description 4",
        "date": "10-10-2022"
    },
    {
        "id": "5",
        "title": "text 5",
        "user": "description 5",
        "date": "10-10-2022"
    }
]


export function DivisionView({ id }: { id: string }) {
    return (
        <Stack>
            <Carousel withIndicators height={200}>
                {listCaresoul.map((v) => <Carousel.Slide key={v.id} p={"md"}>
                    <Paper withBorder shadow="sm" radius={12}>
                        <Image src={v.image} alt="image" />
                    </Paper>
                </Carousel.Slide>)}
            </Carousel>
            <Stack p={"md"}>
                <Title order={4}>Features</Title>
                <SimpleGrid cols={2} spacing={"md"}>
                    {listFeatures.map((v) => <UnstyledButton key={v.id}>
                        <Paper withBorder radius={12} p={"sm"}>
                            <Grid >
                                <Grid.Col span={"content"}>
                                    <Avatar size={"lg"} bg={"#DCEED8"} color={WARNA.biruTua}>
                                        <v.icon size={"2.5rem"} />
                                    </Avatar>
                                </Grid.Col>
                                <Grid.Col span={"auto"}>
                                    <Stack gap={0}>
                                        <Box>
                                            <Title order={5}>{v.title}</Title>
                                        </Box>
                                        <Flex justify={"space-between"} align={"center"}>
                                            <Text size="sm" c="dimmed">{v.total} totall</Text>
                                            <MdArrowForwardIos />
                                        </Flex>
                                    </Stack>
                                </Grid.Col>
                            </Grid>
                        </Paper>
                    </UnstyledButton>)}
                </SimpleGrid>
            </Stack>
            <Stack p={"md"}>
                <Title order={4}>Tugas Hari Ini</Title>
                <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
                    {listTugasHariIni.map((v) => <Carousel.Slide key={v.id}>
                        <UnstyledButton>
                            <Paper withBorder shadow="sm" radius={12} p={"md"} w={300} bg={WARNA.biruTua}>
                                <Stack>
                                    <Title order={5} c={"white"} >{v.title}</Title>
                                    <Flex w={"100%"} justify={"space-between"} align={"center"}>
                                        <Flex gap={"sm"}>
                                            <MdCalendarMonth color={"white"} size={"1.5rem"} />
                                            <Text c={"white"}>{v.description}</Text>
                                        </Flex>
                                        <Avatar.Group>
                                            <Avatar size={"md"} >
                                                <MdAccountCircle size={"2.5rem"} />
                                            </Avatar>
                                            <Avatar size={"md"}>
                                                + 15
                                            </Avatar>
                                        </Avatar.Group>
                                    </Flex>
                                </Stack>
                            </Paper>
                        </UnstyledButton>
                    </Carousel.Slide>)}
                </Carousel>
            </Stack>
            <Stack p={"md"}>
                <Title order={4}>Document Terbaru</Title>
                <Carousel dragFree slideGap={"xs"} align="start" slideSize={"xs"} withIndicators withControls={false}>
                    {listDocument.map((v) => <Carousel.Slide key={v.id}>
                        <UnstyledButton>
                            <Stack gap={0}>
                                <Paper withBorder shadow="sm" radius={12} >
                                    <Center p={"md"}>
                                        <Image w={"75"} src={v.image} alt="image" />
                                    </Center>
                                </Paper>
                                <Box p={"sm"}>
                                    <Text c={"dimmed"}>{v.title}</Text>
                                </Box>
                            </Stack>
                        </UnstyledButton>
                    </Carousel.Slide>)}
                </Carousel>
            </Stack>
            <Stack p={"md"}>
                <Title order={4}>Diskusi Terbaru</Title>
                <Stack gap={"md"}>
                    {diskusiTerbaru.map((v) => <UnstyledButton key={v.id}>
                        <Paper withBorder radius={12} p={"md"}>
                            <Stack>
                                <Flex gap={"md"} align={"center"}>
                                    <MdMessage size={"1.5rem"} />
                                    <Title order={4}>{v.title}</Title>
                                </Flex>
                                <Flex justify={"space-between"} align={"center"}>
                                    <Flex gap={"xs"} align={"center"} c={"dimmed"}>
                                        <MdAccountCircle size={"1.5rem"} />
                                        <Text>{v.user}</Text>
                                    </Flex>
                                    <Flex gap={"xs"} align={"center"} c={"dimmed"}>
                                        <MdTimer size={"1.5rem"} />
                                        <Text>{v.date}</Text>
                                    </Flex>
                                </Flex>
                            </Stack>
                        </Paper>
                    </UnstyledButton>)}
                </Stack>
            </Stack>
        </Stack>
    )
}
