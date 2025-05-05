import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Index from "@/pages/Index";
import FeaturesPage from "@/pages/FeaturesPage";
import TestimonialsPage from "@/pages/TestimonialsPage";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import Dashboard from "@/pages/Dashboard";
import StartSaving from "@/pages/StartSaving";
import CreatePool from "@/pages/CreatePool";
import BrowsePools from "@/pages/BrowsePools";
import Chatbot from "@/pages/Chatbot";
import NotFound from "@/pages/NotFound";
import News from "@/pages/News";
import { useRef } from "react";

const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkKey) {
  console.error("❌ Clerk Publishable Key is missing! Add it to your .env file.");
}

// Protected route component
const ProtectedRoute = ({ children }) => (
  <SignedIn>
    {children}
  </SignedIn>
);

const AppContent = () => {
  const heroRef = useRef(null);
  const navigate = useNavigate();

  const handlePreviewClick = () => {
    if (window.location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        heroRef.current?.querySelector('[data-ref="slideshowRef"]')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      heroRef.current?.querySelector('[data-ref="slideshowRef"]')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <Navbar onPreviewClick={handlePreviewClick} />
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Index ref={heroRef} />} />
        <Route path="/features" element={<FeaturesPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
        <Route 
          path="/login/*" 
          element={
            <SignedOut>
              <Login />
            </SignedOut>
          } 
        />
        <Route 
          path="/signup/*" 
          element={
            <SignedOut>
              <Signup />
            </SignedOut>
          } 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/start-saving" 
          element={
            <ProtectedRoute>
              <StartSaving />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/create-pool" 
          element={
            <ProtectedRoute>
              <CreatePool />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/browse-pools" 
          element={
            <ProtectedRoute>
              <BrowsePools />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/chatbot" 
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/news" 
          element={
            <ProtectedRoute>
              <News />
            </ProtectedRoute>
          } 
        />
        
        {/* Catch-all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

const App = () => (
  <ClerkProvider 
    publishableKey={clerkKey} 
    appearance={{ 
      elements: { 
        formButtonPrimary: "bg-primary", 
        card: "shadow-none", 
        headerTitle: "Welcome", 
        headerSubtitle: "Start your group buying journey", 
        socialButtonsBlockButton: "bg-white border-2 border-stone-200", 
        formFieldInput: "border-2 border-stone-200", 
        footerActionLink: "text-primary hover:text-primary-dark" 
      } 
    }}
  >
    <ThemeProvider defaultTheme="dark">
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </ThemeProvider>
  </ClerkProvider>
);

export default App;