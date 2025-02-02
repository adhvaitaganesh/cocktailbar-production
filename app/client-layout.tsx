'use client';

import { Logo } from '@/components/logo';
import Link from 'next/link';
import { AnnouncementProvider } from '@/components/ActiveAnnouncementContext';
import { AdminProvider } from '@/contexts/AdminContext';
import { AuthProvider } from '@/contexts/AuthContext';
import { useState } from 'react';
import { LoginDialog } from '@/components/LoginDialog';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleLogin = () => {
    setShowLoginDialog(true);
  };

  const handleLogout = () => {
    window.location.reload();
  };

  return (
    <AuthProvider>
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-4 py-4 flex justify-center items-center">
          <Link href="/" className="inline-block">
            <Logo />
          </Link>
        </div>
      </header>
      <AdminProvider>
        <AnnouncementProvider>
          <LoginDialog 
            open={showLoginDialog} 
            onOpenChange={setShowLoginDialog}
          />
          {children}
        </AnnouncementProvider>
      </AdminProvider>
    </AuthProvider>
  );
} 