
import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/shared";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Index from "./pages/Index";
import CameraPage from "./pages/CameraPage";
import MedicationPage from "./pages/MedicationPage";
import HistoryPage from "./pages/HistoryPage";
import ProfilePage from "./pages/ProfilePage";
import SettingsPage from "./pages/SettingsPage";
import AboutPage from "./pages/AboutPage";
import ServicesPage from "./pages/ServicesPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import AuthPage from "./pages/AuthPage";
import Layout from "./components/Layout";
import SplashScreen from "./components/SplashScreen";
import { AuthProvider, useAuth } from "./contexts/AuthContext";

const queryClient = new QueryClient();

// Modified protected route component that always allows access
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  // Always allow access by returning children directly
  return <>{children}</>;
};

const AppRoutes = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // Check if we're running in a native app context
    const isNative = window.location.href.includes('capacitor://');
    if (!isNative) {
      setShowSplash(false);
    }
  }, []);

  return (
    <>
      {showSplash ? (
        <SplashScreen onFinished={() => setShowSplash(false)} />
      ) : (
        <Routes>
          {/* Redirect /auth to home page since we're bypassing authentication */}
          <Route path="/auth" element={<Navigate to="/" />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Index />} />
            <Route path="/camera" element={<CameraPage />} />
            <Route path="/medications" element={<MedicationPage />} />
            <Route path="/history" element={<HistoryPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      )}
    </>
  );
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
