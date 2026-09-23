"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import {
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

// ─────────────────────────────────────────────────────────────────────────────
// Theme
// ─────────────────────────────────────────────────────────────────────────────

const ACCENT = "#7DD3FC";
const ACCENT_BRIGHT = "#38BDF8";
const BG = "#060608";
const TEXT = "#F0ECE3";

// ─────────────────────────────────────────────────────────────────────────────
// Icons
// ─────────────────────────────────────────────────────────────────────────────

const IconArrow: FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

const IconMail: FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

const IconTelegram: FC = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M21.5 3.7 18.3 20c-.2.9-.8 1.1-1.5.7l-4.4-3.2-2.1 2c-.2.2-.4.4-.8.4l.3-4.5L18 8.1c.3-.3-.1-.5-.5-.2L7.6 14.1l-4.3-1.4-0.9-.3c-.9-.3-.9-.9.2-1.3L20.2 3c.8-.3 1.5.2 1.3.7Z" />
  </svg>
);

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

interface BtnProps {
  children: ReactNode;
  primary?: boolean;
  onClick?: () => void;
}

interface SectionLabelProps {
  children: ReactNode;
}

interface SkillItem {
  name: string;
  level: number;
  icon: string;
  cat: string;
}

interface ProjectItem {
  num: string;
  title: string;
  desc: string;
  tags: string[];
  accent: string;
  image: string;
  slug: string;
}

interface SkillCardProps {
  skill: SkillItem;
  index: number;
}

interface ProjectRowProps {
  project: ProjectItem;
  index: number;
}

interface ContactLinkProps {
  icon: ReactNode;
  label: string;
  href: string;
}

interface ScrollProgressProps {
  scrollYProgress: MotionValue<number>;
}

// ─────────────────────────────────────────────────────────────────────────────
// Text scramble
// ─────────────────────────────────────────────────────────────────────────────

function useScramble(
  text: string,
  trigger: boolean
): string {
  const [display, setDisplay] =
    useState<string>(text);

  const chars =
    "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (!trigger) {
      setDisplay(text);
      return;
    }

    let frame = 0;
    const totalFrames = 18;

    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") {
              return " ";
            }

            if (
              frame / totalFrames >
              i / text.length
            ) {
              return char;
            }

            return chars[
              Math.floor(
                Math.random() *
                  chars.length
              )
            ];
          })
          .join("")
      );

      frame += 1;

      if (frame > totalFrames) {
        clearInterval(interval);
        setDisplay(text);
      }
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, [trigger, text]);

  return display;
}

// ─────────────────────────────────────────────────────────────────────────────
// Magnetic button
// ─────────────────────────────────────────────────────────────────────────────

function MagneticBtn({
  children,
  primary,
  onClick,
}: BtnProps) {
  const ref =
    useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, {
    stiffness: 220,
    damping: 16,
  });

  const sy = useSpring(y, {
    stiffness: 220,
    damping: 16,
  });

  const [hovered, setHovered] =
    useState(false);

  const handleMove = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!ref.current) {
      return;
    }

    const rect =
      ref.current.getBoundingClientRect();

    x.set(
      (e.clientX -
        rect.left -
        rect.width / 2) *
        0.22
    );

    y.set(
      (e.clientY -
        rect.top -
        rect.height / 2) *
        0.22
    );
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHovered(false);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{
        x: sx,
        y: sy,
        padding:
          "0.95rem 2.15rem",
        background: primary
          ? hovered
            ? ACCENT_BRIGHT
            : ACCENT
          : "transparent",
        color: primary
          ? BG
          : hovered
          ? ACCENT
          : TEXT,
        border: primary
          ? "none"
          : "1px solid rgba(240,236,227,0.18)",
        fontFamily:
          "'DM Sans', sans-serif",
        fontWeight: 600,
        fontSize: "0.82rem",
        letterSpacing: "0.08em",
        textTransform:
          "uppercase",
        cursor: "pointer",
        transition:
          "background .2s ease, color .2s ease, border-color .2s ease",
      }}
      onMouseMove={handleMove}
      onMouseEnter={() =>
        setHovered(true)
      }
      onMouseLeave={handleLeave}
      whileTap={{
        scale: 0.97,
      }}
    >
      {children}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section label
// ─────────────────────────────────────────────────────────────────────────────

function SectionLabel({
  children,
}: SectionLabelProps) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -18,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{
        once: true,
      }}
      style={{
        fontSize: "0.68rem",
        letterSpacing: "0.22em",
        textTransform:
          "uppercase",
        color: ACCENT,
        fontFamily:
          "'DM Sans', sans-serif",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
      }}
    >
      <span
        style={{
          width: 30,
          height: 1,
          background: ACCENT,
          display:
            "inline-block",
        }}
      />
      {children}
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Section title
// ─────────────────────────────────────────────────────────────────────────────

function SectionTitle({
  children,
}: SectionLabelProps) {
  return (
    <motion.h2
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: 0.1,
      }}
      style={{
        fontFamily:
          "'Syne', sans-serif",
        fontWeight: 800,
        fontSize:
          "clamp(2.2rem, 5vw, 4rem)",
        letterSpacing:
          "-0.04em",
        lineHeight: 1,
        marginTop: "0.8rem",
      }}
    >
      {children}
    </motion.h2>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Skill card
// ─────────────────────────────────────────────────────────────────────────────

function SkillCard({
  skill,
  index,
}: SkillCardProps) {
  const [hovered, setHovered] =
    useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 25,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
      }}
      onHoverStart={() =>
        setHovered(true)
      }
      onHoverEnd={() =>
        setHovered(false)
      }
      style={{
        padding: "2rem",
        minHeight: 190,
        background: hovered
          ? "rgba(125,211,252,0.045)"
          : "rgba(240,236,227,0.018)",
        border:
          "1px solid rgba(240,236,227,0.07)",
        position:
          "relative",
        overflow:
          "hidden",
        transition:
          "background .3s ease, border-color .3s ease",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "flex-start",
        }}
      >
        <span
          style={{
            fontSize: "1.8rem",
          }}
        >
          {skill.icon}
        </span>

        <span
          style={{
            fontSize: "0.62rem",
            fontFamily:
              "'DM Sans', sans-serif",
            color:
              "rgba(240,236,227,0.34)",
            letterSpacing:
              "0.12em",
            textTransform:
              "uppercase",
            border:
              "1px solid rgba(240,236,227,0.1)",
            padding:
              "0.22rem 0.55rem",
          }}
        >
          {skill.cat}
        </span>
      </div>

      <div
        style={{
          marginTop: "2rem",
          fontFamily:
            "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "1.05rem",
        }}
      >
        {skill.name}
      </div>

      <div
        style={{
          marginTop: "1rem",
          height: 2,
          background:
            "rgba(240,236,227,0.08)",
        }}
      >
        <motion.div
          initial={{
            width: 0,
          }}
          whileInView={{
            width: `${skill.level}%`,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay:
              0.25 +
              index * 0.08,
            duration: 1,
            ease: "easeOut",
          }}
          style={{
            height: "100%",
            background: ACCENT,
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent:
            "flex-end",
          marginTop: "0.45rem",
        }}
      >
        <span
          style={{
            color: ACCENT,
            fontFamily:
              "'DM Sans', sans-serif",
            fontSize:
              "0.72rem",
          }}
        >
          {skill.level}%
        </span>
      </div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project row
// ─────────────────────────────────────────────────────────────────────────────

function ProjectRow({
  project,
  index,
}: ProjectRowProps) {
  const [hovered, setHovered] =
    useState(false);

  return (
    <motion.a
      href={`/projects/${project.slug}`}
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
      }}
      transition={{
        delay: index * 0.08,
        duration: 0.55,
      }}
      onHoverStart={() =>
        setHovered(true)
      }
      onHoverEnd={() =>
        setHovered(false)
      }
      className="project-row"
      style={{
        display: "grid",
        gridTemplateColumns:
          "70px 190px minmax(0, 1fr) 30px",
        alignItems: "center",
        gap: "1.5rem",
        padding:
          "1.25rem 0",
        borderBottom:
          "1px solid rgba(240,236,227,0.07)",
        background: hovered
          ? "rgba(240,236,227,0.018)"
          : "transparent",
        transition:
          "background .2s ease",
        textDecoration:
          "none",
        color:
          "inherit",
        cursor:
          "pointer",
      }}
    >
      <span
        style={{
          fontFamily:
            "'Syne', sans-serif",
          fontSize: "0.76rem",
          color:
            "rgba(240,236,227,0.22)",
          fontWeight: 700,
        }}
      >
        {project.num}
      </span>

      <div
        className="project-image"
        style={{
          width: "190px",
          height: "120px",
          overflow: "hidden",
          border:
            "1px solid rgba(240,236,227,0.08)",
          background: "#0A0A0D",
        }}
      >
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            opacity:
              hovered ? 1 : 0.72,
            transform:
              hovered
                ? "scale(1.05)"
                : "scale(1)",
            transition:
              "opacity .35s ease, transform .45s ease",
          }}
        />
      </div>

      <div
        style={{
          minWidth: 0,
        }}
      >
        <motion.h3
          animate={{
            x: hovered ? 6 : 0,
          }}
          transition={{
            duration: 0.18,
          }}
          style={{
            fontFamily:
              "'Syne', sans-serif",
            fontWeight: 800,
            fontSize:
              "clamp(1.2rem, 2vw, 1.5rem)",
            letterSpacing:
              "-0.025em",
            marginBottom:
              "0.5rem",
          }}
        >
          {project.title}
        </motion.h3>

        <p
          style={{
            maxWidth: 720,
            color:
              "rgba(240,236,227,0.47)",
            fontFamily:
              "'DM Sans', sans-serif",
            fontSize: "0.88rem",
            lineHeight: 1.55,
          }}
        >
          {project.desc}
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.45rem",
            flexWrap: "wrap",
            marginTop:
              "0.8rem",
          }}
        >
          {project.tags.map(
            (tag) => (
              <span
                key={
                  tag
                }
                style={{
                  fontSize:
                    "0.61rem",
                  letterSpacing:
                    "0.09em",
                  textTransform:
                    "uppercase",
                  padding:
                    "0.25rem 0.65rem",
                  border:
                    `1px solid ${project.accent}45`,
                  color:
                    project.accent,
                  fontFamily:
                    "'DM Sans', sans-serif",
                }}
              >
                {tag}
              </span>
            )
          )}
        </div>
      </div>

      <motion.span
        className="project-arrow"
        animate={{
          x: hovered ? 0 : 6,
          opacity: hovered
            ? 1
            : 0.25,
        }}
        transition={{
          duration: 0.18,
        }}
        style={{
          color:
            project.accent,
          fontSize:
            "1.5rem",
        }}
      >
        →
      </motion.span>
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact link
// ─────────────────────────────────────────────────────────────────────────────

function ContactLink({
  icon,
  label,
  href,
}: ContactLinkProps) {
  const [hovered, setHovered] =
    useState(false);

  return (
    <motion.a
      href={href}
      whileHover={{
        y: -3,
      }}
      onHoverStart={() =>
        setHovered(true)
      }
      onHoverEnd={() =>
        setHovered(false)
      }
      style={{
        display:
          "inline-flex",
        alignItems:
          "center",
        gap: "0.65rem",
        padding:
          "0.9rem 1.5rem",
        border:
          `1px solid ${
            hovered
              ? "rgba(125,211,252,.45)"
              : "rgba(240,236,227,.14)"
          }`,
        color: TEXT,
        textDecoration:
          "none",
        fontSize: "0.8rem",
        fontFamily:
          "'DM Sans', sans-serif",
        background:
          "rgba(240,236,227,0.025)",
        transition:
          "border-color .2s ease",
      }}
    >
      {icon}
      {label}
    </motion.a>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Scroll progress
// ─────────────────────────────────────────────────────────────────────────────

function ScrollProgress({
  scrollYProgress,
}: ScrollProgressProps) {
  return (
    <motion.div
      style={{
        position: "fixed",
        inset:
          "0 0 auto 0",
        height: 2,
        background: ACCENT,
        scaleX:
          scrollYProgress,
        transformOrigin:
          "0%",
        zIndex: 200,
      }}
    />
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────────────────────────────────────

export default function Home() {
  const [isLoaded, setIsLoaded] =
    useState(false);

  const [cursorPos, setCursorPos] =
    useState({
      x: 0,
      y: 0,
    });

  const [heroHovered, setHeroHovered] =
    useState(false);

  const containerRef =
    useRef<HTMLDivElement>(null);

  const { scrollYProgress } =
    useScroll({
      target:
        containerRef,
    });

  const heroY =
    useTransform(
      scrollYProgress,
      [0, 0.35],
      [0, -100]
    );

  const heroOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.25],
      [1, 0]
    );

  const scrambled =
    useScramble(
      "CREATIVE / DIGITAL / AI",
      heroHovered
    );

  useEffect(() => {
    const timer =
      setTimeout(() => {
        setIsLoaded(true);
      }, 200);

    const handleMouseMove =
      (e: MouseEvent) => {
        setCursorPos({
          x: e.clientX,
          y: e.clientY,
        });
      };

    window.addEventListener(
      "mousemove",
      handleMouseMove
    );

    return () => {
      clearTimeout(timer);

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );
    };
  }, []);

  // ───────────────────────────────────────────────────────────────────────────
  // Services
  // ───────────────────────────────────────────────────────────────────────────

  const skills: SkillItem[] = [
    {
      name: "Short-form Content",
      level: 85,
      icon: "🎬",
      cat: "Content",
    },
    {
      name: "AI Visuals",
      level: 85,
      icon: "✦",
      cat: "AI",
    },
    {
      name: "Web Design",
      level: 80,
      icon: "◉",
      cat: "Web",
    },
    {
      name: "Video Editing",
      level: 80,
      icon: "▣",
      cat: "Content",
    },
    {
      name: "Creative Direction",
      level: 75,
      icon: "✳",
      cat: "Creative",
    },
    {
      name: "Next.js / React",
      level: 65,
      icon: "⌘",
      cat: "Development",
    },
  ];

  // ───────────────────────────────────────────────────────────────────────────
  // Projects
  // ───────────────────────────────────────────────────────────────────────────

  const projects: ProjectItem[] = [
    {
      num: "01",
      title: "AFTERIMAGE",
      desc:
        "A cinematic visual concept exploring motion, light and digital identity.",
      tags: [
        "Art Direction",
        "Motion",
        "Visual",
      ],
      accent: "#7DD3FC",
      image:
        "/projects/afterimage.jpg",
      slug:
        "afterimage",
    },
    {
      num: "02",
      title: "CONCRETE",
      desc:
        "An architectural visual study built around geometry, shadow and atmosphere.",
      tags: [
        "Architecture",
        "Visual",
        "Direction",
      ],
      accent: "#38BDF8",
      image:
        "/projects/concrete.jpg",
      slug:
        "concrete",
    },
    {
      num: "03",
      title: "DEEP BLUE",
      desc:
        "An experimental digital concept combining abstract forms, light and AI-driven aesthetics.",
      tags: [
        "AI",
        "Digital Art",
        "Concept",
      ],
      accent: "#A5F3FC",
      image:
        "/projects/deep-blue.jpg",
      slug:
        "deep-blue",
    },
    {
      num: "04",
      title: "GLASS OBJECT",
      desc:
        "A minimal product concept focused on material, transparency and futuristic visual language.",
      tags: [
        "3D",
        "Product",
        "Visual",
      ],
      accent: "#22D3EE",
      image:
        "/projects/glass-object.jpg",
      slug:
        "glass-object",
    },
  ];

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily:
          "'Syne', sans-serif",
        background: BG,
        color: TEXT,
        minHeight:
          "100vh",
        overflowX:
          "hidden",
        position:
          "relative",
      }}
    >
      {/* ── Global styles ── */}
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: ${BG};
        }

        ::selection {
          background: ${ACCENT};
          color: ${BG};
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: ${BG};
        }

        ::-webkit-scrollbar-thumb {
          background: ${ACCENT};
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }

        @media (max-width: 800px) {
          .desktop-nav-links {
            gap: 0.9rem !important;
          }

          .desktop-nav-links a {
            font-size: 0.61rem !important;
            letter-spacing: 0.07em !important;
          }

          .hero-content {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          .content-section {
            padding-left: 1.25rem !important;
            padding-right: 1.25rem !important;
          }

          .project-row {
            grid-template-columns: 42px minmax(0, 1fr) !important;
            gap: 0.9rem !important;
            padding: 1.1rem 0 !important;
          }

          .project-image {
            grid-column: 2 !important;
            grid-row: 1 !important;
            width: 100% !important;
            height: 190px !important;
            order: 1;
          }

          .project-row > div:nth-of-type(2) {
            grid-column: 2 !important;
            grid-row: 2 !important;
          }

          .project-arrow {
            display: none !important;
          }
        }

        @media (max-width: 520px) {
          .desktop-nav-links a:nth-child(2) {
            display: none !important;
          }

          .hero-title {
            font-size: clamp(3rem, 15vw, 5rem) !important;
          }

          .hero-buttons {
            width: 100%;
          }

          .hero-buttons button {
            width: 100%;
          }

          .services-grid {
            grid-template-columns: 1fr !important;
          }

          .contact-section {
            padding-top: 6rem !important;
          }
        }
      `}</style>

      {/* ── Cursor glow ── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 420,
          height: 420,
          borderRadius:
            "50%",
          pointerEvents:
            "none",
          zIndex: 0,
          background:
            `radial-gradient(circle, rgba(125,211,252,0.065) 0%, transparent 70%)`,
          translateX:
            cursorPos.x - 210,
          translateY:
            cursorPos.y - 210,
        }}
      />

      {/* ── Noise ── */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents:
            "none",
          opacity: 0.035,
          backgroundImage:
            `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize:
            "150px",
        }}
      />

      <ScrollProgress
        scrollYProgress={
          scrollYProgress
        }
      />

      {/* ── Navigation ── */}
      <motion.nav
        initial={{
          y: -50,
          opacity: 0,
        }}
        animate={
          isLoaded
            ? {
                y: 0,
                opacity: 1,
              }
            : {}
        }
        transition={{
          duration: 0.65,
          ease: "easeOut",
        }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          padding:
            "1.35rem 3rem",
          borderBottom:
            "1px solid rgba(240,236,227,0.06)",
          backdropFilter:
            "blur(20px)",
          background:
            "rgba(6,6,8,0.76)",
        }}
      >
        <motion.a
          href="#home"
          whileHover={{
            scale: 1.04,
          }}
          style={{
            fontFamily:
              "'Syne', sans-serif",
            fontSize:
              "1.25rem",
            fontWeight: 800,
            letterSpacing:
              "-0.03em",
            color: ACCENT,
            textDecoration:
              "none",
            flexShrink: 0,
          }}
        >
          MALLORD
        </motion.a>

        <div
          className="desktop-nav-links"
          style={{
            display: "flex",
            gap: "2.2rem",
            alignItems:
              "center",
          }}
        >
          {[
            ["Home", "home"],
            ["Services", "skills"],
            ["Projects", "projects"],
            ["Contact", "contact"],
          ].map(
            ([label, id]) => (
              <motion.a
                key={label}
                href={`#${id}`}
                whileHover={{
                  y: -1,
                  color: ACCENT,
                }}
                transition={{
                  duration: 0.15,
                }}
                style={{
                  color:
                    "rgba(240,236,227,0.56)",
                  textDecoration:
                    "none",
                  fontFamily:
                    "'DM Sans', sans-serif",
                  fontSize:
                    "0.74rem",
                  fontWeight: 500,
                  letterSpacing:
                    "0.12em",
                  textTransform:
                    "uppercase",
                }}
              >
                {label}
              </motion.a>
            )
          )}
        </div>
      </motion.nav>

      {/* ── Hero ── */}
      <section
        id="home"
        style={{
          minHeight:
            "100vh",
          display: "flex",
          alignItems:
            "center",
          position:
            "relative",
          overflow:
            "hidden",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            inset: 0,
            opacity: 0.45,
            backgroundImage:
              `linear-gradient(rgba(125,211,252,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.025) 1px, transparent 1px)`,
            backgroundSize:
              "70px 70px",
          }}
        />

        <motion.div
          style={{
            position:
              "absolute",
            right: "-8%",
            top: "8%",
            width: 620,
            height: 620,
            borderRadius:
              "50%",
            filter:
              "blur(110px)",
            background:
              "radial-gradient(circle, rgba(125,211,252,0.12) 0%, rgba(56,189,248,0.035) 45%, transparent 70%)",
          }}
          animate={{
            scale: [
              1,
              1.08,
              1,
            ],
          }}
          transition={{
            duration: 9,
            repeat:
              Infinity,
            ease:
              "easeInOut",
          }}
        />

        <motion.div
          className="hero-content"
          style={{
            position:
              "relative",
            zIndex: 2,
            width: "100%",
            padding:
              "7rem 3rem 4rem",
            y: heroY,
            opacity:
              heroOpacity,
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={
              isLoaded
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              delay: 0.35,
              duration: 0.65,
            }}
            style={{
              display:
                "inline-flex",
              alignItems:
                "center",
              gap:
                "0.5rem",
              padding:
                "0.38rem 0.85rem",
              border:
                "1px solid rgba(125,211,252,0.3)",
              color: ACCENT,
              fontFamily:
                "'DM Sans', sans-serif",
              fontSize:
                "0.67rem",
              letterSpacing:
                "0.14em",
              textTransform:
                "uppercase",
            }}
          >
            <motion.span
              animate={{
                opacity: [
                  1,
                  0.25,
                  1,
                ],
              }}
              transition={{
                duration: 1.5,
                repeat:
                  Infinity,
              }}
            >
              ●
            </motion.span>
            Available for freelance work
          </motion.div>

          <div
            style={{
              marginTop:
                "1.8rem",
              overflow:
                "hidden",
            }}
          >
            {[
              "MALLORD",
              "CREATIVE",
              "STUDIO",
            ].map(
              (line, i) => (
                <motion.div
                  key={line}
                  initial={{
                    y: "100%",
                  }}
                  animate={
                    isLoaded
                      ? {
                          y: 0,
                        }
                      : {}
                  }
                  transition={{
                    delay:
                      0.45 +
                      i *
                        0.12,
                    duration:
                      0.78,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  className="hero-title"
                  style={{
                    fontFamily:
                      "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize:
                      "clamp(3.2rem, 8.5vw, 8rem)",
                    lineHeight:
                      0.9,
                    letterSpacing:
                      "-0.05em",
                    color:
                      i === 2
                        ? "transparent"
                        : TEXT,
                    WebkitTextStroke:
                      i === 2
                        ? `1px ${ACCENT}`
                        : "none",
                  }}
                >
                  {line}
                </motion.div>
              )
            )}
          </div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={
              isLoaded
                ? {
                    opacity: 1,
                  }
                : {}
            }
            transition={{
              delay: 0.95,
            }}
            onHoverStart={() =>
              setHeroHovered(true)
            }
            onHoverEnd={() =>
              setHeroHovered(false)
            }
            style={{
              marginTop:
                "1.35rem",
              color:
                "rgba(240,236,227,0.3)",
              fontFamily:
                "'DM Sans', sans-serif",
              fontSize:
                "0.77rem",
              letterSpacing:
                "0.27em",
            }}
          >
            {scrambled}
          </motion.div>

          <motion.p
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={
              isLoaded
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              delay: 1.02,
              duration: 0.65,
            }}
            style={{
              maxWidth:
                560,
              marginTop:
                "1.3rem",
              color:
                "rgba(240,236,227,0.5)",
              fontFamily:
                "'DM Sans', sans-serif",
              fontSize:
                "1rem",
              fontWeight: 300,
              lineHeight:
                1.7,
            }}
          >
            Creating bold digital
            experiences through AI,
            design, short-form
            content and modern web.
          </motion.p>

          <motion.div
            initial={{
              opacity: 0,
              y: 18,
            }}
            animate={
              isLoaded
                ? {
                    opacity: 1,
                    y: 0,
                  }
                : {}
            }
            transition={{
              delay: 1.15,
              duration: 0.55,
            }}
            className="hero-buttons"
            style={{
              display: "flex",
              gap: "0.9rem",
              marginTop:
                "2.5rem",
              flexWrap:
                "wrap",
            }}
          >
            <MagneticBtn
              primary
              onClick={() =>
                document
                  .getElementById(
                    "projects"
                  )
                  ?.scrollIntoView({
                    behavior:
                      "smooth",
                  })
              }
            >
              View Projects
            </MagneticBtn>

            <MagneticBtn
              onClick={() =>
                document
                  .getElementById(
                    "contact"
                  )
                  ?.scrollIntoView({
                    behavior:
                      "smooth",
                  })
              }
            >
              Contact Me
            </MagneticBtn>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={
              isLoaded
                ? {
                    opacity: 1,
                  }
                : {}
            }
            transition={{
              delay: 1.4,
            }}
            style={{
              display:
                "flex",
              gap:
                "3.5rem",
              marginTop:
                "3.5rem",
              flexWrap:
                "wrap",
            }}
          >
            {[
              ["01", "Web"],
              ["02", "AI Content"],
              ["03", "Short-form"],
            ].map(
              ([num, label]) => (
                <div
                  key={
                    label
                  }
                >
                  <div
                    style={{
                      fontFamily:
                        "'Syne', sans-serif",
                      fontSize:
                        "1.65rem",
                      fontWeight:
                        800,
                      color:
                        ACCENT,
                    }}
                  >
                    {num}
                  </div>

                  <div
                    style={{
                      marginTop:
                        "0.15rem",
                      fontFamily:
                        "'DM Sans', sans-serif",
                      fontSize:
                        "0.67rem",
                      letterSpacing:
                        "0.1em",
                      textTransform:
                        "uppercase",
                      color:
                        "rgba(240,236,227,0.34)",
                    }}
                  >
                    {label}
                  </div>
                </div>
              )
            )}
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={
            isLoaded
              ? {
                  opacity: 1,
                }
              : {}
          }
          transition={{
            delay: 1.8,
          }}
          style={{
            position:
              "absolute",
            bottom:
              "1.8rem",
            left:
              "3rem",
            display:
              "flex",
            alignItems:
              "center",
            gap:
              "0.65rem",
            color:
              "rgba(240,236,227,0.25)",
            fontFamily:
              "'DM Sans', sans-serif",
            fontSize:
              "0.65rem",
            letterSpacing:
              "0.14em",
            textTransform:
              "uppercase",
          }}
        >
          <motion.div
            animate={{
              y: [
                0,
                5,
                0,
              ],
            }}
            transition={{
              duration: 1.5,
              repeat:
                Infinity,
            }}
          >
            <IconArrow />
          </motion.div>

          Scroll to explore
        </motion.div>
      </section>

      {/* ── Services ── */}
      <section
        id="skills"
        className="content-section"
        style={{
          minHeight:
            "100vh",
          padding:
            "8rem 3rem",
          position:
            "relative",
        }}
      >
        <SectionLabel>
          02 / What I Do
        </SectionLabel>

        <SectionTitle>
          Creative Services
        </SectionTitle>

        <div
          className="services-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap:
              "1px",
            marginTop:
              "3.5rem",
            maxWidth:
              1100,
            border:
              "1px solid rgba(240,236,227,0.07)",
          }}
        >
          {skills.map(
            (skill, i) => (
              <SkillCard
                key={
                  skill.name
                }
                skill={
                  skill
                }
                index={
                  i
                }
              />
            )
          )}
        </div>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          style={{
            display:
              "flex",
            gap:
              "0.65rem",
            flexWrap:
              "wrap",
            marginTop:
              "3rem",
          }}
        >
          {[
            "AI",
            "Figma",
            "CapCut",
            "Next.js",
            "React",
            "Framer Motion",
            "Vercel",
            "Photoshop",
          ].map(
            (tool) => (
              <span
                key={
                  tool
                }
                style={{
                  padding:
                    "0.48rem 0.95rem",
                  border:
                    "1px solid rgba(240,236,227,0.1)",
                  fontFamily:
                    "'DM Sans', sans-serif",
                  fontSize:
                    "0.7rem",
                  color:
                    "rgba(240,236,227,0.42)",
                  letterSpacing:
                    "0.05em",
                }}
              >
                {tool}
              </span>
            )
          )}
        </motion.div>
      </section>

      {/* ── Projects ── */}
      <section
        id="projects"
        className="content-section"
        style={{
          padding:
            "8rem 3rem",
          position:
            "relative",
        }}
      >
        <SectionLabel>
          03 / Work
        </SectionLabel>

        <SectionTitle>
          Selected Projects
        </SectionTitle>

        <div
          style={{
            marginTop:
              "3.5rem",
          }}
        >
          {projects.map(
            (project, i) => (
              <ProjectRow
                key={
                  project.slug
                }
                project={
                  project
                }
                index={
                  i
                }
              />
            )
          )}
        </div>
      </section>

      {/* ── Contact ── */}
      <section
        id="contact"
        className="content-section contact-section"
        style={{
          padding:
            "8rem 3rem 5rem",
          position:
            "relative",
          overflow:
            "hidden",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            left: "55%",
            top: "55%",
            transform:
              "translate(-50%, -50%)",
            width: 520,
            height: 520,
            borderRadius:
              "50%",
            filter:
              "blur(120px)",
            background:
              "radial-gradient(circle, rgba(125,211,252,0.11), transparent 70%)",
            pointerEvents:
              "none",
          }}
        />

        <SectionLabel>
          04 / Contact
        </SectionLabel>

        <motion.h2
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          style={{
            maxWidth:
              760,
            marginTop:
              "1rem",
            fontFamily:
              "'Syne', sans-serif",
            fontSize:
              "clamp(2.7rem, 6vw, 5.5rem)",
            fontWeight: 800,
            letterSpacing:
              "-0.05em",
            lineHeight:
              0.98,
          }}
        >
          Let&apos;s build
          something{" "}
          <span
            style={{
              color:
                ACCENT,
            }}
          >
            extraordinary
          </span>
        </motion.h2>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay:
              0.15,
          }}
          style={{
            maxWidth:
              520,
            marginTop:
              "1.4rem",
            color:
              "rgba(240,236,227,0.46)",
            fontFamily:
              "'DM Sans', sans-serif",
            fontSize:
              "1rem",
            lineHeight:
              1.7,
          }}
        >
          Have a project in
          mind? Send me a
          message and let&apos;s
          talk.
        </motion.p>

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          transition={{
            delay:
              0.25,
          }}
          style={{
            display:
              "flex",
            gap:
              "0.8rem",
            flexWrap:
              "wrap",
            marginTop:
              "2.5rem",
          }}
        >
          <ContactLink
            icon={
              <IconMail />
            }
            label="Email"
            href="mailto:stuffmallord@gmail.com"
          />

          <ContactLink
            icon={
              <IconTelegram />
            }
            label="Telegram"
            href="https://t.me/shaahdm"
          />
        </motion.div>

        <div
          style={{
            marginTop:
              "6rem",
            paddingTop:
              "1.8rem",
            borderTop:
              "1px solid rgba(240,236,227,0.06)",
            display:
              "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            flexWrap:
              "wrap",
            gap:
              "1rem",
            fontFamily:
              "'DM Sans', sans-serif",
            fontSize:
              "0.68rem",
            color:
              "rgba(240,236,227,0.2)",
            letterSpacing:
              "0.04em",
          }}
        >
          <span>
            © 2026 MALLORD
          </span>

          <span>
            Creative /
            Digital /
            AI
          </span>
        </div>
      </section>
    </div>
  );
}