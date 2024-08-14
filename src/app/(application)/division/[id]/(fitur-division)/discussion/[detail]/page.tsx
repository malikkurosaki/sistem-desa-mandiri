import { DetailDiscussion } from "@/module/discussion"


function Page({ params }: { params: { detail: string } }) {
   return (
      <DetailDiscussion id={params.detail} />
   )
}

export default Page