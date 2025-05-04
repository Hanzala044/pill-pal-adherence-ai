
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, CheckCircle, X, PillIcon, UserCheck, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useQuery } from '@tanstack/react-query';
import { getMedications } from '@/services/medicationService';
import { recordAdherence } from '@/services/adherenceService';

export default function CameraView() {
  const [cameraActive, setCameraActive] = useState(false);
  const [pillDetected, setPillDetected] = useState(false);
  const [userVerified, setUserVerified] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState<any>(null);
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const { data: medications = [], isLoading } = useQuery({
    queryKey: ['medications'],
    queryFn: getMedications,
  });

  // Set the first active medication as the default selected option when data loads
  useEffect(() => {
    if (medications && medications.length > 0) {
      const activeMedications = medications.filter((med: any) => med.is_active);
      if (activeMedications.length > 0) {
        setSelectedMedication(activeMedications[0]);
      } else {
        setSelectedMedication(medications[0]);
      }
    }
  }, [medications]);

  // Clean up function to stop camera when component unmounts or camera deactivates
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Function to start the camera
  const activateCamera = async () => {
    if (!selectedMedication) {
      toast({
        title: "No medication selected",
        description: "Please select a medication before proceeding.",
        variant: "destructive",
      });
      return;
    }

    try {
      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      // Save stream reference for cleanup
      streamRef.current = stream;
      
      // Set the stream as the video element's source
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      setCameraActive(true);
      toast({
        title: "Camera activated",
        description: "Please center the pill in the frame",
      });
      
      // Simulate pill detection after a delay
      setTimeout(() => {
        setPillDetected(true);
        toast({
          title: "Pill detected",
          description: "Verifying medication...",
        });
        
        // Simulate user verification after pill detection
        setTimeout(() => {
          setUserVerified(true);
          toast({
            title: "User verified",
            description: "Medication intake confirmed",
          });
        }, 1500);
      }, 2000);
    } catch (error) {
      console.error("Error accessing camera:", error);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const handleCapture = async () => {
    if (!selectedMedication) {
      toast({
        title: "No medication selected",
        description: "Please select a medication before recording adherence.",
        variant: "destructive",
      });
      return;
    }

    setProcessing(true);
    
    try {
      // Record the adherence
      await recordAdherence({
        medication_id: selectedMedication.id,
        medicationName: selectedMedication.name,
        status: 'taken',
        pillVerified: pillDetected,
        userVerified: userVerified,
      });
      
      setProcessing(false);
      setComplete(true);
      toast({
        title: "Medication taken!",
        description: "Your adherence record has been updated.",
        variant: "default",
      });
    } catch (error) {
      console.error("Error recording adherence:", error);
      toast({
        title: "Error",
        description: "Failed to record your medication intake.",
        variant: "destructive",
      });
      setProcessing(false);
    }
  };

  const resetCamera = () => {
    // Stop all tracks from the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    // Reset video element
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    
    // Reset states
    setCameraActive(false);
    setPillDetected(false);
    setUserVerified(false);
    setProcessing(false);
    setComplete(false);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-500 bg-clip-text text-transparent">Medication Verification</h1>
        <p className="text-muted-foreground mt-1">
          Verify your medication intake using your camera
        </p>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="aspect-[4/3] bg-black relative">
            {!cameraActive ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <Camera className="h-16 w-16 text-muted mb-4" />
                <Button onClick={activateCamera}>Activate Camera</Button>
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline 
                  className="absolute inset-0 w-full h-full object-cover"
                  onLoadedMetadata={() => {
                    if (videoRef.current) videoRef.current.play();
                  }}
                />
                
                <div className="absolute inset-0 flex items-center justify-center">
                  {!complete ? (
                    <div className="w-48 h-48 rounded-full border-4 border-primary/50 flex items-center justify-center">
                      <div className="w-full h-full rounded-full absolute animate-pulse-ring border-4 border-primary/50"></div>
                      {pillDetected && (
                        <div className="absolute top-0 right-0 bg-green-500 text-white p-2 rounded-full">
                          <PillIcon className="h-6 w-6" />
                        </div>
                      )}
                      {userVerified && (
                        <div className="absolute bottom-0 left-0 bg-blue-500 text-white p-2 rounded-full">
                          <UserCheck className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="bg-green-100 text-green-700 rounded-full p-8">
                      <CheckCircle className="h-24 w-24" />
                    </div>
                  )}
                </div>

                {/* Status indicators */}
                <div className="absolute bottom-0 left-0 right-0 bg-background/80 p-4 text-sm">
                  <div className="flex justify-between items-center">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${pillDetected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span>Pill recognition</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${userVerified ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                        <span>User verification</span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      {!complete ? (
                        <>
                          <Button variant="outline" size="sm" onClick={resetCamera}>
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                          </Button>
                          <Button 
                            size="sm" 
                            disabled={!pillDetected || !userVerified || processing}
                            onClick={handleCapture}
                          >
                            {processing ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              "Verify Intake"
                            )}
                          </Button>
                        </>
                      ) : (
                        <Button variant="default" size="sm" onClick={resetCamera}>
                          Done
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Selected Medication</h2>
        
        {medications.length === 0 ? (
          <Card>
            <CardContent className="py-8 text-center">
              <p className="text-muted-foreground">You haven't added any medications yet</p>
              <Button className="mt-4 bg-gradient-to-r from-purple-500 to-pink-500" asChild>
                <a href="/medications">Add Medication</a>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {medications
              .filter((med: any) => med.is_active)
              .slice(0, 3)
              .map((medication: any) => (
                <Card 
                  key={medication.id}
                  className={`cursor-pointer transition-all ${medication.id === selectedMedication?.id ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedMedication(medication)}
                >
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="bg-primary/10 p-2 rounded-md">
                      <PillIcon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{medication.name}</div>
                      <div className="text-sm text-muted-foreground">{medication.dosage}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
