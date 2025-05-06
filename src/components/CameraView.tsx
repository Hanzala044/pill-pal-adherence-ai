
import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, CheckCircle, X, PillIcon, UserCheck, CameraOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { mockMedications } from '@/utils/mockData';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function CameraView() {
  const [cameraActive, setCameraActive] = useState(false);
  const [pillDetected, setPillDetected] = useState(false);
  const [userVerified, setUserVerified] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [complete, setComplete] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState(mockMedications[0]);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showErrorDialog, setShowErrorDialog] = useState(false);
  const { toast } = useToast();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

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
    try {
      // Reset states if previously used
      setPillDetected(false);
      setUserVerified(false);
      setComplete(false);
      setCameraError(null);
      
      console.log("Attempting to activate camera...");
      
      // Request access to the user's camera
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'environment', // Use back camera on mobile if available
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      
      console.log("Camera access granted:", stream);
      
      // Save stream reference for cleanup
      streamRef.current = stream;
      
      // Set the stream as the video element's source
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          console.log("Video metadata loaded");
          if (videoRef.current) {
            videoRef.current.play()
              .then(() => console.log("Video playback started"))
              .catch(e => console.error("Error playing video:", e));
          }
        };
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
      const errorMessage = error instanceof Error ? error.message : "Unknown camera error";
      setCameraError(errorMessage);
      setShowErrorDialog(true);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const handleCapture = () => {
    setProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setProcessing(false);
      setComplete(true);
      toast({
        title: "Medication taken!",
        description: "Your adherence record has been updated.",
        variant: "default",
      });
    }, 2000);
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

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Medication Verification</h1>
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
                <Button 
                  onClick={activateCamera}
                  variant="cosmic"
                >
                  Activate Camera
                </Button>
              </div>
            ) : (
              <>
                <video 
                  ref={videoRef} 
                  autoPlay 
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
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
                            {processing ? "Processing..." : "Verify Intake"}
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {mockMedications.slice(0, 3).map((medication) => (
            <Card 
              key={medication.id}
              className={`cursor-pointer transition-all ${medication.id === selectedMedication.id ? 'ring-2 ring-primary' : ''}`}
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
      </div>
      
      {/* Error Dialog */}
      <Dialog open={showErrorDialog} onOpenChange={setShowErrorDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Camera Access Error</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-center text-destructive mb-4">
              <CameraOff className="h-12 w-12" />
            </div>
            <p>Unable to access your camera. This could be due to:</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Camera permissions were denied</li>
              <li>Your device doesn't have a camera</li>
              <li>Another application is using your camera</li>
            </ul>
            {cameraError && (
              <div className="bg-destructive/10 p-4 rounded-md">
                <p className="text-sm text-destructive"><strong>Error details:</strong> {cameraError}</p>
              </div>
            )}
            <div className="flex justify-end">
              <Button onClick={() => setShowErrorDialog(false)}>Close</Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
