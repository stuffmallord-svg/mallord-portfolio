"use client";

import Image from "next/image";
import {
  motion,
  MotionValue,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

const ACCENT = "#7DD3FC";
const ACCENT_BRIGHT = "#38BDF8";
const BG = "#060608";
const TEXT = "#F0ECE3";

const navItems = [
  ["Home", "home"],
  ["Services", "skills"],
  ["About", "about"],
  ["Projects", "projects"],
  ["Contact", "contact"],
] as const;

const services = [
  {
    no: "01",
    name: "Short-form Content",
    category: "Content",
    description:
      "TikTok, Reels and Shorts built around hooks, pacing, typography and platform-first editing.",
  },
  {
    no: "02",
    name: "AI Visuals",
    category: "AI",
    description:
      "Generative visual concepts, campaign assets and experimental imagery with strong art direction.",
  },
  {
    no: "03",
    name: "Web Design",
    category: "Web",
    description:
      "Landing pages, portfolios and digital experiences built around clarity, atmosphere and motion.",
  },
  {
    no: "04",
    name: "Video Editing",
    category: "Content",
    description:
      "Cuts, sound, transitions and visual rhythm for social content that feels intentional rather than templated.",
  },
  {
    no: "05",
    name: "Creative Direction",
    category: "Creative",
    description:
      "Turning rough references and ideas into a coherent visual language, system and finished output.",
  },
  {
    no: "06",
    name: "Next.js / React",
    category: "Development",
    description:
      "Responsive front-end experiences with motion, interaction and polished visual details.",
  },
] as const;

const projects = [
  {
    no: "01",
    title: "AFTERIMAGE",
    description:
      "A cinematic visual concept exploring motion, light and digital identity.",
    tags: ["Art Direction", "Motion", "Visual"],
    image: "/projects/afterimage.jpg",
    slug: "afterimage",
    accent: "#7DD3FC",
  },
  {
    no: "02",
    title: "CONCRETE",
    description:
      "An architectural visual study built around geometry, shadow and atmosphere.",
    tags: ["Architecture", "Visual", "Direction"],
    image: "/projects/concrete.jpg",
    slug: "concrete",
    accent: "#38BDF8",
  },
  {
    no: "03",
    title: "DEEP BLUE",
    description:
      "An experimental digital concept combining abstract forms, light and AI-driven aesthetics.",
    tags: ["AI", "Digital Art", "Concept"],
    image: "/projects/deep-blue.jpg",
    slug: "deep-blue",
    accent: "#A5F3FC",
  },
  {
    no: "04",
    title: "GLASS OBJECT",
    description:
      "A minimal product concept focused on material, transparency and futuristic visual language.",
    tags: ["3D", "Product", "Visual"],
    image: "/projects/glass-object.jpg",
    slug: "glass-object",
    accent: "#22D3EE",
  },
] as const;

const process = [
  {
    no: "01",
    title: "DIRECTION",
    description:
      "Define the idea, mood, references and visual language before making the final piece.",
  },
  {
    no: "02",
    title: "BUILD",
    description:
      "Develop the visuals, edit the content or build the digital experience around the concept.",
  },
  {
    no: "03",
    title: "REFINE",
    description:
      "Polish the details, motion, typography and interactions until everything feels intentional.",
  },
] as const;

const tools = [
  "AI",
  "Figma",
  "CapCut",
  "Next.js",
  "React",
  "Framer Motion",
  "Vercel",
  "Photoshop",
];

function IconArrowDown({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M12 5v14M5 12l7 7 7-7" />
    </svg>
  );
}

function IconArrowUpRight({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="M7 17 17 7M8 7h9v9" />
    </svg>
  );
}

function IconMail({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function IconTelegram({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d="m21.3 3.8-3.1 15.8c-.2 1-.8 1.2-1.6.7l-4.2-3.1-2 1.9c-.2.2-.4.4-.8.4l.3-4.4 8-7.2c.3-.3-.1-.5-.5-.2L7.5 13.9 3.2 12.5c-.9-.3-.9-.9.2-1.3L20.3 3c.8-.3 1.5.2 1 .8Z" />
    </svg>
  );
}

function IconMenu() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}

function IconClose() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" />
    </svg>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <motion.div
      className="section-label"
      initial={{ opacity: 0, x: -18 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.4 }}
    >
      <span />
      {children}
    </motion.div>
  );
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <motion.h2
      className="section-title"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55 }}
    >
      {children}
    </motion.h2>
  );
}

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  return (
    <motion.article
      className="service-card"
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ delay: index * 0.055, duration: 0.5 }}
      whileHover={{ y: -4 }}
    >
      <div className="service-glow" />
      <div className="service-top">
        <span className="service-number">{service.no}</span>
        <span className="service-category">{service.category}</span>
      </div>
      <div className="service-body">
        <h3>{service.name}</h3>
        <p>{service.description}</p>
      </div>
      <span className="service-line" />
    </motion.article>
  );
}

function ProjectRow({
  project,
  index,
}: {
  project: (typeof projects)[number];
  index: number;
}) {
  return (
    <motion.a
      className="project-row"
      href={`/projects/${project.slug}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ delay: index * 0.06, duration: 0.5 }}
    >
      <span className="project-number">{project.no}</span>

      <div className="project-media">
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 800px) 100vw, 190px"
          className="project-image"
          priority={index === 0}
        />
        <div className="project-media-shine" />
      </div>

      <div className="project-copy">
        <div className="project-title-row">
          <h3>{project.title}</h3>
          <span
            className="project-dot"
            style={{ background: project.accent }}
          />
        </div>
        <p>{project.description}</p>
        <div className="project-tags">
          {project.tags.map((tag) => (
            <span key={tag}>{tag}</span>
          ))}
        </div>
      </div>

      <span
        className="project-arrow"
        style={{ color: project.accent }}
      >
        <IconArrowUpRight />
      </span>
    </motion.a>
  );
}

function ContactLink({
  icon,
  label,
  href,
}: {
  icon: ReactNode;
  label: string;
  href: string;
}) {
  return (
    <motion.a
      className="contact-link"
      href={href}
      whileHover={{ y: -3 }}
      transition={{ duration: 0.18 }}
    >
      {icon}
      <span>{label}</span>
      <IconArrowUpRight size={14} />
    </motion.a>
  );
}

function ScrollProgress({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  return (
    <motion.div
      className="scroll-progress"
      style={{ scaleX: progress }}
    />
  );
}

export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll();

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorSpringX = useSpring(cursorX, {
    stiffness: 170,
    damping: 24,
  });
  const cursorSpringY = useSpring(cursorY, {
    stiffness: 170,
    damping: 24,
  });

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.22],
    [0, reduced ? 0 : -85],
  );

  const heroOpacity = useTransform(
    scrollYProgress,
    [0, 0.2],
    [1, 0],
  );

  useEffect(() => {
    const timer = window.setTimeout(() => setLoaded(true), 120);

    const handleMouseMove = (event: MouseEvent) => {
      cursorX.set(event.clientX - 210);
      cursorY.set(event.clientY - 210);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [cursorX, cursorY]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const navigateMobile = (id: string) => {
    setMenuOpen(false);
    window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 120);
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText("stuffmallord@gmail.com");
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      window.location.href = "mailto:stuffmallord@gmail.com";
    }
  };

  return (
    <main className="mallord-page">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: ${BG}; color: ${TEXT}; }
        button, a { -webkit-tap-highlight-color: transparent; }
        ::selection { background: ${ACCENT}; color: ${BG}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: ${BG}; }
        ::-webkit-scrollbar-thumb { background: ${ACCENT}; }

        .mallord-page {
          min-height: 100vh;
          overflow-x: hidden;
          background:
            radial-gradient(circle at 85% 6%, rgba(125,211,252,.045), transparent 25%),
            ${BG};
          color: ${TEXT};
          font-family: "DM Sans", sans-serif;
        }

        .mallord-cursor {
          position: fixed;
          z-index: 1;
          top: 0;
          left: 0;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          pointer-events: none;
          background: radial-gradient(circle, rgba(125,211,252,.065), transparent 69%);
        }

        .mallord-noise {
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          opacity: .028;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-size: 150px;
        }

        .scroll-progress {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 300;
          height: 2px;
          background: ${ACCENT};
          transform-origin: 0%;
        }

        .nav {
          position: fixed;
          inset: 0 0 auto 0;
          z-index: 220;
          min-height: 74px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1.5rem;
          padding: 0 3rem;
          border-bottom: 1px solid rgba(240,236,227,.065);
          background: rgba(6,6,8,.78);
          backdrop-filter: blur(22px);
          -webkit-backdrop-filter: blur(22px);
        }

        .nav-logo {
          color: ${ACCENT};
          font-family: "Syne", sans-serif;
          font-size: 1.15rem;
          font-weight: 800;
          letter-spacing: -.035em;
          text-decoration: none;
          flex-shrink: 0;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .nav-link {
          position: relative;
          color: rgba(240,236,227,.52);
          font-size: .68rem;
          font-weight: 500;
          letter-spacing: .11em;
          text-transform: uppercase;
          text-decoration: none;
          transition: color .2s ease;
        }

        .nav-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -7px;
          width: 100%;
          height: 1px;
          background: ${ACCENT};
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .25s ease;
        }

        .nav-link:hover { color: ${TEXT}; }
        .nav-link:hover::after { transform: scaleX(1); }

        .nav-status {
          display: flex;
          align-items: center;
          gap: .55rem;
          color: rgba(240,236,227,.34);
          font-size: .59rem;
          letter-spacing: .11em;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .nav-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: ${ACCENT};
          animation: pulse 1.9s ease-in-out infinite;
        }

        @keyframes pulse {
          0%,100% { opacity: 1; transform: scale(1); }
          50% { opacity: .3; transform: scale(.72); }
        }

        .mobile-menu-button {
          display: none;
          width: 42px;
          height: 42px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(240,236,227,.12);
          background: rgba(240,236,227,.025);
          color: ${TEXT};
          cursor: pointer;
        }

        .mobile-menu {
          position: fixed;
          inset: 74px 0 0 0;
          z-index: 210;
          display: none;
          flex-direction: column;
          padding: 1.25rem 1.15rem 1.5rem;
          background: rgba(6,6,8,.975);
          border-top: 1px solid rgba(240,236,227,.06);
          backdrop-filter: blur(26px);
          -webkit-backdrop-filter: blur(26px);
        }

        .mobile-menu-link {
          min-height: 68px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid rgba(240,236,227,.07);
          color: ${TEXT};
          text-decoration: none;
          font-family: "Syne", sans-serif;
          font-size: 1.65rem;
          font-weight: 800;
          letter-spacing: -.045em;
        }

        .mobile-menu-link small {
          color: ${ACCENT};
          font-family: "DM Sans", sans-serif;
          font-size: .6rem;
          font-weight: 500;
          letter-spacing: .1em;
        }

        .mobile-menu-meta {
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          margin-top: auto;
          padding-top: 2rem;
          color: rgba(240,236,227,.22);
          font-size: .57rem;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .hero {
          position: relative;
          min-height: 100svh;
          display: flex;
          align-items: center;
          overflow: hidden;
        }

        .hero-grid {
          position: absolute;
          inset: 0;
          opacity: .45;
          background-image:
            linear-gradient(rgba(125,211,252,.026) 1px, transparent 1px),
            linear-gradient(90deg, rgba(125,211,252,.026) 1px, transparent 1px);
          background-size: 70px 70px;
        }

        .hero-orb {
          position: absolute;
          right: -9%;
          top: 7%;
          width: 630px;
          height: 630px;
          border-radius: 50%;
          filter: blur(110px);
          background: radial-gradient(circle, rgba(125,211,252,.11), rgba(56,189,248,.028) 44%, transparent 70%);
        }

        .hero-inner {
          position: relative;
          z-index: 5;
          width: 100%;
          padding: 8.8rem 3rem 5rem;
        }

        .hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: .55rem;
          padding: .42rem .8rem;
          border: 1px solid rgba(125,211,252,.28);
          color: ${ACCENT};
          font-size: .66rem;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .hero-eyebrow-dot {
          animation: pulse 1.6s ease-in-out infinite;
        }

        .hero-title-wrap {
          margin-top: 1.65rem;
          overflow: hidden;
        }

        .hero-title {
          margin: 0;
          font-family: "Syne", sans-serif;
          font-size: clamp(4rem, 9vw, 9rem);
          line-height: .84;
          font-weight: 800;
          letter-spacing: -.065em;
        }

        .hero-title.outline {
          color: transparent;
          -webkit-text-stroke: 1px ${ACCENT};
        }

        .hero-kicker {
          margin-top: 1.4rem;
          color: rgba(240,236,227,.31);
          font-size: .74rem;
          letter-spacing: .28em;
        }

        .hero-description {
          max-width: 575px;
          margin: 1.35rem 0 0;
          color: rgba(240,236,227,.51);
          font-size: 1rem;
          font-weight: 300;
          line-height: 1.75;
        }

        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          gap: .8rem;
          margin-top: 2.3rem;
        }

        .hero-button {
          min-width: 168px;
          min-height: 50px;
          padding: 0 1.45rem;
          border: 1px solid rgba(240,236,227,.15);
          background: transparent;
          color: ${TEXT};
          cursor: pointer;
          font-size: .72rem;
          font-weight: 600;
          letter-spacing: .095em;
          text-transform: uppercase;
          transition: transform .2s ease, background .2s ease, border-color .2s ease, color .2s ease;
        }

        .hero-button:hover { transform: translateY(-2px); border-color: ${ACCENT}; color: ${ACCENT}; }
        .hero-button.primary { border-color: ${ACCENT}; background: ${ACCENT}; color: ${BG}; }
        .hero-button.primary:hover { background: ${ACCENT_BRIGHT}; color: ${BG}; }

        .hero-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 3.2rem;
          margin-top: 3.4rem;
        }

        .hero-meta-item strong {
          display: block;
          color: ${ACCENT};
          font-family: "Syne", sans-serif;
          font-size: 1.55rem;
          line-height: 1;
        }

        .hero-meta-item span {
          display: block;
          margin-top: .32rem;
          color: rgba(240,236,227,.31);
          font-size: .64rem;
          letter-spacing: .11em;
          text-transform: uppercase;
        }

        .hero-scroll {
          position: absolute;
          left: 3rem;
          bottom: 1.7rem;
          z-index: 6;
          display: flex;
          align-items: center;
          gap: .58rem;
          color: rgba(240,236,227,.23);
          font-size: .62rem;
          letter-spacing: .14em;
          text-transform: uppercase;
        }

        .marquee {
          position: relative;
          z-index: 8;
          overflow: hidden;
          white-space: nowrap;
          border-top: 1px solid rgba(240,236,227,.06);
          border-bottom: 1px solid rgba(240,236,227,.06);
        }

        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 24s linear infinite;
        }

        .marquee-group { display: flex; align-items: center; }

        .marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 1.8rem;
          padding: .95rem 2rem;
          color: rgba(240,236,227,.24);
          font-size: .63rem;
          letter-spacing: .16em;
        }

        .marquee-item b { color: ${ACCENT}; font-size: .44rem; }
        .marquee:hover .marquee-track { animation-play-state: paused; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        .section {
          position: relative;
          padding: 8rem 3rem;
          scroll-margin-top: 74px;
        }

        .section-label {
          display: flex;
          align-items: center;
          gap: .72rem;
          color: ${ACCENT};
          font-size: .65rem;
          font-weight: 500;
          letter-spacing: .21em;
          text-transform: uppercase;
        }

        .section-label > span {
          width: 28px;
          height: 1px;
          background: ${ACCENT};
        }

        .section-title {
          margin: .75rem 0 0;
          font-family: "Syne", sans-serif;
          font-size: clamp(2.3rem, 5.3vw, 4.3rem);
          line-height: .96;
          font-weight: 800;
          letter-spacing: -.05em;
        }

        .section-intro {
          max-width: 680px;
          margin: 1.1rem 0 0;
          color: rgba(240,236,227,.41);
          font-size: .9rem;
          line-height: 1.75;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0,1fr));
          gap: 1px;
          max-width: 1160px;
          margin-top: 3.5rem;
          border: 1px solid rgba(240,236,227,.07);
          background: rgba(240,236,227,.07);
        }

        .service-card {
          position: relative;
          min-height: 260px;
          padding: 2rem;
          overflow: hidden;
          border: 1px solid rgba(240,236,227,.07);
          background: linear-gradient(145deg, rgba(240,236,227,.018), rgba(240,236,227,.007));
          transition: background .25s ease, border-color .25s ease;
        }

        .service-card:hover { border-color: rgba(125,211,252,.17); background: rgba(125,211,252,.026); }

        .service-glow {
          position: absolute;
          top: -80px;
          right: -80px;
          width: 210px;
          height: 210px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(125,211,252,.085), transparent 68%);
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }

        .service-card:hover .service-glow { opacity: 1; }

        .service-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
        }

        .service-number {
          color: ${ACCENT};
          font-family: "Syne", sans-serif;
          font-size: .78rem;
          font-weight: 800;
        }

        .service-category {
          padding: .22rem .52rem;
          border: 1px solid rgba(240,236,227,.1);
          color: rgba(240,236,227,.34);
          font-size: .58rem;
          letter-spacing: .11em;
          text-transform: uppercase;
        }

        .service-body {
          position: relative;
          z-index: 1;
          margin-top: 4.2rem;
        }

        .service-body h3 {
          margin: 0;
          font-family: "Syne", sans-serif;
          font-size: clamp(1.1rem, 1.8vw, 1.38rem);
          font-weight: 700;
          letter-spacing: -.028em;
        }

        .service-body p {
          max-width: 390px;
          margin: .85rem 0 0;
          color: rgba(240,236,227,.38);
          font-size: .8rem;
          line-height: 1.65;
        }

        .service-line {
          position: absolute;
          left: 2rem;
          bottom: 1.65rem;
          width: 25px;
          height: 1px;
          background: ${ACCENT};
          transition: width .25s ease;
        }

        .service-card:hover .service-line { width: 58px; }

        .tools { margin-top: 3.6rem; }
        .tools-label { margin-bottom: 1rem; color: rgba(240,236,227,.24); font-size: .6rem; letter-spacing: .14em; text-transform: uppercase; }
        .tools-list { display: flex; flex-wrap: wrap; gap: .55rem; }
        .tool-chip {
          padding: .48rem .82rem;
          border: 1px solid rgba(240,236,227,.1);
          color: rgba(240,236,227,.39);
          font-size: .68rem;
          letter-spacing: .04em;
          transition: color .2s ease, border-color .2s ease, background .2s ease;
        }
        .tool-chip:hover { border-color: rgba(125,211,252,.24); color: ${ACCENT}; background: rgba(125,211,252,.025); }

        .about {
          border-top: 1px solid rgba(240,236,227,.06);
        }

        .about-intro {
          display: grid;
          grid-template-columns: 1.15fr .85fr;
          align-items: end;
          gap: 5rem;
          margin-top: 2.2rem;
        }

        .about-title {
          margin: 0;
          font-family: "Syne", sans-serif;
          font-size: clamp(3rem, 6.5vw, 6.6rem);
          line-height: .9;
          font-weight: 800;
          letter-spacing: -.07em;
        }

        .about-title span { color: ${ACCENT}; }
        .about-copy p { margin: 0; color: rgba(240,236,227,.55); font-size: .94rem; line-height: 1.8; }
        .about-copy p + p { margin-top: 1.15rem; color: rgba(240,236,227,.39); font-size: .86rem; }

        .about-link {
          display: inline-flex;
          align-items: center;
          gap: .45rem;
          margin-top: 1.7rem;
          padding-bottom: .38rem;
          border-bottom: 1px solid rgba(125,211,252,.23);
          color: rgba(240,236,227,.55);
          text-decoration: none;
          font-size: .65rem;
          letter-spacing: .12em;
          text-transform: uppercase;
          transition: color .2s ease, border-color .2s ease;
        }
        .about-link:hover { color: ${ACCENT}; border-color: rgba(125,211,252,.4); }

        .process {
          display: grid;
          grid-template-columns: repeat(3, minmax(0,1fr));
          gap: 1px;
          margin-top: 5.8rem;
          border: 1px solid rgba(240,236,227,.07);
          background: rgba(240,236,227,.07);
        }

        .process-card {
          min-height: 230px;
          padding: 2rem;
          background: rgba(240,236,227,.012);
          transition: transform .25s ease, background .25s ease;
        }
        .process-card:hover { transform: translateY(-3px); background: rgba(125,211,252,.018); }
        .process-number { color: ${ACCENT}; font-size: .6rem; letter-spacing: .1em; }
        .process-card h3 { margin: 3.7rem 0 .75rem; font-family: "Syne", sans-serif; font-size: 1.18rem; font-weight: 800; letter-spacing: -.025em; }
        .process-card p { max-width: 330px; margin: 0; color: rgba(240,236,227,.37); font-size: .79rem; line-height: 1.68; }

        .about-footer {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 1rem;
          margin-top: 2.3rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(240,236,227,.06);
          color: rgba(240,236,227,.2);
          font-size: .59rem;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .projects-head {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 2rem;
        }
        .projects-count { color: rgba(240,236,227,.22); font-size: .6rem; letter-spacing: .11em; text-transform: uppercase; white-space: nowrap; }
        .project-list { margin-top: 3.5rem; }

        .project-row {
          display: grid;
          grid-template-columns: 54px 190px minmax(0,1fr) 36px;
          align-items: center;
          gap: 1.45rem;
          min-height: 154px;
          padding: 1rem 0;
          border-bottom: 1px solid rgba(240,236,227,.07);
          color: inherit;
          text-decoration: none;
          transition: background .2s ease, padding .25s ease;
        }
        .project-row:hover { padding-left: .65rem; padding-right: .65rem; background: rgba(125,211,252,.015); }
        .project-number { color: rgba(240,236,227,.22); font-family: "Syne", sans-serif; font-size: .73rem; font-weight: 700; }
        .project-row:hover .project-number { color: ${ACCENT}; }

        .project-media {
          position: relative;
          width: 190px;
          height: 120px;
          overflow: hidden;
          border: 1px solid rgba(240,236,227,.08);
          background: #0A0A0D;
        }

        .project-image {
          object-fit: cover;
          opacity: .68;
          filter: saturate(.92);
          transition: transform .55s cubic-bezier(.22,1,.36,1), opacity .35s ease;
        }
        .project-row:hover .project-image { transform: scale(1.055); opacity: 1; }
        .project-media-shine {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent 42%, rgba(125,211,252,.11));
          opacity: 0;
          transition: opacity .3s ease;
          pointer-events: none;
        }
        .project-row:hover .project-media-shine { opacity: 1; }

        .project-copy { min-width: 0; }
        .project-title-row { display: flex; align-items: center; gap: .55rem; }
        .project-title-row h3 { margin: 0; font-family: "Syne", sans-serif; font-size: clamp(1.2rem, 2vw, 1.5rem); font-weight: 800; letter-spacing: -.035em; transition: transform .2s ease; }
        .project-row:hover .project-title-row h3 { transform: translateX(6px); }
        .project-dot { width: 5px; height: 5px; border-radius: 50%; opacity: 0; transition: opacity .2s ease; }
        .project-row:hover .project-dot { opacity: 1; }
        .project-copy p { max-width: 760px; margin: .55rem 0 0; color: rgba(240,236,227,.44); font-size: .83rem; line-height: 1.6; }
        .project-tags { display: flex; flex-wrap: wrap; gap: .42rem; margin-top: .72rem; }
        .project-tags span { padding: .24rem .58rem; border: 1px solid rgba(240,236,227,.1); color: rgba(240,236,227,.36); font-size: .56rem; letter-spacing: .08em; text-transform: uppercase; }
        .project-arrow { display: inline-flex; justify-content: flex-end; opacity: .28; transition: transform .2s ease, opacity .2s ease; }
        .project-row:hover .project-arrow { transform: translate(2px,-2px); opacity: 1; }
        .projects-note { margin-top: 1.1rem; color: rgba(240,236,227,.2); font-size: .59rem; letter-spacing: .1em; text-transform: uppercase; }

        .statement {
          padding-top: 6rem;
          padding-bottom: 9rem;
        }
        .statement-text { max-width: 1120px; margin: 1.35rem 0 0; font-family: "Syne", sans-serif; font-size: clamp(3rem, 7vw, 7.5rem); line-height: .91; font-weight: 800; letter-spacing: -.07em; }
        .statement-text span { color: ${ACCENT}; }

        .contact {
          overflow: hidden;
          border-top: 1px solid rgba(240,236,227,.06);
        }
        .contact-glow { position: absolute; left: 58%; top: 48%; width: 560px; height: 560px; border-radius: 50%; transform: translate(-50%,-50%); filter: blur(120px); background: radial-gradient(circle, rgba(125,211,252,.09), transparent 70%); pointer-events: none; }
        .contact-grid { position: relative; z-index: 3; display: grid; grid-template-columns: minmax(0,1fr) minmax(320px,.75fr); align-items: end; gap: 5rem; margin-top: 1.5rem; }
        .contact-heading { margin: 0; font-family: "Syne", sans-serif; font-size: clamp(3.45rem, 8.5vw, 8.4rem); line-height: .86; font-weight: 800; letter-spacing: -.073em; }
        .contact-heading span { color: ${ACCENT}; }
        .contact-copy { max-width: 500px; margin: 0; color: rgba(240,236,227,.45); font-size: .94rem; line-height: 1.75; }
        .contact-email { display: inline-flex; max-width: 100%; margin-top: 1.8rem; padding-bottom: .45rem; border-bottom: 1px solid rgba(125,211,252,.3); color: ${TEXT}; text-decoration: none; font-family: "Syne", sans-serif; font-size: clamp(1.1rem,2.2vw,1.9rem); font-weight: 700; letter-spacing: -.04em; word-break: break-word; }
        .contact-actions { display: flex; flex-wrap: wrap; gap: .7rem; margin-top: 1rem; }
        .contact-link { display: inline-flex; align-items: center; gap: .58rem; padding: .78rem 1rem; border: 1px solid rgba(240,236,227,.13); background: rgba(240,236,227,.02); color: ${TEXT}; text-decoration: none; font-size: .72rem; transition: border-color .2s ease, background .2s ease, color .2s ease; }
        .contact-link:hover { border-color: rgba(125,211,252,.38); background: rgba(125,211,252,.025); color: ${ACCENT}; }
        .copy-button { display: inline-flex; align-items: center; gap: .5rem; margin-top: 1rem; padding: 0; border: 0; background: transparent; color: rgba(240,236,227,.28); cursor: pointer; font-size: .62rem; letter-spacing: .08em; text-transform: uppercase; }
        .copy-button:hover { color: ${ACCENT}; }
        .contact-footer { position: relative; z-index: 3; display: flex; flex-wrap: wrap; justify-content: space-between; gap: 1rem; margin-top: 7rem; padding-top: 1.5rem; border-top: 1px solid rgba(240,236,227,.06); color: rgba(240,236,227,.19); font-size: .62rem; letter-spacing: .05em; }

        @media (max-width: 1100px) {
          .nav { padding-inline: 2rem; }
          .hero-inner, .section { padding-left: 2rem; padding-right: 2rem; }
          .services-grid { grid-template-columns: repeat(2,minmax(0,1fr)); }
          .about-intro { gap: 3rem; }
          .project-row { grid-template-columns: 44px 180px minmax(0,1fr) 30px; }
          .project-media { width: 180px; }
        }

        @media (max-width: 800px) {
          .mallord-cursor { display: none; }
          .nav { min-height: 68px; padding-inline: 1.15rem; }
          .nav-links, .nav-status { display: none; }
          .mobile-menu-button { display: inline-flex; }
          .mobile-menu { inset: 68px 0 0 0; display: flex; }
          .hero-inner, .section { padding-left: 1.15rem; padding-right: 1.15rem; }
          .hero-inner { padding-top: 7.5rem; padding-bottom: 4rem; }
          .hero-title { font-size: clamp(3.45rem,15vw,6.2rem); }
          .hero-description { max-width: 520px; font-size: .9rem; }
          .hero-actions { width: 100%; }
          .hero-button { flex: 1 1 0; min-width: 0; }
          .hero-meta { gap: 1.8rem; margin-top: 2.8rem; }
          .hero-scroll { display: none; }
          .marquee-item { padding-inline: 1.25rem; }
          .section { padding-top: 6.5rem; padding-bottom: 6.5rem; }
          .section-title { font-size: clamp(2.15rem,10vw,4rem); }
          .services-grid { grid-template-columns: 1fr; margin-top: 2.6rem; }
          .service-card { min-height: 225px; }
          .service-body { margin-top: 3.2rem; }
          .about-intro { grid-template-columns: 1fr; gap: 2.5rem; }
          .about-title { font-size: clamp(3rem,13vw,5.6rem); }
          .process { grid-template-columns: 1fr; margin-top: 4rem; }
          .process-card { min-height: 190px; }
          .process-card h3 { margin-top: 2.6rem; }
          .projects-head { align-items: flex-start; }
          .projects-count { display: none; }
          .project-list { margin-top: 2.6rem; }
          .project-row { grid-template-columns: 36px minmax(0,1fr); align-items: start; gap: .75rem; padding: 1rem 0 1.35rem; }
          .project-media { grid-column: 2; grid-row: 1; width: 100%; height: 205px; }
          .project-copy { grid-column: 2; grid-row: 2; }
          .project-arrow { display: none; }
          .project-title-row h3 { font-size: 1.35rem; }
          .project-copy p { font-size: .8rem; }
          .statement { padding-top: 3rem; padding-bottom: 6.5rem; }
          .statement-text { font-size: clamp(2.8rem,12.5vw,5.8rem); }
          .contact-grid { grid-template-columns: 1fr; gap: 3.5rem; }
          .contact-heading { font-size: clamp(3.3rem,15vw,6.2rem); }
          .contact-footer { margin-top: 5rem; }
        }

        @media (max-width: 520px) {
          .hero-actions { flex-direction: column; }
          .hero-button { width: 100%; min-height: 52px; }
          .hero-meta { justify-content: space-between; gap: 1.1rem; }
          .hero-meta-item strong { font-size: 1.4rem; }
          .hero-meta-item span { font-size: .57rem; }
          .contact-actions { flex-direction: column; align-items: stretch; }
          .contact-link { justify-content: center; }
          .contact-email { font-size: 1.18rem; }
          .about-footer, .contact-footer { flex-direction: column; }
          .mobile-menu-link { min-height: 62px; font-size: 1.48rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: .01ms !important; animation-iteration-count: 1 !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <motion.div
        className="mallord-cursor"
        style={{ x: cursorSpringX, y: cursorSpringY }}
      />

      <div className="mallord-noise" />

      <ScrollProgress progress={scrollYProgress} />

      <motion.header
        className="nav"
        initial={{ opacity: 0, y: -28 }}
        animate={loaded ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.55 }}
      >
        <a className="nav-logo" href="#home">
          MALLORD
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          {navItems.map(([label, id]) => (
            <a key={label} className="nav-link" href={`#${id}`}>
              {label}
            </a>
          ))}
        </nav>

        <div className="nav-status">
          <span className="nav-dot" />
          Available for work
        </div>

        <button
          className="mobile-menu-button"
          type="button"
          aria-label={menuOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? <IconClose /> : <IconMenu />}
        </button>
      </motion.header>

      {menuOpen && (
        <motion.nav
          id="mobile-navigation"
          className="mobile-menu"
          aria-label="Mobile navigation"
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {navItems.map(([label, id], index) => (
            <a
              key={label}
              className="mobile-menu-link"
              href={`#${id}`}
              onClick={(event) => {
                event.preventDefault();
                navigateMobile(id);
              }}
            >
              {label}
              <small>0{index + 1}</small>
            </a>
          ))}

          <div className="mobile-menu-meta">
            <span>TBILISI / GEORGIA</span>
            <span>REMOTE / FREELANCE</span>
          </div>
        </motion.nav>
      )}

      <motion.section
        id="home"
        className="hero"
        style={{ y: heroY, opacity: heroOpacity }}
      >
        <div className="hero-grid" />

        <motion.div
          className="hero-orb"
          animate={
            reduced
              ? undefined
              : {
                  scale: [1, 1.08, 1],
                  x: [0, -18, 0],
                  y: [0, 10, 0],
                }
          }
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />

        <div className="hero-inner">
          <motion.div
            className="hero-eyebrow"
            initial={{ opacity: 0, y: 18 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 0.22, duration: 0.55 }}
          >
            <span className="hero-eyebrow-dot">●</span>
            Independent creative studio
          </motion.div>

          <div className="hero-title-wrap">
            {["MALLORD", "CREATIVE", "STUDIO"].map((line, index) => (
              <motion.h1
                key={line}
                className={`hero-title${index === 2 ? " outline" : ""}`}
                initial={{ y: "105%" }}
                animate={loaded ? { y: 0 } : undefined}
                transition={{
                  delay: 0.32 + index * 0.11,
                  duration: 0.78,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {line}
              </motion.h1>
            ))}
          </div>

          <motion.div
            className="hero-kicker"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : undefined}
            transition={{ delay: 0.92 }}
          >
            CREATIVE / DIGITAL / AI
          </motion.div>

          <motion.p
            className="hero-description"
            initial={{ opacity: 0, y: 18 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1, duration: 0.55 }}
          >
            Creating bold digital experiences through AI-assisted visuals,
            design, short-form content and modern web.
          </motion.p>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 18 }}
            animate={loaded ? { opacity: 1, y: 0 } : undefined}
            transition={{ delay: 1.1, duration: 0.5 }}
          >
            <button
              type="button"
              className="hero-button primary"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
            </button>
            <button
              type="button"
              className="hero-button"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Start a Project
            </button>
          </motion.div>

          <motion.div
            className="hero-meta"
            initial={{ opacity: 0 }}
            animate={loaded ? { opacity: 1 } : undefined}
            transition={{ delay: 1.32 }}
          >
            {[
              ["01", "Web"],
              ["02", "AI Content"],
              ["03", "Short-form"],
            ].map(([number, label]) => (
              <div className="hero-meta-item" key={label}>
                <strong>{number}</strong>
                <span>{label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero-scroll"
          initial={{ opacity: 0 }}
          animate={loaded ? { opacity: 1 } : undefined}
          transition={{ delay: 1.6 }}
        >
          <IconArrowDown />
          Scroll to explore
        </motion.div>
      </motion.section>

      <div className="marquee">
        <div className="marquee-track">
          {[0, 1].map((group) => (
            <div className="marquee-group" key={group}>
              {[
                "AI CONTENT",
                "SHORT-FORM",
                "WEB DESIGN",
                "CREATIVE DIRECTION",
                "DIGITAL EXPERIENCES",
                "VISUAL SYSTEMS",
              ].map((item) => (
                <span className="marquee-item" key={`${group}-${item}`}>
                  {item}
                  <b>◆</b>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <section id="skills" className="section">
        <SectionLabel>02 / What I Do</SectionLabel>
        <SectionTitle>Creative Services</SectionTitle>
        <p className="section-intro">
          A flexible mix of creative direction, content, AI-assisted visuals
          and modern front-end work for digital projects.
        </p>

        <div className="services-grid">
          {services.map((service, index) => (
            <ServiceCard key={service.name} service={service} index={index} />
          ))}
        </div>

        <motion.div
          className="tools"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="tools-label">Selected tools</div>
          <div className="tools-list">
            {tools.map((tool) => (
              <span className="tool-chip" key={tool}>
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="about" className="section about">
        <SectionLabel>03 / About</SectionLabel>

        <div className="about-intro">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="about-title">
              IDEAS
              <br />
              INTO
              <br />
              <span>SOMETHING REAL.</span>
            </h2>
          </motion.div>

          <motion.div
            className="about-copy"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <p>
              MALLORD is an independent creative practice focused on
              AI-assisted visuals, short-form content, web experiences and
              creative direction.
            </p>
            <p>
              I like taking rough ideas and turning them into clear visual
              systems — from references and direction to the final digital
              piece.
            </p>
            <a className="about-link" href="#contact">
              Start a conversation
              <IconArrowUpRight size={14} />
            </a>
          </motion.div>
        </div>

        <div className="process">
          {process.map((step, index) => (
            <motion.article
              className="process-card"
              key={step.no}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
            >
              <div className="process-number">{step.no}</div>
              <h3>{step.title}</h3>
              <p>{step.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="about-footer">
          <span>Independent / Remote / Freelance</span>
          <span>Creative + Digital + AI</span>
        </div>
      </section>

      <section id="projects" className="section">
        <div className="projects-head">
          <div>
            <SectionLabel>04 / Work</SectionLabel>
            <SectionTitle>Selected Projects</SectionTitle>
          </div>
          <span className="projects-count">04 selected works</span>
        </div>

        <div className="project-list">
          {projects.map((project, index) => (
            <ProjectRow key={project.slug} project={project} index={index} />
          ))}
        </div>

        <div className="projects-note">
          Click any project to explore the case study
        </div>
      </section>

      <section className="section statement">
        <SectionLabel>05 / Philosophy</SectionLabel>
        <motion.h2
          className="statement-text"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          GOOD DIGITAL
          <br />
          WORK SHOULD
          <br />
          <span>FEEL DIFFERENT.</span>
        </motion.h2>
      </section>

      <section id="contact" className="section contact">
        <div className="contact-glow" />
        <SectionLabel>06 / Contact</SectionLabel>

        <div className="contact-grid">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="contact-heading">
              LET&apos;S
              <br />
              MAKE
              <br />
              <span>SOMETHING.</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08 }}
          >
            <p className="contact-copy">
              Have a project, idea or visual direction in mind? Send me a
              message and let&apos;s build something worth remembering.
            </p>

            <a className="contact-email" href="mailto:stuffmallord@gmail.com">
              stuffmallord@gmail.com
            </a>

            <div className="contact-actions">
              <ContactLink
                icon={<IconMail size={18} />}
                label="Email"
                href="mailto:stuffmallord@gmail.com"
              />
              <ContactLink
                icon={<IconTelegram size={18} />}
                label="Telegram"
                href="https://t.me/shaahdm"
              />
            </div>

            <button className="copy-button" type="button" onClick={copyEmail}>
              {copied ? "Email copied" : "Copy email"}
            </button>
          </motion.div>
        </div>

        <div className="contact-footer">
          <span>© 2026 MALLORD</span>
          <span>TBILISI / GEORGIA</span>
          <span>CREATIVE / DIGITAL / AI</span>
        </div>
      </section>
    </main>
  );
}
