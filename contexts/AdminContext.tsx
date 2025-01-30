"use client";

import { createContext, useContext, useState } from "react";

interface Booking {
  id: number;
  name: string;
  date: string;
  time: string;
  guests: number;
  status: "pending" | "confirmed";
}

interface Request {
  id: number;
  name: string;
  email: string;
  message: string;
  date: string;
  status: "new" | "replied";
}

interface AdminContextType {
  bookings: Booking[];
  setBookings: (bookings: Booking[]) => void;
  requests: Request[];
  setRequests: (requests: Request[]) => void;
  addBooking: (booking: Omit<Booking, "id" | "status">) => void;
  addRequest: (request: Omit<Request, "id" | "status" | "date">) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: 1,
      name: "John Doe",
      date: "2024-03-20",
      time: "19:00",
      guests: 4,
      status: "confirmed",
    },
  ]);

  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      message: "Interested in hosting a corporate event for 50 people next month.",
      date: "2024-03-19",
      status: "new",
    },
  ]);

  const addBooking = (newBooking: Omit<Booking, "id" | "status">) => {
    const booking: Booking = {
      ...newBooking,
      id: bookings.length + 1,
      status: "pending",
    };
    setBookings([...bookings, booking]);
  };

  const addRequest = (newRequest: Omit<Request, "id" | "status" | "date">) => {
    const request: Request = {
      ...newRequest,
      id: requests.length + 1,
      date: new Date().toISOString().split('T')[0],
      status: "new",
    };
    setRequests([...requests, request]);
  };

  return (
    <AdminContext.Provider value={{ bookings, setBookings, requests, setRequests, addBooking, addRequest }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
}