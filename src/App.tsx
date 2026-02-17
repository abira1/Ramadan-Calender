import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from './components/LandingPage';
import { CalendarPage } from './components/CalendarPage';
import { Footer } from './components/Footer';
import { OfflineIndicator } from './components/OfflineIndicator';
import { InstallPrompt } from './components/InstallPrompt';

const STORAGE_KEY = 'ramadan_location';

export function App() {
  const [location, setLocation] = useState<{
    division: string;
    district: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load saved location on mount
  useEffect(() => {
    try {
      const savedLocation = localStorage.getItem(STORAGE_KEY);
      if (savedLocation) {
        const { division, district } = JSON.parse(savedLocation);
        if (division && district) {
          console.log('✅ Loaded saved location:', division, district);
          setLocation({ division, district });
        }
      }
    } catch (error) {
      console.error('❌ Error loading saved location:', error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleComplete = (division: string, district: string) => {
    // Save to localStorage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        division,
        district,
        savedAt: new Date().toISOString()
      }));
      console.log('💾 Location saved to localStorage');
    } catch (error) {
      console.error('❌ Error saving location:', error);
    }
    
    setLocation({
      division,
      district
    });
  };
  
  const handleChangeLocation = () => {
    // Clear saved location
    try {
      localStorage.removeItem(STORAGE_KEY);
      console.log('🗑️ Saved location cleared');
    } catch (error) {
      console.error('❌ Error clearing location:', error);
    }
    setLocation(null);
  };
  
  // Show loading state while checking localStorage
  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-ramadan-cream flex items-center justify-center">
        <div className="text-center">
          <div className="animate-pulse text-ramadan-green text-xl font-medium">
            Loading...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen w-full bg-ramadan-cream font-sans selection:bg-ramadan-gold/30 selection:text-ramadan-green [&::-webkit-scrollbar]:hidden"
      style={{
        scrollbarWidth: 'none'
      }}>

      <AnimatePresence mode="wait">
        {!location ?
        <motion.div
          key="landing"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.3
          }}>

            <LandingPage onComplete={handleComplete} />
          </motion.div> :

        <motion.div
          key="calendar"
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          exit={{
            opacity: 0
          }}
          transition={{
            duration: 0.3
          }}>

            <CalendarPage
            division={location.division}
            district={location.district}
            onChangeLocation={handleChangeLocation} />

            <Footer />
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}