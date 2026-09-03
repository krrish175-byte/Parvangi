import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/lib/context';

export const metadata: Metadata = {
  title: 'PARVANGI (परवानगी) — Statutory Approval Checklist Engine | Government of Maharashtra',
  description:
    'Official personalized approval checklist engine for first-time Micro & Small industrial entrepreneurs in Maharashtra. Verified against MIDC, MPCB, and DISH statutory regulations.',
  keywords: [
    'Parvangi',
    'परवानगी',
    'Maharashtra MSME',
    'MPCB Consent to Establish',
    'Factory License Maharashtra',
    'MIDC Approval',
    'SIH26130',
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
