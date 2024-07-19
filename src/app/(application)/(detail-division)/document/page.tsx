import { ViewDocumentDivision } from '@/module/division_new';
import ListDocumentsDivision from '@/module/division_new/_division_fitur/document/components/list_documents_division';
import React from 'react';

function Page({ searchParams }: { searchParams: any }) {
  if (searchParams.page == "list-document")
    return <ListDocumentsDivision />;
  
  return (
    <ViewDocumentDivision/>
  );
}

export default Page;
