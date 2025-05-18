import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { AuthProvider } from "./store/authStore";
import { CartProvider } from "./store/cartStore";
import Layout from "@/components/layout/Layout";

// Pages
import HomePage from "@/pages/HomePage";
import NotFound from "@/pages/not-found";
import ProductsPage from "@/pages/ProductsPage";
import ProductPage from "@/pages/ProductPage";
import CategoryPage from "@/pages/CategoryPage";
import CartPage from "@/pages/CartPage";
import CheckoutPage from "@/pages/CheckoutPage";
import PlaceOrderPage from "@/pages/PlaceOrderPage"; 
import InvoicePage from "@/pages/InvoicePage";
import LoginPage from "@/pages/LoginPage";
import RegisterPage from "@/pages/RegisterPage";
import ProfilePage from "@/pages/ProfilePage";
import OrderHistoryPage from "@/pages/OrderHistoryPage";
import NotificationsPage from "@/pages/NotificationsPage"; 
import TrackOrderPage from "@/pages/TrackOrderPage";
import WishlistPage from "@/pages/WishlistPage";
import ContactPage from "@/pages/ContactPage";
import AboutPage from "@/pages/AboutPage";
import SearchPage from "@/pages/SearchPage";
import DealsPage from "@/pages/DealsPage";
import LogoutPage from "@/pages/LogoutPage";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={HomePage} />
        <Route path="/shop" component={ProductsPage} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/deals" component={DealsPage} />
        <Route path="/category/:name" component={CategoryPage} />
        <Route path="/cart" component={CartPage} />
        <Route path="/checkout" component={CheckoutPage} />
        <Route path="/place-order" component={PlaceOrderPage} />
        <Route path="/invoice/:orderId" component={InvoicePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/profile" component={ProfilePage} />
        <Route path="/history" component={OrderHistoryPage} />
        <Route path="/notifications" component={NotificationsPage} />
        <Route path="/track-order" component={TrackOrderPage} />
        <Route path="/wishlist" component={WishlistPage} />
        <Route path="/contact" component={ContactPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/search" component={SearchPage} />
        <Route path="/logout" component={LogoutPage} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="techhub-theme">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <AuthProvider>
            <CartProvider>
              <div className="app">
                <Router />
                <Toaster />
              </div>
            </CartProvider>
          </AuthProvider>
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;