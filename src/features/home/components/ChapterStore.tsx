'use client';

import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Icon } from '@iconify/react';
import React from 'react';
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

/**
 * Section 3: Store Introduction.
 * Redesigned with 3D Spatial Layers and Holographic Shimmer.
 */
export const ChapterStore = () => {
  const t = useTranslations('Home.store');

  // Mouse Move Parallax Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section className="relative flex h-[calc(100vh-3.5rem)] w-full snap-start items-center justify-center overflow-hidden bg-transparent py-20">
      {/* 1. Enhanced Dynamic Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[10%] top-[20%] h-[600px] w-[600px] rounded-full bg-white/[0.05] blur-[140px] animate-pulse" />
        <div className="absolute left-[5%] bottom-[10%] h-[500px] w-[500px] rounded-full bg-zinc-400/[0.05] blur-[120px]" />

        {/* Subtle Ecosystem Mesh */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      </div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.16 },
          },
        }}
        className="relative z-10 w-full max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center"
      >
        {/* Left Side: Staggered Text */}
        <div className="lg:col-span-6 space-y-8 flex flex-col justify-center h-full">
          <div className="space-y-6 pl-[0.08em]">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                show: { opacity: 1, x: 0 },
              }}
              className="text-zinc-300 text-[9px] font-black uppercase tracking-[0.42em]"
            >
              {t('eyebrow')}
            </motion.div>

            <TypewriterText text={t('title')} />

            <motion.p
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="text-zinc-400 text-sm md:text-lg max-w-md font-medium leading-relaxed"
            >
              {t('description')}
            </motion.p>
          </div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              show: { opacity: 1, y: 0 },
            }}
          >
            <Link
              href="/store/home"
              className="
                group relative inline-flex items-center gap-3 rounded-full
                bg-white px-8 py-4 text-[12px] font-black uppercase tracking-[0.2em] text-black
                shadow-[0_10px_40px_rgba(255,255,255,0.1)]
                transition-all duration-500
                hover:-translate-y-1 hover:bg-zinc-200 hover:shadow-[0_20px_60px_rgba(255,255,255,0.16)]
              "
            >
              {t('cta')}
              <Icon
                icon="solar:arrow-right-up-linear"
                className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </Link>
          </motion.div>

          <motion.div
            variants={{
              hidden: { scaleX: 0 },
              show: { scaleX: 1 }
            }}
            className="h-[1px] w-12 bg-white/10 origin-left"
          />
        </div>

        {/* Right Side: 3D Ecosystem Portal */}
        <div
          className="lg:col-span-6 relative flex min-h-[600px] items-center justify-center perspective-[1500px]"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Orbital Aura Rings */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-[500px] h-[500px] rounded-full border border-white/[0.03] absolute"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="w-[420px] h-[420px] rounded-full border border-white/[0.05] absolute"
            />
          </div>

          {/* Floating Artifacts - Outside the card */}
          <motion.div
            style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], [20, -20]), y: useTransform(mouseYSpring, [-0.5, 0.5], [20, -20]) }}
            className="absolute top-[15%] right-[10%] z-20 text-zinc-200 opacity-40 blur-[1px]"
          >
            <Icon icon="solar:box-minimalistic-bold-duotone" width="48" />
          </motion.div>
          <motion.div
            style={{ x: useTransform(mouseXSpring, [-0.5, 0.5], [-30, 30]), y: useTransform(mouseYSpring, [-0.5, 0.5], [-30, 30]) }}
            className="absolute bottom-[20%] left-[5%] z-20 text-zinc-500 opacity-30 blur-[1px]"
          >
            <Icon icon="solar:crown-minimalistic-bold-duotone" width="40" />
          </motion.div>

          {/* Main 3D Glass Card */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative z-10 w-full max-w-[440px]"
          >
            <div className="
              relative overflow-hidden rounded-[2.5rem]
              border border-white/10 bg-[#0B0F14]/40 p-10
              shadow-[0_40px_100px_rgba(0,0,0,0.7)] backdrop-blur-[40px]
            ">
              {/* Holographic Shimmer Effect */}
              <motion.div
                animate={{ x: ['-100%', '200%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -skew-x-12 pointer-events-none"
              />

              {/* Header */}
              <div className="flex items-start justify-between" style={{ transform: "translateZ(50px)" }}>
                <div className="flex items-center gap-5">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-zinc-100 shadow-[inset_0_0_20px_rgba(255,255,255,0.08)]">
                    <Icon icon="solar:shop-2-bold-duotone" className="h-8 w-8" />
                  </div>
                  <div>
                    <h3 className="text-xl font-black tracking-tighter text-white uppercase">Storefront</h3>
                    <p className="mt-1 text-[10px] font-bold text-zinc-500 uppercase tracking-widest opacity-60">Buy from creators or become one</p>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 rounded-full border border-white/15 bg-white/8 px-3 py-1.5">
                  <div className="h-1 w-1 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] animate-pulse" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-zinc-100">Seller Ready</span>
                </div>
              </div>

              {/* Rows */}
              <div className="mt-12 space-y-4" style={{ transform: "translateZ(30px)" }}>
                {[
                  { icon: "solar:minimalistic-magnifer-bold", text: "Browse curated products" },
                  { icon: "solar:upload-bold", text: "Share your own creations" },
                  { icon: "solar:settings-bold", text: "Manage your seller space" }
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.02] px-5 py-4 transition-all duration-300 hover:bg-white/[0.08] hover:border-white/10 group/row"
                  >
                    <Icon icon={item.icon} className="h-5 w-5 text-zinc-500 transition-colors group-hover/row:text-zinc-100" />
                    <span className="text-sm font-bold text-zinc-400 group-hover/row:text-zinc-200 transition-colors">{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between" style={{ transform: "translateZ(40px)" }}>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-600">Want to sell?</p>
                  <p className="text-xs font-medium text-zinc-500">Open your shop today.</p>
                </div>
                <Link
                  href="/store/home"
                  className="
                    rounded-xl border border-white/15 bg-white/8
                    px-5 py-2.5 text-[10px] font-black uppercase tracking-widest text-zinc-100
                    transition-all duration-300
                    hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]
                  "
                >
                  Become Seller
                </Link>
              </div>
            </div>

            {/* Glowing Aura Behind Card */}
            <div className="pointer-events-none absolute inset-10 -z-10 rounded-full bg-white/[0.08] blur-[120px]" />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
