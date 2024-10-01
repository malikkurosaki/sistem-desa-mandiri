import { Button, Flex, Modal, SimpleGrid, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { BsQuestionCircleFill } from 'react-icons/bs';

export default function LayoutModal({ opened, onClose, description, onYes, loading }: { opened: boolean, onClose: () => void, loading?: boolean, description: string, onYes: (val: boolean) => void }) {
  const isMobile = useMediaQuery('(max-width: 768px)');
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
      </Flex>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 2 }}
        mt={30}
      >
        {isMobile ?
          <>
            <Button loading={loading} fullWidth size="lg" radius={'xl'} bg={'green'} onClick={() => {
              onYes(true)
            }}>YA</Button>
            <Button fullWidth size="lg" radius={'xl'} bg={'#F1C1CF'} c={'#D30B30'} onClick={() => onYes(false)}>TIDAK</Button>
          </>
          :
          <>
            <Button fullWidth size="lg" radius={'xl'} bg={'#F1C1CF'} c={'#D30B30'} onClick={() => onYes(false)}>TIDAK</Button>
            <Button loading={loading} fullWidth size="lg" radius={'xl'} bg={'green'} onClick={() => {
              onYes(true)
            }}>YA</Button>
          </>

        }
      </SimpleGrid>
    </Modal>
  );
}

