'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Logo } from './logo';
import { Logo23 } from './logo23';
import { Button } from '@/components/ui/button';
import { AuthUser } from '@/src/services/types';
import { useState } from 'react';
import { LoginDialog } from '@/components/LoginDialog';
interface HeaderProps {
  isAuthenticated: boolean;
  //user from types authUser
  user: AuthUser | null;
}

export default function Header({ isAuthenticated, user }: HeaderProps) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1814]/95 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/" className="relative">
          <Logo23 />
        </Link>

        <nav>
          <div className="flex-grow flex justify-center">
          <Link
            href="/menuCard"
            className="px-6 py-3 text-[#cda45e] border border-[#cda45e] rounded hover:bg-[#cda45e] hover:text-white transition-all"
            >
              Our Cocktails
            </Link>
          </div>
        </nav>

        <div className="text-amber-100">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <span>Welcome, {user?.email.split('@')[0]}</span>
              <Button
                variant="outline"
                size="sm"
                onClick={async () => {
                  await fetch('/api/auth/logout', { method: 'POST' });
                  window.location.reload();
                }}
                className="border-amber-100/20 hover:bg-amber-100/10"
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowLoginDialog(true)}
              className="border-amber-100/20 hover:bg-amber-100/10"
            >
              Login
            </Button>
          )}
        </div>
      </div>
      <LoginDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
      />
    </header>
  );
}
