'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { HeroVisual } from './HomeDesign';
import { useTranslations } from 'next-intl';

/**
 * Section 1: Platform Introduction.
 * Refined with Premium Staggered Animations.
 */

import Typewriter from 'typewriter-effect';

/**
 * TypewriterText: Using the professional 'typewriter-effect' library.
 */
const TypewriterText = ({ text }: { text: string }) => {
  return (
    <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-tighter uppercase flex items-center min-h-[1.2em]">
      <Typewriter
        key={text} // Force restart when text changes (language switch)
        onInit={(typewriter) => {
          typewriter
            .typeString(text)
            .pauseFor(3000)
            .deleteAll()
            .start();
        }}
        options={{
          autoStart: true,
          loop: true,
          delay: 50,
          cursor: '',
          wrapperClassName: 'inline-block'
        }}
      />
    </h1>
  );
};

export const ChapterWeb = () => {
  const t = useTranslations('Home');

  return (
    <section className="relative w-full h-[calc(100vh-3.5rem)] flex items-center justify-center bg-transparent snap-start overflow-hidden">

      {/* 1. Main Content Grid - Centered */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
      >

        {/* Left Side: Staggered Text */}
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-center">
          <div className="space-y-6">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 }
              }}
              className="text-[#22D3EE] text-[9px] font-black uppercase tracking-[0.5em]"
            >
              {t('eyebrow')}
            </motion.div>

            <TypewriterText text={t('headline')} />

            <motion.p
              variants={{
                hidden: { opacity: 0 },
                show: { opacity: 1 }
              }}
              className="text-[#94A3B8] text-sm md:text-lg max-w-md font-medium leading-relaxed"
            >
              {t('description')}
            </motion.p>
          </div>
          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1 }
            }}
            className="h-[1px] w-12 bg-white/10 origin-left"
          />
        </div>

        {/* Right Side: Floating AbstractRadiance */}
        <motion.div
          variants={{
            hidden: { opacity: 0, scale: 0.8 },
            show: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="lg:col-span-6 relative flex items-center justify-center"
        >
          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <HeroVisual />
          </motion.div>
        </motion.div>

      </motion.div>

      {/* 2. Minimalist Kinetic Beam (Bottom Right Corner) */}
      <div className="absolute bottom-12 right-8 hidden lg:flex flex-col items-center z-20">
        <div className="w-[1px] h-24 bg-white/5 relative overflow-hidden rounded-full">
          {/* Falling Light Drop */}
          <motion.div
            animate={{
              top: ['-20%', '120%'],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: [0.45, 0, 0.55, 1]
            }}
            className="absolute left-0 w-full h-12 bg-gradient-to-b from-transparent via-[#22D3EE] to-transparent"
          />
        </div>
      </div>

    </section>
  );
};
