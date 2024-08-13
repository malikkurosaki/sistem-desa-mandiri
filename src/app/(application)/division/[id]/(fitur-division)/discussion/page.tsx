import { ListDiscussion, NavbarListDiscussion } from '@/module/discussion';
import React from 'react';

function Page() {
  return (
    <div>
      <NavbarListDiscussion />
      <ListDiscussion />
    </div>
  );
}

export default Page;
