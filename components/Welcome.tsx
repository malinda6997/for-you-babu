"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface WelcomeProps {
  onFinished?: () => void;
}

export default function Welcome({ onFinished }: WelcomeProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ----------------------------------------
         Initial states
      ---------------------------------------- */

      gsap.set(".welcome-ring", {
        opacity: 0,
        scale: 0.75,
      });

      gsap.set(".welcome-heart", {
        opacity: 0,
        scale: 0.7,
      });

      gsap.set(".welcome-kicker", {
        opacity: 0,
        y: 12,
      });

      gsap.set(".welcome-title", {
        opacity: 0,
        y: 22,
      });

      gsap.set(".welcome-divider", {
        opacity: 0,
        scaleX: 0,
      });

      gsap.set(".welcome-message", {
        opacity: 0,
        y: 12,
      });

      gsap.set(".welcome-progress", {
        scaleX: 0,
      });

      /* ----------------------------------------
         Main timeline
      ---------------------------------------- */

      const tl = gsap.timeline({
        onComplete: () => {
          gsap.to(containerRef.current, {
            opacity: 0,
            duration: 0.9,
            ease: "power2.inOut",
            onComplete: () => {
              onFinished?.();

              const hero = document.getElementById("hero");

              if (hero) {
                hero.scrollIntoView({
                  behavior: "smooth",
                  block: "start",
                });
              }
            },
          });
        },
      });

      tl.to(".welcome-ring", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "power2.out",
      })
        .to(
          ".welcome-heart",
          {
            opacity: 1,
            scale: 1,
            duration: 0.9,
            ease: "back.out(1.5)",
          },
          "-=0.45"
        )
        .to(
          ".welcome-kicker",
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.3"
        )
        .to(
          ".welcome-title",
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.25"
        )
        .to(
          ".welcome-divider",
          {
            opacity: 1,
            scaleX: 1,
            duration: 0.7,
            ease: "power2.inOut",
          },
          "-=0.3"
        )
        .to(
          ".welcome-message",
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
          },
          "-=0.2"
        )
        .to(
          ".welcome-progress",
          {
            scaleX: 1,
            duration: 1.8,
            ease: "power2.inOut",
          },
          "+=0.1"
        );
    }, containerRef);

    return () => ctx.revert();
  }, [onFinished]);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[#090305] select-none"
    >
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap");

        .welcome-cinzel {
          font-family: "Cinzel", serif;
        }

        .welcome-sans {
          font-family: "DM Sans", sans-serif;
        }

        @keyframes welcomeGlow {
          0%,
          100% {
            opacity: 0.14;
            transform: scale(1);
          }

          50% {
            opacity: 0.27;
            transform: scale(1.08);
          }
        }

        .welcome-glow {
          animation: welcomeGlow 5s ease-in-out infinite;
        }

        @keyframes heartBreath {
          0%,
          100% {
            box-shadow:
              0 0 0 1px rgba(160, 8, 24, 0.28),
              0 0 25px rgba(160, 8, 24, 0.06);
          }

          50% {
            box-shadow:
              0 0 0 1px rgba(160, 8, 24, 0.55),
              0 0 45px rgba(160, 8, 24, 0.18);
          }
        }

        .welcome-heart {
          animation: heartBreath 3.5s ease-in-out infinite;
        }

        @keyframes welcomeRotate {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }

        .welcome-ring-rotate {
          animation: welcomeRotate 18s linear infinite;
        }

        @keyframes welcomeDot {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.8);
          }

          50% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .welcome-dot {
          animation: welcomeDot 2s ease-in-out infinite;
        }
      `}</style>

      {/* =====================================
          BACKGROUND
      ====================================== */}

      <div className="pointer-events-none absolute inset-0">
        {/* Soft red glow */}
        <div className="welcome-glow absolute left-1/2 top-1/2 h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#a00818]/20 blur-[120px] sm:h-[480px] sm:w-[480px]" />

        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,rgba(0,0,0,0.7)_100%)]" />

        {/* Subtle red gradient */}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(80,5,18,0.08),rgba(15,2,7,0.3))]" />
      </div>

      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        {/* =====================================
            HEART / RING
        ====================================== */}

        <div className="relative mb-8 flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
          {/* Rotating ring */}
          <div className="welcome-ring welcome-ring-rotate absolute inset-0 rounded-full border border-[#a00818]/25 border-t-[#a00818]/80" />

          {/* Second ring */}
          <div className="welcome-ring absolute inset-3 rounded-full border border-[#a00818]/20" />

          {/* Heart */}
          <div className="welcome-heart relative flex h-20 w-20 items-center justify-center rounded-full border border-[#a00818]/50 bg-[#080305] sm:h-24 sm:w-24">
            <span className="text-3xl text-[#ffb4bd] sm:text-4xl">
              ♡
            </span>
          </div>
        </div>

        {/* =====================================
            KICKER
        ====================================== */}

        <span className="welcome-kicker welcome-sans mb-4 text-[9px] font-medium uppercase tracking-[0.55em] text-[#c34b5c] sm:text-[10px]">
          A little something from my heart
        </span>

        {/* =====================================
            MAIN TITLE
        ====================================== */}

        <h1 className="welcome-title welcome-cinzel text-[2.8rem] font-medium tracking-[0.08em] text-[#fff1f2] sm:text-5xl">
          I&apos;m Sorry
        </h1>

        {/* =====================================
            DIVIDER
        ====================================== */}

        <div className="welcome-divider my-6 flex w-52 items-center gap-3 sm:w-64">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#a00818]/60" />

          <span className="text-[9px] text-[#c34b5c]">✦</span>

          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#a00818]/60" />
        </div>

        {/* =====================================
            MESSAGE
        ====================================== */}

        <p className="welcome-message welcome-sans max-w-[290px] text-[11px] font-light leading-6 tracking-[0.08em] text-white/55 sm:max-w-md sm:text-xs">
          Before you see everything I made for you,
          <br />
          I just want to say one thing...
        </p>

        {/* =====================================
            PROGRESS
        ====================================== */}

        <div className="mt-9 h-px w-44 overflow-hidden rounded-full bg-white/10 sm:w-56">
          <div className="welcome-progress h-full origin-left bg-gradient-to-r from-transparent via-[#a00818] to-[#fda4af]" />
        </div>

        {/* Loading text */}
        <div className="mt-3 flex items-center gap-2">
          <span className="welcome-dot h-1 w-1 rounded-full bg-[#a00818]" />

          <span className="welcome-sans text-[8px] uppercase tracking-[0.3em] text-white/30">
            Just a moment
          </span>

          <span
            className="welcome-dot h-1 w-1 rounded-full bg-[#a00818]"
            style={{
              animationDelay: "0.5s",
            }}
          />
        </div>
      </div>
    </div>
  );
}