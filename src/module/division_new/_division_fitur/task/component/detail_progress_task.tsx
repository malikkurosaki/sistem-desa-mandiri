'use client'
import { WARNA } from "@/module/_global";
import { Box, Grid, ActionIcon, Progress, Text } from "@mantine/core";
import { HiMiniPresentationChartBar } from "react-icons/hi2";

export default function ProgressDetailTask() {
   return (
      <Box mt={10}>
         <Box
            p={20}
            bg={"#DCEED8"}
            style={{
               borderRadius: 10,
            }}
         >
            <Grid gutter={"lg"}>
               <Grid.Col span={3}>
                  <ActionIcon
                     variant="gradient"
                     size={68}
                     aria-label="Gradient action icon"
                     radius={100}
                     gradient={{ from: "#DFDA7C", to: "#F2AF46", deg: 174 }}
                  >
                     <HiMiniPresentationChartBar size={35} color={WARNA.biruTua} />
                  </ActionIcon>
               </Grid.Col>
               <Grid.Col span={9}>
                  <Box>
                     <Text>Kemajuan Proyek 60%</Text>
                     <Progress
                        style={{
                           border: `1px solid ${"#BDBDBD"}`,
                        }}
                        w={"100%"}
                        color="#FCAA4B"
                        radius="md"
                        size="xl"
                        value={60}
                     />
                     <Text>18 Juni 2024</Text>
                  </Box>
               </Grid.Col>
            </Grid>
         </Box>
      </Box>
   )
}