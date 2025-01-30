"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "The mixologists were incredible! They created custom cocktails that perfectly matched our wedding theme. Our guests are still talking about it!",
    author: "Sarah & James",
    event: "Wedding Reception",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    id: 2,
    quote: "Absolutely professional service. They handled our corporate event with expertise and style. The presentation was impeccable.",
    author: "Michael Chen",
    event: "Corporate Gala",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  },
  {
    id: 3,
    quote: "Their attention to detail is unmatched. From the custom menu to the garnishes, everything was perfect for our launch party.",
    author: "Emma Rodriguez",
    event: "Product Launch",
    image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
  }
];

export function Testimonials() {
  return (
    <section className="py-20 px-4 bg-[#1a1814]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-serif text-amber-100 text-center mb-12">What Our Clients Say</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="bg-neutral-900/50 border-amber-100/10">
              <CardContent className="p-6">
                <Quote className="w-8 h-8 text-amber-100/20 mb-4" />
                <p className="text-amber-100/80 mb-6">{testimonial.quote}</p>
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-serif text-amber-100">{testimonial.author}</p>
                    <p className="text-sm text-amber-100/60">{testimonial.event}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}