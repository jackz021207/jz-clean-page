// All page content lives here. Edit this file; the layout picks it up.

export const profile = {
  name: "Your Name",
  role: "Researcher & Engineer",
  location: "City, Country",
  bio: "I work on machine learning systems and the problems at the edge of research and engineering. Currently exploring how models reason, and how to make them reliable.",
  links: [
    { label: "Email", href: "mailto:you@example.com" },
    { label: "GitHub", href: "https://github.com/your-handle" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-handle" },
    { label: "Scholar", href: "https://scholar.google.com/" },
    { label: "CV", href: "/cv.pdf" },
  ],
};

export type Entry = {
  period: string;
  title: string;
  org: string;
  place?: string;
  detail?: string;
  href?: string;
};

export const education: Entry[] = [
  {
    period: "2023 — 2025",
    title: "M.S. in Computer Science",
    org: "University Name",
    place: "City",
    detail: "Focus on machine learning. Advisor: Prof. Name.",
  },
  {
    period: "2019 — 2023",
    title: "B.Eng. in Software Engineering",
    org: "University Name",
    place: "City",
    detail: "GPA 3.9 / 4.0 · Graduated with honors.",
  },
];

export const experience: Entry[] = [
  {
    period: "2025 — Now",
    title: "Software Engineer",
    org: "Company Name",
    place: "City",
    detail: "Building infrastructure for large-scale model training and evaluation.",
  },
  {
    period: "Summer 2024",
    title: "Research Intern",
    org: "Lab or Company",
    place: "City",
    detail: "Worked on efficient inference for transformer models.",
  },
];

export const research: Entry[] = [
  {
    period: "2024 — 2025",
    title: "Project or paper title goes here",
    org: "Lab Name, University Name",
    detail: "One or two lines on the question, the method, and what you found.",
    href: "#",
  },
  {
    period: "2023",
    title: "Another research project",
    org: "Advisor: Prof. Name",
    detail: "Short description of the contribution.",
  },
];
