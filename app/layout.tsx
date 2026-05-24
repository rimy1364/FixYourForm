import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'FixYourForm Enquiry',
  description: 'Submit an enquiry and receive a WhatsApp notification.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
