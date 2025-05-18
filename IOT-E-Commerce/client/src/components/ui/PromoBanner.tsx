import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

type PromoBannerProps = {
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  expiryDate?: Date;
  primaryImage: string;
  secondaryImage: string;
};

const PromoBanner = ({
  title,
  description,
  buttonText,
  buttonLink,
  expiryDate,
  primaryImage,
  secondaryImage,
}: PromoBannerProps) => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    if (!expiryDate) return;
    
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = expiryDate.getTime() - now.getTime();
      
      if (difference <= 0) {
        return {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        };
      }
      
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    };
    
    // Initial calculation
    setTimeLeft(calculateTimeLeft());
    
    // Update the countdown every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [expiryDate]);

  // Format number to always have two digits
  const formatNumber = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <section className="py-12 bg-gradient-to-r from-primary to-primaryDark text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">{title}</h2>
            <p className="text-lg opacity-90 mb-6">{description}</p>
            <div className="flex flex-wrap gap-4">
              <Button asChild variant="secondary" className="bg-white text-primary hover:bg-neutral-light">
                <Link href={buttonLink}>{buttonText}</Link>
              </Button>
              
              {expiryDate && (
                <div className="flex items-center space-x-4">
                  <span className="font-bold">Ends in:</span>
                  <div className="flex space-x-2">
                    <div className="bg-white bg-opacity-20 rounded px-2 py-1">
                      <span className="font-mono font-bold">{formatNumber(timeLeft.days)}</span>
                      <span className="text-xs">days</span>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded px-2 py-1">
                      <span className="font-mono font-bold">{formatNumber(timeLeft.hours)}</span>
                      <span className="text-xs">hrs</span>
                    </div>
                    <div className="bg-white bg-opacity-20 rounded px-2 py-1">
                      <span className="font-mono font-bold">{formatNumber(timeLeft.minutes)}</span>
                      <span className="text-xs">min</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src={primaryImage}
              alt="Smart home devices on sale"
              className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300"
            />
            <img
              src={secondaryImage}
              alt="Smart speaker on sale"
              className="rounded-lg shadow-lg transform hover:scale-105 transition duration-300 mt-8"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
