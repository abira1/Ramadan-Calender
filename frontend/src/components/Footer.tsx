import React from 'react';
import { LanternIcon } from './LanternIcon';
export function Footer() {
  return (
    <footer className="bg-ramadan-green text-ramadan-cream py-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center justify-center text-center relative z-10">
        <div className="text-ramadan-gold mb-4">
          <LanternIcon size={32} />
        </div>
        <h3 className="font-heading text-2xl font-bold mb-2">
          Ramadan Mubarak
        </h3>
        <p className="text-ramadan-cream/60 text-sm max-w-md">
          May this Ramadan bring peace, prosperity, and spiritual growth to you
          and your family.
        </p>
        <div className="mt-6 text-xs text-ramadan-cream/50">
          Ramadan Schedule — Bangladesh 2026
        </div>
        <div className="mt-2 text-xs text-ramadan-cream/40">
          © 2026 Ramadan Calendar. All rights reserved.
        </div>

        {/* Developer Badge */}
        <div className="mt-8 bg-ramadan-cream/5 border border-ramadan-gold/15 rounded-2xl p-5 max-w-xs mx-auto text-center">
          <img
            src="https://i.postimg.cc/Cxb78V0y/Chat-GPT-Image-Apr-22-2025-02-48-04-AM-(1).png"
            alt="Toiral Logo"
            className="w-14 h-14 rounded-xl object-cover mx-auto mb-3" />

          <p className="font-heading font-bold text-base text-ramadan-cream">
            Toiral Web Development
          </p>
          <p className="text-ramadan-gold text-[10px] tracking-[0.2em] uppercase">
            Imagine • Develop • Deploy
          </p>
          <p className="text-ramadan-cream/50 text-[11px] mt-2">
            Crafting beautiful, purpose-driven web experiences for communities
            and businesses.
          </p>
          <a
            href="https://toiral-development.web.app"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-ramadan-gold/20 text-ramadan-gold text-[10px] px-3 py-1 rounded-full mt-3 inline-block hover:bg-ramadan-gold/30 transition-colors">

            toiral-development.web.app
          </a>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-ramadan-gold/50 to-transparent" />
    </footer>);

}