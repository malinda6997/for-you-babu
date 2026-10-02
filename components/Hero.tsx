"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const petals = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${4 + ((index * 17) % 92)}%`,
  size: 7 + ((index * 5) % 7),
  delay: (index % 6) * 0.7,
  duration: 6 + (index % 5) * 1.2,
}));

export default function Hero() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const petalsRef = useRef<HTMLDivElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const image = section.querySelector(".hero-image");
      const overlay = section.querySelector(".hero-overlay");
      const badge = section.querySelector(".hero-badge");
      const title = section.querySelector(".hero-title");
      const message = section.querySelector(".hero-message");
      const divider = section.querySelector(".hero-divider");
      const bottomText = section.querySelector(".hero-bottom");

      /* --------------------------------
         HERO INTRO ANIMATION
      -------------------------------- */

      const intro = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      intro
        .fromTo(
          image,
          {
            scale: 1.08,
          },
          {
            scale: 1,
            duration: 2,
            ease: "power2.out",
          }
        )
        .fromTo(
          overlay,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 1.5,
          },
          "-=1.5"
        )
        .fromTo(
          badge,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.7"
        )
        .fromTo(
          title,
          {
            opacity: 0,
            y: 28,
          },
          {
            opacity: 1,
            y: 0,
            duration: 1,
          },
          "-=0.45"
        )
        .fromTo(
          message,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
          },
          "-=0.5"
        )
        .fromTo(
          divider,
          {
            scaleX: 0,
          },
          {
            scaleX: 1,
            duration: 0.8,
          },
          "-=0.45"
        )
        .fromTo(
          bottomText,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.35"
        );

      /* --------------------------------
         SUBTLE IMAGE PARALLAX
      -------------------------------- */

      gsap.to(image, {
        scale: 1.06,
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* --------------------------------
         FALLING ROSE PETALS
      -------------------------------- */

      if (petalsRef.current) {
        const petalElements =
          petalsRef.current.querySelectorAll(".rose-petal");

        petalElements.forEach((petal, index) => {
          const duration = 6 + (index % 5) * 1.2;
          const delay = (index % 6) * 0.7;

          gsap.set(petal, {
            y: -50 - Math.random() * 100,
            x: Math.random() * 30 - 15,
            rotation: Math.random() * 180,
            opacity: 0,
          });

          gsap.to(petal, {
            y: "115vh",
            x: `+=${Math.random() * 140 - 70}`,
            rotation: `+=${Math.random() * 720 - 360}`,
            opacity: 0.75,
            duration,
            delay,
            repeat: -1,
            ease: "none",
          });

          gsap.to(petal, {
            opacity: 0.35,
            duration: 1.2,
            delay,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });
      }
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#210d13]"
    >
      {/* =====================================
          FULL SCREEN IMAGE
      ====================================== */}

      <Image
        src="/assets/m1.jpeg"
        alt="A beautiful memory"
        fill
        priority
        sizes="100vw"
        className="hero-image object-cover object-center"
      />

      {/* =====================================
          SOFT RED / ROSE OVERLAY

          Low opacity so the original photo
          remains clearly visible.
      ====================================== */}

      <div
        className="hero-overlay absolute inset-0 opacity-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(128, 24, 48, 0.16) 0%, rgba(156, 38, 64, 0.18) 45%, rgba(92, 15, 32, 0.32) 100%)",
        }}
      />

      {/* Very subtle dark layer */}
      <div className="absolute inset-0 bg-black/[0.04]" />

      {/* =====================================
          FALLING ROSE PETALS
      ====================================== */}

      <div
        ref={petalsRef}
        className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
        aria-hidden="true"
      >
        {petals.map((petal) => (
          <span
            key={petal.id}
            className="rose-petal absolute -top-8 rounded-[70%_30%_70%_30%] bg-[#e73559] shadow-[0_2px_8px_rgba(120,0,25,0.18)]"
            style={{
              left: petal.left,
              width: `${petal.size}px`,
              height: `${petal.size * 0.72}px`,
            }}
          />
        ))}
      </div>

      {/* =====================================
          HERO CONTENT
      ====================================== */}

      <div className="hero-content relative z-30 flex w-full max-w-xl flex-col items-center px-7 pb-12 pt-24 text-center text-white">
        {/* Small label */}
        <div className="hero-badge flex items-center gap-3 rounded-full border border-white/30 bg-black/10 px-5 py-2 backdrop-blur-[3px]">
          <span className="text-sm text-white/90">♡</span>

          <span className="text-[10px] font-medium tracking-[0.28em] text-white/90">
            JUST FOR YOU
          </span>

          <span className="text-sm text-white/90">♡</span>
        </div>

        {/* Main title */}
        <h1 className="hero-title mt-7 font-display text-[3.5rem] font-medium leading-[0.92] tracking-[-0.045em] drop-shadow-[0_4px_20px_rgba(0,0,0,0.22)] sm:text-6xl">
          I&apos;m sorry,
          <br />
          my love.
        </h1>

        {/* Divider */}
        <div className="hero-divider mx-auto mt-7 h-px w-12 bg-white/65" />

        {/* Main message */}
        <p className="hero-message mt-7 max-w-[330px] text-[14px] leading-7 text-white/90 sm:max-w-md sm:text-base sm:leading-8">
          For the moments I wish I could change, and for the heart I never
          meant to hurt.
        </p>

        {/* Romantic line */}
        <div className="hero-bottom mt-8">
          <p className="font-display text-[17px] italic text-white/95 sm:text-lg">
            Some memories are too beautiful to lose.
          </p>

          <p className="mt-3 text-xl text-[#ffb5c2]">♡</p>
        </div>
      </div>

      {/* =====================================
          SCROLL INDICATOR
      ====================================== */}

      <div className="absolute bottom-6 left-1/2 z-30 -translate-x-1/2 text-center text-white/65">
        <p className="text-[8px] tracking-[0.35em]">SCROLL</p>

        <div className="mx-auto mt-2 h-6 w-px bg-white/40" />
      </div>
    </section>
  );
}