import { useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Newsletter from "@/components/ui/Newsletter";
import { 
  ShieldCheck, 
  Truck, 
  RefreshCw, 
  HeadphonesIcon,

  Award,
  Cpu
} from "lucide-react";

const AboutPage = () => {
  // Update document title
  useEffect(() => {
    document.title = "About Us - TechHub";
    
    return () => {
      document.title = "TechHub - Your One-Stop Shop for Tech Products";
    };
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-6">About TechHub</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Your one-stop shop for the latest technology and IoT devices. We're passionate about bringing cutting-edge technology to your fingertips.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Our Story</h2>
              <p className="mb-4 text-lg">
                Founded in 2023, TechHub started with a simple mission: to make innovative technology accessible to everyone. What began as a small online store has grown into a trusted destination for tech enthusiasts and everyday consumers alike.
              </p>
              <p className="mb-4">
                We believe that technology should enhance lives, not complicate them. That's why we curate only the best products that combine functionality, quality, and value. Our team of experts rigorously tests each product to ensure it meets our high standards before it reaches our shelves.
              </p>
              <p>
                Today, TechHub continues to evolve, staying ahead of trends and bringing the future of technology to homes and businesses across the country.
              </p>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&h=800" 
                alt="TechHub team working on IoT devices" 
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-8 pb-8">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Award className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Quality</h3>
                <p className="text-center">
                  We never compromise on quality. Each product in our catalog is carefully selected and tested to ensure it meets our high standards.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-8 pb-8">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Cpu className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Innovation</h3>
                <p className="text-center">
                  We're constantly on the lookout for the latest technologies and innovations that can improve lives and create new possibilities.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-8 pb-8">
                <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <HeadphonesIcon className="text-primary h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-center mb-4">Customer Service</h3>
                <p className="text-center">
                  Our customers are at the heart of everything we do. We're committed to providing exceptional service at every touchpoint.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What We Offer</h2>
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Quality Assurance</h3>
              <p className="text-sm text-muted-foreground">
                All products undergo rigorous testing and quality checks.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Truck className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Fast Delivery</h3>
              <p className="text-sm text-muted-foreground">
                Free shipping on orders over $75 with quick delivery times.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <RefreshCw className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">Easy Returns</h3>
              <p className="text-sm text-muted-foreground">
                30-day hassle-free return policy on all products.
              </p>
            </div>
            
            <div className="text-center">
              <div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon className="text-primary h-8 w-8" />
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Support</h3>
              <p className="text-sm text-muted-foreground">
                Our expert team is available around the clock to assist you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-neutral-light">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">How do I track my order?</h3>
                <p>Once your order is shipped, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account and visiting the "My Orders" section.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">What is your return policy?</h3>
                <p>We offer a 30-day return policy on most items. Products must be in their original condition and packaging. Please note that certain items like customized products may not be eligible for return.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">Do you offer international shipping?</h3>
                <p>Yes, we ship to several countries worldwide. Shipping costs and delivery times vary by location. You can see the available shipping options during checkout.</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h3 className="text-xl font-bold mb-2">How can I contact customer support?</h3>
                <p>Our customer support team is available 24/7. You can reach us by email at support@techhub.com, by phone at (123) 456-7890, or through the contact form on our website.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Home?</h2>
          <p className="text-xl max-w-3xl mx-auto mb-8 opacity-90">
            Discover our wide range of smart devices and technology products designed to make your life easier and more connected.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/products">Shop Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <Newsletter />
    </div>
  );
};

export default AboutPage;
