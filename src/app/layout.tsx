import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/layout/navigation';
import { Footer } from '@/components/layout/footer';
import { CartProvider } from '@/components/providers/cart-provider';
import { Toaster } from '@/components/ui/sonner';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'G5 Indian Mods Store - Premium WooCommerce Shop',
  description: 'Premium quality products and gaming modifications from G5 Indian Mods. Browse our extensive catalog of high-quality items.',
  keywords: 'G5 Indian Mods, gaming, modifications, premium products, online store',
  authors: [{ name: 'G5 Indian Mods' }],
  creator: 'G5 Indian Mods',
  publisher: 'G5 Indian Mods',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'G5 Indian Mods Store',
    description: 'Premium quality products and gaming modifications',
    url: 'https://g5indianmods.com',
    siteName: 'G5 Indian Mods',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'G5 Indian Mods Store',
    description: 'Premium quality products and gaming modifications',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <CartProvider>
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}