import {
  DetailCreateUserProject,
  DetailDateEndTask,
  EditDetailTaskProject,
  FileUploadProgres,
  ViewUpdateProgres,
} from "@/module/project";

import React from "react";

function Page({ searchParams }: { searchParams: any }) {
  // if (searchParams.page == "upload-progres") return <FileUploadProgres kategori="project" />;
  // if (searchParams.page == "detail-create-user")
  //   return <DetailCreateUserProject kategori="project" />;
  // if (searchParams.page == "detail-date-task") return <DetailDateEndTask kategori="project" />;

  // return <ViewUpdateProgres searchParams={searchParams} />;

  return (
    <EditDetailTaskProject/>
  )
}

export default Page;
