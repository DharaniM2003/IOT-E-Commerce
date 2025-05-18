import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Loader2, Camera, User, Lock, MapPin, Bell, LogOut } from 'lucide-react';

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('personal-info');
  
  // Example user data - would come from auth context in a real app
  const user = {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street",
    city: "Tech City",
    state: "CA",
    zipCode: "90210",
    country: "United States",
    avatar: null // URL to avatar image if available
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Show success message
      alert('Profile updated successfully!');
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your account information and settings</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center">
                <div className="relative">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg">
                      {user.name?.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button size="icon" variant="secondary" className="w-8 h-8 absolute bottom-0 right-0 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                </div>
                <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
                <p className="text-sm text-muted-foreground">{user.email}</p>
                
                <div className="w-full mt-6 space-y-1">
                  <button 
                    onClick={() => setActiveTab('personal-info')}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${activeTab === 'personal-info' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Personal Information
                  </button>
                  <button 
                    onClick={() => setActiveTab('password')}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${activeTab === 'password' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  >
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </button>
                  <button 
                    onClick={() => setActiveTab('address')}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${activeTab === 'address' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  >
                    <MapPin className="mr-2 h-4 w-4" />
                    Address
                  </button>
                  <button 
                    onClick={() => setActiveTab('notifications')}
                    className={`flex items-center w-full px-3 py-2 text-sm rounded-md ${activeTab === 'notifications' ? 'bg-primary text-primary-foreground' : 'hover:bg-accent'}`}
                  >
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </button>
                </div>
                
                <Button variant="destructive" className="mt-6 w-full">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>
                {activeTab === 'personal-info' && 'Personal Information'}
                {activeTab === 'password' && 'Change Password'}
                {activeTab === 'address' && 'Address Information'}
                {activeTab === 'notifications' && 'Notification Preferences'}
              </CardTitle>
              <CardDescription>
                {activeTab === 'personal-info' && 'Update your personal details'}
                {activeTab === 'password' && 'Update your password to secure your account'}
                {activeTab === 'address' && 'Manage your shipping addresses'}
                {activeTab === 'notifications' && 'Control how you receive notifications'}
              </CardDescription>
            </CardHeader>

            <CardContent>
              {activeTab === 'personal-info' && (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input id="name" defaultValue={user.name} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue={user.email} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" defaultValue={user.phone} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Changes
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {activeTab === 'password' && (
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input id="confirm-password" type="password" />
                    </div>
                    <Button type="submit" disabled={isLoading}>
                      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                      Update Password
                    </Button>
                  </div>
                </form>
              )}

              {activeTab === 'address' && (
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" defaultValue={user.address} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue={user.city} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State/Province</Label>
                      <Input id="state" defaultValue={user.state} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP/Postal Code</Label>
                      <Input id="zipCode" defaultValue={user.zipCode} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" defaultValue={user.country} />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Button type="submit" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save Address
                      </Button>
                    </div>
                  </div>
                </form>
              )}

              {activeTab === 'notifications' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">Receive order updates via email</p>
                    </div>
                    <Input type="checkbox" className="w-6 h-6" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Order Updates</h3>
                      <p className="text-sm text-muted-foreground">Receive notifications about your orders</p>
                    </div>
                    <Input type="checkbox" className="w-6 h-6" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotional Emails</h3>
                      <p className="text-sm text-muted-foreground">Receive emails about new products and deals</p>
                    </div>
                    <Input type="checkbox" className="w-6 h-6" />
                  </div>
                  <Button onClick={handleSubmit} disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Preferences
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;