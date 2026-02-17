import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { LandingPage } from './components/LandingPage';
import { CalendarPage } from './components/CalendarPage';
import { Footer } from './components/Footer';
export function App() {
  const [location, setLocation] = useState<{
    division: string;
    district: string;
  } | null>(null);
  const handleComplete = (division: string, district: string) => {
    setLocation({
      division,
      district
    });
  };
  const handleBack = () => {
    setLocation(null);
  };
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
            onBack={handleBack} />

            <Footer />
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}