import React from 'react';
import NavbarAdminDivision from './navbar_admin_division';

export default function CreateAdminDivision({ data }: { data: any }) {
  return (
    <NavbarAdminDivision data={data} onSuccess={() => { }} />
  );
}

