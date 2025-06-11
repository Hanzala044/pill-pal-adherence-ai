
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/shared';
import { Button } from '@/components/ui/shared';
import { Switch } from '@/components/ui/switch';
import { Bell, Brain, Clock, Target, Zap } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface NotificationSettings {
  smartReminders: boolean;
  predictiveAlerts: boolean;
  adaptiveTiming: boolean;
  riskAlerts: boolean;
  socialReminders: boolean;
}

const SmartNotificationSystem = () => {
  const [settings, setSettings] = useState<NotificationSettings>({
    smartReminders: true,
    predictiveAlerts: true,
    adaptiveTiming: true,
    riskAlerts: true,
    socialReminders: false,
  });

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'smart',
      title: 'Optimal Medication Time',
      message: 'Based on your patterns, now is the best time to take your evening medication.',
      time: '2 minutes ago',
      priority: 'high'
    },
    {
      id: 2,
      type: 'predictive',
      title: 'Risk Alert',
      message: 'You have a 73% chance of missing your next dose. Set a reminder?',
      time: '1 hour ago',
      priority: 'urgent'
    },
    {
      id: 3,
      type: 'adaptive',
      title: 'Schedule Optimization',
      message: 'Your medication schedule has been adjusted for better adherence.',
      time: '3 hours ago',
      priority: 'medium'
    }
  ]);

  const updateSetting = async (key: keyof NotificationSettings, value: boolean) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    
    // Save to database
    try {
      await supabase
        .from('user_preferences')
        .upsert({ 
          setting_key: key, 
          setting_value: value,
          updated_at: new Date().toISOString()
        });
    } catch (error) {
      console.error('Error saving notification settings:', error);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-blue-500 bg-blue-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'smart': return <Brain className="h-4 w-4 text-purple-600" />;
      case 'predictive': return <Target className="h-4 w-4 text-orange-600" />;
      case 'adaptive': return <Zap className="h-4 w-4 text-blue-600" />;
      default: return <Bell className="h-4 w-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold gradient-text">Smart Notifications</h1>
        <p className="text-muted-foreground mt-1">AI-powered notification system with predictive insights</p>
      </div>

      {/* Notification Settings */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            Intelligence Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Smart Reminders</div>
              <div className="text-sm text-muted-foreground">AI-optimized timing based on your behavior</div>
            </div>
            <Switch
              checked={settings.smartReminders}
              onCheckedChange={(checked) => updateSetting('smartReminders', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Predictive Alerts</div>
              <div className="text-sm text-muted-foreground">Early warnings for potential missed doses</div>
            </div>
            <Switch
              checked={settings.predictiveAlerts}
              onCheckedChange={(checked) => updateSetting('predictiveAlerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Adaptive Timing</div>
              <div className="text-sm text-muted-foreground">Automatically adjust schedules for better adherence</div>
            </div>
            <Switch
              checked={settings.adaptiveTiming}
              onCheckedChange={(checked) => updateSetting('adaptiveTiming', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Risk Alerts</div>
              <div className="text-sm text-muted-foreground">Notifications when health risks are detected</div>
            </div>
            <Switch
              checked={settings.riskAlerts}
              onCheckedChange={(checked) => updateSetting('riskAlerts', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Social Reminders</div>
              <div className="text-sm text-muted-foreground">Involve family/caregivers in medication reminders</div>
            </div>
            <Switch
              checked={settings.socialReminders}
              onCheckedChange={(checked) => updateSetting('socialReminders', checked)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Recent Smart Notifications
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div key={notification.id} className={`p-4 border-l-4 rounded-lg ${getPriorityColor(notification.priority)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    {getTypeIcon(notification.type)}
                    <div>
                      <div className="font-medium text-sm">{notification.title}</div>
                      <div className="text-sm text-gray-600 mt-1">{notification.message}</div>
                      <div className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {notification.time}
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Dismiss
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SmartNotificationSystem;
