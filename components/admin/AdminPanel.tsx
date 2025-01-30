"use client";

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdminAuth } from "./AdminAuth";
import { BookingsManager } from "./BookingsManager";
import { RequestsManager } from "./RequestsManager";
import { AnnouncementsManager } from "./AnnouncementsManager";

interface AdminPanelProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AdminPanel({ open, onOpenChange }: AdminPanelProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  if (!isAuthenticated) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px] bg-neutral-900 text-neutral-100">
          <AdminAuth onAuthenticated={() => setIsAuthenticated(true)} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px] bg-neutral-900 text-neutral-100">
        <Tabs defaultValue="bookings" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="bookings">Bookings</TabsTrigger>
            <TabsTrigger value="requests">Requests</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
          </TabsList>
          <TabsContent value="bookings">
            <BookingsManager />
          </TabsContent>
          <TabsContent value="requests">
            <RequestsManager />
          </TabsContent>
          <TabsContent value="announcements">
            <AnnouncementsManager />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}