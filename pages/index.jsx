import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import { MotionConfig } from "framer-motion";
import { navigation } from "../lib/portfolio";
import SiteNav from "../components/portfolio/SiteNav";
import Hero from "../components/portfolio/Hero";
import Projects from "../components/portfolio/Projects";
import Stack from "../components/portfolio/Stack";
import Experience from "../components/portfolio/Experience";
import Certifications from "../components/portfolio/Certifications";
import Education from "../components/portfolio/Education";
import Contact from "../components/portfolio/Contact";
import Cursor from "../components/portfolio/Cursor";

export default function Home() {
  const [activeSection, setActiveSection] = useState("profile");
  const isNavigatingRef = useRef(false);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        if (isNavigatingRef.current) return;
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -45% 0px", threshold: [0.15, 0.35, 0.6] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (sectionId, event) => {
    if (event?.preventDefault) event.preventDefault();
    isNavigatingRef.current = true;
    setActiveSection(sectionId);
    
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    window.setTimeout(() => {
          isNavigatingRef.current = false;
    }, 700);
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen text-[var(--text-primary)]">
      <Head>
        <title>Dhia Eddine Naija - Portfolio</title>
          <meta
            name="description"
            content="Full Stack Developer in Sousse, Tunisia. React, Node.js, and Next.js."
          />
          <meta name="theme-color" content="#0F1419" />
        </Head>

        <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
          <div className="floating-blob top-[-12vh] left-[-8vw] h-96 w-96 bg-indigo-600" />
          <div className="floating-blob right-[-8vw] bottom-[-12vh] h-96 w-96 bg-pink-600" />
          <div className="floating-blob top-[22vh] left-[58vw] h-[420px] w-[420px] bg-blue-500" />
        </div>

        <SiteNav activeSection={activeSection} onNavigate={handleNavigate} />

        <main className="relative z-10">
          <Hero onNavigate={handleNavigate} />
          <Projects />
          <Stack />
          <Experience />
          <Certifications />
          <Education />
          <Contact />
      </main>
    </div>
    </MotionConfig>
  );
}
