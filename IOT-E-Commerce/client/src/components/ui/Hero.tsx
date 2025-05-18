import { Link } from "wouter";
import { Button } from "@/components/ui/button";

type HeroProps = {
  title: string;
  description: string;
  imageUrl: string;
  primaryButtonText: string;
  primaryButtonLink: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
};

const Hero = ({
  title,
  description,
  imageUrl,
  primaryButtonText,
  primaryButtonLink,
  secondaryButtonText,
  secondaryButtonLink,
}: HeroProps) => {
  return (
    <section className="relative bg-neutral-light">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="order-2 md:order-1">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{title}</h1>
            <p className="text-lg mb-6">{description}</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="px-6 py-3">
                <Link href={primaryButtonLink}>{primaryButtonText}</Link>
              </Button>
              
              {secondaryButtonText && secondaryButtonLink && (
                <Button variant="outline" asChild className="px-6 py-3">
                  <Link href={secondaryButtonLink}>{secondaryButtonText}</Link>
                </Button>
              )}
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img 
              src={imageUrl} 
              alt="Smart home devices collection" 
              className="rounded-xl shadow-lg w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
