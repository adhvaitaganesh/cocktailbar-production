import './globals.css';
import type { Metadata } from 'next';
import { Playfair_Display, Inter } from 'next/font/google';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { AnnouncementProvider } from '@/components/ActiveAnnouncementContext';
import {AdminProvider} from '@/contexts/AdminContext'

const playfair = Playfair_Display({ subsets: ['latin'] });
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cheers 23 | Craft Cocktail Bar',
  description:
    'An artisan sanctuary in the heart of Saar-Lou-Lux , where craft cocktails meet intimate vibes',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={playfair.className} suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
          <div className="max-w-5xl mx-auto px-4 py-4">
            <Link href="/" className="inline-block">
              <Logo />
            </Link>
          </div>
        </header>
        <AdminProvider>
        <AnnouncementProvider>{children}</AnnouncementProvider>
        </AdminProvider>
      </body>
    </html>
  );
}
