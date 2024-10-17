import { LayoutNavbarNew } from "@/module/_global";
import { EditMember } from "@/module/user/member";
import { Box } from "@mantine/core";

function Page({ params }: { params: { id: string } }) {
  return (
    <Box>
      <LayoutNavbarNew back="" title="Edit Anggota" menu={<></>} />
      <EditMember id={params.id} />
    </Box>
  );
}

export default Page;
