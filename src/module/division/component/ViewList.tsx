import { pagePathTestDivision } from "@/lib/pagePath";
import { Avatar, Flex, Stack, Text, Title, UnstyledButton } from "@mantine/core";
import _ from "lodash";
import { MdPeople } from "react-icons/md";

export function ViewList({ v }: { v: any }) {
    return (
        <UnstyledButton onClick={() => {
            window.location.href = pagePathTestDivision({ searchParams: { page: _.kebabCase(v.name) } })
        }}>
            <Stack py={"md"} style={{
                borderBottom: "0.5px solid " + "gray"
            }}>
                <Flex gap={"md"} align={"center"}>
                    <Avatar bg={"orange"} color="white">
                        <MdPeople size={32} />
                    </Avatar>
                    <Text fw={"bold"}>{v.name}</Text>
                </Flex>
            </Stack>
        </UnstyledButton>
    )
}