
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/shared';
import { PillIcon, Camera, Bell, Calendar, Share2, FileText, BookOpen, AlertTriangle, ShoppingBag } from 'lucide-react';
import MedicationChatbot from '@/components/MedicationChatbot';

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

      <Tabs defaultValue="medication-verification" className="w-full">
        <TabsList className="mb-10 flex flex-wrap justify-center bg-transparent gap-4">
          {services.map((service, index) => {
            // Create different button styles based on index
            const getButtonClass = () => {
              const styles = [
                "bg-gradient-to-r from-purple-600 to-pink-500 shadow-md hover:shadow-lg hover:from-purple-700 hover:to-pink-600",
                "bg-gradient-to-r from-indigo-600 to-blue-500 shadow-md hover:shadow-lg hover:from-indigo-700 hover:to-blue-600",
                "bg-gradient-to-r from-pink-500 to-rose-500 shadow-md hover:shadow-lg hover:from-pink-600 hover:to-rose-600",
                "bg-gradient-to-r from-violet-600 to-purple-600 shadow-md hover:shadow-lg hover:from-violet-700 hover:to-purple-700",
                "bg-gradient-to-r from-fuchsia-600 to-purple-600 shadow-md hover:shadow-lg hover:from-fuchsia-700 hover:to-purple-700",
                "bg-gradient-to-r from-blue-600 to-cyan-600 shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-700",
                "bg-gradient-to-r from-rose-500 to-orange-500 shadow-md hover:shadow-lg hover:from-rose-600 hover:to-orange-600",
                "bg-gradient-to-r from-purple-500 to-indigo-500 shadow-md hover:shadow-lg hover:from-purple-600 hover:to-indigo-600",
              ];
              
              // Get shapes based on index
              const shapes = [
                "rounded-xl",
                "rounded-full",
                "rounded-[16px_8px_16px_8px]",
                "rounded-[8px_16px_8px_16px]", 
                "rounded-[16px_16px_8px_8px]",
                "rounded-[8px_8px_16px_16px]",
                "rounded-[20px_10px]",
                "rounded-[10px_20px]",
              ];
              
              return `data-[state=active]:${styles[index % styles.length]} data-[state=active]:${shapes[index % shapes.length]}`;
            };
            
            return (
              <TabsTrigger 
                key={service.id} 
                value={service.id}
                className={`${getButtonClass()} px-5 py-2.5 transition-all duration-300 data-[state=active]:text-white border border-transparent hover:border-purple-300/30`}
              >
                {service.title}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {services.map((service) => (
          <TabsContent key={service.id} value={service.id} className="space-y-8 animate-fade-in">
            <Card className="bg-gradient-to-br from-white/90 via-purple-50/50 to-pink-50/30 backdrop-blur-sm border border-purple-200/50 shadow-lg hover:shadow-xl transition-all duration-500">
              <CardHeader className="flex flex-row items-center gap-4">
                <div className="bg-gradient-to-br from-primary/20 to-accent/10 p-3 rounded-full shadow-inner">
                  {service.icon}
                </div>
                <div>
                  <CardTitle className="bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{service.details}</p>
              </CardContent>
            </Card>

            <div className="mt-8">
              <h3 className="text-lg font-medium mb-4 bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">How It Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {service.steps.map((step, index) => (
                  <Card key={index} className="bg-gradient-to-br from-white/80 to-purple-50/30 backdrop-blur-sm border border-purple-100/50 shadow-md hover:shadow-lg transition-all duration-300 hover:translate-y-[-5px]">
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

      <MedicationChatbot />
    </div>
  );
}
