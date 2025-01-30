"use client";

import { useState, useEffect } from "react";
import { announcements } from "../../src//services/api";
import { Announcement } from "../../src/services/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";

export function AnnouncementsManager() {
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    offerTitle: "",
    offerDescription: "",
    promoCode: "",
    active: true,
  });

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      const response = await announcements.getAll();
      setAnnouncementsList(response.data);
    } catch (error) {
      console.error('Failed to load announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewAnnouncement(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAnnouncement = async () => {
    try {
      await announcements.create(newAnnouncement);
      loadAnnouncements();
      setNewAnnouncement({
        title: "",
        subtitle: "",
        imageUrl: "",
        offerTitle: "",
        offerDescription: "",
        promoCode: "",
        active: true,
      });
    } catch (error) {
      console.error('Failed to create announcement:', error);
    }
  };

  const handleUpdateStatus = async (id: string, active: boolean) => {
    try {
      await announcements.update(id, { active });
      loadAnnouncements();
    } catch (error) {
      console.error('Failed to update announcement status:', error);
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    try {
      await announcements.delete(id);
      loadAnnouncements();
    } catch (error) {
      console.error('Failed to delete announcement:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Create Announcement Form */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Create Special Announcement</h2>
        <div className="space-y-4">
          {/* ... your existing form inputs ... */}
          <Button className="w-full" onClick={handleCreateAnnouncement}>
            Create Announcement
          </Button>
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Active Announcements</h2>
        {announcementsList.map((announcement) => (
          <Card key={announcement._id} className="bg-neutral-800 border-neutral-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{announcement.title}</CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <p><strong>Subtitle:</strong> {announcement.subtitle}</p>
                      <p><strong>Offer Title:</strong> {announcement.offerTitle}</p>
                      <p><strong>Description:</strong> {announcement.offerDescription}</p>
                      <p><strong>Promo Code:</strong> {announcement.promoCode}</p>
                    </div>
                  </CardDescription>
                </div>
                <Switch
                  checked={announcement.active}
                  onCheckedChange={(checked) => handleUpdateStatus(announcement._id, checked)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  Edit
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteAnnouncement(announcement._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}