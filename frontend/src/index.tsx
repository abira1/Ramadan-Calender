import './index.css';
import React from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";
import { registerSW } from 'virtual:pwa-register';

// Register service worker with lifecycle event handlers
const updateSW = registerSW({
  immediate: true, // Register immediately
  onNeedRefresh() {
    console.log('🔄 New version available! Reloading...');
    // Auto-reload for seamless updates
    updateSW(true);
  },
  onOfflineReady() {
    console.log('✅ App is ready to work offline!');
    // Show a user-friendly notification
    if ('serviceWorker' in navigator) {
      console.log('📱 Service Worker active and ready for offline use');
    }
  },
  onRegistered(registration) {
    console.log('✅ Service Worker registered:', registration);
    // Force the waiting service worker to become the active service worker
    if (registration && registration.waiting) {
      registration.waiting.postMessage({ type: 'SKIP_WAITING' });
    }
  },
  onRegisterError(error) {
    console.error('❌ Service Worker registration failed:', error);
  }
});

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}