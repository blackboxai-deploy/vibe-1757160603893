'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

export function CategoryShowcase() {
  const categories = [
    {
      name: 'Gaming Mods',
      description: 'Premium game modifications and enhancement packs',
      image: 'https://placehold.co/400x300?text=Gaming+Mods+Collection+Premium+Game+Modifications',
      href: '/products?category=gaming-mods',
      count: '150+ Products'
    },
    {
      name: 'Controllers & Hardware',
      description: 'Custom gaming controllers and hardware modifications',
      image: 'https://placehold.co/400x300?text=Gaming+Controllers+Custom+Hardware+RGB+LED',
      href: '/products?category=controllers',
      count: '75+ Products'
    },
    {
      name: 'Digital Tools',
      description: 'Software utilities and development tools for gamers',
      image: 'https://placehold.co/400x300?text=Digital+Tools+Software+Development+Gaming+Utilities',
      href: '/products?category=digital-tools',
      count: '120+ Products'
    },
    {
      name: 'Exclusive Content',
      description: 'Premium exclusive content and limited edition items',
      image: 'https://placehold.co/400x300?text=Exclusive+Content+Premium+Limited+Edition+Gaming',
      href: '/products?category=exclusive',
      count: '50+ Products'
    }
  ];

  return (
    <section className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold">Shop by Category</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Explore our diverse range of gaming products and modifications across different categories
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <Link key={category.name} href={category.href}>
            <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden h-full">
              <div className="relative overflow-hidden">
                <img
                  src={category.image}
                  alt={category.description}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="text-white">
                    <h3 className="font-bold text-lg mb-1">{category.name}</h3>
                    <p className="text-sm opacity-90">{category.count}</p>
                  </div>
                </div>
              </div>
              <CardContent className="p-4">
                <p className="text-sm text-muted-foreground mb-4">
                  {category.description}
                </p>
                <Button variant="outline" size="sm" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  Explore Category
                </Button>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Button asChild size="lg" variant="outline">
          <Link href="/categories">
            View All Categories
          </Link>
        </Button>
      </div>
    </section>
  );
}