
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/shared';
import { PillIcon, Camera, Bell, Calendar, Share2, FileText, BookOpen, AlertTriangle, ShoppingBag } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      id: "medication-verification",
      title: "Medication Verification",
      icon: <Camera className="h-6 w-6 text-primary" />,
      description: "Our advanced computer vision system verifies that you're taking the right medication at the right time.",
      details: "Using your device's camera, PillPal can identify pills by their shape, color, and markings. Simply hold the pill in front of your camera, and our AI will verify it against your prescription information. This helps prevent medication errors and gives you peace of mind knowing you're taking the correct medication."
    },
    {
      id: "smart-reminders",
      title: "Smart Reminders",
      icon: <Bell className="h-6 w-6 text-primary" />,
      description: "Never miss a dose with our customizable reminder system that adapts to your schedule.",
      details: "Set up personalized reminders based on your medication schedule. PillPal sends notifications exactly when you need to take your medications, and can even adjust based on your daily routine. The app intelligently adapts if you're traveling across time zones or if your schedule changes."
    },
    {
      id: "adherence-tracking",
      title: "Adherence Tracking",
      icon: <Calendar className="h-6 w-6 text-primary" />,
      description: "Comprehensive history tracking helps you monitor your medication adherence over time.",
      details: "View detailed reports on your medication adherence with easy-to-understand visualizations. Track patterns, identify missed doses, and see how your adherence improves over time. These insights help you and your healthcare provider make informed decisions about your treatment plan."
    },
    {
      id: "healthcare-sharing",
      title: "Healthcare Sharing",
      icon: <Share2 className="h-6 w-6 text-primary" />,
      description: "Securely share your medication history with healthcare providers for better coordinated care.",
      details: "Generate comprehensive medication adherence reports that can be shared with your doctors, pharmacists, or caregivers. This feature facilitates better communication with your healthcare team and enables them to provide more personalized care based on your actual medication usage."
    },
    {
      id: "prescription-management",
      title: "Prescription Management",
      icon: <FileText className="h-6 w-6 text-primary" />,
      description: "Digitally manage all your prescriptions in one secure place.",
      details: "Store all your prescription information in one secure location. The app maintains a complete list of your current and past medications, including dosage instructions, prescribing doctors, and pharmacy information. PillPal also helps you keep track of refill dates and sends timely reminders when you're running low."
    },
    {
      id: "medication-education",
      title: "Medication Education",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      description: "Access reliable information about your medications directly within the app.",
      details: "For each medication in your profile, PillPal provides detailed information about proper usage, potential side effects, and important precautions. Our database is regularly updated with the latest medical information to ensure you have access to accurate and relevant details about your treatments."
    },
    {
      id: "interaction-alerts",
      title: "Interaction Alerts",
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      description: "Receive warnings about potential drug interactions between your medications.",
      details: "PillPal's safety system checks for potential harmful interactions between your medications, including prescription drugs, over-the-counter medications, and supplements. The app alerts you to possible risks and suggests discussing these with your healthcare provider to ensure your medication regimen is safe."
    },
    {
      id: "refill-management",
      title: "Refill Management",
      icon: <ShoppingBag className="h-6 w-6 text-primary" />,
      description: "Get timely reminders for prescription refills and simplify the reordering process.",
      details: "PillPal tracks your medication supply based on your dosage schedule and sends notifications when it's time for a refill. For added convenience, the app can connect with participating pharmacies to streamline the refill process, saving you time and ensuring you never run out of important medications."
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold gradient-text">Our Services</h1>
        <p className="text-muted-foreground mt-2">Comprehensive medication management solutions to improve your health</p>
      </div>

      <Tabs defaultValue="medication-verification" className="w-full">
        <TabsList className="mb-6 flex flex-wrap justify-center bg-transparent gap-2">
          {services.map((service) => (
            <TabsTrigger 
              key={service.id} 
              value={service.id}
              className="data-[state=active]:gradient-button px-4 py-2 rounded-full"
            >
              {service.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {services.map((service) => (
          <TabsContent key={service.id} value={service.id}>
            <Card className="gradient-card">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 p-3 rounded-full">
                  {service.icon}
                </div>
                <div>
                  <CardTitle>{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base">{service.details}</p>
              </CardContent>
            </Card>

            <div className="mt-6">
              <h3 className="text-lg font-medium mb-2">How It Works</h3>
              <Card className="gradient-card">
                <CardContent className="pt-6">
                  <p className="text-base">
                    {service.id === "medication-verification" && (
                      "Our AI-powered system uses computer vision to recognize pills by their unique characteristics. Just tap the camera icon, position your medication in the frame, and let PillPal confirm it's the right medication at the right time."
                    )}
                    {service.id === "smart-reminders" && (
                      "Start by setting up your medication schedule in the app. PillPal will send notifications when it's time to take your medication. Snooze or mark the dose as taken directly from the notification. The app learns from your behavior to optimize reminder timing."
                    )}
                    {service.id === "adherence-tracking" && (
                      "Each time you take or miss a medication, PillPal records this in your history. View your adherence trends through intuitive charts and graphs. The app also calculates an adherence score to help you understand how well you're following your prescribed regimen."
                    )}
                    {service.id === "healthcare-sharing" && (
                      "Generate a secure, shareable report of your medication history with just a few taps. Choose exactly what information to include and share it via secure link, email, or by displaying a QR code that your healthcare provider can scan during your visit."
                    )}
                    {service.id === "prescription-management" && (
                      "Add prescriptions by scanning the label with your camera or entering the details manually. The app organizes all your medications, including dosage instructions and refill information, in one convenient dashboard that you can access anytime."
                    )}
                    {service.id === "medication-education" && (
                      "Tap on any medication in your list to access comprehensive information about it. PillPal provides details on proper usage, common side effects, and important precautions, all written in easy-to-understand language."
                    )}
                    {service.id === "interaction-alerts" && (
                      "When you add a new medication to your profile, PillPal automatically checks for potential interactions with your existing medications. If a risk is detected, you'll receive an alert with information about the nature of the interaction."
                    )}
                    {service.id === "refill-management" && (
                      "Based on your dosage and supply information, PillPal calculates when you'll need a refill and sends a reminder in advance. For participating pharmacies, you can request a refill directly through the app with just a few taps."
                    )}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
