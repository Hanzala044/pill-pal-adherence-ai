
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Bell, BellRing, Clock, Smartphone, MessageSquare, Zap, Brain, AlertTriangle } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';

interface NotificationPreference {
  id: string;
  type: 'medication_reminder' | 'adherence_alert' | 'health_insight' | 'predictive_warning';
  enabled: boolean;
  timing: number; // minutes before
  method: 'push' | 'email' | 'sms';
  priority: 'low' | 'medium' | 'high';
}

interface SmartNotification {
  id: string;
  title: string;
  message: string;
  type: 'reminder' | 'alert' | 'insight' | 'warning';
  priority: 'low' | 'medium' | 'high';
  timestamp: string;
  read: boolean;
  actionRequired: boolean;
}

export default function SmartNotificationSystem() {
  const [preferences, setPreferences] = useState<NotificationPreference[]>([
    {
      id: '1',
      type: 'medication_reminder',
      enabled: true,
      timing: 15,
      method: 'push',
      priority: 'high'
    },
    {
      id: '2',
      type: 'adherence_alert',
      enabled: true,
      timing: 30,
      method: 'push',
      priority: 'medium'
    },
    {
      id: '3',
      type: 'health_insight',
      enabled: false,
      timing: 0,
      method: 'email',
      priority: 'low'
    },
    {
      id: '4',
      type: 'predictive_warning',
      enabled: true,
      timing: 60,
      method: 'push',
      priority: 'high'
    }
  ]);

  const [notifications, setNotifications] = useState<SmartNotification[]>([
    {
      id: '1',
      title: 'Medication Reminder',
      message: 'Time to take your Lisinopril 10mg',
      type: 'reminder',
      priority: 'high',
      timestamp: new Date().toISOString(),
      read: false,
      actionRequired: true
    },
    {
      id: '2',
      title: 'Adherence Alert',
      message: 'You missed your medication yesterday. Would you like to log it?',
      type: 'alert',
      priority: 'medium',
      timestamp: new Date(Date.now() - 3600000).toISOString(),
      read: false,
      actionRequired: true
    },
    {
      id: '3',
      title: 'AI Health Insight',
      message: 'Your adherence pattern suggests you take medications better in the morning. Consider adjusting timing.',
      type: 'insight',
      priority: 'low',
      timestamp: new Date(Date.now() - 7200000).toISOString(),
      read: true,
      actionRequired: false
    }
  ]);

  const { toast } = useToast();

  const savePreferences = async () => {
    // Mock save - in real implementation, save to local storage or user preferences
    console.log('Saving preferences:', preferences);
    
    toast({
      title: "Preferences Saved",
      description: "Your notification preferences have been updated.",
    });
  };

  const updatePreference = (id: string, updates: Partial<NotificationPreference>) => {
    setPreferences(prev => 
      prev.map(pref => 
        pref.id === id ? { ...pref, ...updates } : pref
      )
    );
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder': return <Clock className="h-5 w-5 text-blue-600" />;
      case 'alert': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'insight': return <Brain className="h-5 w-5 text-purple-600" />;
      case 'warning': return <Zap className="h-5 w-5 text-orange-600" />;
      default: return <Bell className="h-5 w-5 text-gray-600" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold gradient-text">Smart Notifications</h1>
        <p className="text-muted-foreground mt-1">
          AI-powered notification system with predictive alerts
        </p>
      </div>

      {/* Notification Preferences */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure your smart notification settings for optimal medication adherence
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {preferences.map((pref) => (
            <div key={pref.id} className="space-y-4 p-4 border rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <Label className="text-base font-medium capitalize">
                    {pref.type.replace('_', ' ')}
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    {pref.type === 'medication_reminder' && 'Reminders before medication time'}
                    {pref.type === 'adherence_alert' && 'Alerts for missed medications'}
                    {pref.type === 'health_insight' && 'AI-generated health insights'}
                    {pref.type === 'predictive_warning' && 'Predictive adherence warnings'}
                  </p>
                </div>
                <Switch
                  checked={pref.enabled}
                  onCheckedChange={(enabled) => updatePreference(pref.id, { enabled })}
                />
              </div>

              {pref.enabled && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label className="text-sm">Timing (minutes before)</Label>
                    <div className="mt-2">
                      <Slider
                        value={[pref.timing]}
                        onValueChange={([timing]) => updatePreference(pref.id, { timing })}
                        max={120}
                        min={0}
                        step={5}
                        className="w-full"
                      />
                      <div className="text-xs text-muted-foreground mt-1">
                        {pref.timing} minutes
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm">Method</Label>
                    <div className="flex gap-2 mt-2">
                      {['push', 'email', 'sms'].map((method) => (
                        <Button
                          key={method}
                          variant={pref.method === method ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updatePreference(pref.id, { method: method as any })}
                        >
                          {method === 'push' && <Smartphone className="h-4 w-4 mr-1" />}
                          {method === 'email' && <MessageSquare className="h-4 w-4 mr-1" />}
                          {method === 'sms' && <BellRing className="h-4 w-4 mr-1" />}
                          {method.toUpperCase()}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm">Priority</Label>
                    <div className="flex gap-2 mt-2">
                      {['low', 'medium', 'high'].map((priority) => (
                        <Button
                          key={priority}
                          variant={pref.priority === priority ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => updatePreference(pref.id, { priority: priority as any })}
                        >
                          {priority.charAt(0).toUpperCase() + priority.slice(1)}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-end">
            <Button onClick={savePreferences}>
              Save Preferences
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Recent Notifications */}
      <Card className="gradient-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BellRing className="h-5 w-5" />
            Recent Notifications
          </CardTitle>
          <CardDescription>
            Your latest smart notifications and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 border rounded-lg transition-all cursor-pointer ${
                  notification.read ? 'bg-muted/30' : 'bg-background border-primary/20'
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-medium truncate">{notification.title}</p>
                      <Badge className={getPriorityColor(notification.priority)} variant="secondary">
                        {notification.priority}
                      </Badge>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-primary rounded-full"></div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">
                        {new Date(notification.timestamp).toLocaleString()}
                      </span>
                      {notification.actionRequired && (
                        <Button size="sm" variant="outline">
                          Take Action
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Notification Intelligence */}
      <Card className="gradient-card border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5 text-purple-600" />
            AI Notification Intelligence
          </CardTitle>
          <CardDescription>
            Machine learning insights about your notification patterns
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="font-medium">Optimal Timing Analysis</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Morning (6-12 PM)</span>
                  <span className="text-sm font-medium">92% response rate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Afternoon (12-6 PM)</span>
                  <span className="text-sm font-medium">78% response rate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Evening (6-10 PM)</span>
                  <span className="text-sm font-medium">85% response rate</span>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium">Prediction Accuracy</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Adherence Predictions</span>
                  <span className="text-sm font-medium">94% accurate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Risk Assessments</span>
                  <span className="text-sm font-medium">89% accurate</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Timing Optimization</span>
                  <span className="text-sm font-medium">87% accurate</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
