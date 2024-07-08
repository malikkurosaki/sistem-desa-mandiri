import { WARNA } from "@/module/_global";
import { Stack, Box, Title, Group, Text, UnstyledButton } from "@mantine/core";
import { MorePeopleIcon } from "./MorePeopleIcon";
import { pagePathTestDivision } from "@/lib/pagePath";
import _ from "lodash";

export function ViewGrid({ v }: { v: any }) {
    return (
        <UnstyledButton onClick={() => {
            window.location.href = pagePathTestDivision({ searchParams: { page: _.kebabCase(v.name) } })
        }}>
            <Stack gap={0}>
                <Box style={{
                    borderTopLeftRadius: 8,
                    borderTopRightRadius: 8
                }} p={"xl"} bg={WARNA.biruTua}>
                    <Title style={{
                        textAlign: "center"
                    }} order={3} c={WARNA.bgWhite}>{v.name}</Title>
                </Box>
                <Box style={{
                    border: "1px solid " + WARNA.biruTua,
                    borderBottomLeftRadius: 8,
                    borderBottomRightRadius: 8
                }} p={"md"}>
                    <Stack>
                        <Text pr={100}>{v.desc}</Text>
                        <Group justify="end">
                            <MorePeopleIcon />
                        </Group>
                    </Stack>
                </Box>
            </Stack>
        </UnstyledButton>
    );
}