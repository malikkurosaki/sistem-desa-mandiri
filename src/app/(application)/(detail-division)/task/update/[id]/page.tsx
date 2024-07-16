import { ViewUpdateProgressDivisionTask } from "@/module/division_new"
import { DetailCreateUserProject, DetailDateEndTask, FileUploadProgres } from "@/module/project";

function Page({ searchParams }: { searchParams: any }) {
   if (searchParams.page == "upload-progres") return <FileUploadProgres kategori="task" />;
   if (searchParams.page == "detail-create-user")
      return <DetailCreateUserProject kategori="task" />;
   if (searchParams.page == "detail-date-task") return <DetailDateEndTask kategori="task" />;

   return (
      <ViewUpdateProgressDivisionTask searchParams={searchParams} />
   )
}

export default Page