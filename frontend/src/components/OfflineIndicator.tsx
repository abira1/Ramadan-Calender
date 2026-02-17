import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Show "Back Online" message briefly
      setShowIndicator(true);
      setTimeout(() => setShowIndicator(false), 3000);
    };

    const handleOffline = () => {
      setIsOnline(false);
      setShowIndicator(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <AnimatePresence>
      {showIndicator && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`fixed top-4 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 ${
            isOnline
              ? 'bg-green-500 text-white'
              : 'bg-amber-500 text-white'
          }`}
        >
          {isOnline ? (
            <>
              <Wifi size={16} />
              <span className="text-sm font-semibold">Back Online</span>
            </>
          ) : (
            <>
              <WifiOff size={16} />
              <span className="text-sm font-semibold">Offline Mode - App Still Works</span>
            </>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
