import "@mantine/core/styles.css";
import {
  Box,
  ColorSchemeScript,
  Container,
  MantineProvider,
  rem,
} from "@mantine/core";
import { WARNA } from "@/module/_global";
import { Lato } from "next/font/google";

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
        <ColorSchemeScript />
      </head>
      <body className={`${LatoFont.className}`}>
        <MantineProvider>
          <Box bg={'#252A2F'}>
            <Container h={"100vh"} p={0} size={rem(550)} bg={WARNA.bgWhite}>
              {children}
            </Container>
          </Box>
        </MantineProvider>
      </body>
    </html>
  );
}
