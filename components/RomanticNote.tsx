"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function RomanticNote() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [isTyping, setIsTyping] = useState(false);
  const [displayedText, setDisplayedText] = useState("");
  const [isFinished, setIsFinished] = useState(false);

  const noteText =
    "I know words can never completely explain how sorry I am. But I wanted to create this little place just for you, filled with some of the moments that mean so much to me. I hope when you see them, you remember the happiness, the laughter, and all the little things that made us smile.";

  /* =====================================
     GSAP ANIMATIONS
  ====================================== */

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      const elements =
        section.querySelectorAll(".note-reveal");

      if (!elements.length) return;

      /* Main content reveal */

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
            trigger: section,
            start: "top 75%",
            once: true,

            onEnter: () => {
              setIsTyping(true);
            },
          },
        }
      );

      /* Decorative line */

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
            trigger: section,
            start: "top 70%",
            once: true,
          },
        }
      );

      /* Soft glow parallax */

      gsap.to(".note-glow", {
        y: -35,
        ease: "none",

        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      /* Small heart floating animation */

      gsap.to(".note-heart", {
        y: -6,
        duration: 2.2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    {
      scope: sectionRef,
    }
  );

  /* =====================================
     TYPEWRITER EFFECT
  ====================================== */

  useEffect(() => {
    if (!isTyping || isFinished) return;

    if (displayedText.length >= noteText.length) {
      setIsFinished(true);
      return;
    }

    const timer = window.setTimeout(() => {
      setDisplayedText(
        noteText.substring(
          0,
          displayedText.length + 1
        )
      );
    }, 32);

    return () => {
      window.clearTimeout(timer);
    };
  }, [
    displayedText,
    isTyping,
    isFinished,
    noteText,
  ]);

  return (
    <section
      ref={sectionRef}
      id="romantic-note"
      className="
        relative
        flex
        min-h-[100svh]
        items-center
        justify-center
        overflow-hidden
        bg-[#fffdf9]
        px-6
        py-24
        sm:px-8
      "
    >
      {/* =====================================
          SOFT DECORATIVE GLOW
      ====================================== */}

      <div
        className="
          note-glow
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[380px]
          w-[380px]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          opacity-50
          blur-3xl
        "
        style={{
          background:
            "radial-gradient(circle, rgba(216,165,175,0.22) 0%, rgba(255,253,249,0) 70%)",
        }}
      />

      {/* =====================================
          MAIN CONTENT
      ====================================== */}

      <div
        className="
          relative
          z-10
          mx-auto
          w-full
          max-w-2xl
          text-center
        "
      >
        {/* =====================================
            SMALL HEART
        ====================================== */}

        <div
          className="
            note-reveal
            note-heart
            mb-7
            text-3xl
            text-[#b56d7b]
          "
        >
          ♡
        </div>

        {/* =====================================
            SPECIAL NOTE LABEL
        ====================================== */}

        <div className="note-reveal flex items-center justify-center gap-3">
          <span className="h-px w-8 bg-[#c89aa3]" />

          <p
            className="
              font-serif
              text-[10px]
              font-medium
              uppercase
              tracking-[0.38em]
              text-[#a64b5d]
            "
          >
            Special Note For You
          </p>

          <span className="h-px w-8 bg-[#c89aa3]" />
        </div>

        {/* =====================================
            MAIN TITLE
        ====================================== */}

        <h2
          className="
            note-reveal
            mt-6
            font-display
            text-[2.5rem]
            font-medium
            leading-[1.08]
            tracking-[-0.025em]
            text-[#302825]
            sm:text-5xl
            md:text-6xl
          "
        >
          A few words
          <br />
          from my heart.
        </h2>

        {/* =====================================
            DECORATIVE LINE
        ====================================== */}

        <div
          className="
            note-line
            mx-auto
            my-7
            h-px
            w-14
            bg-[#c89aa3]
          "
        />

        {/* =====================================
            TYPEWRITER NOTE
        ====================================== */}

        <div
          className="
            note-reveal
            mx-auto
            min-h-[230px]
            max-w-lg
          "
        >
          <p
            className="
              text-[15px]
              leading-8
              text-[#756b66]
              sm:text-base
              sm:leading-8
            "
          >
            {displayedText}

            {/* Typing cursor */}

            {isTyping && !isFinished && (
              <span
                className="
                  ml-1
                  inline-block
                  h-4
                  w-px
                  translate-y-[2px]
                  animate-pulse
                  bg-[#a64b5d]
                "
              />
            )}
          </p>
        </div>

        {/* =====================================
            CLOSING MESSAGE
        ====================================== */}

        <div
          className={`
            note-reveal
            mt-6
            transition-opacity
            duration-1000
            ${
              isFinished
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        >
          <p
            className="
              font-hand
              text-2xl
              text-[#8e7478]
              sm:text-3xl
            "
          >
            I hope you read this with the same
            <br className="hidden sm:block" />
            heart I wrote it with.
          </p>

          <div className="mt-5 text-xl text-[#b56d7b]">
            ♡
          </div>
        </div>
      </div>
    </section>
  );
}