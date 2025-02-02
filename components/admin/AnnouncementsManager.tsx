"use client";

import { useState, useEffect } from "react";
import { announcements } from "@/src/services/api";
import { Announcement } from "@/src/services/types";
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
import { SpecialAnnouncement } from "@/components/SpecialAnnouncement";

export function AnnouncementsManager() {
  const [announcementsList, setAnnouncementsList] = useState<Announcement[]>([]);
  const [showAllAnnouncements, setShowAllAnnouncements] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    subtitle: "",
    imageUrl: "",
    offerTitle: "",
    offerDescription: "",
    promoCode: "",
    active: true,
  });
  const [previewAnnouncement, setPreviewAnnouncement] = useState<Announcement | null>(null);

  const loadAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await announcements.getAll();
      setAnnouncementsList(response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to load announcements:', error);
      setError('Failed to load announcements');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const activeAnnouncements = announcementsList.filter(a => a.active);
  const currentAnnouncement = activeAnnouncements[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => 
      prev === activeAnnouncements.length - 1 ? 0 : prev + 1
    );
  };

  const handlePrevious = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? activeAnnouncements.length - 1 : prev - 1
    );
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setNewAnnouncement(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAnnouncement = async () => {
    try {
      await announcements.create(newAnnouncement);
      await loadAnnouncements(); // Reload the list after creating
      // Reset form
      setNewAnnouncement({
        title: "",
        subtitle: "",
        imageUrl: "",
        offerTitle: "",
        offerDescription: "",
        promoCode: "",
        active: true,
      });
      setError(null);
    } catch (error) {
      console.error('Failed to create announcement:', error);
      setError('Failed to create announcement');
    }
  };

  const handleUpdateStatus = async (id: string, active: boolean) => {
    try {
      await announcements.update(id, { active });
      await loadAnnouncements(); // Reload the list after updating
      setError(null);
    } catch (error) {
      console.error('Failed to update announcement status:', error);
      setError('Failed to update announcement status');
    }
  };

  const handleDeleteAnnouncement = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) {
      return;
    }
    
    try {
      await announcements.delete(id);
      await loadAnnouncements(); // Reload the list after deleting
      setError(null);
    } catch (error) {
      console.error('Failed to delete announcement:', error);
      setError('Failed to delete announcement');
    }
  };

  if (loading) return <div>Loading announcements...</div>;

  return (
    <div className="space-y-6 max-h-[70vh] overflow-y-auto pr-2">
      {/* Preview */}
      {previewAnnouncement && (
        <SpecialAnnouncement announcement={previewAnnouncement} />
      )}
      
      {error && (
        <div className="bg-red-500 text-white p-2 rounded">
          {error}
        </div>
      )}
      
      {/* Active Announcement Display */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Active Announcement</h2>
          <Button
            variant="outline"
            onClick={() => setShowAllAnnouncements(!showAllAnnouncements)}
          >
            {showAllAnnouncements ? 'Hide All' : 'Show All'}
          </Button>
        </div>

        {activeAnnouncements.length > 0 ? (
          <Card className="bg-neutral-800 border-neutral-700 relative">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{currentAnnouncement.title}</CardTitle>
                  <CardDescription>
                    <div className="space-y-1">
                      <p><strong>Subtitle:</strong> {currentAnnouncement.subtitle}</p>
                      <p><strong>Offer Title:</strong> {currentAnnouncement.offerTitle}</p>
                      <p><strong>Description:</strong> {currentAnnouncement.offerDescription}</p>
                      <p><strong>Promo Code:</strong> {currentAnnouncement.promoCode}</p>
                    </div>
                  </CardDescription>
                </div>
                <Switch
                  checked={currentAnnouncement.active}
                  onCheckedChange={(checked) => handleUpdateStatus(currentAnnouncement._id, checked)}
                />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handlePrevious}
                  disabled={activeAnnouncements.length <= 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-neutral-400">
                  {currentIndex + 1} of {activeAnnouncements.length}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleNext}
                  disabled={activeAnnouncements.length <= 1}
                >
                  Next
                </Button>
              </div>
              <div className="flex justify-between mt-4">
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => setPreviewAnnouncement(currentAnnouncement)}
                >
                  Preview
                </Button>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => handleDeleteAnnouncement(currentAnnouncement._id)}
                >
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="text-neutral-400">No active announcements</div>
        )}
      </div>

      {/* Create Announcement Form */}
      <div className="space-y-4 sticky top-0 bg-neutral-900 pt-2 pb-4 z-10">
        <h2 className="text-lg font-semibold">Create Special Announcement</h2>
        <div className="grid gap-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newAnnouncement.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              value={newAnnouncement.subtitle}
              onChange={(e) => handleInputChange('subtitle', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              value={newAnnouncement.imageUrl}
              onChange={(e) => handleInputChange('imageUrl', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="offerTitle">Offer Title</Label>
            <Input
              id="offerTitle"
              value={newAnnouncement.offerTitle}
              onChange={(e) => handleInputChange('offerTitle', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="offerDescription">Offer Description</Label>
            <Textarea
              id="offerDescription"
              value={newAnnouncement.offerDescription}
              onChange={(e) => handleInputChange('offerDescription', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="promoCode">Promo Code</Label>
            <Input
              id="promoCode"
              value={newAnnouncement.promoCode}
              onChange={(e) => handleInputChange('promoCode', e.target.value)}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="active"
              checked={newAnnouncement.active}
              onCheckedChange={(checked) => handleInputChange('active', checked)}
            />
            <Label htmlFor="active">Active</Label>
          </div>
        </div>

        <Button className="w-full" onClick={handleCreateAnnouncement}>
          Create Announcement
        </Button>
      </div>

      {/* All Announcements List (Toggleable) */}
      {showAllAnnouncements && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">All Announcements</h2>
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
                <div className="flex justify-end">
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
      )}
    </div>
  );
}