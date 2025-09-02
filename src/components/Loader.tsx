import { useState, useEffect, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code, Laptop, Server, Database, Globe } from "lucide-react";

export const LoadingContext = createContext<{ isLoading: boolean }>({ isLoading: true });

export const useLoading = () => useContext(LoadingContext);

interface LoaderProps {
  onLoadingComplete?: () => void;
}

export function Loader({ onLoadingComplete }: LoaderProps) {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading time with progressive updates
    const duration = 2500; // 2.5 seconds total
    const interval = 50; // Update every 50ms
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      setProgress(Math.min(100, Math.floor((step / steps) * 100)));
      
      if (step >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setLoading(false);
          // Call the callback if provided
          if (onLoadingComplete) {
            onLoadingComplete();
          }
        }, 300); // Small delay after reaching 100%
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  // Tech icons that will orbit
  const orbitIcons = [
    { Icon: Code, color: "bg-blue-500" },
    { Icon: Laptop, color: "bg-purple-500" },
    { Icon: Server, color: "bg-green-500" },
    { Icon: Database, color: "bg-amber-500" },
    { Icon: Globe, color: "bg-pink-500" }
  ];

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background"
        >
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 opacity-20">
              <motion.div 
                className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-blue-500/20 rounded-full blur-3xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 8,
                  ease: "easeInOut" 
                }}
              />
              <motion.div 
                className="absolute top-1/3 right-1/4 w-1/3 h-1/3 bg-purple-500/20 rounded-full blur-3xl"
                animate={{ 
                  scale: [1.2, 1, 1.2],
                  opacity: [0.3, 0.2, 0.3]
                }}
                transition={{ 
                  repeat: Infinity, 
                  duration: 6,
                  ease: "easeInOut" 
                }}
              />
            </div>
          </div>

          <motion.div 
            className="relative flex flex-col items-center justify-center max-w-md w-full mx-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Orbiting icons */}
            <div className="relative w-40 h-40 mb-8">
              {orbitIcons.map((item, index) => {
                const angle = (index / orbitIcons.length) * Math.PI * 2;
                const delay = index * 0.2;
                const { Icon, color } = item;
                
                return (
                  <motion.div
                    key={index}
                    className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5"
                    initial={{ 
                      x: Math.cos(angle) * 60, 
                      y: Math.sin(angle) * 60,
                      opacity: 0,
                      scale: 0
                    }}
                    animate={{ 
                      opacity: 1,
                      scale: 1,
                      x: Math.cos(angle + (progress / 15)) * 60, 
                      y: Math.sin(angle + (progress / 15)) * 60
                    }}
                    transition={{ 
                      duration: 0.5, 
                      delay: delay,
                    }}
                  >
                    <div className={`w-10 h-10 rounded-lg ${color} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                );
              })}
              
              {/* Center logo/text */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-card border-4 border-primary flex items-center justify-center shadow-xl"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 260, 
                  damping: 20,
                  delay: 0.3
                }}
              >
                <motion.div
                  className="text-2xl font-bold text-primary"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 2,
                    ease: "easeInOut" 
                  }}
                >
                  NK
                </motion.div>
              </motion.div>
            </div>
            
            {/* Loading text */}
            <motion.div 
              className="text-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-bold text-foreground mb-1">Nammi Kusuma</h2>
              <p className="text-muted-foreground">Full Stack Developer</p>
            </motion.div>
            
            {/* Progress bar */}
            <div className="w-full max-w-xs bg-card/50 rounded-full h-2 overflow-hidden border border-border/50">
              <motion.div 
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-primary"
                style={{ width: `${progress}%` }}
                initial={{ width: "0%" }}
              />
            </div>
            
            {/* Progress percentage */}
            <motion.p 
              className="mt-2 text-sm text-muted-foreground"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              {progress}%
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
