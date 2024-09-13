import { NavbarDetailMember } from "@/module/user/member";
import { Box } from "@mantine/core";

function Page({ params }: { params: { id: string } }) {
  return (
    <Box>
      <NavbarDetailMember id={params.id} />
    </Box>
  );
}

export default Page;
