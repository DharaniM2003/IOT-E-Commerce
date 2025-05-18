import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import LoginForm from "@/components/auth/LoginForm";
import { useAuth } from "@/store/authStore";

const LoginPage = () => {
  const [location] = useLocation();
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Get redirect URL from query parameters if any
  const getRedirectUrl = () => {
    const searchParams = new URLSearchParams(location.split('?')[1] || '');
    return searchParams.get('redirect') || '/';
  };

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(getRedirectUrl());
    }
  }, [isAuthenticated, navigate]);

  // Update document title
  document.title = "Sign In - TechHub";

  return (
    <div className="bg-neutral-light py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Welcome Back</CardTitle>
              <CardDescription>
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <LoginForm />
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              By signing in, you agree to our{" "}
              <Link href="/about" className="text-primary hover:underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/about" className="text-primary hover:underline">
                Privacy Policy
              </Link>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
