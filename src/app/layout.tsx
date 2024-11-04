import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './fonts/satoshi/css/satoshi.css';
import '../styles/global.scss';
import 'react-loading-skeleton/dist/skeleton.css';
import './globals.css';
import { Toaster } from 'react-hot-toast';
import RecoilContextProvider from '@/providers/recoil-provider';
import { WalletConnectProvider } from '@/providers';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const satoshi = localFont({
  src: './fonts/satoshi/fonts/Satoshi-Variable.woff',
  variable: '--font-satoshi',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'Flux Trail',
  description: 'Blockchain-powered tickets for the future of travel',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Titillium+Web&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter&family=Noto+Sans&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Familjen+Grotesk:wght@400;500;600;700&display=swap"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="og:title" content="Flux Trail" />
        <meta name="og:description" content="Blockchain-powered tickets for the future of travel" />
        <meta property="og:image" content="/favicon.ico" />
        <meta property="og:url" content="https://flux-trail.vercel.app" />
        <meta property="og:type" content="website" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${satoshi.variable} antialiased`}
      >
        <Toaster />
        <RecoilContextProvider>
          <WalletConnectProvider>{children}</WalletConnectProvider>
        </RecoilContextProvider>
      </body>
    </html>
  );
}
