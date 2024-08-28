import { Box, Button, Flex, Group, Modal, Text } from '@mantine/core';
import React, { useState } from 'react';
import { BsQuestionCircleFill } from 'react-icons/bs';
import { WARNA } from '../fun/WARNA';

export default function LayoutModal({ opened, onClose, description, onYes }: { opened: boolean, onClose: () => void, description: string, onYes: (val: boolean) => void }) {
  const [isValModal, setValModal] = useState(opened)
  return (
    <Modal styles={{
      body: {
        margin: 10,
      },
      content: {
        border: `2px solid ${'#828AFC'}`,
        borderRadius: 10
      }
    }} opened={opened} onClose={onClose} withCloseButton={false} centered closeOnClickOutside={false}>
      <Flex justify={"center"} align={"center"} direction={"column"}>
        <BsQuestionCircleFill size={100} color="red" />
        <Text mt={30} ta={"center"} fw={"bold"} fz={18}>{description}</Text>
        <Group mt={30} w={'100%'} justify='center'>
          <Button w={"47%"} size="lg" radius={'xl'} bg={'#F1C1CF'} c={'#D30B30'} onClick={() => onYes(false)}>TIDAK</Button>
          <Button w={"47%"} size="lg" radius={'xl'} bg={WARNA.biruTua} onClick={() => onYes(true)}>YA</Button>
        </Group>
      </Flex>
    </Modal>
  );
}

