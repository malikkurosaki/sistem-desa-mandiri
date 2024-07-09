import { ViewUpdateProgres } from '@/module/project';
import FileUploadProgres from '@/module/project/components/file_upload_progres';
import React from 'react';

function Page({ searchParams }: { searchParams: any }) {
  if (searchParams.page == "upload-progres")
    return <FileUploadProgres />


  return <ViewUpdateProgres  />
}

export default Page;
