import paths from "../../lib/icon-paths.json";

const fills = {
  react: "#61DAFB",
  typescript: "#3178C6",
  tailwindcss: "#06B6D4",
  nextdotjs: "currentColor",
  nodedotjs: "#5FA04E",
  postgresql: "#4169E1",
  git: "#F05032",
  github: "currentColor",
  docker: "#2496ED",
  vercel: "currentColor",
  githubactions: "#2088FF",
};

export default function StackIcon({ name, className = "h-12 w-12" }) {
  const path = paths[name];
  if (!path) return null;

  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <path d={path} fill={fills[name] || "#FFFFFF"} />
    </svg>
  );
}
