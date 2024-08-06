import { ViewDetailDivision } from '@/module/division_new';
import React from 'react';

function Page({ params }: { params: { id: string } }) {
  return (
    <ViewDetailDivision id={params.id}/>
  );
}

export default Page;
