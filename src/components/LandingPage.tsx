import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { divisions } from '../data/bangladeshData';
import { LanternIcon } from './LanternIcon';
import { ArrowRight, MapPin } from 'lucide-react';
import clsx from 'clsx';
interface LandingPageProps {
  onComplete: (division: string, district: string) => void;
}
export function LandingPage({ onComplete }: LandingPageProps) {
  const [selectedDivision, setSelectedDivision] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [error, setError] = useState(false);
  const handleDivisionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDivision(e.target.value);
    setError(false);
  };
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDistrict(e.target.value);
    setError(false);
  };
  const handleSubmit = () => {
    if (!selectedDivision || !selectedDistrict) {
      setError(true);
      return;
    }
    onComplete(selectedDivision, selectedDistrict);
  };
  const districts = selectedDivision ? divisions[selectedDivision] : [];
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-ramadan-cream relative overflow-hidden px-4">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Geometric Watermark */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a24e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />

        {/* Floating Lanterns */}
        <div className="absolute top-[10%] left-[10%] text-ramadan-gold opacity-20">
          <LanternIcon size={64} animate delay={0} />
        </div>
        <div className="absolute bottom-[15%] right-[10%] text-ramadan-green opacity-10">
          <LanternIcon size={80} animate delay={2} />
        </div>
      </div>

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
          duration: 0.8,
          ease: 'easeOut'
        }}
        className="w-full max-w-md bg-white/80 backdrop-blur-sm rounded-3xl p-6 md:p-12 shadow-[0_8px_30px_rgba(30,58,47,0.08)] border border-ramadan-gold/20 relative z-10">

        <div className="text-center mb-8 md:mb-10">
          <motion.div
            initial={{
              scale: 0.9,
              opacity: 0
            }}
            animate={{
              scale: 1,
              opacity: 1
            }}
            transition={{
              delay: 0.2,
              duration: 0.6
            }}>

            <h1 className="font-heading text-3xl md:text-5xl font-bold text-ramadan-green mb-2">
              Assalamu Alaikum
            </h1>
            <p className="text-xl text-ramadan-gold font-medium tracking-wide">
              Ramadan Mubarak
            </p>
          </motion.div>
          <motion.p
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            transition={{
              delay: 0.4
            }}
            className="text-gray-500 mt-4 text-sm md:text-base">

            Select your location to view your Ramadan timetable
          </motion.p>
        </div>

        <div className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="division"
              className="text-sm font-semibold text-ramadan-green ml-1">

              Select Division
            </label>
            <div className="relative">
              <select
                id="division"
                value={selectedDivision}
                onChange={handleDivisionChange}
                className="w-full appearance-none bg-ramadan-cream/50 border border-ramadan-green/20 text-ramadan-green rounded-xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-ramadan-gold/50 focus:border-ramadan-gold transition-all cursor-pointer text-base">

                <option value="" disabled>
                  Choose a division
                </option>
                {Object.keys(divisions).map((div) =>
                <option key={div} value={div}>
                    {div}
                  </option>
                )}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ramadan-green/50">
                <MapPin size={18} />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="district"
              className="text-sm font-semibold text-ramadan-green ml-1">

              Select District
            </label>
            <div className="relative">
              <select
                id="district"
                value={selectedDistrict}
                onChange={handleDistrictChange}
                disabled={!selectedDivision}
                className={clsx(
                  'w-full appearance-none border rounded-xl px-4 py-4 pr-10 focus:outline-none focus:ring-2 focus:ring-ramadan-gold/50 focus:border-ramadan-gold transition-all cursor-pointer text-base',
                  !selectedDivision ?
                  'bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed' :
                  'bg-ramadan-cream/50 border-ramadan-green/20 text-ramadan-green'
                )}>

                <option value="" disabled>
                  {selectedDivision ?
                  'Choose a district' :
                  'Select division first'}
                </option>
                {districts.map((dist) =>
                <option key={dist} value={dist}>
                    {dist}
                  </option>
                )}
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-ramadan-green/50">
                <MapPin size={18} />
              </div>
            </div>
          </div>

          {error &&
          <motion.p
            initial={{
              opacity: 0,
              height: 0
            }}
            animate={{
              opacity: 1,
              height: 'auto'
            }}
            className="text-amber-600 text-sm text-center font-medium bg-amber-50 py-2 rounded-lg">

              Please select both division and district
            </motion.p>
          }

          <motion.button
            whileHover={{
              scale: 1.02,
              boxShadow: '0 10px 20px -5px rgba(212, 162, 78, 0.4)'
            }}
            whileTap={{
              scale: 0.98
            }}
            onClick={handleSubmit}
            className="w-full bg-ramadan-green text-ramadan-cream font-bold text-lg py-4 rounded-xl shadow-lg shadow-ramadan-green/20 flex items-center justify-center gap-2 mt-4 group pb-[max(1rem,env(safe-area-inset-bottom))]">

            View Schedule
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform" />

          </motion.button>
        </div>
      </motion.div>
    </div>);

}