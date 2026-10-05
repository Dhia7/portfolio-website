import { education, skillGroups } from "../../lib/portfolio";
import Icon from "./Icons";
import Reveal from "./Reveal";

export default function Education() {
  return (
    <section id="education" className="section-wash py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16">
          <h2 className="text-label mb-4 font-semibold tracking-[0.2em] uppercase">
            Learning
          </h2>
          <h3 className="text-4xl font-bold sm:text-5xl">Education</h3>
        </Reveal>

        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <article className="glass-card rounded-3xl border-l-4 border-indigo-500 p-8">
              <div className="mb-4 flex items-start gap-4">
                <Icon name="cap" className="text-label mt-1 h-8 w-8 shrink-0" />
                <div>
                  <h4 className="text-xl font-bold">{education.degree}</h4>
                  <p className="text-copy">
                    {education.school} · {education.dates}
                  </p>
                </div>
              </div>
              <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                {education.topics.map((topic) => (
                  <li key={topic} className="text-copy-strong flex items-start gap-2.5 text-sm">
                    <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--label)]" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>
            </article>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="glass-card rounded-3xl p-8 md:p-10">
              <h4 className="mb-6 text-2xl font-bold">Technical focus</h4>
              <div className="grid gap-6">
                {skillGroups.map((group) => (
                  <div key={group.title}>
                    <p className="text-label-soft mb-2 text-sm font-semibold tracking-wide uppercase">
                      {group.title}
                    </p>
                    <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                      {group.skills.map((skill) => (
                        <li key={skill} className="text-copy-strong flex items-start gap-2.5 text-sm">
                          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--label)]" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
