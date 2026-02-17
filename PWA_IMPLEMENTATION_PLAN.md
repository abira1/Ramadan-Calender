# Ramadan Calendar PWA Implementation Plan

## Project Overview
Transform the Ramadan Calendar application into a fully functional Progressive Web App (PWA) that works completely offline once installed. The app will download all necessary files during installation and function without any internet connection.

## Current Application Analysis

### Technology Stack
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.2.0
- **Styling**: Tailwind CSS 3.4.17
- **Animations**: Framer Motion 11.5.4
- **Icons**: Lucide React
- **Additional Libraries**: 
  - html2canvas (for saving cards as images)
  - clsx (for conditional classes)

### App Structure
```
/app/
├── public/
│   ├── android/     # Android app icons
│   ├── ios/         # iOS app icons
│   └── web/         # Web app icons (192x192, 512x512, maskable variants)
├── src/
│   ├── components/
│   │   ├── LandingPage.tsx    # Location selection screen
│   │   ├── CalendarPage.tsx   # Main calendar display
│   │   ├── Footer.tsx          # Footer component
│   │   └── LanternIcon.tsx     # Custom icon component
│   ├── data/
│   │   ├── bangladeshData.ts   # All Ramadan timing data (static)
│   │   └── scheduleData.ts     # Schedule interface definitions
│   ├── App.tsx                  # Main app component
│   ├── index.tsx                # Entry point
│   └── index.css                # Global styles
├── index.html
├── package.json
├── vite.config.ts
└── tailwind.config.js
```

### Key Features
1. **Location Selection**: Users select Division and District (Bangladesh)
2. **Ramadan Calendar Display**: Shows all 30 days with Sehri End and Iftar times
3. **Three Phases**: Rahmah (1-10), Maghfirah (11-20), Najah (21-30)
4. **Day Cards**: Clickable cards with detailed timing and Dua
5. **Save Functionality**: Download day card as PNG image
6. **Responsive Design**: Mobile-first with desktop support
7. **Animations**: Smooth transitions and interactions

### Data Requirements
- **All data is static** - stored in `bangladeshData.ts`
- **No backend/API calls** - perfect for offline operation
- **No database needed** - all timing data is hardcoded

---

## PWA Implementation Strategy

### Phase 1: Project Setup & Dependencies
**Objective**: Install and configure necessary PWA libraries

#### Tasks:
1. ✅ Install `vite-plugin-pwa` and `workbox-window`
2. ✅ Update Vite configuration for PWA support
3. ✅ Verify all existing app icons are properly formatted

#### Expected Outcome:
- PWA plugin integrated with Vite
- Build process configured to generate service worker
- Icons verified and ready for manifest

---

### Phase 2: Web App Manifest Creation
**Objective**: Create manifest.json to make app installable

#### Tasks:
1. ✅ Create `manifest.json` with app metadata
2. ✅ Configure app icons (using existing /public/web/ icons)
3. ✅ Set display mode to "standalone"
4. ✅ Define app colors and theme
5. ✅ Update `index.html` to reference manifest

#### Manifest Configuration:
```json
{
  "name": "Toiral Ramadan Calendar 2026",
  "short_name": "Ramadan 2026",
  "description": "Complete Ramadan prayer times for Bangladesh with Sehri and Iftar schedules",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#fdf8f0",
  "theme_color": "#1e3a2f",
  "orientation": "portrait-primary",
  "icons": [
    {
      "src": "/web/icon-192.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/web/icon-192-maskable.png",
      "sizes": "192x192",
      "type": "image/png",
      "purpose": "maskable"
    },
    {
      "src": "/web/icon-512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "any"
    },
    {
      "src": "/web/icon-512-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

#### Expected Outcome:
- App can be installed on mobile devices
- Custom app icon displayed
- Splash screen generated automatically
- App opens in standalone mode (no browser UI)

---

### Phase 3: Service Worker Implementation
**Objective**: Enable complete offline functionality

#### Tasks:
1. ✅ Configure Vite PWA plugin with Workbox
2. ✅ Implement cache-first strategy for all assets
3. ✅ Pre-cache all JavaScript, CSS, HTML files
4. ✅ Cache Google Fonts for offline use
5. ✅ Cache all app icons
6. ✅ Implement runtime caching for images
7. ✅ Handle offline fallback

#### Caching Strategy:
- **Precache (Install Event)**:
  - index.html
  - All bundled JS files
  - All CSS files
  - All app icons
  - Google Fonts (Inter, Nunito)

- **Runtime Cache (Fetch Event)**:
  - Network-first for HTML
  - Cache-first for JS/CSS/fonts/images
  - Stale-while-revalidate for assets

#### Vite PWA Configuration:
```typescript
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['**/*.{png,jpg,jpeg,svg,ico,woff,woff2}'],
      manifest: {
        name: 'Toiral Ramadan Calendar 2026',
        short_name: 'Ramadan 2026',
        // ... manifest config
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,jpg,jpeg,svg,ico,woff,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
            }
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com/,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              }
            }
          }
        ]
      }
    })
  ]
});
```

#### Expected Outcome:
- All assets cached on first visit
- App works completely offline
- Google Fonts available offline
- Fast loading on repeat visits
- Automatic updates when new version deployed

---

### Phase 4: Service Worker Registration
**Objective**: Register service worker and handle updates

#### Tasks:
1. ✅ Add service worker registration in main app
2. ✅ Implement update notification for users
3. ✅ Handle service worker lifecycle events
4. ✅ Add console logs for debugging

#### Implementation Location:
- Register in `src/index.tsx` or create dedicated `src/registerSW.ts`

#### Expected Outcome:
- Service worker registered on app load
- Users notified of app updates
- Smooth update process without breaking functionality

---

### Phase 5: Local Storage & Persistent Location Selection
**Objective**: Save user's location selection for future visits

#### Tasks:
1. ✅ Implement localStorage to save selected division and district
2. ✅ Auto-load saved location on app startup
3. ✅ Skip landing page if location already saved
4. ✅ Add "Change Location" button in calendar view
5. ✅ Handle localStorage across app updates

#### Implementation Details:
```typescript
// Save location after selection
localStorage.setItem('ramadan_location', JSON.stringify({
  division: selectedDivision,
  district: selectedDistrict
}));

// Load on app startup
const savedLocation = localStorage.getItem('ramadan_location');
if (savedLocation) {
  const { division, district } = JSON.parse(savedLocation);
  // Auto-navigate to calendar
}

// Clear on "Change Location"
localStorage.removeItem('ramadan_location');
```

#### Expected Outcome:
- Location saved permanently on device
- No need to select division/district again
- Direct access to calendar on subsequent visits
- Easy way to change location if needed
- Works offline (localStorage doesn't require internet)

---

### Phase 6: Offline Indicator & UX Enhancement
**Objective**: Improve user experience with offline status

#### Tasks:
1. ✅ Add offline/online status indicator (optional)
2. ✅ Show installation prompt for users
3. ✅ Add "Add to Home Screen" button
4. ✅ Test offline scenarios

#### Expected Outcome:
- Users aware of offline/online status
- Easy installation process
- Professional PWA experience

---

### Phase 6: Build Optimization
**Objective**: Optimize bundle size and performance

#### Tasks:
1. ✅ Configure Vite for optimal production build
2. ✅ Enable code splitting
3. ✅ Optimize images and assets
4. ✅ Minify and compress files
5. ✅ Analyze bundle size

#### Expected Outcome:
- Smaller download size
- Faster installation
- Better performance
- Efficient caching

---

### Phase 7: Testing & Validation
**Objective**: Ensure PWA works perfectly offline

#### Testing Checklist:
- [ ] Install app on mobile device
- [ ] Turn off internet connection
- [ ] Verify all pages load offline
- [ ] Test location selection works offline
- [ ] Verify calendar data displays correctly
- [ ] Test day card modal opens offline
- [ ] Test "Save Card" feature works offline
- [ ] Verify animations work smoothly
- [ ] Test app update mechanism
- [ ] Verify icons display correctly
- [ ] Test on different devices (Android, iOS, Desktop)
- [ ] Lighthouse PWA audit score > 90

#### Expected Outcome:
- 100% offline functionality
- All features working without internet
- Fast and reliable performance
- Installable on all platforms

---

### Phase 8: Documentation
**Objective**: Document the implementation and usage

#### Tasks:
1. ✅ Create this implementation plan
2. ✅ Document each phase completion
3. ✅ Create user installation guide
4. ✅ Document technical architecture
5. ✅ Create troubleshooting guide

---

## Technical Specifications

### Service Worker Caching Strategy

#### Cache Names:
- `ramadan-calendar-static-v1`: HTML, CSS, JS
- `ramadan-calendar-images-v1`: App icons, images
- `ramadan-calendar-fonts-v1`: Google Fonts

#### Cached Resources:
1. **HTML**: index.html
2. **JavaScript**: All Vite-generated JS bundles
3. **CSS**: All Tailwind CSS and custom styles
4. **Fonts**: Inter, Nunito from Google Fonts
5. **Icons**: All app icons (192x192, 512x512, maskable)
6. **Images**: Any images used in the app
7. **Data**: All static data is bundled in JS

### Browser Support
- Chrome/Edge: Full support
- Firefox: Full support
- Safari iOS 11.3+: Full support
- Safari Desktop 11.1+: Full support

### Installation Requirements
- HTTPS (required for service workers)
- Modern browser with PWA support
- ~5-10 MB storage space for cached assets

---

## File Changes Summary

### New Files:
1. `/public/manifest.json` - Web app manifest
2. `/app/PHASE_COMPLETION/` - Phase completion documents
3. Service worker (auto-generated by vite-plugin-pwa)

### Modified Files:
1. `/app/package.json` - Add vite-plugin-pwa dependency
2. `/app/vite.config.ts` - Add PWA configuration
3. `/app/index.html` - Add manifest and theme color meta tags
4. `/app/src/index.tsx` - Add service worker registration (optional)

### No Changes Needed:
- All React components remain unchanged
- All data files remain unchanged
- No backend/API changes (no backend exists)

---

## Success Criteria

✅ **Installation**:
- App shows "Install" prompt in browser
- App can be added to home screen on mobile
- Custom app icon displays after installation

✅ **Offline Functionality**:
- All pages load without internet
- All features work offline
- Data displays correctly offline
- No broken images or assets

✅ **Performance**:
- Lighthouse PWA score > 90
- Fast load times (<3s on 3G)
- Smooth animations offline

✅ **User Experience**:
- Standalone app experience (no browser UI)
- Splash screen shows on launch
- App updates automatically
- Professional look and feel

---

## Implementation Timeline

| Phase | Duration | Status |
|-------|----------|--------|
| Phase 1: Setup | 30 mins | Pending |
| Phase 2: Manifest | 30 mins | Pending |
| Phase 3: Service Worker | 1 hour | Pending |
| Phase 4: Registration | 30 mins | Pending |
| Phase 5: UX Enhancement | 1 hour | Pending |
| Phase 6: Optimization | 30 mins | Pending |
| Phase 7: Testing | 1-2 hours | Pending |
| Phase 8: Documentation | 30 mins | Pending |
| **Total** | **5-6 hours** | **0% Complete** |

---

## Next Steps

1. Review this plan with user
2. Get confirmation to proceed
3. Start Phase 1: Project Setup & Dependencies
4. Complete each phase sequentially
5. Document completion of each phase
6. Final testing and deployment

---

## Notes

- **No database required**: All data is static and bundled with the app
- **No API calls**: App doesn't make any network requests for data
- **Perfect for PWA**: Static nature makes it ideal for offline functionality
- **Existing icons**: App already has all necessary icons prepared
- **Future updates**: Can be pushed through normal deployment, service worker will auto-update

---

**Created**: February 17, 2025  
**Author**: E1 Agent  
**Version**: 1.0  
**Status**: Ready for Implementation
