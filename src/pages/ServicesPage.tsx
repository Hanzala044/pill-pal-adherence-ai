
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
      details: "Using your device's camera, PillPal can identify pills by their shape, color, and markings. Simply hold the pill in front of your camera, and our AI will verify it against your prescription information. This helps prevent medication errors and gives you peace of mind knowing you're taking the correct medication.",
      steps: [
        {
          title: "Step 1: Take a photo of your medication",
          description: "Open the app camera and position your medication in the frame. Make sure there's good lighting so the camera can clearly see the pill's details."
        },
        {
          title: "Step 2: Get instant verification",
          description: "Our AI will analyze the image and confirm whether the medication matches your prescription. The system provides immediate feedback and logs the successful verification."
        }
      ]
    },
    {
      id: "smart-reminders",
      title: "Smart Reminders",
      icon: <Bell className="h-6 w-6 text-primary" />,
      description: "Never miss a dose with our customizable reminder system that adapts to your schedule.",
      details: "Set up personalized reminders based on your medication schedule. PillPal sends notifications exactly when you need to take your medications, and can even adjust based on your daily routine. The app intelligently adapts if you're traveling across time zones or if your schedule changes.",
      steps: [
        {
          title: "Step 1: Set up your medication schedule",
          description: "Add your medications with specific dosing times, frequency, and any special instructions. Our system will create a personalized reminder schedule."
        },
        {
          title: "Step 2: Receive and respond to notifications",
          description: "Get timely reminders on your device. With a single tap, you can mark the dose as taken, snooze the reminder, or record why you skipped a dose for better tracking."
        }
      ]
    },
    {
      id: "adherence-tracking",
      title: "Adherence Tracking",
      icon: <Calendar className="h-6 w-6 text-primary" />,
      description: "Comprehensive history tracking helps you monitor your medication adherence over time.",
      details: "View detailed reports on your medication adherence with easy-to-understand visualizations. Track patterns, identify missed doses, and see how your adherence improves over time. These insights help you and your healthcare provider make informed decisions about your treatment plan.",
      steps: [
        {
          title: "Step 1: Record your medication activity",
          description: "Each time you take or miss a medication, the app records this information in your personal health timeline, building a comprehensive history."
        },
        {
          title: "Step 2: Review your adherence analytics",
          description: "Access visual reports showing your adherence patterns over days, weeks, and months. Identify trends and share these insights with your healthcare provider."
        }
      ]
    },
    {
      id: "healthcare-sharing",
      title: "Healthcare Sharing",
      icon: <Share2 className="h-6 w-6 text-primary" />,
      description: "Securely share your medication history with healthcare providers for better coordinated care.",
      details: "Generate comprehensive medication adherence reports that can be shared with your doctors, pharmacists, or caregivers. This feature facilitates better communication with your healthcare team and enables them to provide more personalized care based on your actual medication usage.",
      steps: [
        {
          title: "Step 1: Generate a shareable report",
          description: "Select the date range and medications you want to include in your report. The app creates a comprehensive summary of your medication history."
        },
        {
          title: "Step 2: Share securely with healthcare providers",
          description: "Send the report directly to your doctor via secure link, email, or generate a QR code they can scan during your appointment for immediate access."
        }
      ]
    },
    {
      id: "prescription-management",
      title: "Prescription Management",
      icon: <FileText className="h-6 w-6 text-primary" />,
      description: "Digitally manage all your prescriptions in one secure place.",
      details: "Store all your prescription information in one secure location. The app maintains a complete list of your current and past medications, including dosage instructions, prescribing doctors, and pharmacy information. PillPal also helps you keep track of refill dates and sends timely reminders when you're running low.",
      steps: [
        {
          title: "Step 1: Add your prescriptions",
          description: "Scan prescription labels or manually enter medication details. The system stores all your current and past medications with complete dosage information."
        },
        {
          title: "Step 2: Manage your medication schedule",
          description: "Organize your prescriptions by time, condition, or doctor. Keep track of refill dates and expiration information all in one centralized dashboard."
        }
      ]
    },
    {
      id: "medication-education",
      title: "Medication Education",
      icon: <BookOpen className="h-6 w-6 text-primary" />,
      description: "Access reliable information about your medications directly within the app.",
      details: "For each medication in your profile, PillPal provides detailed information about proper usage, potential side effects, and important precautions. Our database is regularly updated with the latest medical information to ensure you have access to accurate and relevant details about your treatments.",
      steps: [
        {
          title: "Step 1: Select a medication to learn about",
          description: "Tap on any medication in your list to access a comprehensive information page that includes drug facts, usage guidelines, and potential side effects."
        },
        {
          title: "Step 2: Explore detailed educational resources",
          description: "Read expert-verified content about your medication, including interactive guides, videos, and FAQs to help you better understand your treatment."
        }
      ]
    },
    {
      id: "interaction-alerts",
      title: "Interaction Alerts",
      icon: <AlertTriangle className="h-6 w-6 text-primary" />,
      description: "Receive warnings about potential drug interactions between your medications.",
      details: "PillPal's safety system checks for potential harmful interactions between your medications, including prescription drugs, over-the-counter medications, and supplements. The app alerts you to possible risks and suggests discussing these with your healthcare provider to ensure your medication regimen is safe.",
      steps: [
        {
          title: "Step 1: Add all your medications",
          description: "Include all prescription drugs, over-the-counter medications, and supplements in your profile to enable comprehensive interaction checking."
        },
        {
          title: "Step 2: Review interaction alerts",
          description: "Receive immediate notifications if potentially harmful drug interactions are detected. Each alert includes detailed information about the nature of the interaction and recommended actions."
        }
      ]
    },
    {
      id: "refill-management",
      title: "Refill Management",
      icon: <ShoppingBag className="h-6 w-6 text-primary" />,
      description: "Get timely reminders for prescription refills and simplify the reordering process.",
      details: "PillPal tracks your medication supply based on your dosage schedule and sends notifications when it's time for a refill. For added convenience, the app can connect with participating pharmacies to streamline the refill process, saving you time and ensuring you never run out of important medications.",
      steps: [
        {
          title: "Step 1: Set up refill tracking",
          description: "Enter the number of pills in your current supply and your dosing schedule. The app automatically calculates when you'll need a refill and sends timely reminders."
        },
        {
          title: "Step 2: Request refills efficiently",
          description: "When it's time for a refill, use the app to contact your pharmacy directly or set up automatic refill requests with participating pharmacies for seamless medication management."
        }
      ]
    }
  ];

  return (
    <div className="space-y-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold gradient-text">Our Services</h1>
        <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
          PillPal is designed to revolutionize how you manage your medications. Our comprehensive 
          suite of features ensures you take the right medication at the right time, every time.
        </p>
      </div>

      <div className="bg-primary/5 p-6 rounded-xl mb-8">
        <h2 className="text-xl font-semibold mb-4 gradient-text">How PillPal Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white/40 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">1. Add Your Medications</h3>
            <p className="text-muted-foreground">
              Input your prescription details or scan medication labels to create your personalized 
              medication profile.
            </p>
          </div>
          <div className="bg-white/40 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">2. Set Up Reminders</h3>
            <p className="text-muted-foreground">
              Configure smart notifications based on your medication schedule and personal preferences.
            </p>
          </div>
          <div className="bg-white/40 p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-lg mb-2">3. Track & Improve</h3>
            <p className="text-muted-foreground">
              Monitor your adherence over time with detailed analytics and share progress with healthcare providers.
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue="medication-verification" className="w-full">
        <TabsList className="mb-10 flex flex-wrap justify-center bg-transparent gap-3">
          {services.map((service) => (
            <TabsTrigger 
              key={service.id} 
              value={service.id}
              className="data-[state=active]:gradient-button px-5 py-2.5 rounded-full transition-all duration-300"
            >
              {service.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {services.map((service) => (
          <TabsContent key={service.id} value={service.id} className="space-y-8">
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
                <p className="text-base leading-relaxed">{service.details}</p>
              </CardContent>
            </Card>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.steps.map((step, index) => (
                  <Card key={index} className="gradient-card">
                    <CardHeader>
                      <CardTitle className="text-lg">{step.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
