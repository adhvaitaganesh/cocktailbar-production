"use client";

import { createContext, useContext, useState } from "react";

interface Announcement {
  id: number;
  title: string;
  subtitle: string;
  imageUrl: string;
  offerTitle: string;
  offerDescription: string;
  promoCode: string;
  active: boolean;
}

type AnnouncementContextType = {
  announcements: Announcement[];
  setAnnouncements: (announcements: Announcement[]) => void;
};

const AnnouncementContext = createContext<AnnouncementContextType | undefined>(undefined);

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  return (
    <AnnouncementContext.Provider value={{ announcements, setAnnouncements }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export function useAnnouncements(): AnnouncementContextType {
  const context = useContext(AnnouncementContext);
  if (!context) {
    throw new Error('useAnnouncements must be used within an AnnouncementProvider');
  }
  return context;
}