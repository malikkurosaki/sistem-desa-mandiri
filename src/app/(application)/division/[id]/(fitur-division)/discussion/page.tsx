import { ListDiscussion, NavbarListDiscussion } from '@/module/discussion';
import React from 'react';

function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <NavbarListDiscussion />
      <ListDiscussion id={params.id} />
    </div>
  );
}

export default Page;
