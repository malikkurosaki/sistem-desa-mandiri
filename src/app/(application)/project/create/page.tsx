import { CreateProject, ViewFileSave } from "@/module/project";
import React from "react";

function Page({ searchParams }: { searchParams: any }) {

  if (searchParams.page == "file-save")
    return <ViewFileSave kategori="project" />

  return <CreateProject />;
}

export default Page;
