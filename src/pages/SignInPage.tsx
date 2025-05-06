
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/shared';
import GoogleSignIn from '@/components/GoogleSignIn';

const SignInPage = () => {
  const handleSignInSuccess = (response: any) => {
    console.log('Sign-in successful:', response);
    // Handle successful sign-in (e.g., store user info, redirect)
  };

  const handleSignInError = (error: any) => {
    console.error('Sign-in error:', error);
    // Handle sign-in error
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="w-full max-w-md p-4">
        <Card className="border-purple-200 shadow-md transition-all duration-300 hover:shadow-lg">
          <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
            <CardTitle className="text-xl font-bold text-purple-700">Sign In</CardTitle>
            <CardDescription>Access your medication dashboard</CardDescription>
          </CardHeader>
          <CardContent className="pt-6 space-y-6">
            <GoogleSignIn 
              onSuccess={handleSignInSuccess}
              onError={handleSignInError}
            />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-purple-200"></span>
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium text-purple-700">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="example@example.com"
                  className="w-full p-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium text-purple-700">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full p-2 border border-purple-200 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-200"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                Sign In
              </button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center text-sm text-muted-foreground">
            Don't have an account? <a href="#" className="ml-1 text-purple-600 hover:underline">Sign up</a>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
