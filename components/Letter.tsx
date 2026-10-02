"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Letter() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const card = section.querySelector(".letter-card");
      const eyebrow = section.querySelector(".letter-eyebrow");
      const title = section.querySelector(".letter-title");
      const paragraphs = section.querySelectorAll(".letter-paragraph");
      const signature = section.querySelector(".letter-signature");

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 72%",
          once: true,
        },
      });

      timeline
        .fromTo(
          card,
          {
            opacity: 0,
            y: 55,
            rotate: 1.5,
          },
          {
            opacity: 1,
            y: 0,
            rotate: 0,
            duration: 1.2,
            ease: "power3.out",
          }
        )
        .fromTo(
          eyebrow,
          {
            opacity: 0,
            y: 15,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.65"
        )
        .fromTo(
          title,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.4"
        )
        .fromTo(
          paragraphs,
          {
            opacity: 0,
            y: 18,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.14,
            ease: "power3.out",
          },
          "-=0.35"
        )
        .fromTo(
          signature,
          {
            opacity: 0,
            y: 15,
            scale: 0.96,
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
          },
          "-=0.25"
        );

      gsap.to(".letter-decoration", {
        y: -30,
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
      className="relative overflow-hidden bg-[#fffdf9] px-5 py-28 sm:px-8 sm:py-36"
    >
      {/* Decorative background elements */}
      <div className="letter-decoration pointer-events-none absolute -left-24 top-32 h-56 w-56 rounded-full bg-[#ead4d6]/30 blur-3xl" />

      <div className="letter-decoration pointer-events-none absolute -right-24 bottom-32 h-64 w-64 rounded-full bg-[#e8d9c9]/30 blur-3xl" />

      {/* Letter card */}
      <div className="letter-card relative mx-auto w-full max-w-2xl overflow-hidden rounded-[2rem] border border-[#eadfd8] bg-[#fffaf3] px-7 py-12 shadow-[0_25px_80px_rgba(70,45,40,0.08)] sm:px-12 sm:py-16 md:px-16">
        {/* Paper texture / corner detail */}
        <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-bl-[4rem] bg-[#f1dfdf]/50" />

        <div className="relative z-10">
          <p className="letter-eyebrow font-hand text-2xl text-[#a64b5d] sm:text-3xl">
            A little letter from me
          </p>

          <h2 className="letter-title mt-4 font-display text-4xl font-medium leading-tight tracking-[-0.03em] text-[#302825] sm:text-5xl">
            Dear Bubu,
          </h2>

          <div className="mt-8 space-y-6 font-hand text-[1.35rem] leading-[1.75] text-[#665b57] sm:text-[1.5rem]">
            <p className="letter-paragraph">
              I don&apos;t really know where to start, because there are so
              many things I want to tell you.
            </p>

            <p className="letter-paragraph">
              Maybe I should start by saying that I&apos;m sorry. Truly,
              genuinely sorry. Not just because I want everything to be okay
              again, but because I understand that I hurt someone who means so
              much to me.
            </p>

            <p className="letter-paragraph">
              When I look back at all these little memories, I remember how
              happy we were. The laughs, the silly moments, the surprises, the
              random days together... all of them are still precious to me.
            </p>

            <p className="letter-paragraph">
              I don&apos;t want one bad moment to erase all the beautiful
              moments we shared. And I don&apos;t want my mistakes to make you
              forget how deeply I care about you.
            </p>

            <p className="letter-paragraph">
              I can&apos;t promise that I&apos;ll never make another mistake.
              But I can promise that I will think about my actions, learn from
              them, and try to become better.
            </p>

            <p className="letter-paragraph">
              More than anything, I just hope that someday you can look at me
              and smile again without any of this hurt between us.
            </p>
          </div>

          {/* Signature */}
          <div className="letter-signature mt-12 border-t border-[#e7d9d2] pt-8">
            <p className="font-hand text-2xl text-[#80686d] sm:text-3xl">
              With all my heart,
            </p>

            <p className="mt-2 font-hand text-3xl text-[#a64b5d] sm:text-4xl">
              Me ♡
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}