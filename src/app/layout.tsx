import "@mantine/core/styles.css";
import {
  Box,
  ColorSchemeScript,
  Container,
  MantineProvider,
  rem,
} from "@mantine/core";
import { ScrollProvider, WARNA } from "@/module/_global";
import { Lato } from "next/font/google";
import '@mantine/carousel/styles.css';
import { Toaster } from 'react-hot-toast';
import '@mantine/dates/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications'
import LayoutBackground from "@/module/_global/layout/layout_background";

export const metadata = {
  title: "SISTEM DESA MANDIRI",
  description: "I have followed setup instructions carefully",
};

const LatoFont = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
        <ColorSchemeScript />
      </head>
      <body className={`${LatoFont.className}`} suppressHydrationWarning>
        <MantineProvider>
          <Notifications />
          <Box bg={'#252A2F'} pos={"fixed"} w={"100%"} h={"100%"} style={{
            overflowY: "auto",
          }}>
            <Toaster />
            <ScrollProvider>
              <LayoutBackground>
                {children}
              </LayoutBackground>
            </ScrollProvider>
          </Box>

        </MantineProvider>
      </body>
    </html>
  );
}
