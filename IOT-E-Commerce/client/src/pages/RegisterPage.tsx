import { useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import RegisterForm from "@/components/auth/RegisterForm";
import { useAuth } from "@/store/authStore";

const RegisterPage = () => {
  const { isAuthenticated } = useAuth();
  const [, navigate] = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Update document title
  document.title = "Create Account - TechHub";

  return (
    <div className="bg-neutral-light py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Create an Account</CardTitle>
              <CardDescription>
                Join TechHub to shop the latest IoT devices
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <RegisterForm />
            </CardContent>
          </Card>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              By creating an account, you agree to our{" "}
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

export default RegisterPage;
