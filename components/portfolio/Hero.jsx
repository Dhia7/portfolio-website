import { useRef, useState } from "react";
import { motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { profile } from "../../lib/portfolio";
import Icon from "./Icons";
import SplitText from "../SplitText";
import RotatingText from "../RotatingText";
import { TextEffect } from "../TextEffect";

export default function Hero({ onNavigate }) {
  const cardRef = useRef(null);
  const [leadDone, setLeadDone] = useState(false);

  const tiltCard = (event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(-y * 10).toFixed(2)}deg) rotateY(${(x * 12).toFixed(2)}deg) scale(1.04)`;
  };

  const resetCard = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <section id="profile" className="flex min-h-screen items-center pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 px-6 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-label mb-4 font-semibold tracking-[0.2em] uppercase">
            {profile.role}
          </h2>
          <h1 className="mb-8 text-left text-5xl leading-[1.05] font-bold sm:text-6xl lg:text-7xl">
            <SplitText
              text={profile.headlineLead}
              tag="span"
              textAlign="left"
              splitType="chars"
              delay={35}
              rootMargin="0px"
              className="pb-[0.12em]"
              onLetterAnimationComplete={() => setLeadDone(true)}
            />{" "}
            <MotionConfig reducedMotion="never">
              <motion.span
                className="inline-block align-baseline"
                initial={{ opacity: 0, y: 40 }}
                animate={leadDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              >
                <RotatingText
                  texts={profile.headlineWords}
                  mainClassName="overflow-y-hidden"
                  elementLevelClassName="gradient-text"
                  rotationInterval={2400}
                  staggerDuration={0.03}
                  staggerFrom="first"
                  auto={leadDone}
                  splitBy="characters"
                />
              </motion.span>
            </MotionConfig>{" "}
            <SplitText
              text={profile.headlineTail}
              tag="span"
              textAlign="left"
              splitType="chars"
              delay={35}
              rootMargin="0px"
              className="pb-[0.12em]"
            />
          </h1>
          <MotionConfig reducedMotion="never">
            <TextEffect
              as="p"
              per="word"
              preset="fade-in-blur"
              delay={0.6}
              className="text-copy mb-10 max-w-lg text-lg leading-relaxed sm:text-xl"
            >
              {profile.summary}
            </TextEffect>
          </MotionConfig>
          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              id="hero-work-btn"
              onClick={(event) => onNavigate("work", event)}
              className="rounded-xl bg-indigo-600 px-8 py-4 font-bold text-white shadow-lg shadow-indigo-500/20 transition-all hover:-translate-y-1 hover:bg-indigo-500"
            >
              View Projects
            </a>
            <a
              href="#contact"
              id="hero-contact-btn"
              onClick={(event) => onNavigate("contact", event)}
              className="glass-card rounded-xl px-8 py-4 font-bold transition-all hover:-translate-y-1"
            >
              Say Hello
            </a>
          </div>
        </motion.div>

        <motion.div
          className="relative"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={cardRef}
            className="portrait-card relative mx-auto w-full max-w-[420px]"
            onMouseMove={tiltCard}
            onMouseLeave={resetCard}
          >
            <div className="portrait-frame absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-500 to-pink-500 opacity-20" />
            <div className="portrait-frame-alt absolute -inset-4 rounded-full border border-[var(--border-color)]" />
            <div className="portrait-float relative z-10 aspect-square w-full overflow-hidden rounded-full bg-[#252527] shadow-2xl">
              <Image
                src={profile.portrait}
                alt={profile.name}
                fill
                priority
                unoptimized
                sizes="(max-width: 768px) 90vw, 420px"
                className="object-contain object-center"
              />
            </div>
            <div className="chip-bob glass-card absolute top-[8%] right-[6%] z-20 rounded-2xl p-4">
              <Icon name="sparkles" className="h-8 w-8 text-yellow-400" />
            </div>
            <div className="chip-pulse glass-card absolute bottom-[8%] left-[6%] z-20 rounded-2xl p-4">
              <Icon name="code" className="h-8 w-8 text-blue-400" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
