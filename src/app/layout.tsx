import { ScrollProvider } from "@/module/_global";
import LayoutBackground from "@/module/_global/layout/layout_background";
import '@mantine/carousel/styles.css';
import { Box, ColorSchemeScript, MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import '@mantine/dates/styles.css';
import { Notifications } from '@mantine/notifications';
import '@mantine/notifications/styles.css';
import { Lato } from "next/font/google";
import { Toaster } from 'react-hot-toast';

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
