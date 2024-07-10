import { CreateUsersProject, ViewCreateProject, ViewDateEndTask, ViewFileSave } from "@/module/project";
import React from "react";

function Page({ searchParams }: { searchParams: any }) {
  if (searchParams.page == "task")
    return <ViewDateEndTask />;
  if (searchParams.page == "create-users")
    return <CreateUsersProject />
  if (searchParams.page == "file-save")
    return <ViewFileSave />

  return <ViewCreateProject searchParams={searchParams} />;
}

export default Page;
