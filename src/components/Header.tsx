import React from 'react';
import { Bell, TestTube, Beaker } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
export default function Header() {
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
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
  return <header className="bg-gradient-to-r from-[#1a1a1a] to-[#2d1f3d] border-b border-[#8B5CF6]/20 sticky top-0 z-40 backdrop-blur-sm">
      <div className="container flex h-16 items-center justify-between rounded-md px-[20px] mx-[5px] bg-pink-200 py-[15px]">
        <div className="flex items-center gap-2">
          <a href="/" className="flex items-center gap-2 group relative">
            <div className="relative">
              <TestTube className="w-8 h-8 text-[#8B5CF6] rotate-12 transition-all duration-500 group-hover:rotate-0 transform-gpu" strokeWidth={2.5} />
              <div className="absolute inset-0 flex items-center justify-center">
                <Beaker className="w-5 h-5 text-[#D946EF] opacity-90 animate-[pulse_2s_ease-in-out_infinite] transform-gpu" style={{
                filter: 'drop-shadow(0 0 10px #8B5CF6) drop-shadow(0 0 20px #D946EF)',
                animation: 'float-slow 3s ease-in-out infinite'
              }} />
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-tl from-[#8B5CF6]/20 via-[#D946EF]/20 to-[#8B5CF6]/20 blur-xl -z-10 group-hover:from-[#8B5CF6]/30 group-hover:via-[#D946EF]/30 group-hover:to-[#8B5CF6]/30 transition-all duration-500" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-[#8B5CF6] via-[#D946EF] to-[#8B5CF6] bg-clip-text text-transparent font-space tracking-wider hover:scale-105 transition-transform duration-300" style={{
            textShadow: '0 0 20px rgba(139, 92, 246, 0.5)'
          }}>
              PillPal
            </span>
          </a>
        </div>
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative" onClick={handleNotificationClick}>
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
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
              <Button variant="ghost" className="relative flex items-center gap-2" size="sm">
                <Avatar className="h-8 w-8">
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
    </header>;
}