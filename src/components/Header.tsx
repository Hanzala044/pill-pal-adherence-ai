import React, { useState } from 'react';
import { Search, Bell, TestTube, Beaker, Info, Settings } from 'lucide-react';
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
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about', icon: Info },
    { name: 'Services', path: '/services', icon: Settings },
    { name: 'Contact', path: '/contact' },
  ];
  
  return (
    <header className="bg-[#012E2B] border-b border-[#8B5CF6]/20 sticky top-0 z-40 w-full">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-[20px] mx-auto">
        <div className="flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 group relative">
            <div className="relative">
              <TestTube className={`${isMobile ? 'w-6 h-6' : 'w-8 h-8'} text-white rotate-12 transition-all duration-500 group-hover:rotate-0 transform-gpu`} strokeWidth={2.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Beaker className={`${isMobile ? 'w-4 h-4' : 'w-5 h-5'} text-[#D946EF] opacity-90 animate-[pulse_2s_ease-in-out_infinite] transform-gpu`} />
              </div>
            </div>
            <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-bold text-white font-space tracking-wider hover:scale-105 transition-transform duration-300`}>
              PillPal
            </span>
          </a>

          {!isMobile && (
            <form onSubmit={handleSearch} className="relative flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search..."
                className="w-full rounded-full bg-white/10 border-transparent focus:border-white/30 text-white placeholder:text-white/60"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                type="submit"
                variant="ghost" 
                size="icon" 
                className="absolute right-1 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                <Search className="h-5 w-5" />
              </Button>
            </form>
          )}
        </div>

        <div className="flex items-center gap-2">
          {!isMobile && (
            <nav className="mr-4">
              <ul className="flex items-center gap-6">
                {navigationItems.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.path}
                      className="text-white/80 hover:text-white transition-colors duration-200 flex items-center gap-1"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative text-white">
                <Bell className={`${isMobile ? 'h-4 w-4' : 'h-5 w-5'}`} />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[280px] sm:w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="max-h-80 overflow-auto">
                <DropdownMenuItem className="cursor-pointer" onClick={() => handleProfileAction("Take Atorvastatin")}>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Time to take Atorvastatin</span>
                    <span className="text-sm text-muted-foreground">Your evening medication is due now</span>
                    <span className="text-xs text-muted-foreground">2 minutes ago</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => handleProfileAction("View medication verification")}>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Medication verified</span>
                    <span className="text-sm text-muted-foreground">Your Metformin intake was verified</span>
                    <span className="text-xs text-muted-foreground">Today at 6:15 PM</span>
                  </div>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer" onClick={() => handleProfileAction("View missed medication")}>
                  <div className="flex flex-col gap-1">
                    <span className="font-medium">Medication missed</span>
                    <span className="text-sm text-muted-foreground">You missed your Atorvastatin dose</span>
                    <span className="text-xs text-muted-foreground">Yesterday at 8:00 PM</span>
                  </div>
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative flex items-center gap-2 text-white" size="sm">
                <Avatar className={`${isMobile ? 'h-6 w-6' : 'h-8 w-8'}`}>
                  <AvatarImage src="" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <span className="hidden sm:inline-block">John Doe</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileAction("Profile")}>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleProfileAction("Settings")}>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleProfileAction("Log out")}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {isMobile && (
        <div className="px-4 pb-3">
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-full bg-white/10 border-transparent focus:border-white/30 text-white placeholder:text-white/60"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              type="submit"
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
            >
              <Search className="h-5 w-5" />
            </Button>
          </form>
        </div>
      )}
    </header>
  );
}
