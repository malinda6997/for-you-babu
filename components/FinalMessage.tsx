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

      /* Floating hearts */

      const hearts =
        gsap.utils.toArray<HTMLElement>(".floating-heart");

      hearts.forEach((heart, index) => {
        gsap.to(heart, {
          y: gsap.utils.random(-35, -65),
          x: gsap.utils.random(-15, 15),
          opacity: gsap.utils.random(0.2, 0.6),
          duration: gsap.utils.random(3, 5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: index * 0.5,
        });
      });

      /* Button subtle breathing animation */

      gsap.to(".call-button", {
        scale: 1.025,
        duration: 1.6,
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
        bg-[#fff]
        px-6
        py-24
      "
    >
      {/* Soft background glow */}

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
          blur-[110px]
        "
        style={{
          background:
            "radial-gradient(circle, rgba(184,76,99,0.09) 0%, rgba(255,255,255,0) 70%)",
        }}
      />

      {/* Floating hearts */}

      <span className="floating-heart absolute left-[16%] top-[18%] text-sm text-[#c56b7c]/40">
        ♡
      </span>

      <span className="floating-heart absolute right-[17%] top-[27%] text-lg text-[#b95d70]/30">
        ♡
      </span>

      <span className="floating-heart absolute left-[23%] bottom-[27%] text-xs text-[#c56b7c]/35">
        ♡
      </span>

      <span className="floating-heart absolute right-[24%] bottom-[20%] text-sm text-[#b95d70]/35">
        ♡
      </span>

      {/* Content */}

      <div className="relative z-10 mx-auto w-full max-w-[520px] text-center">

        {/* Small intro */}

        <p
          className="
            final-reveal
            font-hand
            text-[1.9rem]
            text-[#a65364]
            sm:text-3xl
          "
        >
          One last thing...
        </p>

        {/* Main message */}

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

        {/* Message */}

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
          I don&apos;t want to leave everything here with just a
          website and a few words.
          <br />
          <br />
          If you can, give me just one minute to talk to you.
        </p>

        {/* Call button */}

        <div className="final-reveal mt-9">
          <a
            href="tel:0740584022"
            className="
              call-button
              inline-flex
              items-center
              justify-center
              rounded-full
              bg-[#8f3047]
              px-9
              py-4
              text-sm
              font-medium
              tracking-wide
              text-white
              shadow-[0_15px_40px_rgba(143,48,71,0.22)]
              transition-all
              duration-300
              hover:bg-[#76263a]
              hover:shadow-[0_18px_45px_rgba(143,48,71,0.30)]
              active:scale-95
            "
          >
            Call me for one minute ♡
          </a>
        </div>

        {/* Final emotional message */}

        <div className="final-reveal mt-14">

          <p
            className="
              font-hand
              text-[2.3rem]
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

          <div className="mt-7 text-2xl text-[#b65368]">
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
        <div className="mx-auto mb-3 h-px w-10 bg-[#c8959d]/40" />

        <p className="text-[10px] tracking-[0.18em] text-[#9b8b8f]">
          © {new Date().getFullYear()} Dewmi Piris
        </p>

        <p className="mt-1 text-[9px] tracking-[0.12em] text-[#b2a5a8]">
          Developed by Dewmi Piris
        </p>
      </div>
    </section>
  );
}