"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function RomanticNote() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const elements = sectionRef.current?.querySelectorAll(
        ".note-reveal"
      );

      if (!elements?.length) return;

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 35,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.18,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            once: true,
          },
        }
      );

      gsap.fromTo(
        ".note-line",
        {
          scaleX: 0,
          transformOrigin: "center",
        },
        {
          scaleX: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            once: true,
          },
        }
      );

      gsap.to(".note-glow", {
        y: -35,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[90svh] items-center justify-center overflow-hidden bg-[#fffdf9] px-6 py-24 sm:px-8"
    >
      {/* Soft decorative glow */}
      <div
        className="note-glow pointer-events-none absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(216,165,175,0.22) 0%, rgba(255,253,249,0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* Small handwritten intro */}
        <p className="note-reveal font-hand text-3xl text-[#a64b5d] sm:text-4xl">
          Before anything else...
        </p>

        {/* Decorative line */}
        <div className="note-line mx-auto my-7 h-px w-14 bg-[#c89aa3]" />

        {/* Main note */}
        <h2 className="note-reveal font-display text-[2.4rem] font-medium leading-[1.12] tracking-[-0.025em] text-[#302825] sm:text-5xl md:text-6xl">
          I want you to remember the beautiful things we shared.
        </h2>

        {/* Supporting message */}
        <p className="note-reveal mx-auto mt-8 max-w-lg text-[15px] leading-7 text-[#756b66] sm:text-base sm:leading-8">
          The little moments, the silly conversations, the unexpected
          surprises, and all those ordinary days that somehow became special
          simply because they were with you.
        </p>

        {/* Handwritten closing */}
        <p className="note-reveal mt-10 font-hand text-2xl text-[#8e7478] sm:text-3xl">
          Because those moments still mean so much to me.
        </p>

        {/* Tiny heart */}
        <div className="note-reveal mt-8 text-xl text-[#b56d7b]">
          ♡
        </div>
      </div>
    </section>
  );
}