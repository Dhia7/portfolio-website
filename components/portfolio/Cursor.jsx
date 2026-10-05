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

    const move = (event) => {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    };

    const over = (event) => {
      const hot = event.target.closest("a, button, .project-card, .skill-tag");
      cursor.style.transform = `translate(-50%, -50%) scale(${hot ? 2.5 : 1})`;
      cursor.style.backgroundColor = hot ? "rgba(99, 102, 241, 0.1)" : "transparent";
    };

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseover", over);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden h-8 w-8 rounded-full border-2 border-indigo-500 transition-[transform,background-color] duration-100 ease-out md:block"
      style={{ transform: "translate(-50%, -50%)" }}
    />
  );
}
