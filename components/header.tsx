'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './logo';

export default function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1814]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="relative">
          <Logo />
        </Link>

        <nav>
          <Link
            href="/menuCard"
            className="px-6 py-3 text-[#cda45e] border border-[#cda45e] rounded hover:bg-[#cda45e] hover:text-white transition-all"
          >
            Our Cocktails
          </Link>
        </nav>
      </div>
    </header>
  );
}
