import React from 'react';
import { Bell, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export default function Header() {
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have checked your notifications",
    });
  };

  const handleProfileAction = (action: string) => {
    switch(action) {
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
          description: `You clicked on ${action}`,
        });
    }
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-40">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <a href="/">
            <img 
              src="/placeholder.svg" 
              alt="PillPal Logo" 
              className="w-8 h-8"
            />
          </a>
          <h1 className="text-xl font-semibold text-primary">PillPal</h1>
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
    </header>
  );
}
