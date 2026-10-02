"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const petals = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: `${5 + ((index * 17) % 90)}%`,
  size: 7 + ((index * 5) % 7),
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
      const divider = section.querySelector(".hero-divider");
      const message = section.querySelector(".hero-message");
      const quote = section.querySelector(".hero-quote");
      const scrollHint = section.querySelector(".hero-scroll");

      /* --------------------------------
         HERO ENTRANCE
      -------------------------------- */

      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      tl.fromTo(
        image,
        {
          scale: 1.08,
        },
        {
          scale: 1,
          duration: 2.2,
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
            duration: 1.4,
          },
          "-=1.6"
        )
        .fromTo(
          badge,
          {
            opacity: 0,
            y: 20,
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
          divider,
          {
            opacity: 0,
            scaleX: 0,
          },
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.7,
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
          "-=0.3"
        )
        .fromTo(
          quote,
          {
            opacity: 0,
            y: 16,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
          },
          "-=0.35"
        )
        .fromTo(
          scrollHint,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.8,
          },
          "-=0.2"
        );

      /* --------------------------------
         IMAGE PARALLAX
      -------------------------------- */

      gsap.to(image, {
        yPercent: 4,
        scale: 1.05,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      /* --------------------------------
         ROSE PETALS
      -------------------------------- */

      if (petalsRef.current) {
        const petalElements =
          petalsRef.current.querySelectorAll(".rose-petal");

        petalElements.forEach((petal, index) => {
          const duration = 7 + (index % 5) * 1.1;
          const delay = (index % 7) * 0.65;

          gsap.set(petal, {
            y: -80 - Math.random() * 100,
            x: Math.random() * 30 - 15,
            rotation: Math.random() * 180,
            opacity: 0,
          });

          gsap.to(petal, {
            y: "115vh",
            x: `+=${Math.random() * 150 - 75}`,
            rotation: `+=${Math.random() * 720 - 360}`,
            opacity: 0.65,
            duration,
            delay,
            repeat: -1,
            ease: "none",
          });
        });
      }
    },
    {
      scope: sectionRef,
  });

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-[100svh] overflow-hidden bg-[#16050b]"
    >
      {/* =====================================
          BACKGROUND IMAGE
      ====================================== */}

      <Image
        src="/assets/m1.jpeg"
        alt="A beautiful memory"
        fill
        priority
        sizes="100vw"
        className="hero-image object-cover object-center brightness-[0.72]"
      />

      {/* =====================================
          CINEMATIC RED / BURGUNDY OVERLAY
      ====================================== */}

      <div
        className="hero-overlay pointer-events-none absolute inset-0 opacity-0"
        style={{
          background: `
            linear-gradient(
              180deg,
              rgba(15, 5, 8, 0.08) 0%,
              rgba(30, 5, 12, 0.05) 34%,
              rgba(91, 9, 30, 0.28) 58%,
              rgba(92, 7, 30, 0.68) 78%,
              rgba(31, 3, 12, 0.96) 100%
            )
          `,
        }}
      />

      {/* Soft red glow at bottom */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[55%]"
        style={{
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(157, 17, 48, 0.34) 0%, rgba(98, 8, 29, 0.18) 38%, transparent 72%)",
        }}
      />

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_25%,rgba(0,0,0,0.32)_100%)]" />

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
            className="rose-petal absolute -top-8 rounded-[70%_30%_70%_30%] bg-[#df4a63] shadow-[0_2px_8px_rgba(80,0,20,0.25)]"
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

          Positioned lower like the reference.
      ====================================== */}

      <div className="absolute inset-x-0 bottom-0 z-30 px-6 pb-20 pt-32 text-center sm:pb-24">
        <div className="mx-auto w-full max-w-xl">
          {/* Small badge */}

          <div className="hero-badge mx-auto inline-flex items-center gap-3 rounded-full border border-white/25 bg-black/20 px-5 py-2 backdrop-blur-sm">
            <span className="text-sm text-[#ffb3bf]">♡</span>

            <span className="font-sans text-[9px] font-medium tracking-[0.32em] text-white/90">
              JUST FOR YOU
            </span>

            <span className="text-sm text-[#ffb3bf]">♡</span>
          </div>

          {/* Main title */}

          <h1
            className="
              hero-title
              mt-5
              font-display
              text-[3.4rem]
              font-medium
              leading-[0.9]
              tracking-[-0.045em]
              text-white
              drop-shadow-[0_5px_22px_rgba(0,0,0,0.38)]
              sm:text-6xl
            "
          >
            I&apos;m sorry,
            <br />
            my love.
          </h1>

          {/* Divider */}

          <div className="hero-divider mx-auto mt-6 h-px w-14 bg-gradient-to-r from-transparent via-[#ffb0bc] to-transparent" />

          {/* Main message */}

          <p className="hero-message mx-auto mt-6 max-w-[330px] font-serif text-[14px] leading-7 text-white/90 sm:max-w-md sm:text-base sm:leading-8">
            For the moments I wish I could change,
            <br className="hidden sm:block" />
            and for the heart I never meant to hurt.
          </p>

          {/* Quote */}

          <p className="hero-quote mx-auto mt-6 max-w-[300px] font-display text-[16px] italic leading-7 text-white/85 sm:text-lg">
            Some memories are too beautiful to lose.
          </p>

          {/* Heart */}

          <div className="mt-3 text-xl text-[#ffadb9]">♡</div>
        </div>
      </div>

      {/* =====================================
          SCROLL INDICATOR
      ====================================== */}

      <div className="hero-scroll absolute bottom-5 left-1/2 z-40 -translate-x-1/2 text-center text-white/55">
        <span className="font-sans text-[8px] tracking-[0.35em]">
          SCROLL
        </span>

        <div className="mx-auto mt-2 h-6 w-px bg-white/35" />
      </div>
    </section>
  );
}