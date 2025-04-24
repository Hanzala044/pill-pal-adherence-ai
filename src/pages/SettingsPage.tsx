
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications" className="text-base">Enable Notifications</Label>
            <Switch id="notifications" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="email-alerts" className="text-base">Email Alerts</Label>
            <Switch id="email-alerts" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="dark-mode" className="text-base">Dark Mode</Label>
            <Switch id="dark-mode" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
