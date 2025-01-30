'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Header from '@/components/header';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Award, GlassWater, Users } from 'lucide-react';
import { useState } from 'react';
//import { SpecialAnnouncement } from '@/components/SpecialAnnouncement';
import { AdminButton } from '@/components/AdminButton';
import { Testimonials } from '@/components/Testimonials';
import { useAdmin } from "@/contexts/AdminContext";
import { ActiveAnnouncements } from '@/components/ActiveAnnouncements';
import api from '@/src/services/api';
import { useAuth } from '../contexts/AuthContext';
import { LoginDialog } from '@/components/LoginDialog';

export default function Home() {
  const { isAuthenticated, user } = useAuth();
  const { addBooking, addRequest } = useAdmin();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [bookingForm, setBookingForm] = useState({
    name: "",
    date: "",
    time: "",
    guests: 0,
  });
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAuthenticated) {
      setShowLoginDialog(true);
      return;
    }
    try {
      console.log(user?._id);
      await api.post('/bookings/new', {
        ...bookingForm,
        customerId: user?._id

        //just using customerId for now
      });
      // Reset form
      setBookingForm({ name: "", date: "", time: "", guests: 0 });
      // Show success message to user
      alert('Booking submitted successfully!');
    } catch (error) {
      console.error('Failed to submit booking:', error);
      alert('Failed to submit booking. Please try again.');
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/requests/new', contactForm);
      // Reset form
      setContactForm({ name: "", email: "", message: "" });
      // Show success message to user
      alert('Request submitted successfully!');
    } catch (error) {
      console.error('Failed to submit request:', error);
      alert('Failed to submit request. Please try again.');
    }
  };

  return (
    <main className="min-h-screen bg-[#1a1814]">
      <ActiveAnnouncements />
      <AdminButton />
      <Header isAuthenticated={isAuthenticated} user={user} />
      
      {showLoginDialog && (
        <LoginDialog 
          onClose={() => setShowLoginDialog(false)}
          onSuccess={() => {
            setShowLoginDialog(false);
            // Optionally re-trigger booking submission
          }}
        />
      )}

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1575444758702-4a6b9222336e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Cocktail making"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-5xl md:text-7xl font-serif text-amber-100 mb-6">
              Craft Cocktail Collective
            </h1>
            <p className="text-xl md:text-2xl text-amber-100/80 font-light mb-8 max-w-xl mx-auto">
              Elevate your event with our expert mixologists and bespoke
              cocktail experiences
            </p>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  size="lg"
                  className="bg-transparent border-amber-100 text-amber-100 hover:bg-amber-100/10"
                >
                  Book Your Event
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-[#1a1814] text-amber-100">
                <DialogHeader>
                  <DialogTitle>Event Inquiry</DialogTitle>
                  <DialogDescription className="text-amber-100/70">
                    Tell us about your event and we'll create a custom
                    experience.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleBookingSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={bookingForm.name}
                        onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                        placeholder="Your name"
                        className="bg-transparent border-amber-100/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label>Event Date</Label>
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(newDate) => {
                          setDate(newDate);
                          if (newDate) {
                            setBookingForm({ 
                              ...bookingForm, 
                              date: newDate.toISOString().split('T')[0] 
                            });
                          }
                        }}
                        className="rounded-md border-amber-100/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="time">Event Time</Label>
                      <Input
                        id="time"
                        value={bookingForm.time}
                        onChange={(e) => setBookingForm({ ...bookingForm, time: e.target.value })}
                        placeholder="7:00 PM"
                        className="bg-transparent border-amber-100/20"
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="guests">Expected Guests</Label>
                      <Input
                        id="guests"
                        type="number"
                        value={bookingForm.guests}
                        onChange={(e) => setBookingForm({ ...bookingForm, guests: parseInt(e.target.value) })}
                        placeholder="100"
                        className="bg-transparent border-amber-100/20"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-amber-100 text-[#1a1814] hover:bg-amber-200"
                  >
                    Submit Inquiry
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-[#1a1814]">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center">
              <GlassWater className="w-8 h-8 mx-auto mb-4 text-amber-100" />
              <h3 className="text-xl font-serif text-amber-100 mb-3">
                Expert Mixologists
              </h3>
              <p className="text-amber-100/70">
                Seasoned bartenders crafting perfect cocktails with flair and
                precision
              </p>
            </div>
            <div className="text-center">
              <Users className="w-8 h-8 mx-auto mb-4 text-amber-100" />
              <h3 className="text-xl font-serif text-amber-100 mb-3">
                Full Service
              </h3>
              <p className="text-amber-100/70">
                Complete setup including premium bar equipment, glassware, and
                ingredients
              </p>
            </div>
            <div className="text-center">
              <Award className="w-8 h-8 mx-auto mb-4 text-amber-100" />
              <h3 className="text-xl font-serif text-amber-100 mb-3">
                Custom Menus
              </h3>
              <p className="text-amber-100/70">
                Bespoke cocktail menus tailored to your event theme and
                preferences
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-[#1a1814]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-8">
              <div className="relative h-80 overflow-hidden rounded">
                <img
                  src="https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Cocktail preparation"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-64 overflow-hidden rounded">
                <img
                  src="https://images.unsplash.com/photo-1574391884720-bbc3740c59d1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Event setup"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="space-y-8">
              <div className="relative h-64 overflow-hidden rounded">
                <img
                  src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Signature cocktail"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative h-80 overflow-hidden rounded">
                <img
                  src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                  alt="Wedding toast"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Contact Section */}
      <section className="py-20 px-4 bg-[#1a1814] border-t border-amber-100/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-serif text-amber-100 mb-6">
            Get in Touch
          </h2>
          <p className="text-amber-100/70 mb-8">
            Available for events throughout New York City and the Tri-State area
            <br />
            Weddings • Corporate Events • Private Parties
            <br />
            Let us bring the bar to you
          </p>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="bg-transparent border-amber-100 text-amber-100 hover:bg-amber-100/10"
              >
                Contact Us
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-[#1a1814] text-amber-100">
              <DialogHeader>
                <DialogTitle>Let's Talk</DialogTitle>
                <DialogDescription className="text-amber-100/70">
                  Questions about our services or pricing?
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleContactSubmit}>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contact-name">Name</Label>
                    <Input
                      id="contact-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="Your name"
                      className="bg-transparent border-amber-100/20"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-email">Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="your@email.com"
                      className="bg-transparent border-amber-100/20"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contact-message">Message</Label>
                    <Textarea
                      id="contact-message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      placeholder="Tell us about your event..."
                      className="bg-transparent border-amber-100/20"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-amber-100 text-[#1a1814] hover:bg-amber-200"
                >
                  Send Message
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </main>
  );
}
