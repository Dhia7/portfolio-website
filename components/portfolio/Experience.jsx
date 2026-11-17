import { motion } from "framer-motion";
import { experiences } from "../../lib/portfolio";
import Icon from "./Icons";
import Press from "./Press";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section id="experience" className="py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16">
          <h2 className="text-label mb-4 font-semibold tracking-[0.2em] uppercase">
            Career Path
          </h2>
          <h3 className="text-4xl font-bold sm:text-5xl">Professional Journey</h3>
        </Reveal>

        <div className="relative grid gap-8">
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute top-0 bottom-0 hidden w-0.5 bg-[var(--accent-fill)] md:block"
            style={{ left: "-1.25rem", originY: 0 }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "0px 0px -12% 0px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />
          {experiences.map((job, index) => (
            <Press key={job.role} from="left" delay={0.12 + index * 0.14}>
              <article
                className={`job-card glass-card rounded-3xl p-8 md:p-10${job.tone === "bronze" ? " job-pigment-bronze" : ""}`}
              >
                <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                  <div className="flex items-center gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--job-bg)] text-[var(--job-ink)]">
                      <Icon name={job.icon} className="h-8 w-8" />
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold">{job.role}</h4>
                      <p className="text-label font-medium">
                        {job.org}{" "}
                        <span className="text-faint">· {job.dates}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-label-soft w-fit rounded-full border border-[var(--badge-indigo-border)] bg-[var(--badge-indigo-bg)] px-4 py-1.5 text-xs font-bold tracking-wider uppercase">
                    {job.badge}
                  </span>
                </div>
                <p className="text-copy mb-6 leading-relaxed">{job.summary}</p>
                <ul className="grid gap-3 md:grid-cols-2">
                  {job.points.map((point) => (
                    <li key={point} className="text-copy-strong flex items-start gap-2 text-sm">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-[var(--job-mark)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Press>
          ))}
        </div>
      </div>
    </section>
  );
}
