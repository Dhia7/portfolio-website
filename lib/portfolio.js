export const profile = {
  name: "Dhia Eddine Naija",
  monogram: "DN",
  role: "Full Stack Developer",
  location: "Sousse, Tunisia",
  email: "dhianaija@gmail.com",
  headlineLead: "Building",
  headlineAccent: "modern",
  headlineWords: ["modern", "performant", "interactive", "polished", "scalable"],
  headlineTail: "web experiences",
  summary:
    "Hi, I'm Dhia Eddine Naija. I design and ship high-performance web applications with React, Node.js, and Next.js, from interface to API and deployment.",
  portrait: "/profile-image.png",
  links: {
    linkedin: "https://www.linkedin.com/in/dhia-naija-64bb82200/",
    github: "https://github.com/Dhia7",
  },
};

export const navigation = [
  { id: "profile", label: "Profile" },
  { id: "work", label: "Works" },
  { id: "stack", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "certifications", label: "Certifications" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Let's Talk", cta: true },
];

export const projects = [
  {
    title: "Protein Shop Tunisie",
    category: "Supplement shop",
    url: "https://protein-shop-ochre.vercel.app/",
    image: "/projects/protein-shop.jpg",
    description:
      "A French and Arabic supplement store for Tunisia, with a catalogue, cart, and WhatsApp checkout.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "shadcn/ui"],
    github: "https://github.com/Dhia7/protein-shop",
    accent: "text-amber-400",
  },
  {
    title: "Ecommerce Website",
    category: "E-commerce",
    url: "https://www.swisia.store/",
    image: "/projects/ecommerce-website.jpg",
    description: "An eCommerce website built with Next.js and a Postgres-backed storefront.",
    tech: ["Next.js", "React", "TypeScript"],
    github: "https://github.com/Dhia7/weary",
    accent: "text-emerald-400",
  },
  {
    title: "Aesthetic Training Academy",
    category: "Academy site",
    url: "https://forma-beauty-international-academy-theta.vercel.app/",
    image: "/projects/aesthetic-training-academy.jpg",
    description:
      "Responsive website for an aesthetic training academy with a focus on contact and user engagement.",
    tech: ["Vite", "WebGL", "shadcn/ui"],
    github: "https://github.com/Dhia7/forma-beauty-international-academy",
    accent: "text-pink-400",
  },
  {
    title: "Professional Workwear",
    category: "Landing page",
    url: "https://www.unipro-company.ch/",
    image: "/projects/professional-workwear.jpg",
    description: "A modern and responsive landing page solution built with Next.js.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Dhia7/uniPro",
    accent: "text-indigo-400",
  },
];

export const stack = [
  { name: "React", icon: "react", tone: "hover:border-sky-400/50" },
  { name: "TypeScript", icon: "typescript", tone: "hover:border-blue-400/50" },
  { name: "Tailwind", icon: "tailwindcss", tone: "hover:border-cyan-400/50" },
  { name: "Next.js", icon: "nextdotjs", tone: "hover:border-[var(--text-primary)]/40" },
  { name: "Node.js", icon: "nodedotjs", tone: "hover:border-green-400/50" },
  { name: "PostgreSQL", icon: "postgresql", tone: "hover:border-indigo-400/50" },
];

export const tools = [
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
  { name: "Docker", icon: "docker" },
  { name: "CI/CD", icon: "githubactions" },
  { name: "Vercel", icon: "vercel" },
];

export const experiences = [
  {
    role: "Full Stack Developer",
    org: "Freelance",
    dates: "2024 – Present",
    badge: "Freelance",
    tone: "indigo",
    summary:
      "Design and ship scalable web applications end to end, from interface and APIs through data and deployment.",
    points: [
      "Built and deployed applications with JavaScript, Next.js, and the MERN stack.",
      "Delivered interfaces, REST APIs, and database layers for data-driven products.",
      "Took MERN projects from concept to deployment with a focus on usability.",
      "Improved performance through testing, code refinement, and deployment choices.",
    ],
  },
  {
    role: "Web Application Intern",
    org: "Sousse, Tunisia",
    dates: "February 2023 – July 2023",
    badge: "Internship",
    tone: "purple",
    summary:
      "Joined a product team to turn requirements into a working, deployed web application.",
    points: [
      "Gathered requirements with stakeholders and defined the site's key features.",
      "Designed the architecture and built a responsive interface with dynamic content.",
      "Tested and optimized the app for quality, speed, and a clearer user experience.",
      "Supported deployment so the site was accessible and ready for end users.",
    ],
  },
];

export const certifications = [
  {
    title: "Back End Development and APIs",
    issuer: "freeCodeCamp",
    date: "February 14, 2025",
    href: "https://www.freecodecamp.org/certification/Dhianaija/back-end-development-and-apis",
    topics: [
      "Managing packages with NPM",
      "Node and Express",
      "MongoDB and Mongoose",
      "Back end API projects",
    ],
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    date: "December 10, 2024",
    href: "https://www.freecodecamp.org/certification/Dhianaija/javascript-algorithms-and-data-structures",
    topics: [
      "Basic JavaScript",
      "ES6",
      "Regular expressions",
      "Debugging",
      "Basic data structures",
      "Basic algorithm scripting",
      "Object oriented programming",
      "Functional programming",
      "Intermediate algorithm scripting",
      "JavaScript algorithm projects",
    ],
  },
];

export const education = {
  degree: "Business Intelligence",
  school: "Polytechnic Sousse University",
  dates: "2021 – 2023",
  topics: [
    "Advanced algorithms",
    "Web application development",
    "Data analysis",
    "Machine learning",
    "Deep learning",
  ],
};

export const skillGroups = [
  { title: "Frontend", skills: ["React/Redux", "TypeScript", "Next.js", "Tailwind CSS"] },
  { title: "Backend", skills: ["Node.js", "Express.js", "REST APIs", "JWT"] },
  { title: "Database", skills: ["MongoDB", "PostgreSQL", "Mongoose", "SQL"] },
];
