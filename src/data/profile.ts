// All page content lives here. Edit this file; the layout picks it up.

export const profile = {
  name: "Junqi Zhao",
  role: "Software Engineer",
  location: "Bellevue, WA",
  bio: "I'm a full-stack engineer, and a backend engineer at heart. Most of my time goes into data systems: running Spark on Kubernetes, modeling the world as a Neo4j graph, and chasing down why a database query is slow. Lately I've been pulled toward ML infrastructure and ML systems, the work of making models train, serve, and scale well. That curiosity is also where my research on efficient LLM inference comes from.",
  links: [
    { label: "Email", href: "mailto:jackz021207@gmail.com" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/junqizhao021207" },
    { label: "Scholar", href: "https://scholar.google.com/citations?user=Lzw1g3wAAAAJ&hl=en" },
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
    period: "2021 — 2024",
    title: "Bachelor in Computer Science",
    org: "New York University",
    place: "New York, NY",
    detail: "GPA 3.96 / 4.0 · Summa Cum Laude",
  },
];

export const experience: Entry[] = [
  {
    period: "2025 — Now",
    title: "Software Engineer, Infrastructure Security",
    org: "Tesla",
    place: "Bellevue, WA",
    detail:
      "Building the asset intelligence, graph, and Spark compute platforms that give security teams a unified view of risk across millions of assets.",
  },
  {
    period: "2025",
    title: "Software Engineer Intern, Infrastructure Security",
    org: "Tesla",
    place: "Bellevue, WA",
    detail: "Built an LLM-powered security agent that generates threat playbooks from the attack-surface graph.",
  },
  {
    period: "2024",
    title: "Software Engineer Intern, Engineering Efficiency",
    org: "NIO",
    place: "Shanghai",
    detail: "Built an event-driven workflow automation platform connecting GitLab, Jira, and Lark for 200+ employees.",
  },
];

export const research: Entry[] = [
  {
    period: "2026",
    title: "BUZZ: Beehive-structured Sparse KV Cache with Segmented Heavy Hitters for Efficient LLM Inference",
    org: "First author · ACM TIST (JCR Q1)",
    detail: "Cited by DeepSeek's Native Sparse Attention (ACL 2025).",
    href: "https://dl.acm.org/doi/10.1145/3810942",
  },
];
