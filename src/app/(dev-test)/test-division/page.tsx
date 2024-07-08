
import { DivisionPage } from "@/module/division/ui/DivisionPage";
import { SimpleGrid, Skeleton, Stack } from "@mantine/core";
import { Suspense } from "react";

export default function Page({ params, searchParams }: { params: any, searchParams: any }) {

    return <Suspense fallback={<Stack gap={"md"} p={"md"}>
        <Skeleton h={75} />
        <Skeleton h={100} />
        <SimpleGrid cols={4} spacing={"md"}>
            <Skeleton h={75} />
            <Skeleton h={75} />
            <Skeleton h={75} />
            <Skeleton h={75} />
        </SimpleGrid>
        <Skeleton h={100} />
        <Skeleton h={100} />
    </Stack>}>
        <DivisionPage params={params} searchParams={searchParams} />
    </Suspense>
}