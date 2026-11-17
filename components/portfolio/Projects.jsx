import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { projects } from "../../lib/portfolio";
import Icon from "./Icons";
import Reveal from "./Reveal";

function ProjectCard({ project, index }) {
  const frameRef = useRef(null);

  const moveLight = (event) => {
    const frame = frameRef.current;
    if (!frame) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = frame.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 100;
    const y = ((event.clientY - rect.top) / rect.height) * 100;
    frame.style.setProperty("--px", `${x.toFixed(2)}%`);
    frame.style.setProperty("--py", `${y.toFixed(2)}%`);
  };

  const resetLight = () => {
    const frame = frameRef.current;
    if (!frame) return;
    frame.style.removeProperty("--px");
    frame.style.removeProperty("--py");
  };

  return (
    <article className="project-card group">
      <motion.a
        ref={frameRef}
        href={project.url}
        id={`project-${index}-live`}
        target="_blank"
        rel="noopener noreferrer"
        onMouseMove={moveLight}
        onMouseLeave={resetLight}
        className="project-frame relative block aspect-[16/10] overflow-hidden rounded-3xl"
        initial={{ clipPath: "inset(0 0 100% 0 round 1.5rem)" }}
        whileInView={{ clipPath: "inset(0 0 0% 0 round 1.5rem)" }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.7, delay: (index % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
      >
        <Image
          src={project.image}
          alt={`${project.title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="project-photo object-cover"
        />
        <span className="project-light pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="project-caption absolute inset-0 flex flex-col justify-end bg-slate-950/60 p-6 opacity-100 transition-opacity duration-300 sm:p-8 md:opacity-0 md:group-hover:opacity-100">
          <div className="transition-transform duration-500 md:translate-y-8 md:group-hover:translate-y-0">
            <span className="mb-2 block text-sm font-bold tracking-[0.18em] text-[var(--accent-on-media)] uppercase">
              {project.category}
            </span>
            <h4 className="mb-2 text-2xl font-bold text-[var(--on-media)] sm:text-3xl">{project.title}</h4>
            <p className="mb-4 max-w-md text-sm text-[var(--on-media)]">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((item) => (
                <span key={item} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.a>
      <span className="project-rule" aria-hidden="true" />
      <a
        href={project.github}
        id={`project-${index}-source`}
        target="_blank"
        rel="noopener noreferrer"
        className="source-link glass-card mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-primary)]"
      >
        <Icon name="github" className="h-4 w-4" />
        View source
      </a>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="work" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <h2 className="text-label mb-4 font-semibold tracking-[0.2em] uppercase">
              Selected Projects
            </h2>
            <h3 className="text-4xl font-bold sm:text-5xl">Featured Work</h3>
          </div>
          <p className="text-copy max-w-sm">
            Production sites built for real clients, from marketing pages to a full storefront.
          </p>
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.title} delay={(index % 2) * 0.08}>
              <ProjectCard project={project} index={index} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
