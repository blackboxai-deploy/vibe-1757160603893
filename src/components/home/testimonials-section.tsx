'use client';

import { Card, CardContent } from '@/components/ui/card';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Rahul Sharma',
      role: 'Pro Gamer',
      content: 'The quality of mods from G5 Indian Mods is exceptional. Their GTA V mod pack completely transformed my gaming experience. Highly recommended for serious gamers!',
      rating: 5,
      avatar: 'https://placehold.co/100x100?text=Rahul+Professional+Gamer+Portrait'
    },
    {
      name: 'Priya Patel',
      role: 'Gaming Enthusiast',
      content: 'Amazing customer service and instant delivery. The controller modifications are top-notch quality and work perfectly. Will definitely purchase again!',
      rating: 5,
      avatar: 'https://placehold.co/100x100?text=Priya+Gaming+Enthusiast+Portrait'
    },
    {
      name: 'Arjun Singh',
      role: 'Content Creator',
      content: 'As a gaming content creator, I need reliable mods and tools. G5 Indian Mods delivers premium quality products that enhance my content creation workflow.',
      rating: 5,
      avatar: 'https://placehold.co/100x100?text=Arjun+Content+Creator+Gaming+Portrait'
    },
    {
      name: 'Sneha Gupta',
      role: 'Streamer',
      content: 'The exclusive content and gaming tools from G5 have helped me grow my streaming channel. Professional quality products with excellent support team.',
      rating: 5,
      avatar: 'https://placehold.co/100x100?text=Sneha+Gaming+Streamer+Portrait'
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">What Our Customers Say</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Join thousands of satisfied customers who trust G5 Indian Mods for premium gaming products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="h-full">
            <CardContent className="p-6 space-y-4">
              {/* Rating */}
              <div className="flex space-x-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-yellow-400 text-sm">★</span>
                ))}
              </div>

              {/* Testimonial Content */}
              <blockquote className="text-sm text-muted-foreground leading-relaxed">
                "{testimonial.content}"
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center space-x-3 pt-4 border-t">
                <img
                  src={testimonial.avatar}
                  alt={`${testimonial.name} - ${testimonial.role}`}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-sm">{testimonial.name}</div>
                  <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Trust Indicators */}
      <div className="mt-12 text-center">
        <div className="inline-flex items-center justify-center space-x-8 p-6 bg-muted rounded-2xl">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">10,000+</div>
            <div className="text-xs text-muted-foreground">Happy Customers</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">4.9/5</div>
            <div className="text-xs text-muted-foreground">Average Rating</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">99.9%</div>
            <div className="text-xs text-muted-foreground">Uptime</div>
          </div>
          <div className="w-px h-12 bg-border"></div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">24/7</div>
            <div className="text-xs text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
}