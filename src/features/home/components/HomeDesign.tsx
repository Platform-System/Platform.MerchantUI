'use client';

import React, { useEffect, useState, useMemo } from 'react';
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { loadEmittersPlugin } from "@tsparticles/plugin-emitters";
import { loadAbsorbersPlugin } from "@tsparticles/plugin-absorbers";
import { motion, useSpring, useMotionValue } from 'framer-motion';
import { ISourceOptions } from "@tsparticles/engine";
import { Icon } from '@iconify/react';

/**
 * HomeDesign: Các thành phần trang trí chủ đạo cho trang chủ.
 * Bao gồm hiệu ứng nền (Background) và các khối hình ảnh tiêu điểm (Hero Visual).
 */

export const HomeBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
      await loadEmittersPlugin(engine);
      await loadAbsorbersPlugin(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const options = useMemo(() => ({
    fullScreen: { enable: true, zIndex: 0 },
    background: { color: "#0B0C0F" },
    fpsLimit: 120,
    interactivity: {
      events: {
        onHover: {
          enable: true,
          mode: ["attract", "bubble", "grab"]
        },
        resize: { enable: true },
      },
      modes: {
        attract: {
          distance: 180,
          duration: 0.4,
          factor: 2.5,
          speed: 0.8
        },
        bubble: {
          distance: 180,
          duration: 0.4,
          size: 4,
          opacity: 0.9
        },
        grab: {
          distance: 180,
          links: {
            opacity: 0.35,
            color: "rgba(255,255,255,0.28)"
          }
        }
      },
    },
    particles: {
      color: { value: ["#F8FAFC", "#D4D4D8", "#A1A1AA", "#71717A"] },
      links: {
        enable: true,
        distance: 85,
        color: "random",
        opacity: 0.2,
        width: 1,
      },
      collisions: { enable: true, mode: "bounce" },
      move: {
        enable: true,
        direction: "none",
        outModes: { default: "bounce" },
        speed: 0.35,
      },
      number: {
        density: { enable: true, area: 1200 },
        value: 450,
      },
      opacity: {
        value: { min: 0.2, max: 0.6 },
        animation: { enable: true, speed: 0.4, sync: false }
      },
      shape: { type: "circle" },
      size: { value: { min: 0.5, max: 1.8 } },
    },
    emitters: [
      {
        direction: "bottom-left",
        rate: { delay: 20, quantity: 1 },
        position: { x: 100, y: 0 },
        particles: {
          move: {
            speed: 12,
            straight: true,
            outModes: { default: "out" },
            trail: { enable: true, length: 120, fillColor: "#0B0F14" }
          },
          collisions: { enable: false },
          size: { value: 2 },
          opacity: { value: 1 },
          color: { value: "#E4E4E7" }
        }
      }
    ],
    detectRetina: true,
  }), []);

  if (!init) return <div className="fixed inset-0 bg-transparent" />;

  return (
    <div className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-[#0B0C0F]">
      {/* BACKGROUND AMBIANCE - Static nebulae only */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-1/4 left-1/4 w-[60%] h-[60%] bg-white/[0.045] blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[60%] h-[60%] bg-zinc-400/[0.045] blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '3s' }} />
      </div>

      <Particles id="tsparticles" options={options as ISourceOptions} />
    </div>
  );
};

// ... Shared components stay stable ...
/**
 * AbstractRadiance V8: THE CELESTIAL SINGULARITY.
 * A hyper-premium abstract visual replacing literal images.
 * Features a pulsing quantum core, orbital rings, and interactive light nodes.
 */
export const HeroVisual = () => {
  const [mounted, setMounted] = useState(false);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 60, damping: 20 });

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true));
    const handleMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * -20;
      rotateX.set(y);
      rotateY.set(x);
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [rotateX, rotateY]);

  if (!mounted) return null;

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center [perspective:1500px]">
      <motion.div
        style={{ rotateX, rotateY }}
        className="relative w-96 h-96 flex items-center justify-center"
      >
        {/* 1. THE CORE SINGULARITY */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 50px rgba(255, 255, 255, 0.16)",
              "0 0 100px rgba(255, 255, 255, 0.26)",
              "0 0 50px rgba(255, 255, 255, 0.16)"
            ]
          }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-32 h-32 bg-gradient-to-br from-white via-zinc-300 to-zinc-600 rounded-full blur-[2px] z-10"
        >
          <div className="absolute inset-0 bg-white/20 rounded-full blur-sm animate-pulse" />
        </motion.div>

        {/* 2. ORBITAL RINGS */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 10 + i * 5, repeat: Infinity, ease: "linear" }}
            className="absolute border border-white/10 rounded-full"
            style={{
              width: `${180 + i * 80}px`,
              height: `${180 + i * 80}px`,
              rotateX: 60 + i * 10,
              rotateZ: i * 45
            }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
          </motion.div>
        ))}

        {/* 3. DYNAMIC STAR SWARM (Orbiting particles) */}
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              rotate: 360,
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.8, 0.3]
            }}
            transition={{
              duration: 8 + (i % 5) * 4, // Varied orbital speeds
              repeat: Infinity,
              ease: "linear",
              delay: -i * 0.5
            }}
            className="absolute"
            style={{
              width: `${200 + (i % 8) * 40}px`,
              height: `${200 + (i % 8) * 40}px`,
              rotateX: 45 + (i % 4) * 20, // Different orbital planes
              rotateZ: i * 15,
            }}
          >
            <motion.div 
              animate={{ 
                x: [0, 4, 0],
                y: [0, -4, 0]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 w-1 h-1 bg-white rounded-full shadow-[0_0_8px_white] blur-[0.2px]" 
            />
          </motion.div>
        ))}

        {/* 4. DEPTH LAYERS */}
        <div className="absolute inset-[-100px] bg-white/[0.05] blur-[100px] rounded-full -z-10 animate-pulse" />
      </motion.div>

      {/* 5. AMBIENT ATMOSPHERE */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06)_0%,transparent_70%)]" />
    </div>
  );
};

interface ProductCardProps {
  name: string;
  price: string;
  rating: string;
  seller: string;
  category: string;
}

export const ProductCard = ({ name, price, rating, seller, category }: ProductCardProps) => (
  <motion.div 
    whileHover={{ y: -12, scale: 1.02 }} 
    className="group relative bg-[#1A1D23]/60 backdrop-blur-2xl border border-white/5 rounded-3xl p-6 space-y-5 cursor-pointer hover:border-white/20 transition-all duration-500 overflow-hidden shadow-2xl"
  >
    <div className="absolute inset-0 bg-gradient-to-br from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
    
    <div className="aspect-square bg-[#0B0F14] rounded-2xl flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      <Icon icon="solar:box-minimalistic-bold-duotone" width="56" className="text-zinc-700 group-hover:text-white transition-all duration-500 group-hover:scale-110" />
    </div>

    <div className="space-y-2 relative z-10">
      <h4 className="text-white font-bold text-base tracking-tight line-clamp-1 group-hover:text-zinc-200 transition-colors">{name}</h4>
      <div className="flex justify-between items-end">
        <div className="space-y-0.5">
          <span className="text-zinc-100 font-black text-lg tracking-tight">{price}</span>
          <div className="flex items-center gap-1 text-[10px] text-zinc-500 font-bold uppercase tracking-widest">
            <Icon icon="solar:star-bold" className="text-yellow-500/80" />
            {rating}
          </div>
        </div>
        <span className="px-3 py-1 bg-white/5 rounded-full text-[9px] text-zinc-400 uppercase font-black tracking-[0.2em] border border-white/5">
          {category}
        </span>
      </div>
    </div>

    <div className="pt-5 border-t border-white/5 flex items-center gap-3 relative z-10">
      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-900 border border-white/10" />
      <span className="text-[11px] text-zinc-500 font-bold group-hover:text-zinc-300 transition-colors">{seller}</span>
    </div>
  </motion.div>
);

interface SocialPostProps {
  user: string;
  handle: string;
  content: string;
  likes: string | number;
  comments: string | number;
}

export const SocialPost = ({ user, handle, content, likes, comments }: SocialPostProps) => (
  <motion.div 
    whileHover={{ scale: 1.01 }}
    className="group relative bg-[#1A1D23]/60 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-8 space-y-6 hover:border-white/20 transition-all duration-500 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
  >
    {/* Inner Aura */}
    <div className="absolute inset-0 bg-gradient-to-tr from-white/[0.06] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[2.5rem]" />

    <div className="flex items-center gap-4 relative z-10">
      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-white via-zinc-300 to-zinc-700 p-[2px] shadow-lg">
        <div className="w-full h-full rounded-full bg-[#0B0C0F] flex items-center justify-center overflow-hidden">
          <span className="text-white font-black text-sm">{user.charAt(0)}</span>
        </div>
      </div>
      <div>
        <h5 className="text-white text-sm font-black tracking-tight">{user}</h5>
        <span className="text-zinc-500 text-[11px] font-bold tracking-wide">{handle}</span>
      </div>
    </div>

    <p className="text-zinc-300 text-[15px] leading-relaxed relative z-10 font-medium">
      {content}
    </p>

    <div className="flex items-center gap-8 pt-6 border-t border-white/5 relative z-10">
      <div className="flex items-center gap-2.5 group/stat cursor-pointer">
        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover/stat:bg-white/10 group-hover/stat:text-white transition-all">
          <Icon icon="solar:heart-bold" width="20" />
        </div>
        <span className="text-zinc-500 text-xs font-black group-hover/stat:text-white transition-colors">{likes}</span>
      </div>
      <div className="flex items-center gap-2.5 group/stat cursor-pointer">
        <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center group-hover/stat:bg-white/10 group-hover/stat:text-white transition-all">
          <Icon icon="solar:chat-round-dots-bold" width="20" />
        </div>
        <span className="text-zinc-500 text-xs font-black group-hover/stat:text-white transition-colors">{comments}</span>
      </div>
    </div>
  </motion.div>
);
