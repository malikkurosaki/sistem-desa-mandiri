import { CreateTask, FileSave } from "@/module/task";

function Page({ searchParams }: { searchParams: any }) {

   // if (searchParams.page == "file-save")
   //    return <FileSave kategori="task" />

   return <CreateTask />
}

export default Page