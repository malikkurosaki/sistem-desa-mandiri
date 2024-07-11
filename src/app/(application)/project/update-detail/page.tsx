import {
  DetailCreateUserProject,
  DetailDateEndTask,
  FileUploadProgres,
  ViewUpdateProgres,
} from "@/module/project";

import React from "react";

function Page({ searchParams }: { searchParams: any }) {
  if (searchParams.page == "upload-progres") return <FileUploadProgres />;
  if (searchParams.page == "detail-create-user")
    return <DetailCreateUserProject />;
  if (searchParams.page == "detail-date-task") return <DetailDateEndTask />;

  return <ViewUpdateProgres searchParams={searchParams} />;
}

export default Page;
