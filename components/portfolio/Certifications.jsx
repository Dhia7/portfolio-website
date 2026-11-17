import { certifications } from "../../lib/portfolio";
import Icon from "./Icons";
import Press from "./Press";
import Reveal from "./Reveal";

export default function Certifications() {
  return (
    <section id="certifications" className="pb-8">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-8">
          <h2 className="text-label mb-3 font-semibold tracking-[0.2em] uppercase">
            Credentials
          </h2>
          <h3 className="text-4xl font-bold">Certifications</h3>
        </Reveal>

        <div className="grid gap-4 md:grid-cols-2">
          {certifications.map((item, index) => (
            <Press key={item.href} delay={index * 0.08}>
              <a
                href={item.href}
                id={`certification-${index}-link`}
                target="_blank"
                rel="noopener noreferrer"
                className="record-card glass-card block rounded-3xl p-6"
              >
                <div className="mb-3 flex items-start gap-4">
                  <Icon name="award" className="text-label mt-1 h-7 w-7 shrink-0" />
                  <div>
                    <h4 className="text-lg font-bold">{item.title}</h4>
                    <p className="text-copy text-sm">
                      {item.issuer} · {item.date}
                    </p>
                  </div>
                </div>
                <ul className="grid gap-x-6 gap-y-2 sm:grid-cols-2">
                  {item.topics.map((topic) => (
                    <li key={topic} className="text-copy-strong flex items-start gap-2.5 text-sm">
                      <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--label)]" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>
              </a>
            </Press>
          ))}
        </div>
      </div>
    </section>
  );
}
