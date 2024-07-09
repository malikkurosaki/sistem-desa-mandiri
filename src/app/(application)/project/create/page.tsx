import { ViewCreateProject, ViewDateEndTask } from "@/module/project";
import React from "react";

function Page({ searchParams }: { searchParams: any }) {
  if (searchParams.page == "task")
    return <ViewDateEndTask />;

  return <ViewCreateProject />;
}

export default Page;
