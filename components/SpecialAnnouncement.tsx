'use client';

import { X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface SpecialAnnouncementProps {
  announcement: {
    title: string;
    subtitle: string;
    imageUrl: string;
    offerTitle: string;
    offerDescription: string;
    promoCode: string;
    active: boolean;
  };
}

export function SpecialAnnouncement({
  announcement,
}: SpecialAnnouncementProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (announcement?.active) {
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [announcement?.active]);

  if (!announcement) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[425px] bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
        <DialogHeader>
          <DialogTitle className="text-2xl font-serif text-amber-900">
            {announcement.title}
          </DialogTitle>
          <Button
            variant="ghost"
            className="absolute right-4 top-4 rounded-full p-2 h-auto"
            onClick={() => setIsOpen(false)}
          >
            <X className="h-4 w-4 text-amber-900" />
          </Button>
        </DialogHeader>
        <div className="space-y-4">
          <div className="relative h-40 overflow-hidden rounded-lg">
            <img
              src={announcement.imageUrl}
              alt={announcement.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 p-4">
              <p className="text-white font-medium">{announcement.subtitle}</p>
            </div>
          </div>

          <div className="text-center space-y-2">
            <h3 className="text-xl font-semibold text-amber-900">
              {announcement.offerTitle}
            </h3>
            <p className="text-amber-800">{announcement.offerDescription}</p>
          </div>

          <div className="bg-amber-900/10 p-4 rounded-lg">
            <p className="text-sm text-amber-900 font-medium text-center">
              Mention code &quot;{announcement.promoCode}&quot; when booking
            </p>
          </div>

          <Button
            className="w-full bg-amber-900 hover:bg-amber-800 text-amber-50"
            onClick={() => setIsOpen(false)}
          >
            Got it
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
