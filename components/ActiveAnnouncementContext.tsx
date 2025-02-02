"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { announcements } from "@/src/services/api";
import { Announcement } from "@/src/services/types";

interface AnnouncementContextType {
  announcements: Announcement[];
}

const AnnouncementContext = createContext<AnnouncementContextType>({ announcements: [] });

export function AnnouncementProvider({ children }: { children: React.ReactNode }) {
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>([]);

  useEffect(() => {
    const loadAnnouncements = async () => {
      try {
        const response = await announcements.getAll();
        setAnnouncementsList(response.data);
      } catch (error) {
        console.error('Failed to load announcements:', error);
      }
    };

    loadAnnouncements();
  }, []);

  return (
    <AnnouncementContext.Provider value={{ announcements: announcementsList }}>
      {children}
    </AnnouncementContext.Provider>
  );
}

export const useAnnouncements = () => useContext(AnnouncementContext);