import { LayoutNavbarNew } from "@/module/_global";
import { CreateMember } from "@/module/user/member";
import { Box } from "@mantine/core";

function Page() {
  return (
    <Box>
      <LayoutNavbarNew back="" title="Tambah Anggota" menu={<></>} />
      <CreateMember />
    </Box>
  );
}

export default Page;
