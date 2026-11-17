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
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = card.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(900px) rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 8).toFixed(2)}deg)`;
  };

  const resetCard = () => {
    if (cardRef.current) cardRef.current.style.transform = "";
  };

  return (
    <section id="profile" className="flex items-start overflow-x-clip pt-24 pb-16 md:min-h-screen md:items-center md:pb-0">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-6 md:grid-cols-2 md:gap-16">
        <motion.div
          className="order-2 md:order-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className="text-label mb-4 font-semibold tracking-[0.2em] uppercase">
            {profile.role}
          </h2>
          <h1 className="mb-6 max-w-full text-left text-[clamp(2rem,8.2vw,2.75rem)] leading-[1.08] font-bold sm:mb-8 sm:text-5xl sm:leading-[1.05] md:text-6xl lg:text-7xl">
            <span className="block">
              <SplitText
                text={profile.headlineLead}
                tag="span"
                textAlign="left"
                splitType="chars"
                delay={35}
                rootMargin="0px"
                className="pb-[0.12em]"
                onLetterAnimationComplete={() => setLeadDone(true)}
              />
            </span>
            <MotionConfig reducedMotion="never">
              <motion.span
                className="block overflow-hidden py-[0.14em] leading-[1.2]"
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
            </MotionConfig>
            <span className="block">
              <SplitText
                text={profile.headlineTail}
                tag="span"
                textAlign="left"
                splitType="chars"
                delay={35}
                rootMargin="0px"
                className="pb-[0.12em]"
              />
            </span>
          </h1>
          <MotionConfig reducedMotion="never">
            <TextEffect
              as="p"
              per="word"
              preset="fade-in-blur"
              delay={0.6}
              className="text-copy mb-8 max-w-lg text-base leading-relaxed sm:mb-10 sm:text-lg md:text-xl"
            >
              {profile.summary}
            </TextEffect>
          </MotionConfig>
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            whileInView={{ clipPath: "inset(0 0 0% 0)" }}
            viewport={{ once: true, amount: 0.8 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <a
              href="#work"
              id="hero-work-btn"
              onClick={(event) => onNavigate("work", event)}
              className="hover-zoom btn-accent rounded-xl px-8 py-4 font-bold"
            >
              View Projects
            </a>
            <a
              href="#contact"
              id="hero-contact-btn"
              onClick={(event) => onNavigate("contact", event)}
              className="hover-zoom btn-quiet glass-card rounded-xl px-8 py-4 font-bold"
            >
              Say Hello
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          className="relative order-1 md:order-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <div
            ref={cardRef}
            className="portrait-card relative mx-auto w-full max-w-[240px] sm:max-w-[320px] md:max-w-[420px]"
            onMouseMove={tiltCard}
            onMouseLeave={resetCard}
          >
            <div className="absolute -inset-4 rounded-full bg-[var(--accent-fill)] opacity-20" />
            <div className="absolute -inset-4 rounded-full border border-[var(--border-color)]" />
            <div className="portrait-print relative z-10 aspect-square w-full overflow-hidden rounded-full bg-[#252527] shadow-2xl">
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
            <div className="chip-settle glass-card absolute top-[6%] right-[2%] z-20 rounded-xl p-2.5 md:rounded-2xl md:p-4">
              <Icon name="sparkles" className="h-5 w-5 text-[var(--accent-ink)] md:h-8 md:w-8" />
            </div>
            <div className="chip-settle chip-settle-late glass-card absolute bottom-[6%] left-[2%] z-20 rounded-xl p-2.5 md:rounded-2xl md:p-4">
              <Icon name="code" className="h-5 w-5 text-[var(--accent-ink)] md:h-8 md:w-8" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
