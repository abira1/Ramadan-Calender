import React, { useState, useRef, createElement } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { getScheduleForDistrict, RamadanDay } from '../data/bangladeshData';
import { LanternIcon } from './LanternIcon';
import {
  ArrowLeftIcon,
  MoonIcon,
  SunIcon,
  XIcon,
  CameraIcon,
  DownloadIcon,
  MapPin } from
'lucide-react';
import clsx from 'clsx';
import html2canvas from 'html2canvas';
interface CalendarPageProps {
  division: string;
  district: string;
  onChangeLocation: () => void;
}
interface PhaseSectionProps {
  title: string;
  subtitle: string;
  days: RamadanDay[];
  phaseIndex: number;
  onDayClick: (day: RamadanDay) => void;
  todayISO: string;
}
function PhaseSection({
  title,
  subtitle,
  days,
  phaseIndex,
  onDayClick,
  todayISO
}: PhaseSectionProps) {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 30
      }}
      animate={{
        opacity: 1,
        y: 0
      }}
      transition={{
        duration: 0.6,
        delay: 0.2 + phaseIndex * 0.15
      }}
      className="mb-10">

      {/* Phase Header - sticky on mobile */}
      <div className="flex items-center gap-3 mb-5 px-1 sticky top-0 z-20 md:static bg-ramadan-cream/95 backdrop-blur-sm md:backdrop-blur-none py-3 md:py-0 -mx-1 px-2 md:mx-0 md:px-1 rounded-xl md:rounded-none">
        <div className="w-10 h-10 rounded-xl bg-ramadan-green/10 flex items-center justify-center text-ramadan-gold shrink-0">
          <LanternIcon size={20} />
        </div>
        <div>
          <h3 className="font-heading text-lg md:text-2xl font-bold text-ramadan-green">
            {title}
          </h3>
          <p className="text-xs md:text-sm text-ramadan-gold font-medium">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(30,58,47,0.06)] border border-ramadan-gold/10">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-ramadan-green text-ramadan-cream">
              <th className="py-3.5 px-5 font-heading font-bold text-sm tracking-wide">
                Day
              </th>
              <th className="py-3.5 px-5 font-heading font-bold text-sm tracking-wide">
                Date
              </th>
              <th className="py-3.5 px-5 font-heading font-bold text-sm tracking-wide">
                Weekday
              </th>
              <th className="py-3.5 px-5 font-heading font-bold text-sm tracking-wide">
                Sehri End
              </th>
              <th className="py-3.5 px-5 font-heading font-bold text-sm tracking-wide">
                Iftar
              </th>
            </tr>
          </thead>
          <tbody>
            {days.map((day, idx) => {
              const isToday = day.isoDate === todayISO;
              return (
                <motion.tr
                  key={day.day}
                  initial={{
                    opacity: 0,
                    x: -8
                  }}
                  animate={{
                    opacity: 1,
                    x: 0
                  }}
                  transition={{
                    delay: 0.3 + phaseIndex * 0.15 + idx * 0.03
                  }}
                  className={clsx(
                    'border-b border-ramadan-gold/10 transition-colors',
                    idx % 2 === 0 ? 'bg-[#fcf7ee]' : 'bg-white',
                    'hover:bg-ramadan-light-amber/30',
                    isToday && 'border-l-[3px] border-l-black'
                  )}>

                  <td className="py-3.5 px-5 font-bold text-ramadan-green">
                    <span className="flex items-center gap-1.5">
                      {String(day.day).padStart(2, '0')}
                      {isToday &&
                      <span className="text-[9px] font-bold text-black uppercase">
                          আজ
                        </span>
                      }
                    </span>
                  </td>
                  <td className="py-3.5 px-5 text-gray-700">{day.date}</td>
                  <td className="py-3.5 px-5 text-gray-600">{day.weekday}</td>
                  <td className="py-3.5 px-5 font-semibold text-ramadan-green">
                    {day.sehriEnd}
                  </td>
                  <td className="py-3.5 px-5 font-bold text-ramadan-green text-lg">
                    {day.iftar}
                  </td>
                </motion.tr>);

            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {days.map((day, idx) => {
          const isToday = day.isoDate === todayISO;
          return (
            <motion.div
              key={day.day}
              onClick={() => onDayClick(day)}
              initial={{
                opacity: 0,
                y: 15
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              whileTap={{
                scale: 0.98
              }}
              transition={{
                delay: 0.2 + phaseIndex * 0.1 + idx * 0.04
              }}
              className={clsx(
                'bg-white rounded-2xl p-5 shadow-[0_2px_12px_rgba(30,58,47,0.05)] border border-ramadan-gold/10 cursor-pointer active:bg-gray-50 transition-colors',
                isToday && 'border-l-[3px] border-l-black'
              )}
              style={{
                touchAction: 'manipulation'
              }}>

              {/* Top: Day + Date */}
              <div className="flex items-center justify-between mb-3 pb-3 border-b border-ramadan-gold/10">
                <div className="flex items-center gap-3">
                  <span className="bg-ramadan-green text-ramadan-cream text-xs font-bold w-9 h-9 rounded-lg flex items-center justify-center">
                    {String(day.day).padStart(2, '0')}
                  </span>
                  <div>
                    <p className="font-semibold text-ramadan-green text-sm flex items-center gap-1.5">
                      {day.weekday}
                      {isToday &&
                      <span className="text-[9px] font-bold text-black uppercase">
                          আজ
                        </span>
                      }
                    </p>
                    <p className="text-xs text-gray-500">{day.date}</p>
                  </div>
                </div>
              </div>

              {/* 2x2 Grid: Sehri End + Iftar */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-ramadan-cream rounded-xl p-3 text-center border border-ramadan-light-amber/30">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <MoonIcon size={12} className="text-ramadan-gold" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Sehri End
                    </span>
                  </div>
                  <span className="text-xl font-bold text-ramadan-green">
                    {day.sehriEnd}
                  </span>
                </div>
                <div className="bg-ramadan-cream rounded-xl p-3 text-center border border-ramadan-light-amber/30">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <SunIcon size={12} className="text-ramadan-gold" />
                    <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
                      Iftar
                    </span>
                  </div>
                  <span className="text-xl font-bold text-ramadan-green">
                    {day.iftar}
                  </span>
                </div>
              </div>

              {/* Tap hint - only on first card of first phase */}
              {phaseIndex === 0 && idx === 0 &&
              <p className="text-center text-[10px] text-ramadan-gold/50 mt-3 font-medium tracking-wide">
                  Tap for dua & save option
                </p>
              }
            </motion.div>);

        })}
      </div>
    </motion.section>);

}
interface DayCardModalProps {
  day: RamadanDay;
  onClose: () => void;
  district: string;
}
function DayCardModal({ day, onClose, district }: DayCardModalProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async () => {
    if (!cardRef.current) return;
    setIsSaving(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 2,
        backgroundColor: null,
        useCORS: true
      });
      const link = document.createElement('a');
      link.download = `Ramadan-Day-${day.day}-${district}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (err) {
      console.error('Failed to save card:', err);
    } finally {
      setIsSaving(false);
    }
  };
  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      animate={{
        opacity: 1
      }}
      exit={{
        opacity: 0
      }}
      className="fixed inset-0 z-50 flex items-center justify-center px-3 bg-black/60 backdrop-blur-sm"
      onClick={onClose}>

      <motion.div
        initial={{
          scale: 0.9,
          opacity: 0,
          y: 20
        }}
        animate={{
          scale: 1,
          opacity: 1,
          y: 0
        }}
        exit={{
          scale: 0.9,
          opacity: 0,
          y: 20
        }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[calc(100vw-24px)] sm:max-w-sm">

        {/* The Card to Capture — ONLY visual content for screenshot */}
        <div
          ref={cardRef}
          className="bg-white rounded-3xl overflow-hidden shadow-2xl max-h-[75vh] overflow-y-auto">

          {/* Header Strip */}
          <div className="bg-ramadan-green text-ramadan-cream p-4 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <svg width="100%" height="100%">
                <pattern
                  id="pattern-circles"
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse">

                  <circle cx="2" cy="2" r="1" fill="currentColor" />
                </pattern>
                <rect
                  x="0"
                  y="0"
                  width="100%"
                  height="100%"
                  fill="url(#pattern-circles)" />

              </svg>
            </div>
            <h2 className="font-heading text-2xl font-bold mb-1 relative z-10">
              Ramadan Day {day.day}
            </h2>
            <p className="text-ramadan-gold text-sm font-medium relative z-10">
              {day.weekday}, {day.date}
            </p>
          </div>

          {/* Body */}
          <div className="p-4 space-y-4 bg-white">
            {/* Times */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-ramadan-cream rounded-2xl p-4 text-center border border-ramadan-gold/20">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <MoonIcon size={14} className="text-ramadan-gold" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Sehri End
                  </span>
                </div>
                <span className="text-2xl font-bold text-ramadan-green">
                  {day.sehriEnd}
                </span>
              </div>
              <div className="bg-ramadan-cream rounded-2xl p-4 text-center border border-ramadan-gold/20">
                <div className="flex items-center justify-center gap-1.5 mb-1.5">
                  <SunIcon size={14} className="text-ramadan-gold" />
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    Iftar
                  </span>
                </div>
                <span className="text-2xl font-bold text-ramadan-green">
                  {day.iftar}
                </span>
              </div>
            </div>

            <div className="h-px bg-gray-100 w-full" />

            {/* Dua Section */}
            <div className="text-center space-y-2">
              <div className="flex items-center justify-center gap-2 mb-1">
                <LanternIcon size={14} className="text-ramadan-gold" />
                <span className="text-[10px] font-bold text-ramadan-green uppercase tracking-widest">
                  Dua for Fasting
                </span>
                <LanternIcon size={14} className="text-ramadan-gold" />
              </div>

              <p className="text-ramadan-green font-medium text-sm leading-relaxed px-1">
                নাওয়াইতু আন আছুমা গাদাম, মিন শাহরি রমাদানাল মুবারাক;
                ফারদাল্লাকা ইয়া আল্লাহু, ফাতাকাব্বাল মিন্নি ইন্নিকা আনতাস
                সামিউল আলিম।
              </p>

              <p className="text-gray-500 text-xs italic leading-relaxed px-2">
                "হে আল্লাহ! আমি আগামীকাল পবিত্র রমজানের রোজা রাখার নিয়ত করছি।
                অতএব তুমি আমার পক্ষ থেকে তা কবুল কর, নিশ্চয়ই তুমি সর্বশ্রোতা ও
                সর্বজ্ঞ।"
              </p>
            </div>

            {/* Footer Branding */}
            <div className="text-center">
              <p className="text-[10px] text-gray-300 uppercase tracking-widest font-bold">
                Ramadan 2026 • {district}
              </p>
            </div>
          </div>
        </div>

        {/* Save Button — OUTSIDE cardRef, won't appear in screenshot */}
        <div className="mt-4 flex justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleSave();
            }}
            disabled={isSaving}
            className="flex items-center gap-2 bg-ramadan-gold text-white rounded-full px-6 py-3 font-bold shadow-lg hover:bg-[#c4923d] active:scale-[0.98] transition-all disabled:opacity-70 disabled:cursor-not-allowed">

            {isSaving ?
            <span className="animate-pulse">Saving...</span> :

            <>
                <CameraIcon size={18} />
                <span>Save Card</span>
              </>
            }
          </button>
        </div>

        {/* Dismiss hint — OUTSIDE cardRef */}
        <p className="text-[10px] text-white/40 font-medium text-center mt-3">
          Tap outside to close
        </p>
      </motion.div>
    </motion.div>);

}
export function CalendarPage({
  division,
  district,
  onChangeLocation
}: CalendarPageProps) {
  const [selectedDay, setSelectedDay] = useState<RamadanDay | null>(null);
  const schedule = getScheduleForDistrict(division, district);
  const rahmahDays = schedule.filter((d) => d.phase === 'rahmah');
  const maghfirahDays = schedule.filter((d) => d.phase === 'maghfirah');
  const najahDays = schedule.filter((d) => d.phase === 'najah');
  const todayISO = new Date().toISOString().split('T')[0];
  return (
    <div className="min-h-screen w-full bg-ramadan-cream">
      {/* Geometric Watermark */}
      <div
        className="fixed inset-0 opacity-[0.02] pointer-events-none z-0"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a24e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />


      {/* Greeting */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20
        }}
        animate={{
          opacity: 1,
          y: 0
        }}
        transition={{
          delay: 0.1,
          duration: 0.6
        }}
        className="max-w-5xl mx-auto px-4 pt-8 md:pt-16 pb-6 md:pb-8 text-center relative z-10">

        <h1 className="font-heading text-2xl md:text-5xl font-bold text-ramadan-green mb-2 leading-tight flex items-center justify-center gap-2 md:gap-3">
          <MoonIcon size={22} className="text-ramadan-gold md:w-7 md:h-7" />
          Ramadan Calendar
        </h1>
        <p className="text-ramadan-green/60 text-sm md:text-base font-medium mb-1 md:mb-2">
          {district}, {division}
        </p>
        <p className="text-ramadan-gold/60 text-xs md:text-sm max-w-sm mx-auto leading-relaxed mb-4">
          May this blessed month bring you peace, mercy, and abundant blessings
        </p>
        
        {/* Change Location Button */}
        <motion.button
          onClick={onChangeLocation}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-2 bg-ramadan-green/10 hover:bg-ramadan-green/20 text-ramadan-green px-4 py-2 rounded-full text-xs md:text-sm font-semibold transition-colors border border-ramadan-green/20"
        >
          <MapPin size={14} />
          Change Location
        </motion.button>
      </motion.div>

      {/* Schedule Sections */}
      <div className="max-w-5xl mx-auto px-4 pb-20 relative z-10 space-y-14">
        <PhaseSection
          title="Rahmah — Days 1–10"
          subtitle="Days of Mercy"
          days={rahmahDays}
          phaseIndex={0}
          onDayClick={setSelectedDay}
          todayISO={todayISO} />

        <PhaseSection
          title="Maghfirah — Days 11–20"
          subtitle="Days of Forgiveness"
          days={maghfirahDays}
          phaseIndex={1}
          onDayClick={setSelectedDay}
          todayISO={todayISO} />

        <PhaseSection
          title="Najah — Days 21–30"
          subtitle="Days of Salvation"
          days={najahDays}
          phaseIndex={2}
          onDayClick={setSelectedDay}
          todayISO={todayISO} />

      </div>

      {/* Modal Overlay */}
      <AnimatePresence>
        {selectedDay &&
        <DayCardModal
          day={selectedDay}
          district={district}
          onClose={() => setSelectedDay(null)} />

        }
      </AnimatePresence>
    </div>);

}