
import React from 'react';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Home, Camera, PillIcon, Calendar, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedBackground from './AnimatedBackground';

export default function Layout() {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Take Medication', href: '/camera', icon: Camera },
    { name: 'Medications', href: '/medications', icon: PillIcon },
    { name: 'History', href: '/history', icon: Calendar },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      
      <div className="flex-1 flex">
        {isMobile ? (
          <div className="fixed bottom-0 left-0 right-0 z-50 gradient-card p-2">
            <div className="flex justify-around items-center">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex flex-col items-center p-2 ${
                      isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span className="text-xs mt-1">{item.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="w-64 gradient-card border-r border-border/30 p-4 hidden md:block">
            <nav className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-300 ${
                      isActive 
                        ? 'gradient-button text-white shadow-lg' 
                        : 'hover:gradient-border text-muted-foreground hover:text-accent-foreground hover:scale-105'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.name}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        )}
        
        <main className="flex-1 relative">
          <div className="curved-panel">
            <div className="panel-content">
              <div className="container mx-auto max-w-5xl p-6 pb-20 md:pb-6">
                <Outlet />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
