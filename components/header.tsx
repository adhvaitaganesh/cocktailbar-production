'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './logo';
import { Button } from '@/components/ui/button';
import { AuthUser } from '@/src/services/types';
interface HeaderProps {
  isAuthenticated: boolean;
  //user from types authUser
  user: AuthUser | null;
}

export default function Header({ isAuthenticated, user }: HeaderProps) {
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

        <div className="text-amber-100">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user?.email}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {/* Add logout handler */}}
                className="border-amber-100/20 hover:bg-amber-100/10"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {/* Add login handler */}}
              className="border-amber-100/20 hover:bg-amber-100/10"
            >
              Login
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
