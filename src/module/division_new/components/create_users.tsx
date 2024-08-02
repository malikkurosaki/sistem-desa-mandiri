import React from 'react';
import NavbarCreateUsers from './ui/navbar_create_users';

export default function CreateUsers({ grup }: { grup: string }) {
  return (
    <NavbarCreateUsers grup={grup} onClose={() => {}}/>
  );
}

