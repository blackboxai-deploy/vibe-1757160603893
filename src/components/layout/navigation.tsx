'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/stores/cart-store';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { itemCount, setIsOpen: setCartOpen } = useCartStore();

  const navigationLinks = [
    { href: '/', label: 'Home' },
    { href: '/products', label: 'Products' },
    { href: '/categories', label: 'Categories' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">G5</span>
          </div>
          <span className="hidden sm:inline-block font-bold text-xl">
            G5 Indian Mods
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navigationLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Search Bar - Hidden on mobile */}
        <form onSubmit={handleSearch} className="hidden lg:flex items-center space-x-2">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64"
          />
          <Button type="submit" size="sm">
            Search
          </Button>
        </form>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          {/* User Account */}
          <Link href="/account">
            <Button variant="ghost" size="sm" className="hidden sm:flex">
              Account
            </Button>
          </Link>

          {/* Cart Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCartOpen(true)}
            className="relative"
          >
            <span className="mr-2">Cart</span>
            {itemCount > 0 && (
              <Badge 
                variant="destructive" 
                className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {itemCount}
              </Badge>
            )}
          </Button>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="md:hidden">
                <span className="sr-only">Toggle menu</span>
                <div className="space-y-1">
                  <div className="h-0.5 w-4 bg-current"></div>
                  <div className="h-0.5 w-4 bg-current"></div>
                  <div className="h-0.5 w-4 bg-current"></div>
                </div>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col space-y-4">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="flex flex-col space-y-2">
                  <Input
                    type="search"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Button type="submit" size="sm">
                    Search
                  </Button>
                </form>
                
                {/* Navigation Links */}
                {navigationLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-lg font-medium transition-colors hover:text-primary"
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                
                {/* Account Link */}
                <Link
                  href="/account"
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  Account
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}