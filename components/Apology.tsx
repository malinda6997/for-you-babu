"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function ApologySection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const intro = section.querySelector(
        ".apology-intro"
      ) as HTMLElement | null;

      const title = section.querySelector(
        ".apology-title"
      ) as HTMLElement | null;

      const messageLines =
        gsap.utils.toArray<HTMLElement>(".apology-line");

      const closing = section.querySelector(
        ".apology-closing"
      ) as HTMLElement | null;

      const heart = section.querySelector(
        ".apology-heart"
      ) as HTMLElement | null;

      const cursor = section.querySelector(
        ".typing-cursor"
      ) as HTMLElement | null;

      if (!intro || !title || !closing || !heart) return;

      /* =========================================
         INITIAL STATE
      ========================================== */

      gsap.set(intro, {
        opacity: 0,
      });

      gsap.set(title, {
        opacity: 0,
        y: 20,
      });

      gsap.set(messageLines, {
        opacity: 0,
        y: 12,
      });

      gsap.set(closing, {
        opacity: 0,
        y: 20,
      });

      gsap.set(heart, {
        opacity: 0,
        scale: 0,
      });

      /* =========================================
         TYPEWRITER HELPER
      ========================================== */

      const typeText = (
        element: HTMLElement,
        text: string,
        speed = 0.045
      ) => {
        return new Promise<void>((resolve) => {
          element.textContent = "";

          let index = 0;

          const type = () => {
            if (index < text.length) {
              element.textContent += text.charAt(index);
              index++;

              gsap.delayedCall(speed, type);
            } else {
              resolve();
            }
          };

          type();
        });
      };

      /* =========================================
         MAIN TIMELINE
      ========================================== */

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          once: true,
        },
      });

      /* Intro fade */

      timeline.to(intro, {
        opacity: 1,
        duration: 0.5,
        ease: "power2.out",
      });

      /* Intro typing */

      timeline.add(() =>
        typeText(
          intro,
          "There's something I need to say...",
          0.055
        )
      );

      /* Title reveal */

      timeline.to(title, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      /* =========================================
         MESSAGE LINE BY LINE
      ========================================== */

      messageLines.forEach((line, index) => {
        timeline.to(
          line,
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
          },
          index === 0 ? undefined : "-=0.15"
        );
      });

      /* Closing */

      timeline.to(
        closing,
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
        },
        "+=0.15"
      );

      /* Heart */

      timeline.to(
        heart,
        {
          opacity: 1,
          scale: 1,
          duration: 0.7,
          ease: "back.out(2)",
        },
        "-=0.3"
      );

      /* =========================================
         CURSOR BLINK
      ========================================== */

      if (cursor) {
        gsap.to(cursor, {
          opacity: 0,
          duration: 0.5,
          repeat: -1,
          yoyo: true,
          ease: "steps(1)",
        });
      }

      /* =========================================
         HEART SOFT PULSE
      ========================================== */

      gsap.to(heart, {
        scale: 1.12,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2,
      });
    },
    {
      scope: sectionRef,
  });

  return (
    <section
      ref={sectionRef}
      className="
        relative
        flex
        min-h-[100svh]
        w-full
        items-center
        justify-center
        overflow-hidden
        bg-white
        px-7
        py-20
      "
    >
      {/* Very subtle warm light */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[420px]
          w-[420px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-30
          blur-[110px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(190,90,110,0.08) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* Main content */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          w-full
          max-w-[520px]
          flex-col
          items-center
          text-center
        "
      >
        {/* Intro */}

        <div className="min-h-[42px]">
          <p
            className="
              apology-intro
              font-hand
              text-[1.8rem]
              leading-tight
              text-[#a65364]
              sm:text-3xl
            "
          >
            There's something I need to say...
          </p>

          <span
            className="
              typing-cursor
              ml-1
              inline-block
              h-5
              w-px
              bg-[#a65364]
              align-middle
            "
          />
        </div>

        {/* Title */}

        <h2
          className="
            apology-title
            mt-8
            font-display
            text-[4.2rem]
            font-medium
            uppercase
            leading-[0.8]
            tracking-[-0.05em]
            text-[#2d2225]
            sm:text-[5.5rem]
          "
        >
          I'M
          <br />
          SORRY.
        </h2>

        {/* Small line */}

        <div className="my-9 h-px w-14 bg-[#c98d98]/50" />

        {/* Main message */}

        <div
          className="
            max-w-[440px]
            text-[14px]
            leading-7
            text-[#70676a]
            sm:text-[15px]
            sm:leading-8
          "
        >
          <p className="apology-line">
            I know that saying sorry cannot change what happened.
          </p>

          <p className="apology-line mt-1">
            I know that words alone cannot take away the hurt I caused.
          </p>

          <p className="apology-line mt-6">
            But I want you to know that I truly am sorry,
          </p>

          <p className="apology-line mt-1">
            from the bottom of my heart.
          </p>
        </div>

        {/* Closing */}

        <p
          className="
            apology-closing
            mt-11
            max-w-[430px]
            font-hand
            text-[2rem]
            leading-[1.25]
            text-[#806c72]
            sm:text-3xl
          "
        >
          I wish I could go back
          <br />
          and do things differently.
        </p>

        {/* Heart */}

        <div
          className="
            apology-heart
            mt-10
            text-[25px]
            text-[#b65368]
          "
        >
          ♡
        </div>
      </div>
    </section>
  );
}