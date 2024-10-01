"use client"
import { useHookstate } from '@hookstate/core';
import { Button, Center, Transition } from '@mantine/core';
import { useShallowEffect } from '@mantine/hooks';
import React, { useState } from 'react';
import { IoReload } from 'react-icons/io5';
import { TEMA } from '../bin/val_global';

export default function ReloadButtonTop({ onReload, title }: { onReload: () => void, title: string }) {
  const [opened, setOpened] = useState(false);
  const tema = useHookstate(TEMA)

  useShallowEffect(() => {
    const timer = setTimeout(() => {
      setOpened(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  function reloadData() {
    onReload()
    setOpened(false)
  }

  return (
    <>
      <Center>
        <Transition
          mounted={opened}
          transition="fade-down"
          duration={400}
          timingFunction="ease"
        >
          {(state) => (
            <div
              style={{
                ...state,
                zIndex: 999,
                position: 'fixed',
                top: 90,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Button style={{
                border: `1px solid ${tema.get().bgTotalKegiatan}`
              }} leftSection={<IoReload/>} bg={"white"} c={tema.get().utama} onClick={reloadData} radius={"lg"}>{title}</Button>
            </div>
          )}
        </Transition>
      </Center>
    </>
  );
}
