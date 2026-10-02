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

      const elements =
        gsap.utils.toArray<HTMLElement>(".final-reveal");

      /* =========================================
         INITIAL STATES
      ========================================== */

      gsap.set(elements, {
        opacity: 0,
        y: 35,
      });

      /* =========================================
         SECTION REVEAL
      ========================================== */

      gsap.to(elements, {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          once: true,
        },
      });

      /* =========================================
         FLOATING HEARTS
      ========================================== */

      const hearts =
        gsap.utils.toArray<HTMLElement>(".floating-heart");

      hearts.forEach((heart, index) => {
        gsap.to(heart, {
          y: gsap.utils.random(-35, -65),
          x: gsap.utils.random(-15, 15),
          opacity: gsap.utils.random(0.2, 0.55),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      });

      /* =========================================
         BUTTON BREATHING
      ========================================== */

      gsap.to(".call-button", {
        scale: 1.025,
        duration: 1.6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1,
      });

      /* =========================================
         BUTTON GLOW
      ========================================== */

      gsap.to(".call-glow", {
        opacity: 0.65,
        scale: 1.08,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =========================================
         FINAL HEART PULSE
      ========================================== */

      gsap.to(".final-heart", {
        scale: 1.12,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 1.5,
      });
    },
    {
      scope: sectionRef,
    }
  );

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
        px-6
        py-24
      "
    >
      {/* =========================================
          SOFT BACKGROUND GLOW
      ========================================== */}

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
          opacity-40
          blur-[110px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(184,76,99,0.10) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* =========================================
          FLOATING HEARTS
      ========================================== */}

      <span
        className="
          floating-heart
          pointer-events-none
          absolute
          left-[14%]
          top-[18%]
          text-sm
          text-[#c56b7c]/40
        "
      >
        ♡
      </span>

      <span
        className="
          floating-heart
          pointer-events-none
          absolute
          right-[15%]
          top-[27%]
          text-lg
          text-[#b95d70]/30
        "
      >
        ♡
      </span>

      <span
        className="
          floating-heart
          pointer-events-none
          absolute
          left-[21%]
          bottom-[28%]
          text-xs
          text-[#c56b7c]/35
        "
      >
        ♡
      </span>

      <span
        className="
          floating-heart
          pointer-events-none
          absolute
          right-[22%]
          bottom-[20%]
          text-sm
          text-[#b95d70]/35
        "
      >
        ♡
      </span>

      {/* =========================================
          MAIN CONTENT
      ========================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-[520px]
          text-center
        "
      >
        {/* =========================================
            INTRO
        ========================================== */}

        <p
          className="
            final-reveal
            font-hand
            text-[1.9rem]
            leading-tight
            text-[#a65364]
            sm:text-3xl
          "
        >
          One last thing...
        </p>

        {/* =========================================
            MAIN HEADING
        ========================================== */}

        <h2
          className="
            final-reveal
            mt-7
            font-display
            text-[3rem]
            font-medium
            leading-[1]
            tracking-[-0.04em]
            text-[#302326]
            sm:text-5xl
          "
        >
          Can I have
          <br />
          one last call?
        </h2>

        {/* =========================================
            MESSAGE
        ========================================== */}

        <p
          className="
            final-reveal
            mx-auto
            mt-7
            max-w-[420px]
            text-[15px]
            leading-8
            text-[#71676a]
          "
        >
          I don&apos;t want to leave everything here with
          just a website and a few words.
          <br />
          <br />
          If you can, give me just one minute to talk to you.
        </p>

        {/* =========================================
            CALL BUTTON
        ========================================== */}

        <div
          className="
            final-reveal
            relative
            mt-10
            flex
            justify-center
          "
        >
          {/* Glow behind button */}

          <div
            className="
              call-glow
              pointer-events-none
              absolute
              inset-0
              mx-auto
              w-[230px]
              rounded-full
              bg-[#a93652]/25
              blur-2xl
            "
          />

          {/* 
            IMPORTANT:
            Exact number:
            0740584022
          */}

          <a
            href="tel:0740584022"
            aria-label="Call 0740584022"
            className="
              call-button
              group
              relative
              z-30
              inline-flex
              touch-manipulation
              cursor-pointer
              overflow-hidden
              rounded-full
              p-[1.5px]
              select-none
              shadow-[0_12px_40px_rgba(143,48,71,0.25)]
              transition-all
              duration-300
              hover:scale-105
              hover:shadow-[0_18px_55px_rgba(143,48,71,0.38)]
              active:scale-95
            "
          >
            {/* Animated gradient border */}

            <span
              className="
                pointer-events-none
                absolute
                inset-[-180%]
                animate-[spin_4s_linear_infinite]
                bg-[conic-gradient(from_0deg,#76263a,#e98c9e,#fff1f3,#a93652,#76263a)]
              "
            />

            {/* Button body */}

            <span
              className="
                relative
                z-10
                flex
                items-center
                gap-3
                rounded-full
                bg-[#8f3047]
                px-8
                py-4
                text-sm
                font-medium
                tracking-wide
                text-white
                transition-colors
                duration-300
                group-hover:bg-[#9d3850]
              "
            >
              {/* Heart */}

              <span
                className="
                  flex
                  h-7
                  w-7
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-white/15
                  text-base
                  transition-transform
                  duration-300
                  group-hover:rotate-12
                  group-hover:scale-110
                "
              >
                ♡
              </span>

              {/* Button text */}

              <span>
                Call me for one minute
              </span>

              {/* Arrow */}

              <span
                className="
                  text-base
                  transition-transform
                  duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </span>

            {/* Shine */}

            <span
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-[100%]
                z-20
                w-[55%]
                skew-x-[-20deg]
                bg-gradient-to-r
                from-transparent
                via-white/30
                to-transparent
                transition-all
                duration-700
                group-hover:left-[150%]
              "
            />
          </a>
        </div>

        {/* =========================================
            SMALL HINT
        ========================================== */}

        <p
          className="
            final-reveal
            mt-4
            text-[11px]
            tracking-wide
            text-[#a09598]
          "
        >
          just one minute... 🤍
        </p>

        {/* =========================================
            FINAL ROMANTIC MESSAGE
        ========================================== */}

        <div className="final-reveal mt-14">
          <p
            className="
              font-hand
              text-[2.4rem]
              leading-[1.2]
              text-[#806c72]
              sm:text-4xl
            "
          >
            I love you.
          </p>

          <p
            className="
              mt-4
              font-hand
              text-[1.8rem]
              leading-[1.3]
              text-[#9a737b]
              sm:text-3xl
            "
          >
            And I really don&apos;t want
            <br />
            to miss you like this.
          </p>

          {/* Final heart */}

          <div
            className="
              final-heart
              mt-8
              text-[27px]
              text-[#b65368]
            "
          >
            ♡
          </div>
        </div>
      </div>

      {/* =========================================
          FOOTER
      ========================================== */}

      <div
        className="
          final-reveal
          absolute
          bottom-7
          left-0
          right-0
          text-center
        "
      >
        <div
          className="
            mx-auto
            mb-3
            h-px
            w-10
            bg-[#c8959d]/40
          "
        />

        <p
          className="
            text-[10px]
            tracking-[0.18em]
            text-[#9b8b8f]
          "
        >
          © {new Date().getFullYear()} Dewmi Piris
        </p>

        <p
          className="
            mt-1
            text-[9px]
            tracking-[0.12em]
            text-[#b2a5a8]
          "
        >
          Developed by Dewmi Piris
        </p>
      </div>
    </section>
  );
}