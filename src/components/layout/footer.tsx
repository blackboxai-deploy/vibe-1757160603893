import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">G5</span>
              </div>
              <span className="font-bold text-lg">G5 Indian Mods</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Premium quality gaming modifications and products. Your trusted source for high-quality gaming content and accessories.
            </p>
            <div className="flex space-x-4">
              <Link href="https://twitter.com/g5indianmods" className="text-sm hover:text-primary">
                Twitter
              </Link>
              <Link href="https://instagram.com/g5indianmods" className="text-sm hover:text-primary">
                Instagram
              </Link>
              <Link href="https://youtube.com/@g5indianmods" className="text-sm hover:text-primary">
                YouTube
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link href="/" className="block text-sm text-muted-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/products" className="block text-sm text-muted-foreground hover:text-primary">
                All Products
              </Link>
              <Link href="/products?featured=true" className="block text-sm text-muted-foreground hover:text-primary">
                Featured Products
              </Link>
              <Link href="/products?on_sale=true" className="block text-sm text-muted-foreground hover:text-primary">
                Sale Items
              </Link>
              <Link href="/categories" className="block text-sm text-muted-foreground hover:text-primary">
                Categories
              </Link>
            </div>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="font-semibold">Customer Service</h3>
            <div className="space-y-2">
              <Link href="/contact" className="block text-sm text-muted-foreground hover:text-primary">
                Contact Us
              </Link>
              <Link href="/shipping" className="block text-sm text-muted-foreground hover:text-primary">
                Shipping Info
              </Link>
              <Link href="/returns" className="block text-sm text-muted-foreground hover:text-primary">
                Returns & Exchanges
              </Link>
              <Link href="/faq" className="block text-sm text-muted-foreground hover:text-primary">
                FAQ
              </Link>
              <Link href="/support" className="block text-sm text-muted-foreground hover:text-primary">
                Support
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="font-semibold">Legal</h3>
            <div className="space-y-2">
              <Link href="/privacy" className="block text-sm text-muted-foreground hover:text-primary">
                Privacy Policy
              </Link>
              <Link href="/terms" className="block text-sm text-muted-foreground hover:text-primary">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="block text-sm text-muted-foreground hover:text-primary">
                Refund Policy
              </Link>
              <Link href="/cookies" className="block text-sm text-muted-foreground hover:text-primary">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} G5 Indian Mods. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">Secure payments powered by</span>
              <div className="flex space-x-2">
                <div className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                  PayPal
                </div>
                <div className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                  Stripe
                </div>
                <div className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">
                  Razorpay
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}