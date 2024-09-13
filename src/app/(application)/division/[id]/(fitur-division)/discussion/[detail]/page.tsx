import { DetailDiscussion } from "@/module/discussion"


function Page({ params}: { params: { detail: string, id: string } }) {
   return (
      <DetailDiscussion id={params.detail} idDivision={params.id} />
   )
}

export default Page