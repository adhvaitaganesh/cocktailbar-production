"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

export default function BookingPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  return (
    <main className="min-h-screen bg-neutral-50 pt-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left Column - Image and Info */}
          <div className="space-y-6">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                alt="Cocktail making"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-end p-8">
                <h1 className="text-4xl font-bold text-white">Book Your Event</h1>
              </div>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Why Choose Us?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">✨ Professional Service</h3>
                  <p className="text-neutral-600">Expert mixologists with years of experience in luxury events</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🍸 Custom Cocktails</h3>
                  <p className="text-neutral-600">Bespoke drink menus tailored to your event</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">🎉 Full Setup</h3>
                  <p className="text-neutral-600">Complete bar setup with premium equipment and garnishes</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Booking Form */}
          <Card>
            <CardHeader>
              <CardTitle>Event Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form className="space-y-6">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" type="tel" placeholder="+1 (555) 000-0000" />
                  </div>

                  <div className="space-y-2">
                    <Label>Event Type</Label>
                    <RadioGroup defaultValue="corporate" className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="corporate" id="corporate" />
                        <Label htmlFor="corporate">Corporate</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="private" id="private" />
                        <Label htmlFor="private">Private Party</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="wedding" id="wedding" />
                        <Label htmlFor="wedding">Wedding</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="other" id="other" />
                        <Label htmlFor="other">Other</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <Label>Event Date</Label>
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      className="rounded-md border"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="guests">Number of Guests</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select guest count" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1-50">1-50 guests</SelectItem>
                        <SelectItem value="51-100">51-100 guests</SelectItem>
                        <SelectItem value="101-200">101-200 guests</SelectItem>
                        <SelectItem value="201+">201+ guests</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="duration">Event Duration</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select duration" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2 hours</SelectItem>
                        <SelectItem value="3">3 hours</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="5">5+ hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Details</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your event, special requirements, or any questions you have..."
                      className="h-32"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">Send Request</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}