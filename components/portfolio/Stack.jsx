import { stack, tools } from "../../lib/portfolio";
import Reveal from "./Reveal";
import StackIcon from "./StackIcon";

export default function Stack() {
  return (
    <section id="stack" className="section-wash py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal className="mb-16 text-center">
          <h2 className="text-label mb-4 font-semibold tracking-[0.2em] uppercase">
            Core Capabilities
          </h2>
          <h3 className="text-4xl font-bold sm:text-5xl">My Tech Stack</h3>
        </Reveal>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {stack.map((item, index) => (
            <Reveal key={item.name} delay={(index % 4) * 0.1}>
              <div
                className={`skill-tag glass-card flex flex-col items-center justify-center gap-4 rounded-3xl p-8 ${item.tone}`}
              >
                <StackIcon name={item.icon} />
                <span className="font-bold">{item.name}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-wrap justify-center gap-4">
          {tools.map((tool) => (
            <div
              key={tool.name}
              className="text-copy-strong flex items-center gap-2 rounded-full border border-[var(--border-color)] px-5 py-3 text-sm font-medium tracking-[0.16em] uppercase"
            >
              <StackIcon name={tool.icon} className="h-5 w-5" />
              {tool.name}
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
