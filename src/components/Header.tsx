
import React, { useState } from 'react';
import { Search, Bell, Menu, User, Settings, LogOut, HelpCircle } from 'lucide-react';
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, 
  DropdownMenuSeparator, DropdownMenuTrigger, Avatar, AvatarFallback, AvatarImage, Input } from '@/components/ui/shared';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { useIsMobile } from '@/hooks/use-mobile';

export default function Header() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Search",
      description: `Searching for: ${searchQuery}`
    });
  };

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have checked your notifications"
    });
  };
  
  const handleProfileAction = (action: string) => {
    switch (action) {
      case "Profile":
        navigate('/profile');
        break;
      case "Settings":
        navigate('/settings');
        break;
      case "Log out":
        toast({
          title: "Logged out",
          description: "You have been successfully logged out"
        });
        navigate('/');
        break;
      default:
        toast({
          title: action,
          description: `You clicked on ${action}`
        });
    }
  };

  const navigationItems = [
    { name: 'Dashboard', path: '/' },
    { name: 'Medications', path: '/medications' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'History', path: '/history' },
    { name: 'Security', path: '/security' },
  ];
  
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 w-full backdrop-blur-sm bg-white/95 shadow-sm">
      <div className="container flex h-16 items-center justify-between px-6 mx-auto">
        {/* Logo and Brand */}
        <div className="flex items-center gap-8">
          <a href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-all duration-200">
                <div className="w-4 h-4 bg-white rounded-sm opacity-90"></div>
              </div>
            </div>
            <span className="text-xl font-semibold text-slate-900 font-inter tracking-tight">
              PillPal
            </span>
          </a>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden lg:flex">
              <ul className="flex items-center gap-1">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.path}
                      className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-colors duration-200"
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </div>

        {/* Center Search - Desktop Only */}
        {!isMobile && (
          <div className="flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search medications, history..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
        )}

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5 text-slate-600" />
            </Button>
          )}

          {/* Mobile Search Button */}
          {isMobile && (
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5 text-slate-600" />
            </Button>
          )}

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-slate-600" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80 bg-white border border-slate-200 shadow-lg">
              <DropdownMenuLabel className="font-semibold text-slate-900">Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="cursor-pointer p-4 hover:bg-slate-50" onClick={() => handleProfileAction("Take Atorvastatin")}>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <span className="font-medium text-slate-900">Time to take Atorvastatin</span>
                    </div>
                    <span className="text-sm text-slate-600">Your evening medication is due now</span>
                    <span className="text-xs text-slate-400">2 minutes ago</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer p-4 hover:bg-slate-50" onClick={() => handleProfileAction("View medication verification")}>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                      <span className="font-medium text-slate-900">Medication verified</span>
                    </div>
                    <span className="text-sm text-slate-600">Your Metformin intake was verified</span>
                    <span className="text-xs text-slate-400">Today at 6:15 PM</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer p-4 hover:bg-slate-50" onClick={() => handleProfileAction("View missed medication")}>
                  <div className="flex flex-col gap-1 w-full">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-amber-600 rounded-full"></div>
                      <span className="font-medium text-slate-900">Medication missed</span>
                    </div>
                    <span className="text-sm text-slate-600">You missed your Atorvastatin dose</span>
                    <span className="text-xs text-slate-400">Yesterday at 8:00 PM</span>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          {/* User Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center gap-2 pl-2 pr-3 py-2 hover:bg-slate-50 rounded-lg">
                <Avatar className="h-8 w-8 border-2 border-slate-200">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-blue-600 text-white text-sm font-medium">JD</AvatarFallback>
                </Avatar>
                {!isMobile && (
                  <div className="flex flex-col items-start text-left">
                    <span className="text-sm font-medium text-slate-900">John Doe</span>
                    <span className="text-xs text-slate-500">john@pillpal.com</span>
                  </div>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56 bg-white border border-slate-200 shadow-lg">
              <DropdownMenuLabel className="font-semibold text-slate-900">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileAction("Profile")} className="cursor-pointer hover:bg-slate-50">
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleProfileAction("Settings")} className="cursor-pointer hover:bg-slate-50">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-slate-50">
                <HelpCircle className="mr-2 h-4 w-4" />
                Help & Support
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileAction("Log out")} className="cursor-pointer hover:bg-slate-50 text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {isMobile && (
        <div className="px-4 pb-3 border-t border-slate-100">
          <form onSubmit={handleSearch} className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              type="search"
              placeholder="Search medications, history..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-slate-200 focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-lg text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
        </div>
      )}
    </header>
  );
}
