import './index.css';
import React from "react";
import { render } from "react-dom";
import { App } from "./App";
import { registerSW } from 'virtual:pwa-register';

// Register service worker with lifecycle event handlers
const updateSW = registerSW({
  onNeedRefresh() {
    console.log('🔄 New version available! Reloading...');
    // Auto-reload for seamless updates
    updateSW(true);
  },
  onOfflineReady() {
    console.log('✅ App is ready to work offline!');
  },
  onRegistered(registration) {
    console.log('✅ Service Worker registered:', registration);
  },
  onRegisterError(error) {
    console.error('❌ Service Worker registration failed:', error);
  }
});

render(<App />, document.getElementById("root"));