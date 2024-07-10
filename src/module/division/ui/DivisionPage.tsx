
import { getCountDivision } from "@/module/division/lib/division/get_count_devision";
import { getListDevision } from "@/module/division/lib/division/get_list_devision";
import { ContainerDevision } from "../component/ContainerDivision";
import { WebVitals } from "../lib/WebVitals";
import { ProviderTestDevisionListAnggota, ProviderTestDevisionListDivision, ProviderTestDevisionListGroup } from "@/lib/stateApi";
import { getListGroup } from "../lib/division/get_list_group";
import { getListAnggota } from "../lib/division/get_list_anggota";
export async function DivisionPage({ params, searchParams }: { params: any, searchParams: any }) {
    const list_devision = await getListDevision();
    const countDevision = await getCountDivision()
    const listGroup = await getListGroup()
    const listAnggota = await getListAnggota()
    return <div>
        <WebVitals searchParams={searchParams} />
        <ProviderTestDevisionListDivision data={list_devision} />
        <ProviderTestDevisionListGroup data={listGroup} />
        <ProviderTestDevisionListAnggota data={listAnggota} />
        <ContainerDevision params={params} searchParams={searchParams} list_devision={list_devision} countDevision={countDevision} />
    </div>
}