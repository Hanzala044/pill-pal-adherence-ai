
import React, { useState } from 'react';
import Header from './Header';
import { Outlet, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  Home, Camera, PillIcon, Calendar, BarChart3, Bell, TrendingUp, Shield, 
  Info, Settings, Phone, LogIn, Brain, FileText, Heart, MessageSquare,
  ChevronDown, ChevronRight, Moon, Sun, Menu, X
} from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import AnimatedBackground from './AnimatedBackground';

export default function Layout() {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [expandedSections, setExpandedSections] = useState<string[]>(['core', 'insights']);
  
  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const sidebarSections = [
    {
      id: 'core',
      title: 'Core Features',
      icon: Home,
      collapsible: true,
      items: [
        { name: 'Dashboard', href: '/', icon: Home, description: 'Overview & quick actions' },
        { name: 'Take Medication', href: '/camera', icon: Camera, description: 'Scan & log medications', badge: 'AI' },
        { name: 'My Medications', href: '/medications', icon: PillIcon, description: 'Manage prescriptions' },
        { name: 'History', href: '/history', icon: Calendar, description: 'Track medication timeline' },
      ]
    },
    {
      id: 'insights',
      title: 'Smart Insights',
      icon: Brain,
      collapsible: true,
      items: [
        { name: 'Analytics', href: '/analytics', icon: BarChart3, description: 'Adherence analytics' },
        { name: 'Predictive Health', href: '/predictive', icon: TrendingUp, description: 'AI-powered predictions', badge: 'New' },
        { name: 'Health Reports', href: '/reports', icon: FileText, description: 'Generate detailed reports' },
        { name: 'Wellness Score', href: '/wellness', icon: Heart, description: 'Track health metrics' },
      ]
    },
    {
      id: 'communication',
      title: 'Communication',
      icon: MessageSquare,
      collapsible: true,
      items: [
        { name: 'Smart Reminders', href: '/notifications', icon: Bell, description: 'Intelligent notifications' },
        { name: 'AI Assistant', href: '/assistant', icon: Brain, description: 'Chat with health AI', badge: 'Beta' },
        { name: 'Contact Support', href: '/contact', icon: Phone, description: '24/7 health support' },
      ]
    },
    {
      id: 'account',
      title: 'Account & Settings',
      icon: Settings,
      collapsible: false,
      items: [
        { name: 'Security Center', href: '/security', icon: Shield, description: 'Privacy & data protection' },
        { name: 'Settings', href: '/settings', icon: Settings, description: 'App preferences' },
        { name: 'About PillPal', href: '/about', icon: Info, description: 'Learn about our mission' },
        { name: 'Sign In', href: '/signin', icon: LogIn, description: 'Access your account' },
      ]
    }
  ];

  const isActive = (href: string) => location.pathname === href;

  const SidebarContent = () => (
    <div className="h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="p-6 border-b border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <PillIcon className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white text-lg">PillPal</h2>
              <p className="text-xs text-white/60">Smart Health Management</p>
            </div>
          </div>
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="text-white/60 hover:text-white hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {sidebarSections.map((section) => {
          const SectionIcon = section.icon;
          const isExpanded = expandedSections.includes(section.id);
          
          return (
            <div key={section.id} className="space-y-2">
              {/* Section Header */}
              {section.collapsible ? (
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between p-2 text-white/70 hover:text-white transition-colors group"
                >
                  <div className="flex items-center space-x-2">
                    <SectionIcon className="w-4 h-4" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronDown className="w-4 h-4 transition-transform duration-200" />
                  ) : (
                    <ChevronRight className="w-4 h-4 transition-transform duration-200" />
                  )}
                </button>
              ) : (
                <div className="flex items-center space-x-2 p-2 text-white/70">
                  <SectionIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{section.title}</span>
                </div>
              )}

              {/* Section Items */}
              {(!section.collapsible || isExpanded) && (
                <div className="space-y-1 ml-2">
                  {section.items.map((item) => {
                    const Icon = item.icon;
                    const active = isActive(item.href);
                    
                    return (
                      <div key={item.name} className="group relative">
                        <a
                          href={item.href}
                          onClick={() => isMobile && setSidebarOpen(false)}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                            active 
                              ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white border border-purple-500/30 shadow-lg shadow-purple-500/10' 
                              : 'hover:bg-white/5 text-white/70 hover:text-white hover:translate-x-1'
                          }`}
                        >
                          <div className={`relative ${active ? 'text-purple-300' : ''}`}>
                            <Icon className="w-5 h-5" />
                            {active && (
                              <div className="absolute -inset-1 bg-purple-500/20 rounded-full animate-pulse" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-2">
                              <span className={`font-medium ${active ? 'text-white' : ''}`}>
                                {item.name}
                              </span>
                              {item.badge && (
                                <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                                  item.badge === 'AI' ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' :
                                  item.badge === 'New' ? 'bg-green-500/20 text-green-300 border border-green-500/30' :
                                  'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            {!isMobile && (
                              <p className="text-xs text-white/50 mt-0.5 truncate">
                                {item.description}
                              </p>
                            )}
                          </div>
                        </a>
                        
                        {/* Tooltip for mobile */}
                        {isMobile && (
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            {item.description}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Sidebar Footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white text-xs font-semibold">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">John Doe</p>
              <p className="text-white/50 text-xs truncate">Premium Member</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-white/60 hover:text-white hover:bg-white/10 p-2"
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatedBackground />
      <Header />
      
      <div className="flex-1 flex relative">
        {/* Desktop Sidebar */}
        {!isMobile && (
          <div className="w-80 fixed left-0 top-16 bottom-0 z-40">
            {/* Glassmorphic Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-purple-900/30 to-pink-900/30 backdrop-blur-xl border-r border-white/10">
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent" />
            </div>
            
            {/* Content */}
            <div className="relative h-full">
              <SidebarContent />
            </div>
          </div>
        )}
        
        {/* Main Content */}
        <main className={`flex-1 ${!isMobile ? 'ml-80' : ''} p-4 sm:p-6 pb-20 sm:pb-6 container mx-auto max-w-5xl relative z-10`}>
          {/* Mobile Menu Button */}
          {isMobile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(true)}
              className="fixed top-20 left-4 z-50 bg-black/20 backdrop-blur-sm border border-white/10 text-white hover:bg-white/10"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          <Outlet />
        </main>

        {/* Mobile Sidebar Overlay */}
        {isMobile && sidebarOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              onClick={() => setSidebarOpen(false)}
            />
            
            {/* Sidebar */}
            <div className="fixed left-0 top-0 bottom-0 w-80 z-50 transform transition-transform duration-300">
              {/* Glassmorphic Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-purple-900/40 to-pink-900/40 backdrop-blur-xl">
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
              </div>
              
              {/* Content */}
              <div className="relative h-full">
                <SidebarContent />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
