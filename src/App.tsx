import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { Loader, LoadingContext } from "./components/Loader";
import { ContinuousBackground } from "./components/ContinuousBackground";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  
  // Listen for loading state changes
  useEffect(() => {
    // When component mounts, set body overflow to hidden to prevent scrolling during loading
    if (isLoading) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    
    return () => {
      document.body.style.overflow = "";
    };
  }, [isLoading]);
  
  // Function to handle when loading is complete
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <QueryClientProvider client={queryClient}>
      <LoadingContext.Provider value={{ isLoading }}>
        <TooltipProvider>
          {/* Loader component with callback */}
          <Loader onLoadingComplete={handleLoadingComplete} />
          
          {/* Continuous background for the entire app */}
          {!isLoading && <ContinuousBackground />}
          
          {/* Only show the rest of the app when not loading */}
          <div style={{ visibility: isLoading ? "hidden" : "visible" }}>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </div>
        </TooltipProvider>
      </LoadingContext.Provider>
    </QueryClientProvider>
  );
};

export default App;
