
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/shared';

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text">About PillPal</h1>
        <p className="text-muted-foreground mt-2">Your medication companion for better health management</p>
      </div>

      <Card className="gradient-card">
        <CardHeader>
          <CardTitle>Our Mission</CardTitle>
          <CardDescription>Empowering individuals to take control of their medication journey</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            PillPal was created with a simple yet powerful vision: to transform the way people manage their medications. 
            We understand the challenges that come with medication adherence, from complex schedules to forgetfulness, 
            which is why we've built an intuitive platform that makes medication management seamless and stress-free.
          </p>
          <p>
            Our team combines expertise in healthcare, technology, and user experience to deliver a solution that 
            truly makes a difference in people's daily lives.
          </p>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>How PillPal Works</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              PillPal uses advanced computer vision technology to verify your medication intake. Simply open the app, 
              use the camera to scan your medication, and our AI will verify that you're taking the right pill at the right time.
            </p>
            <p>
              The app sends timely reminders, tracks your adherence history, and provides insights to help you stay on track 
              with your medication regimen. All of this data is securely stored and accessible only to you and those you choose 
              to share it with.
            </p>
          </CardContent>
        </Card>

        <Card className="gradient-card">
          <CardHeader>
            <CardTitle>Benefits for You</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 list-disc pl-5">
              <li>Never miss a dose with smart reminders</li>
              <li>Verify medications with our pill recognition technology</li>
              <li>Track your adherence history with detailed insights</li>
              <li>Share reports with healthcare providers if needed</li>
              <li>Manage medications for yourself or loved ones</li>
              <li>Access educational resources about your medications</li>
              <li>Receive alerts for potential drug interactions</li>
              <li>Simplified refill management system</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="gradient-card mt-6">
        <CardHeader>
          <CardTitle>Privacy & Security</CardTitle>
        </CardHeader>
        <CardContent>
          <p>
            We take your privacy seriously. PillPal employs end-to-end encryption and follows strict data 
            protection protocols to ensure your medical information remains confidential. We do not sell your 
            data, and you have complete control over what information is stored and shared.
          </p>
        </CardContent>
      </Card>

      <div className="text-center mt-8">
        <h2 className="text-2xl font-bold gradient-text">Join the PillPal Community</h2>
        <p className="mt-2 max-w-2xl mx-auto">
          Join thousands of users who have transformed their medication management experience. 
          PillPal is more than an app - it's a companion on your journey to better health.
        </p>
      </div>
    </div>
  );
}
