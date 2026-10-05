import Image from "next/image";
import { projects } from "../../lib/portfolio";
import Icon from "./Icons";
import Reveal from "./Reveal";

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
            <Reveal key={project.title} delay={(index % 2) * 0.1 + 0.1}>
              <article className="project-card group">
                <a
                  href={project.url}
                  id={`project-${index}-live`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block aspect-[16/10] overflow-hidden rounded-3xl"
                >
                  <Image
                    src={project.image}
                    alt={`${project.title} preview`}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 flex flex-col justify-end bg-slate-950/60 p-6 opacity-100 transition-opacity duration-500 sm:p-8 md:opacity-0 md:group-hover:opacity-100">
                    <div className="transition-transform duration-500 md:translate-y-10 md:group-hover:translate-y-0">
                      <span className={`mb-2 block text-sm font-bold tracking-[0.18em] uppercase ${project.accent}`}>
                        {project.category}
                      </span>
                      <h4 className="mb-2 text-2xl font-bold sm:text-3xl">{project.title}</h4>
                      <p className="mb-4 max-w-md text-sm text-slate-200">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((item) => (
                          <span
                            key={item}
                            className="rounded-full bg-white/10 px-3 py-1 text-xs backdrop-blur-md"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </a>
                <a
                  href={project.github}
                  id={`project-${index}-source`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--text-primary)] transition-all hover:-translate-y-0.5 hover:border-[var(--accent-primary)]"
                >
                  <Icon name="github" className="h-4 w-4" />
                  View source
                </a>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
