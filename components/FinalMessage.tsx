"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function FinalMessage() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const elements = section.querySelectorAll(".final-reveal");
      const title = section.querySelector(".final-title");
      const heart = section.querySelector(".final-heart");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .fromTo(
          elements,
          {
            opacity: 0,
            y: 25,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: "power3.out",
          }
        )
        .fromTo(
          title,
          {
            opacity: 0,
            scale: 0.94,
            y: 25,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .fromTo(
          heart,
          {
            opacity: 0,
            scale: 0.5,
          },
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.35"
        );

      gsap.to(".final-glow", {
        scale: 1.2,
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
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-[#272124] px-6 py-28 text-[#fffaf7] sm:px-8"
    >
      {/* Background glow */}
      <div
        className="final-glow pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(196,111,130,0.32) 0%, rgba(39,33,36,0) 70%)",
        }}
      />

      <div className="relative z-10 mx-auto w-full max-w-3xl text-center">
        <p className="final-reveal font-hand text-3xl text-[#e0a8b4] sm:text-4xl">
          One last thing...
        </p>

        <p className="final-reveal mx-auto mt-7 max-w-xl text-[15px] leading-7 text-[#cfc3c3] sm:text-base sm:leading-8">
          I don&apos;t know what happens after this. Maybe things need time.
          Maybe you need space. I understand either way.
        </p>

        <h2 className="final-title mt-10 font-display text-[3.4rem] font-medium leading-[0.95] tracking-[-0.04em] text-[#fffaf7] sm:text-6xl md:text-7xl">
          But please...
          <br />
          don&apos;t let one mistake
          <br />
          erase everything.
        </h2>

        <div className="final-reveal mx-auto mt-10 h-px w-14 bg-[#a87580]" />

        <p className="final-reveal mx-auto mt-8 max-w-xl font-hand text-2xl leading-relaxed text-[#e1c4c8] sm:text-3xl">
          I&apos;m sorry for hurting you.
          <br />
          And I&apos;m sorry for making you sad.
        </p>

        <p className="final-reveal mt-10 text-sm tracking-[0.18em] text-[#a99b9e]">
          I JUST WANT YOU TO BE HAPPY
        </p>

        <div className="final-heart mt-10 text-3xl text-[#df91a2]">
          ♡
        </div>

        <p className="final-reveal mt-7 font-hand text-2xl text-[#cfaeb4] sm:text-3xl">
          Take care, bubu.
        </p>
      </div>
    </section>
  );
}