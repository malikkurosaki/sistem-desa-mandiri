import { CreateUsersProject, ViewCreateProject, ViewDateEndTask, ViewFileSave } from "@/module/project";
import React from "react";

function Page({ searchParams }: { searchParams: any }) {
  if (searchParams.page == "task")
    return <ViewDateEndTask kategori="project" />;
  if (searchParams.page == "create-users")
    return <CreateUsersProject kategori="project" />
  if (searchParams.page == "file-save")
    return <ViewFileSave kategori="project" />

  return <ViewCreateProject searchParams={searchParams} />;
}

export default Page;
