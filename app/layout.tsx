import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context';

export const metadata: Metadata = {
  title: 'PARVANGI (परवानगी) | Statutory Approval Checklist Portal | Government of Maharashtra',
  icons: {
    icon: [
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/fevicon.png', type: 'image/png' },
      { url: '/favicon.ico' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  description:
    'Official personalized approval checklist engine for Micro, Small and Medium industrial enterprises in Maharashtra. Verified against MIDC, MPCB, and DISH statutory regulations.',
  keywords: [
    'Parvangi',
    'परवानगी',
    'Maharashtra MSME',
    'MPCB Consent to Establish',
    'Factory License Maharashtra',
    'MIDC Approval',
    'Directorate of Industries',
    'Ease of Doing Business'
  ]
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-font-size="normal">
      <body>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}
