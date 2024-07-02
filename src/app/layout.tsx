// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import '@mantine/carousel/styles.css';

import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import colors from '@/lib/colors';

export const metadata = {
  title: 'My Mantine app',
  description: 'I have followed setup instructions carefully',
};

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
      <body suppressHydrationWarning={true} style={{
        backgroundColor: colors['light-1']
      }}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}