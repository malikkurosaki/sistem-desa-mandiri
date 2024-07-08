'use client'

import { Box } from "@mantine/core"
import _ from "lodash"
import { DivisionCreate } from "../ui/DivisionCreate"
import { DivisionFilter } from "../ui/DivisionFilter"
import { DivisionReport } from "../ui/DivisionReport"
import { HeadDivision } from "./HeadDivision"
import { ListWithSearch } from "./ListWithSearch"
import { DivisionView } from "../ui/DivisionView"


const listPage = ["division", "division-create", "division-filter", "division-report"]
export function ContainerDevision({ params, searchParams, list_devision, countDevision }: { params: any, searchParams: any, list_devision: any[], countDevision: any }) {
    const page = searchParams.page || "division"
    const division = list_devision.map((v) => ({ ...v, name: _.kebabCase(v.name) })).find((v) => v.name === page) || null
    return <Box>
        <HeadDivision title={page} />
        {/* {JSON.stringify(division)} */}
        {page === "division" && <ListWithSearch count={countDevision} listData={list_devision} />}
        {page === "division-create" && <DivisionCreate />}
        {page === "division-filter" && <DivisionFilter />}
        {page === "division-report" && <DivisionReport />}
        {division && division.name === page && <DivisionView id={division.id} />}
    </Box>
}