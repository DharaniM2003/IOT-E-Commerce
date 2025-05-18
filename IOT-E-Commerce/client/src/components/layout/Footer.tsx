import React from 'react';
import { Link } from 'wouter';
import { Facebook, Twitter, Instagram, Github, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-secondary">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">TechHub</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground max-w-xs">
              Your trusted source for IoT hardware and smart technology solutions. Elevate your space with innovative devices.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button variant="ghost" size="icon" aria-label="Facebook">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Twitter">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="Instagram">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" aria-label="GitHub">
                <Github className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2">
            <div className="flex flex-col space-y-4">
              <h3 className="text-sm font-medium">Shop</h3>
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">All Products</Link>
              <Link href="/category/smart-home" className="text-sm text-muted-foreground hover:text-foreground">Smart Home</Link>
              <Link href="/category/sensors" className="text-sm text-muted-foreground hover:text-foreground">Sensors</Link>
              <Link href="/category/development-boards" className="text-sm text-muted-foreground hover:text-foreground">Development Boards</Link>
              <Link href="/category/accessories" className="text-sm text-muted-foreground hover:text-foreground">Accessories</Link>
            </div>
            <div className="flex flex-col space-y-4">
              <h3 className="text-sm font-medium">Company</h3>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">About Us</Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:text-foreground">Contact</Link>
              <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-foreground">Privacy Policy</Link>
              <Link href="/terms-of-service" className="text-sm text-muted-foreground hover:text-foreground">Terms of Service</Link>
              <Link href="/shipping-policy" className="text-sm text-muted-foreground hover:text-foreground">Shipping Policy</Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-medium">Subscribe to our Newsletter</h3>
            <p className="mt-4 text-sm text-muted-foreground">
              Get updates on new products, special offers, and IoT news.
            </p>
            <div className="mt-4 flex max-w-md gap-x-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-background"
              />
              <Button type="submit">Subscribe</Button>
            </div>
            <div className="mt-6 text-sm text-muted-foreground">
              <div className="flex items-center mt-2">
                <Mail className="h-4 w-4 mr-2" />
                <span>support@techhub.com</span>
              </div>
              <div className="flex items-center mt-2">
                <Phone className="h-4 w-4 mr-2" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center mt-2">
                <MapPin className="h-4 w-4 mr-2" />
                <span>123 Tech Street, Silicon Valley, CA</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} TechHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;