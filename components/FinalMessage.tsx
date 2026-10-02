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

      /* =========================================
         CONTENT REVEAL
      ========================================== */

      const elements =
        gsap.utils.toArray<HTMLElement>(".final-reveal");

      gsap.set(elements, {
        opacity: 0,
        y: 35,
      });

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
         CTA GRADIENT ANIMATION
      ========================================== */

      gsap.to(".gradient-cta", {
        backgroundPosition: "200% 50%",
        duration: 5,
        repeat: -1,
        ease: "linear",
      });

      /* =========================================
         CTA BREATHING
      ========================================== */

      gsap.to(".gradient-cta", {
        scale: 1.025,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =========================================
         CTA GLOW
      ========================================== */

      gsap.to(".cta-glow", {
        opacity: 0.7,
        scale: 1.08,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });

      /* =========================================
         FINAL HEART
      ========================================== */

      gsap.to(".final-heart", {
        scale: 1.12,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
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
      {/* Background glow */}

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

      {/* Floating hearts */}

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

      {/* Main content */}

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
        {/* Intro */}

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

        {/* Main heading */}

        <h2
          className="
            final-reveal
            mt-7
            font-display
            text-[2.75rem]
            font-medium
            leading-[1.05]
            tracking-[-0.04em]
            text-[#302326]
            sm:text-5xl
          "
        >
          If you&apos;re not
          <br />
          upset with me anymore...
        </h2>

        {/* Romantic message */}

        <p
          className="
            final-reveal
            mx-auto
            mt-7
            max-w-[430px]
            text-[15px]
            leading-8
            text-[#71676a]
            sm:text-base
          "
        >
          I don&apos;t want to ask for anything more.
          <br />
          <br />
          I just wish I could have one quiet minute
          to hear your voice and talk to you.
        </p>

        {/* =========================================
            ROMANTIC CALL CTA
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
          {/* Soft glow */}

          <div
            className="
              cta-glow
              pointer-events-none
              absolute
              top-1/2
              h-24
              w-[290px]
              -translate-y-1/2
              rounded-full
              bg-[#d66b82]/25
              blur-3xl
            "
          />

          {/* Call button */}

          <a
            href="tel:+94740584022"
            aria-label="Call 074 058 4022"
            className="
              gradient-cta
              group
              relative
              z-20
              flex
              w-full
              max-w-[350px]
              touch-manipulation
              items-center
              justify-center
              overflow-hidden
              rounded-full
              px-8
              py-[19px]
              text-center
              text-white
              shadow-[0_18px_50px_rgba(154,65,88,0.25)]
              transition-all
              duration-300
              active:scale-95
            "
            style={{
              background:
                "linear-gradient(110deg,#7b2940,#b84d68,#e28a9b,#a63755,#7b2940)",
              backgroundSize: "300% 300%",
            }}
          >
            {/* Moving shine */}

            <span
              className="
                pointer-events-none
                absolute
                inset-y-0
                -left-[70%]
                w-[45%]
                rotate-[18deg]
                bg-white/20
                blur-sm
                transition-all
                duration-700
                group-hover:left-[130%]
              "
            />

            {/* Button text */}

            <span
              className="
                relative
                z-10
                font-display
                text-[1.15rem]
                font-medium
                tracking-[-0.01em]
                sm:text-[1.3rem]
              "
            >
              Could I Have One Minute?
            </span>
          </a>
        </div>

        {/* Small supporting text */}

        <p
          className="
            final-reveal
            mt-5
            text-[11px]
            tracking-wide
            text-[#a09598]
          "
        >
          Only if you&apos;re ready to hear me... 🤍
        </p>

        {/* Final message */}

        <div className="final-reveal mt-16">
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
            to lose you.
          </p>

          <div
            className="
              final-heart
              mt-8
              text-[28px]
              text-[#b65368]
            "
          >
            ♡
          </div>
        </div>
      </div>

      {/* Footer */}

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