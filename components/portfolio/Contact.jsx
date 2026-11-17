import { motion } from "framer-motion";
import { profile } from "../../lib/portfolio";
import Icon from "./Icons";
import StackIcon from "./StackIcon";
import Reveal from "./Reveal";

const socials = [
  {
    id: "social-linkedin",
    label: "LinkedIn",
    href: profile.links.linkedin,
    icon: "linkedin",
  },
  {
    id: "social-github",
    label: "GitHub",
    href: profile.links.github,
    icon: "github",
  },
];

export default function Contact() {
  return (
    <>
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal>
          <div className="text-label mx-auto mb-8 block w-fit rounded-full border border-[var(--badge-indigo-border)] bg-[var(--badge-indigo-bg)] px-4 py-2 text-xs font-bold tracking-[0.18em] uppercase">
            Available for new projects
          </div>
          <h3 className="relative mx-auto mb-8 block w-fit text-5xl font-bold sm:text-7xl">
            Let&apos;s <span className="gradient-text">Connect</span>
            <motion.span
              aria-hidden="true"
              className="absolute -bottom-3 left-0 h-0.5 w-full origin-left bg-[var(--accent-fill)]"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </h3>
          <p className="text-copy mx-auto mb-12 max-w-2xl text-lg sm:text-xl">
            Have a product you want to build? I take on freelance work across interfaces, APIs, and deployment.
          </p>

          <div className="hover-zoom inline-block">
            <motion.a
              href={`mailto:${profile.email}`}
              id="cta-email-primary"
              className="btn-accent group inline-flex items-center gap-4 rounded-2xl px-8 py-5 text-xl font-bold sm:text-2xl"
              initial={{ clipPath: "inset(0 100% 0 0 round 1rem)" }}
              whileInView={{ clipPath: "inset(0 0% 0 0 round 1rem)" }}
              viewport={{ once: true, amount: 0.8 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              {profile.email}
              <Icon name="send" className="h-6 w-6 transition-transform duration-150 group-hover:translate-x-1" />
            </motion.a>
          </div>

          <p className="text-copy mt-8 flex items-center justify-center gap-2">
            <Icon name="pin" className="text-label h-5 w-5" />
            <span>{profile.location}</span>
          </p>
        </Reveal>

      </div>
    </section>

    <footer className="border-t border-[var(--border-color)]">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-10 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
        <div>
          <p className="font-display text-lg font-bold">{profile.name}</p>
          <a
            href={`mailto:${profile.email}`}
            className="text-copy mt-1 inline-block text-sm transition-colors hover:text-[var(--text-primary)]"
          >
            {profile.email}
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {socials.map((social) => (
            <a
              key={social.id}
              id={social.id}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="hover-zoom inline-flex items-center gap-2 rounded-full border border-[var(--border-color)] bg-[var(--bg-glass)] px-4 py-2.5 text-sm font-semibold text-[var(--text-primary)] transition-colors hover:border-[var(--accent-primary)]"
            >
              {social.icon === "github" ? (
                <StackIcon name="github" className="h-4 w-4" />
              ) : (
                <Icon name={social.icon} className="h-4 w-4" />
              )}
              {social.label}
            </a>
          ))}
        </div>
      </div>

      <div className="border-t border-[var(--border-color)]">
        <p className="text-faint mx-auto max-w-6xl px-6 py-5 text-center text-sm sm:text-left">
          © {new Date().getFullYear()} {profile.name}
        </p>
      </div>
    </footer>
    </>
  );
}
