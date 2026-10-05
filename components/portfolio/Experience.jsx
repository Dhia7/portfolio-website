import { experiences } from "../../lib/portfolio";
import Icon from "./Icons";
import Reveal from "./Reveal";

const tones = {
  indigo: {
    icon: "from-indigo-500 to-blue-600",
    org: "text-label",
    badge: "border-[var(--badge-indigo-border)] bg-[var(--badge-indigo-bg)] text-label-soft",
    check: "text-label",
    shadow: "hover:shadow-indigo-500/20",
  },
  purple: {
    icon: "from-purple-500 to-pink-600",
    org: "text-label-purple",
    badge: "border-[var(--badge-purple-border)] bg-[var(--badge-purple-bg)] text-label-purple-soft",
    check: "text-label-purple",
    shadow: "hover:shadow-purple-500/20",
  },
};

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

        <div className="grid gap-8">
          {experiences.map((job, index) => {
            const tone = tones[job.tone];
            return (
              <Reveal key={job.role} delay={(index + 1) * 0.1}>
                <article
                  className={`glass-card rounded-3xl p-8 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl md:p-10 ${tone.shadow}`}
                >
                  <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-center">
                    <div className="flex items-center gap-5">
                      <div
                        className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${tone.icon}`}
                      >
                        <Icon name="layers" className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="text-2xl font-bold">{job.role}</h4>
                        <p className={`font-medium ${tone.org}`}>
                          {job.org}{" "}
                          <span className="text-faint">· {job.dates}</span>
                        </p>
                      </div>
                    </div>
                    <span
                      className={`w-fit rounded-full border px-4 py-1.5 text-xs font-bold tracking-wider uppercase ${tone.badge}`}
                    >
                      {job.badge}
                    </span>
                  </div>
                  <p className="text-copy mb-6 leading-relaxed">{job.summary}</p>
                  <ul className="grid gap-3 md:grid-cols-2">
                    {job.points.map((point) => (
                      <li key={point} className="text-copy-strong flex items-start gap-2 text-sm">
                        <Icon name="check" className={`mt-0.5 h-4 w-4 shrink-0 ${tone.check}`} />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
