import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/providers/ThemeProvider';
import { ApolloWrapper } from '@/lib/providers/ApolloProvider';
import { Layout } from '@/components/layout/Layout';
import { PageTitleProvider } from '@/hooks/usePageTitle';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Jaggaer E-Commerce',
  description:
    'A modern e-commerce application built with Next.js and Material-UI',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider>
          <ApolloWrapper>
            <PageTitleProvider>
              <Layout>{children}</Layout>
            </PageTitleProvider>
          </ApolloWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
