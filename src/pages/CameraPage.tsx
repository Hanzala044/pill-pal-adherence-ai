
import React, { useEffect } from 'react';
import CameraView from '@/components/CameraView';

const CameraPage = () => {
  // Request permission when component mounts
  useEffect(() => {
    // Check if the browser supports the MediaDevices API
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      // Just check permissions without actually activating camera yet
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => {
          // Immediately stop all tracks to release the camera
          stream.getTracks().forEach(track => track.stop());
          console.log("Camera permission granted");
        })
        .catch(err => {
          console.error("Initial permission check failed:", err);
        });
    }
  }, []);

  return (
    <div className="animate-fade-in">
      <CameraView />
    </div>
  );
};

export default CameraPage;
