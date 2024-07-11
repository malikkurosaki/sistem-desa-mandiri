import { ViewUpdateProgressDivisionTask } from "@/module/division_new"
import { DetailCreateUserProject, DetailDateEndTask, FileUploadProgres } from "@/module/project";

function Page({ searchParams }: { searchParams: any }) {
   if (searchParams.page == "upload-progres") return <FileUploadProgres />;
   if (searchParams.page == "detail-create-user")
      return <DetailCreateUserProject />;
   if (searchParams.page == "detail-date-task") return <DetailDateEndTask />;
   
   return (
      <ViewUpdateProgressDivisionTask searchParams={searchParams}/>
   )
}

export default Page