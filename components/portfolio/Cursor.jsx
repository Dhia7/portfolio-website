import { useEffect, useRef, useState } from "react";

export default function Cursor() {
  const cursorRef = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(fine.matches && !reduce.matches);

    sync();
    fine.addEventListener("change", sync);
    reduce.addEventListener("change", sync);
    return () => {
      fine.removeEventListener("change", sync);
      reduce.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return undefined;
    const cursor = cursorRef.current;
    if (!cursor) return undefined;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let scale = 1;
    let seen = false;
    let frame = 0;
    let running = false;

    const tick = () => {
      current.x += (target.x - current.x) * 0.22;
      current.y += (target.y - current.y) * 0.22;
      cursor.style.transform = `translate3d(${current.x}px, ${current.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      if (Math.abs(target.x - current.x) < 0.4 && Math.abs(target.y - current.y) < 0.4) {
        running = false;
        return;
      }
      frame = window.requestAnimationFrame(tick);
    };

    const start = () => {
      if (running) return;
      running = true;
      frame = window.requestAnimationFrame(tick);
    };

    const move = (event) => {
      target.x = event.clientX;
      target.y = event.clientY;
      if (!seen) {
        current.x = event.clientX;
        current.y = event.clientY;
        cursor.style.opacity = "1";
        seen = true;
      }
      start();
    };

    const over = (event) => {
      const hot = event.target.closest("a, button, .project-card, .skill-tag");
      scale = hot ? 1.8 : 1;
      cursor.classList.toggle("is-hot", Boolean(hot));
      start();
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="cursor-ring pointer-events-none fixed top-0 left-0 z-[100] hidden h-8 w-8 rounded-full md:block"
      style={{ opacity: 0, transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)" }}
    />
  );
}
