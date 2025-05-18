import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate subscription process
    setTimeout(() => {
      toast({
        title: "Subscription successful",
        description: "Thank you for subscribing to our newsletter!",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-12 bg-neutral-light">
      <div className="container mx-auto px-4">
        <div className="bg-primary rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">Stay Updated on New Tech</h2>
          <p className="mb-6 max-w-2xl mx-auto">
            Subscribe to our newsletter for the latest product announcements, exclusive deals, and tech tips.
          </p>
          <form className="flex flex-col sm:flex-row max-w-lg mx-auto gap-3" onSubmit={handleSubmit}>
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-neutral-dark focus:outline-none focus:ring-2 focus:ring-white"
            />
            <Button
              type="submit"
              variant="secondary"
              disabled={isSubmitting}
              className="bg-white text-primary hover:bg-neutral-light px-6 py-3"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
          <p className="text-sm mt-4 opacity-80">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
