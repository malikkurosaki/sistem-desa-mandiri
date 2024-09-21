import { Stack } from "@mantine/core";
import { RealtimePage } from "./_ui/RealtimePage";
const WIBU_REALTIME_KEY = process.env.WIBU_REALTIME_KEY!

export default function Page() {
   return (
      <Stack>
         <RealtimePage wibuKey={WIBU_REALTIME_KEY} />
      </Stack>
   )
}