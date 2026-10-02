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
      const section = sectionRef.current;

      if (!section || memories.length === 0) return;

      const slides =
        gsap.utils.toArray<HTMLElement>(".memory-slide");

      const images =
        gsap.utils.toArray<HTMLElement>(".memory-slide-image");

      const overlays =
        gsap.utils.toArray<HTMLElement>(".memory-slide-overlay");

      const contents =
        gsap.utils.toArray<HTMLElement>(".memory-slide-content");

      /* ===============================
         INITIAL STATES
      =============================== */

      slides.forEach((slide, index) => {
        gsap.set(slide, {
          zIndex: memories.length - index,
        });

        gsap.set(images[index], {
          scale: index === 0 ? 1 : 1.14,
          opacity: index === 0 ? 1 : 0,
        });

        gsap.set(overlays[index], {
          opacity: index === 0 ? 1 : 0,
        });

        gsap.set(contents[index], {
          opacity: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 40,
        });
      });

      /* ===============================
         MAIN SCROLL TIMELINE
      =============================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",

          // One screen of scroll per transition
          end: `+=${(memories.length - 1) * 100}%`,

          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      memories.forEach((_, index) => {
        if (index === 0) return;

        const previousImage = images[index - 1];
        const currentImage = images[index];

        const previousOverlay = overlays[index - 1];
        const currentOverlay = overlays[index];

        const previousContent = contents[index - 1];
        const currentContent = contents[index];

        /* Previous image leaves */

        timeline.to(
          previousImage,
          {
            scale: 1.08,
            opacity: 0,
            duration: 1,
            ease: "power2.inOut",
          },
          index - 1
        );

        /* Previous overlay fades */

        timeline.to(
          previousOverlay,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          index - 1
        );

        /* Previous text leaves */

        timeline.to(
          previousContent,
          {
            opacity: 0,
            y: -35,
            duration: 0.65,
            ease: "power2.inOut",
          },
          index - 1
        );

        /* New image enters */

        timeline.fromTo(
          currentImage,
          {
            scale: 1.14,
            opacity: 0,
          },
          {
            scale: 1,
            opacity: 1,
            duration: 1,
            ease: "power2.out",
          },
          index - 0.55
        );

        /* New overlay */

        timeline.fromTo(
          currentOverlay,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          index - 0.55
        );

        /* New text */

        timeline.fromTo(
          currentContent,
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.75,
            ease: "power3.out",
          },
          index - 0.25
        );
      });

      /* ===============================
         IMAGE PARALLAX
      =============================== */

      images.forEach((image, index) => {
        gsap.to(image, {
          scale: 1.05,
          xPercent: index % 2 === 0 ? -1 : 1,
          ease: "none",

          scrollTrigger: {
            trigger: section,
            start: `${index * 100}% top`,
            end: `${(index + 1) * 100}% top`,
            scrub: true,
          },
        });
      });

      /* Refresh after everything is created */

      ScrollTrigger.refresh();
    },
    {
      scope: sectionRef,
  });

  return (
    <section
      ref={sectionRef}
      className="relative h-[100svh] w-full overflow-hidden bg-[#12070a]"
    >
      {memories.map((memory, index) => (
        <article
          key={memory.id}
          className="
            memory-slide
            absolute
            inset-0
            h-full
            w-full
            overflow-hidden
          "
        >
          {/* Image */}

          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={memory.image}
              alt={`Memory ${memory.id}`}
              fill
              priority={index === 0}
              sizes="100vw"
              className="
                memory-slide-image
                object-cover
                object-center
                will-change-transform
              "
            />
          </div>

          {/* Dark + red gradient */}

          <div
            className="
              memory-slide-overlay
              pointer-events-none
              absolute
              inset-0
              z-10
            "
            style={{
              background: `
                linear-gradient(
                  180deg,
                  rgba(0,0,0,0.02) 0%,
                  rgba(0,0,0,0.02) 30%,
                  rgba(31,5,11,0.10) 48%,
                  rgba(30,4,10,0.65) 76%,
                  rgba(15,2,7,0.97) 100%
                )
              `,
            }}
          />

          {/* Soft red glow */}

          <div
            className="
              pointer-events-none
              absolute
              inset-x-0
              bottom-0
              z-[11]
              h-[45%]
            "
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(156,20,48,0.25) 0%, rgba(80,6,24,0.12) 40%, transparent 72%)",
            }}
          />

          {/* Memory text */}

          <div
            className="
              memory-slide-content
              absolute
              inset-x-0
              bottom-0
              z-20
              px-7
              pb-14
              text-center
              sm:px-10
              sm:pb-16
            "
          >
            <div className="mx-auto max-w-xl">
              <p
                className="
                  font-serif
                  text-[15px]
                  leading-7
                  text-white
                  drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]
                  sm:text-base
                  sm:leading-8
                "
              >
                {memory.text}
              </p>

              <div className="mt-5 text-xl text-[#f0a8b5]">
                ♡
              </div>
            </div>
          </div>

          {/* Small label */}

          <div
            className="
              absolute
              right-6
              top-7
              z-30
              font-serif
              text-[9px]
              tracking-[0.3em]
              text-white/50
            "
          >
            MEMORY
          </div>
        </article>
      ))}
    </section>
  );
}