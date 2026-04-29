'use client';

import React, { useMemo } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { Icon } from '@iconify/react';
import { Link } from '@/i18n/navigation';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import Typed from 'typed.js';

/**
 * TypewriterText: Rich typed headline powered by Typed.js.
 */
const TypewriterText = ({ text }: { text: string }) => {
  const typedElementRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    if (!typedElementRef.current) {
      return;
    }

    const typed = new Typed(typedElementRef.current, {
      strings: [text],
      typeSpeed: 58,
      backSpeed: 30,
      backDelay: 2200,
      startDelay: 250,
      loop: true,
      showCursor: true,
      cursorChar: '|',
    });

    return () => {
      typed.destroy();
    };
  }, [text]);

  return (
    <h1 className="min-h-[1.2em] whitespace-nowrap text-[clamp(1.95rem,3.45vw,3.3rem)] font-black uppercase leading-[1.02] tracking-[0.028em] text-white">
      <span ref={typedElementRef} className="inline-block align-middle pr-[0.04em]" />
    </h1>
  );
};

import { ISourceOptions } from "@tsparticles/engine";

/**
 * Section 2: Social Platform Introduction.
 * "WOW" Version: Nexus Connection Aura.
 * Using tsparticles for neural network and framer-motion for 3D shards.
 */
export const ChapterSocial = () => {
  const t = useTranslations('Home.social');
  const [init, setInit] = React.useState(false);

  // Initialize particles engine
  React.useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  // Mouse Parallax for subtle depth
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Particles config for Neural Network effect
  const particlesOptions = useMemo(() => ({
    fullScreen: { enable: false },
    fpsLimit: 60,
    particles: {
      color: { value: "#E4E4E7" },
      links: {
        color: "#E4E4E7",
        distance: 100, // Thu ngắn liên kết để bớt rối
        enable: true,
        opacity: 0.1,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.6, // Di chuyển chậm hơn, sang hơn
        direction: "none",
        random: true,
        straight: false,
        outModes: { default: "out" },
      },
      number: { density: { enable: true, area: 1000 }, value: 20 }, // Giảm số lượng hạt
      opacity: { value: { min: 0.05, max: 0.15 } }, // Cực kỳ mờ ảo
      shape: { type: "circle" },
      size: { value: { min: 0.5, max: 2 } },
    },
    interactivity: {
      events: { onHover: { enable: true, mode: "grab" } },
      modes: { grab: { distance: 180, links: { opacity: 0.4 } } },
    },
    retina_detect: true,
  }), []);

  return (
    <section className="relative flex h-[calc(100vh-3.5rem)] w-full snap-start items-center justify-center overflow-hidden bg-transparent py-20">
      {/* 1. Dynamic Particles Neural Network Background */}
      {init && (
        <Particles
          id="social-particles"
          options={particlesOptions as ISourceOptions}
          className="absolute inset-0 z-0 pointer-events-none opacity-40"
        />
      )}

      {/* 2. Global Glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[10%] h-[600px] w-[600px] rounded-full bg-white/[0.04] blur-[130px]" />
        <div className="absolute right-[10%] bottom-[20%] h-[500px] w-[500px] rounded-full bg-zinc-400/[0.04] blur-[120px]" />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          show: { opacity: 1, transition: { staggerChildren: 0.15 } },
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
      >
        {/* Left Side: Staggered Text */}
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-center h-full">
          <div className="space-y-6 pl-[0.08em]">
            <motion.div
              variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}
              className="text-zinc-300 text-[9px] font-black uppercase tracking-[0.42em]"
            >
              {t('eyebrow')}
            </motion.div>

            <TypewriterText text={t('title')} />

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
              className="text-zinc-400 text-sm md:text-lg max-w-md font-medium leading-relaxed"
            >
              {t('description')}
            </motion.p>
          </div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            className="flex items-center gap-6"
          >
            <Link
              href="/social"
              className="
                group relative inline-flex items-center gap-3 rounded-full
                bg-white px-8 py-4 text-[12px] font-black uppercase tracking-[0.2em] text-black
                shadow-[0_10px_40px_rgba(255,255,255,0.1)]
                transition-all duration-500
                hover:-translate-y-1 hover:bg-zinc-200 hover:shadow-[0_15px_50px_rgba(255,255,255,0.18)]
              "
            >
              {t('cta')}
              <Icon icon="solar:arrow-right-up-linear" className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </motion.div>

          <motion.div
            variants={{ hidden: { scaleX: 0 }, show: { scaleX: 1 } }}
            className="h-[1px] w-12 bg-white/10 origin-left"
          />
        </div>

        {/* Right Side: Nexus Dynamic Aura (The WOW Factor) */}
        <div 
          className="lg:col-span-6 relative flex min-h-[620px] items-center justify-center perspective-[2000px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Central Nexus Orb (Profile Hub) */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative z-20 flex flex-col items-center"
          >
            {/* Simplified Profile Hub with Elegant Aura */}
            <div className="relative group">
              {/* Subtle Breathing Aura */}
              <motion.div 
                animate={{ 
                  opacity: [0.15, 0.3, 0.15],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -inset-10 bg-white/10 blur-[50px] rounded-full" 
              />

              <div className="relative w-32 h-32 rounded-full p-1 bg-gradient-to-tr from-white via-zinc-300 to-zinc-700 shadow-[0_0_40px_rgba(255,255,255,0.12)]">
                <div className="w-full h-full rounded-full bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
                  <Icon icon="solar:user-circle-bold-duotone" className="w-16 h-16 text-zinc-100" />
                </div>
              </div>
              
              <div className="absolute -bottom-1 right-2 flex items-center gap-1.5 rounded-full border border-white/15 bg-black/80 px-3 py-1 backdrop-blur-xl">
                <span className="h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)]" />
                <span className="text-[8px] font-black uppercase tracking-widest text-zinc-200">Online</span>
              </div>
            </div>

            {/* Profile Info */}
            <div className="mt-8 text-center space-y-1" style={{ transform: "translateZ(40px)" }}>
              <h3 className="text-4xl font-black text-white font-allura tracking-normal">Suzji</h3>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.3em]">@suzji</p>
              <p className="mt-4 max-w-[280px] text-xs font-medium text-zinc-400 leading-relaxed mx-auto">
                {t('profileBio')}
              </p>
            </div>

            {/* Action Shards */}
            <div className="mt-10 flex gap-3" style={{ transform: "translateZ(60px)" }}>
              <button className="px-8 py-3.5 rounded-2xl border border-white/15 bg-white/8 text-zinc-100 text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all shadow-[0_15px_30px_rgba(255,255,255,0.08)]">
                Follow
              </button>
              <button className="px-6 py-3.5 rounded-2xl border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all">
                <Icon icon="solar:letter-bold" width="18" />
              </button>
            </div>
          </motion.div>

          {/* Floating Glass Moment Shard (Simplified) */}
          <motion.div
            style={{ 
              x: useTransform(mouseXSpring, [-0.5, 0.5], [40, -40]), 
              y: useTransform(mouseYSpring, [-0.5, 0.5], [60, -60]) 
            }}
            className="absolute top-20 right-4 z-10 w-52 rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-3xl shadow-2xl"
          >
            <div className="flex gap-3 items-center">
              <Icon icon="solar:stars-bold" className="text-zinc-200" width="16" />
              <p className="text-[11px] text-zinc-300 font-medium">{t('profileShard')}</p>
            </div>
          </motion.div>

          
        </div>
      </motion.div>
    </section>
  );
};
