"use client";

import { motion } from "framer-motion";

export default function Welcome() {
  const handleOpen = () => {
    document.getElementById("hero")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="welcome"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#f8f5f0] px-6"
    >
      {/* Soft background glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(214,158,169,0.28) 0%, rgba(248,245,240,0) 70%)",
        }}
      />

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 1.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="relative z-10 flex max-w-md flex-col items-center text-center"
      >
        {/* Small handwritten introduction */}
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.25,
            duration: 0.9,
          }}
          className="font-hand text-2xl text-[#a64b5d]"
        >
          A little something for you...
        </motion.p>

        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            delay: 0.45,
            duration: 1.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-5 font-display text-[4.2rem] font-medium leading-[0.9] tracking-[-0.04em] text-[#27221f] sm:text-7xl"
        >
          I&apos;m
          <br />
          Sorry.
        </motion.h1>

        {/* Supporting message */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.9,
          }}
          className="mt-7 max-w-[300px] text-[15px] leading-7 text-[#746c66]"
        >
          There are some things I wish I could say better.
          <br />
          So I made this for you.
        </motion.p>

        {/* CTA */}
        <motion.button
          type="button"
          onClick={handleOpen}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 1.15,
            duration: 0.8,
          }}
          whileTap={{ scale: 0.96 }}
          className="group mt-10 inline-flex items-center gap-3 rounded-full border border-[#a64b5d]/25 bg-white/60 px-6 py-3.5 text-sm font-medium text-[#5c3a41] backdrop-blur-sm transition-colors duration-300 hover:bg-white"
        >
          <span>Open this</span>

          <span
            aria-hidden="true"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </motion.button>

        {/* Small bottom detail */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 1.6,
            duration: 1,
          }}
          className="mt-14 flex items-center gap-3 text-[#b49d9f]"
        >
          <span className="h-px w-8 bg-[#d8c3c5]" />
          <span className="text-xs tracking-[0.25em]">FOR YOU</span>
          <span className="h-px w-8 bg-[#d8c3c5]" />
        </motion.div>
      </motion.div>

      {/* Bottom scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 2,
          duration: 1,
        }}
        className="absolute bottom-7 left-1/2 -translate-x-1/2 text-[#b49d9f]"
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="text-xs tracking-[0.2em]"
        >
          SCROLL
        </motion.div>
      </motion.div>
    </section>
  );
}