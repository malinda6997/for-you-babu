"use client";

import Image from "next/image";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

import { memories } from "@/data/memories";

gsap.registerPlugin(ScrollTrigger);

export default function Memories() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const items = gsap.utils.toArray<HTMLElement>(".memory-item");

      items.forEach((item) => {
        const image = item.querySelector(".memory-image");
        const imageWrap = item.querySelector(".memory-image-wrap");
        const text = item.querySelector(".memory-text");
        const number = item.querySelector(".memory-number");

        const timeline = gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 78%",
            end: "top 35%",
            toggleActions: "play none none reverse",
          },
        });

        timeline
          .fromTo(
            imageWrap,
            {
              opacity: 0,
              y: 45,
              scale: 0.96,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1,
              ease: "power3.out",
            }
          )
          .fromTo(
            image,
            {
              scale: 1.08,
            },
            {
              scale: 1,
              duration: 1.3,
              ease: "power2.out",
            },
            "<"
          )
          .fromTo(
            number,
            {
              opacity: 0,
              y: 15,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power2.out",
            },
            "-=0.55"
          )
          .fromTo(
            text,
            {
              opacity: 0,
              y: 25,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.35"
          );

        gsap.to(image, {
          yPercent: -4,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      });

      gsap.fromTo(
        ".memories-heading",
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".memories-heading",
            start: "top 80%",
            once: true,
          },
        }
      );
    },
    {
      scope: sectionRef,
    }
  );

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#f8f5f0] px-5 py-28 sm:px-8 sm:py-36"
    >
      {/* Section heading */}
      <div className="memories-heading mx-auto mb-20 max-w-2xl text-center sm:mb-28">
        <p className="font-hand text-3xl text-[#a64b5d] sm:text-4xl">
          Our little moments
        </p>

        <h2 className="mt-4 font-display text-[2.7rem] font-medium leading-[1] tracking-[-0.03em] text-[#2d2724] sm:text-5xl md:text-6xl">
          The memories I never want to forget.
        </h2>

        <p className="mx-auto mt-6 max-w-md text-sm leading-7 text-[#766d68] sm:text-base">
          Every photo holds a little piece of us. Some moments were big, some
          were completely ordinary, but every one of them became special to me.
        </p>
      </div>

      {/* Memories */}
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-28 sm:gap-36 md:gap-44">
        {memories.map((memory, index) => {
          const isEven = index % 2 === 1;

          return (
            <article
              key={memory.id}
              className="memory-item mx-auto w-full max-w-2xl"
            >
              {/* Image */}
              <div
                className={`memory-image-wrap relative mx-auto aspect-[4/5] w-full max-w-[390px] overflow-hidden rounded-[1.75rem] bg-[#ebe4dd] shadow-[0_25px_70px_rgba(70,45,40,0.11)] ${
                  isEven ? "md:translate-x-8" : "md:-translate-x-8"
                }`}
              >
                <Image
                  src={memory.image}
                  alt={`Memory ${memory.id}`}
                  fill
                  sizes="(max-width: 768px) 90vw, 390px"
                  className="memory-image object-cover"
                />

                {/* Soft image overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-white/5" />
              </div>

              {/* Text */}
              <div className="mx-auto mt-7 max-w-[390px] px-2 sm:mt-9">
                <p className="memory-number font-hand text-xl text-[#b06c79]">
                  {String(memory.id).padStart(2, "0")}
                </p>

                <p className="memory-text mt-3 text-[15px] leading-7 text-[#665d58] sm:text-base sm:leading-8">
                  {memory.text}
                </p>
              </div>
            </article>
          );
        })}
      </div>

      {/* Bottom transition */}
      <div className="mx-auto mt-32 flex max-w-2xl flex-col items-center text-center sm:mt-44">
        <div className="h-16 w-px bg-gradient-to-b from-transparent via-[#c9a8ad] to-transparent" />

        <p className="mt-8 font-hand text-2xl text-[#92787c] sm:text-3xl">
          And there are still so many little moments I carry with me...
        </p>
      </div>
    </section>
  );
}