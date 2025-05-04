
import React from 'react';
import Header from './Header';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Camera, PillIcon, Calendar, Info, Settings, Phone, LogOut, User } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedBackground from './AnimatedBackground';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export default function Layout() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const { signOut, user } = useAuth();
  const { toast } = useToast();
  
  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Take Medication', href: '/camera', icon: Camera },
    { name: 'Medications', href: '/medications', icon: PillIcon },
    { name: 'History', href: '/history', icon: Calendar },
    { name: 'About Us', href: '/about', icon: Info },
    { name: 'Services', href: '/services', icon: Settings },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      
      <div className="flex-1 flex relative">
        {!isMobile && (
          <div className="w-64 gradient-card border-r border-border/30 p-4 hidden md:block">
            <div className="flex flex-col h-full">
              <nav className="space-y-2 flex-1">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                        isActive 
                          ? 'gradient-button text-white' 
                          : 'hover:gradient-border text-muted-foreground hover:text-accent-foreground'
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                <Link
                  to="/profile"
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === '/profile'
                      ? 'gradient-button text-white' 
                      : 'hover:gradient-border text-muted-foreground hover:text-accent-foreground'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
              </nav>
              
              <div className="mt-4 pt-4 border-t border-border/30">
                <button
                  onClick={handleSignOut}
                  className="flex w-full items-center space-x-3 px-3 py-2 rounded-md transition-colors text-muted-foreground hover:text-red-500"
                >
                  <LogOut className="h-5 w-5" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        )}
        
        <main className="flex-1 p-4 sm:p-6 pb-20 sm:pb-6 container mx-auto max-w-5xl relative z-10">
          <Outlet />
        </main>

        {isMobile && (
          <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1a1a1a] to-[#2d1f3d] border-t border-[#8B5CF6]/20 backdrop-blur-sm p-2">
            <div className="flex justify-around items-center">
              {navigation.slice(0, 5).map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex flex-col items-center p-2 ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs mt-1">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </nav>
        )}
      </div>
    </div>
  );
}
