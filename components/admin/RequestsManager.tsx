"use client";

import { useState, useEffect } from "react";
import { requests } from "../../src/services/api";
import { ContactRequest } from "../../src/services/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function RequestsManager() {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  const loadRequests = async () => {
    try {
      const response = await requests.getAll();
      setContactRequests(response.data);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: ContactRequest['status']) => {
    try {
      await requests.updateStatus(id, status);
      loadRequests(); // Reload the list after update
    } catch (error) {
      console.error('Failed to update request status:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Contact Requests</h2>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => {
            contactRequests.forEach(request => {
              if (request.status === 'new') {
                handleStatusUpdate(request._id, 'replied');
              }
            });
          }}
        >
          Mark All as Read
        </Button>
      </div>
      <div className="space-y-4">
        {contactRequests.map((request) => (
          <Card key={request._id} className="bg-neutral-800 border-neutral-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{request.name}</CardTitle>
                  <CardDescription>{request.email}</CardDescription>
                </div>
                <Badge
                  variant={request.status === "new" ? "default" : "secondary"}
                >
                  {request.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-neutral-300 mb-4">{request.message}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-400">{request.date}</span>
                <div className="space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleStatusUpdate(request._id, 'replied')}
                  >
                    Mark as Replied
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}