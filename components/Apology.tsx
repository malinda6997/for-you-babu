"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Apology() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const eyebrow = section.querySelector(".apology-eyebrow");
      const title = section.querySelector(".apology-title");
      const message = section.querySelector(".apology-message");
      const line = section.querySelector(".apology-line");
      const heart = section.querySelector(".apology-heart");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      timeline
        .fromTo(
          eyebrow,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          }
        )
        .fromTo(
          title,
          {
            opacity: 0,
            y: 35,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1.15,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .fromTo(
          line,
          {
            scaleX: 0,
            transformOrigin: "center",
          },
          {
            scaleX: 1,
            duration: 0.9,
            ease: "power2.out",
          },
          "-=0.45"
        )
        .fromTo(
          message,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .fromTo(
          heart,
          {
            opacity: 0,
            scale: 0.7,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            ease: "back.out(1.7)",
          },
          "-=0.25"
        );

      gsap.to(".apology-glow", {
        scale: 1.25,
        opacity: 0.55,
        ease: "none",
        scrollTrigger: {
          trigger: section,
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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#f1e7e4] px-6 py-28 sm:px-8"
    >
      {/* Background glow */}
      <div
        className="apology-glow pointer-events-none absolute left-1/2 top-1/2 h-[480px] w-[480px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(169,82,103,0.22) 0%, rgba(241,231,228,0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p className="apology-eyebrow font-hand text-3xl text-[#9e5364] sm:text-4xl">
          There&apos;s something I need to say...
        </p>

        <h2 className="apology-title mt-7 font-display text-[4.2rem] font-semibold leading-[0.88] tracking-[-0.05em] text-[#302326] sm:text-7xl md:text-[8rem]">
          I&apos;M
          <br />
          SORRY.
        </h2>

        <div className="apology-line mx-auto mt-9 h-px w-16 bg-[#b77b88]" />

        <p className="apology-message mx-auto mt-8 max-w-xl text-[15px] leading-7 text-[#66585b] sm:text-base sm:leading-8">
          I know that saying sorry cannot change what happened. I know that
          words alone cannot take away the hurt I caused. But I want you to
          know that I truly am sorry, from the bottom of my heart.
        </p>

        <p className="apology-message mx-auto mt-6 max-w-lg font-hand text-2xl leading-relaxed text-[#80676d] sm:text-3xl">
          I wish I could go back and do things differently.
        </p>

        <div className="apology-heart mt-10 text-2xl text-[#a64b5d]">
          ♡
        </div>
      </div>
    </section>
  );
}