import { ViewCreateTaskDivision } from "@/module/division_new";
import { ViewDateEndTask, CreateUsersProject, ViewFileSave } from "@/module/project";

function Page({ searchParams }: { searchParams: any }) {
   if (searchParams.page == "task")
      return <ViewDateEndTask kategori="task"/>;
   if (searchParams.page == "create-users")
      return <CreateUsersProject kategori="task"/>
   if (searchParams.page == "file-save")
      return <ViewFileSave kategori="task"/>

   return <ViewCreateTaskDivision searchParams={searchParams} />
}

export default Page