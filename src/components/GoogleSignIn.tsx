
import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

interface GoogleSignInProps {
  onSuccess?: (response: any) => void;
  onError?: (error: any) => void;
}

const GoogleSignIn = ({ onSuccess, onError }: GoogleSignInProps) => {
  useEffect(() => {
    // Load the Google API script
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      // Clean up the script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    // Initialize Google Sign-In when the script is loaded
    window.google = window.google || {};
    const checkGoogleLoaded = setInterval(() => {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        clearInterval(checkGoogleLoaded);
        initializeGoogleSignIn();
      }
    }, 100);

    return () => {
      clearInterval(checkGoogleLoaded);
    };
  }, []);

  const initializeGoogleSignIn = () => {
    try {
      window.google.accounts.id.initialize({
        client_id: 'AIzaSyBoB40v7tUqhCILfRO0-OfV4tzakjr4v3M.apps.googleusercontent.com',
        callback: handleCredentialResponse,
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    } catch (error) {
      console.error('Error initializing Google Sign-In:', error);
      toast({
        title: 'Error',
        description: 'Could not initialize Google Sign-In',
        variant: 'destructive',
      });
      if (onError) onError(error);
    }
  };

  const handleCredentialResponse = (response: any) => {
    console.log('Google Sign-In successful:', response);
    if (onSuccess) onSuccess(response);
    toast({
      title: 'Success',
      description: 'Google Sign-In successful!',
    });
  };

  const handleGoogleSignIn = () => {
    try {
      if (window.google && window.google.accounts && window.google.accounts.id) {
        window.google.accounts.id.prompt((notification: any) => {
          if (notification.isNotDisplayed() || notification.isSkippedMoment()) {
            // Try to display the manual popup
            window.google.accounts.id.renderButton(
              document.getElementById('google-signin-button')!,
              { theme: 'outline', size: 'large', width: 250 }
            );
          }
        });
      } else {
        toast({
          title: 'Google API Not Loaded',
          description: 'Please try again in a moment',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      if (onError) onError(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <Button 
        variant="outline" 
        onClick={handleGoogleSignIn}
        className="w-full flex items-center justify-center gap-2 border-purple-300 hover:bg-purple-50"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="24px" height="24px">
          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z" />
          <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z" />
          <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z" />
          <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z" />
        </svg>
        Sign in with Google
      </Button>
      <div id="google-signin-button"></div>
    </div>
  );
};

export default GoogleSignIn;
