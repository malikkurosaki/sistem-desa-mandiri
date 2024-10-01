"use client"
import { useHookstate } from '@hookstate/core';
import { Container, rem } from '@mantine/core';
import React from 'react';
import { TEMA } from '../bin/val_global';

export default function LayoutBackground({ children }: { children: React.ReactNode }) {
  const tema = useHookstate(TEMA)
  return (
    <Container mih={'100vh'} p={0} size={rem(550)} bg={tema.get().bgUtama}>
      {children}
    </Container>
  );
}
