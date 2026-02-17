import { useState, useEffect } from 'react';
import { Download, X, Smartphone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [showIOSPrompt, setShowIOSPrompt] = useState(false);

  useEffect(() => {
    // Check if already installed
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
    if (isStandalone) {
      console.log('App is already installed');
      return;
    }

    // Check if user has dismissed the prompt before
    const dismissedAt = localStorage.getItem('install_prompt_dismissed');
    if (dismissedAt) {
      const daysSinceDismissed = (Date.now() - parseInt(dismissedAt)) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        console.log('Install prompt was dismissed recently');
        return;
      }
    }

    // Handle beforeinstallprompt event (Chrome, Edge, Samsung Internet)
    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // Show prompt after a short delay
      setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check for iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const isInStandaloneMode = ('standalone' in window.navigator) && (window.navigator as any).standalone;
    
    if (isIOS && !isInStandaloneMode) {
      // Show iOS-specific instructions after delay
      setTimeout(() => {
        setShowIOSPrompt(true);
      }, 5000);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    console.log(`User ${outcome} the install prompt`);

    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    localStorage.setItem('install_prompt_dismissed', Date.now().toString());
    setShowPrompt(false);
    setShowIOSPrompt(false);
  };

  // Chrome/Edge/Samsung Install Prompt
  if (showPrompt && deferredPrompt) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 bg-white rounded-2xl shadow-2xl border border-ramadan-gold/20 p-5"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>

          <div className="flex items-start gap-4">
            <div className="bg-ramadan-green/10 p-3 rounded-xl shrink-0">
              <Download size={28} className="text-ramadan-green" />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-heading font-bold text-ramadan-green mb-1.5 text-lg">
                Install Ramadan Calendar
              </h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                Access prayer times offline anytime, anywhere. Works without internet!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleInstall}
                  className="flex-1 bg-ramadan-green text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-ramadan-green/90 transition-colors shadow-sm"
                >
                  Install App
                </button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2.5 text-gray-600 hover:text-gray-800 font-medium transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  // iOS Install Instructions
  if (showIOSPrompt) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-sm z-50 bg-white rounded-2xl shadow-2xl border border-ramadan-gold/20 p-5"
        >
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Dismiss"
          >
            <X size={18} />
          </button>

          <div className="flex items-start gap-4">
            <div className="bg-ramadan-green/10 p-3 rounded-xl shrink-0">
              <Smartphone size={28} className="text-ramadan-green" />
            </div>
            <div className="flex-1 pt-1">
              <h3 className="font-heading font-bold text-ramadan-green mb-1.5 text-lg">
                Add to Home Screen
              </h3>
              <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                Install this app on your iPhone:
              </p>
              <ol className="text-xs text-gray-600 space-y-1.5 mb-4 list-decimal list-inside">
                <li>Tap the <span className="font-semibold">Share</span> button</li>
                <li>Scroll and tap <span className="font-semibold">"Add to Home Screen"</span></li>
                <li>Tap <span className="font-semibold">"Add"</span></li>
              </ol>
              <button
                onClick={handleDismiss}
                className="w-full py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  return null;
}
