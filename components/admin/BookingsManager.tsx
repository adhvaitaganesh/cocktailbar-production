"use client";

import { useState, useEffect } from "react";
import { bookings } from "../../src/services/api";
import { Booking } from "../../src/services/types";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function BookingsManager() {
  const [bookingsList, setBookingsList] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const response = await bookings.getAll();
      setBookingsList(response.data);
    } catch (error) {
      console.error('Failed to load bookings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id: string, status: Booking['status']) => {
    try {
      await bookings.updateStatus(id, status);
      loadBookings(); // Reload the list after update
    } catch (error) {
      console.error('Failed to update booking status:', error);
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookings.delete(bookingId);
        // Refresh bookings list
        loadBookings();
      } catch (error) {
        console.error('Failed to delete booking:', error);
        alert('Failed to delete booking');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Upcoming Bookings</h2>
        <Button variant="outline" size="sm">
          Export
        </Button>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Guests</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookingsList.map((booking) => (
            <TableRow key={booking._id}>
              <TableCell>{booking.name}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.time}</TableCell>
              <TableCell>{booking.guests}</TableCell>
              <TableCell>
                <Badge
                  variant={booking.status === "confirmed" ? "default" : "secondary"}
                >
                  {booking.status}
                </Badge>
              </TableCell>
              <TableCell className="flex items-center gap-2">
                <select 
                  value={booking.status} 
                  onChange={(e) => handleStatusUpdate(booking._id, e.target.value as Booking['status'])}
                  className="bg-neutral-800 rounded p-1"
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                </select>
                <button 
                  onClick={() => handleDelete(booking._id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}