"use client";

import { useAnnouncements } from "@/components/ActiveAnnouncementContext";
import { SpecialAnnouncement } from "@/components/SpecialAnnouncement";

export function ActiveAnnouncements() {
  const { announcements } = useAnnouncements();

  return (
    <>
      {announcements
        .filter(announcement => announcement && announcement.active)
        .map(announcement => (
          <SpecialAnnouncement 
            key={announcement.id} 
            announcement={announcement} 
          />
        ))}
    </>
  );
}