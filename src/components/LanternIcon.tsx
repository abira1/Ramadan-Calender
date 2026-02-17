import React from 'react';
import { motion } from 'framer-motion';
interface LanternIconProps {
  size?: number;
  className?: string;
  opacity?: number;
  delay?: number;
  animate?: boolean;
}
export function LanternIcon({
  size = 24,
  className = '',
  opacity = 1,
  delay = 0,
  animate = false
}: LanternIconProps) {
  const content =
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    style={{
      opacity
    }}>

      {/* Chain */}
      <path d="M12 2v4" />

      {/* Top Ring */}
      <circle cx="12" cy="2" r="1" />

      {/* Dome */}
      <path d="M8 6h8l2 3H6l2-3z" />

      {/* Body Main */}
      <path d="M6 9h12v8l-2 3H8l-2-3V9z" />

      {/* Inner Detail */}
      <path d="M12 9v8" />
      <path d="M6 13h12" />

      {/* Bottom Tassel/Detail */}
      <path d="M12 20v2" />
    </svg>;

  if (animate) {
    return (
      <motion.div
        initial={{
          y: 0
        }}
        animate={{
          y: [0, -15, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: delay
        }}>

        {content}
      </motion.div>);

  }
  return content;
}