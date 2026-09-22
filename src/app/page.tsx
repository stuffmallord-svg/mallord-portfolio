"use client";

import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  MotionValue,
} from "framer-motion";
import {
  useRef,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";

// ─── Icons ────────────────────────────────────────────────────────────────────

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
    strokeWidth="2"
  >
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// ─── Types ────────────────────────────────────────────────────────────────────

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
}

interface BtnProps {
  children: ReactNode;
  primary?: boolean;
  onClick?: () => void;
}

interface SectionLabelProps {
  children: ReactNode;
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

// ─── Text Scramble ─────────────────────────────────────────────────────────────

function useScramble(text: string, trigger: boolean): string {
  const [display, setDisplay] = useState<string>(text);

  const chars = "!<>-_\\/[]{}—=+*^?#ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  useEffect(() => {
    if (!trigger) return;

    let frame = 0;
    const totalFrames = 18;

    const interval = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";

            if (frame / totalFrames > i / text.length) {
              return char;
            }

            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      frame++;

      if (frame > totalFrames) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [trigger, text]);

  return display;
}

// ─── Magnetic Button ──────────────────────────────────────────────────────────

function MagneticBtn({
  children,
  primary,
  onClick,
}: BtnProps) {
  const ref = useRef<HTMLButtonElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const sx = useSpring(x, {
    stiffness: 200,
    damping: 15,
  });

  const sy = useSpring(y, {
    stiffness: 200,
    damping: 15,
  });

  const [hov, setHov] = useState(false);

  const handleMove = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    x.set(
      (e.clientX - rect.left - rect.width / 2) *
        0.3
    );

    y.set(
      (e.clientY - rect.top - rect.height / 2) *
        0.3
    );
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
    setHov(false);
  };

  return (
    <motion.button
      ref={ref}
      onClick={onClick}
      style={{
        x: sx,
        y: sy,
        padding: "0.9rem 2.2rem",
        background: primary
          ? hov
            ? "#38BDF8"
            : "#7DD3FC"
          : "transparent",
        color: primary
          ? "#060608"
          : hov
          ? "#7DD3FC"
          : "#f0ece3",
        border: primary
          ? "none"
          : "1px solid rgba(240,236,227,0.2)",
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "0.85rem",
        letterSpacing: "0.05em",
        cursor: "pointer",
        transition: "background 0.2s, color 0.2s",
      }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={handleLeave}
      whileTap={{ scale: 0.96 }}
    >
      {children}
    </motion.button>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({
  children,
}: SectionLabelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      viewport={{ once: true }}
      style={{
        fontSize: "0.7rem",
        letterSpacing: "0.2em",
        textTransform: "uppercase",
        color: "#7DD3FC",
        fontFamily: "'DM Sans', sans-serif",
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
          background: "#7DD3FC",
          display: "inline-block",
        }}
      />
      {children}
    </motion.div>
  );
}

// ─── Section Title ────────────────────────────────────────────────────────────

function SectionTitle({
  children,
}: SectionLabelProps) {
  return (
    <motion.h2
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{ delay: 0.1 }}
      style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 800,
        fontSize:
          "clamp(2rem, 5vw, 3.5rem)",
        letterSpacing: "-0.03em",
        lineHeight: 1.1,
        marginTop: "0.75rem",
      }}
    >
      {children}
    </motion.h2>
  );
}

// ─── Skill Card ───────────────────────────────────────────────────────────────

function SkillCard({
  skill,
  index,
}: SkillCardProps) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.08,
      }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        padding: "2rem",
        background: hov
          ? "rgba(125,211,252,0.05)"
          : "rgba(240,236,227,0.02)",
        border:
          "1px solid rgba(240,236,227,0.06)",
        cursor: "default",
        transition: "background 0.3s",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "1.5rem",
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
            fontSize: "0.65rem",
            fontFamily: "'DM Sans', sans-serif",
            color:
              "rgba(240,236,227,0.3)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            border:
              "1px solid rgba(240,236,227,0.1)",
            padding: "0.2rem 0.6rem",
          }}
        >
          {skill.cat}
        </span>
      </div>

      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "1.05rem",
          marginBottom: "1rem",
        }}
      >
        {skill.name}
      </div>

      <div
        style={{
          height: 2,
          background:
            "rgba(240,236,227,0.08)",
          borderRadius: 1,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          whileInView={{
            width: `${skill.level}%`,
          }}
          viewport={{ once: true }}
          transition={{
            delay:
              0.3 + index * 0.08,
            duration: 1,
            ease: "easeOut",
          }}
          style={{
            height: "100%",
            background: "#7DD3FC",
          }}
        />
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "0.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.75rem",
            color: "#7DD3FC",
            fontFamily:
              "'DM Sans', sans-serif",
            fontWeight: 500,
          }}
        >
          {skill.level}%
        </span>
      </div>

      {hov && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 2,
            background:
              "linear-gradient(90deg, transparent, #7DD3FC, transparent)",
          }}
        />
      )}
    </motion.div>
  );
}

// ─── Project Row ──────────────────────────────────────────────────────────────

function ProjectRow({
  project,
  index,
}: ProjectRowProps) {
  const [hov, setHov] = useState(false);

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.1,
      }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        display: "grid",
        gridTemplateColumns:
          "80px 1fr auto",
        alignItems: "center",
        gap: "2rem",
        padding: "2rem 0",
        borderBottom:
          "1px solid rgba(240,236,227,0.06)",
        cursor: "pointer",
        background: hov
          ? "rgba(240,236,227,0.02)"
          : "transparent",
        transition: "background 0.2s",
      }}
    >
      <span
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "0.8rem",
          color:
            "rgba(240,236,227,0.2)",
          fontWeight: 700,
        }}
      >
        {project.num}
      </span>

      <div>
        <motion.h3
          animate={{
            x: hov ? 6 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          style={{
            fontFamily:
              "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "1.4rem",
            letterSpacing: "-0.02em",
            marginBottom: "0.4rem",
          }}
        >
          {project.title}
        </motion.h3>

        <p
          style={{
            color:
              "rgba(240,236,227,0.45)",
            fontFamily:
              "'DM Sans', sans-serif",
            fontSize: "0.9rem",
            lineHeight: 1.5,
          }}
        >
          {project.desc}
        </p>

        <div
          style={{
            display: "flex",
            gap: "0.5rem",
            marginTop: "0.75rem",
            flexWrap: "wrap",
          }}
        >
          {project.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: "0.65rem",
                fontFamily:
                  "'DM Sans', sans-serif",
                letterSpacing: "0.08em",
                padding:
                  "0.25rem 0.75rem",
                border: `1px solid ${project.accent}50`,
                color: project.accent,
                textTransform:
                  "uppercase",
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        animate={{
          x: hov ? 0 : 8,
          opacity: hov ? 1 : 0.3,
        }}
        transition={{
          duration: 0.2,
        }}
        style={{
          color: project.accent,
          fontSize: "1.5rem",
        }}
      >
        →
      </motion.div>
    </motion.div>
  );
}

// ─── Contact Link ─────────────────────────────────────────────────────────────

function ContactLink({
  icon,
  label,
  href,
}: ContactLinkProps) {
  const [hov, setHov] = useState(false);

  return (
    <motion.a
      href={href}
      whileHover={{ y: -3 }}
      onHoverStart={() =>
        setHov(true)
      }
      onHoverEnd={() =>
        setHov(false)
      }
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.6rem",
        padding: "0.85rem 1.8rem",
        border: `1px solid ${
          hov
            ? "rgba(125,211,252,0.4)"
            : "rgba(240,236,227,0.15)"
        }`,
        color: "#f0ece3",
        textDecoration: "none",
        fontSize: "0.85rem",
        fontFamily:
          "'DM Sans', sans-serif",
        background:
          "rgba(240,236,227,0.03)",
        transition:
          "border-color 0.2s",
      }}
    >
      {icon}
      {label}
    </motion.a>
  );
}

// ─── Scroll Progress ──────────────────────────────────────────────────────────

function ScrollProgress({
  scrollYProgress,
}: ScrollProgressProps) {
  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        background: "#7DD3FC",
        scaleX: scrollYProgress,
        transformOrigin: "0%",
        zIndex: 200,
      }}
    />
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

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
      target: containerRef,
    });

  const heroY = useTransform(
    scrollYProgress,
    [0, 0.4],
    [0, -120]
  );

  const heroOpacity =
    useTransform(
      scrollYProgress,
      [0, 0.3],
      [1, 0]
    );

  const scrambled = useScramble(
    "CREATIVE / DIGITAL / AI",
    heroHovered
  );

  useEffect(() => {
    const t = setTimeout(() => {
      setIsLoaded(true);
    }, 200);

    const onMove = (
      e: MouseEvent
    ) => {
      setCursorPos({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener(
      "mousemove",
      onMove
    );

    return () => {
      clearTimeout(t);
      window.removeEventListener(
        "mousemove",
        onMove
      );
    };
  }, []);

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

  const projects: ProjectItem[] =
    [
      {
        num: "01",
        title: "Gaming Short",
        desc: "Short-form gaming concept built around cinematic visuals, fast pacing and social-first storytelling.",
        tags: [
          "Short-form",
          "AI",
          "Editing",
        ],
        accent: "#7DD3FC",
      },
      {
        num: "02",
        title: "Automotive",
        desc: "Cinematic automotive campaign concept combining AI-generated visuals and commercial storytelling.",
        tags: [
          "AI",
          "Automotive",
          "Content",
        ],
        accent: "#38BDF8",
      },
      {
        num: "03",
        title: "Mallord Music",
        desc: "Visual direction and digital identity for an independent music project.",
        tags: [
          "Music",
          "Visual",
          "Branding",
        ],
        accent: "#A5F3FC",
      },
      {
        num: "04",
        title: "Digital Object",
        desc: "Modern portfolio experience focused on visual storytelling, interaction and web design.",
        tags: [
          "Web",
          "Design",
          "Next.js",
        ],
        accent: "#22D3EE",
      },
    ];

  return (
    <div
      ref={containerRef}
      style={{
        fontFamily:
          "'Syne', sans-serif",
        background: "#060608",
        color: "#f0ece3",
        minHeight: "100vh",
        overflowX: "hidden",
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #060608;
        }

        ::-webkit-scrollbar {
          width: 4px;
        }

        ::-webkit-scrollbar-track {
          background: #060608;
        }

        ::-webkit-scrollbar-thumb {
          background: #7DD3FC;
          border-radius: 2px;
        }

        button,
        a {
          -webkit-tap-highlight-color: transparent;
        }
      `}</style>

      {/* Cursor Glow */}
      <motion.div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 0,
          background:
            "radial-gradient(circle, rgba(125,211,252,0.07) 0%, transparent 70%)",
          translateX:
            cursorPos.x - 200,
          translateY:
            cursorPos.y - 200,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 150,
        }}
      />

      {/* Noise */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 1,
          pointerEvents: "none",
          opacity: 0.04,
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

      {/* NAV */}
      <motion.nav
        initial={{
          y: -60,
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
          duration: 0.7,
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
          alignItems: "center",
          padding:
            "1.5rem 3rem",
          borderBottom:
            "1px solid rgba(240,236,227,0.06)",
          backdropFilter:
            "blur(20px)",
          background:
            "rgba(6,6,8,0.7)",
        }}
      >
        <motion.a
          href="#home"
          style={{
            fontFamily:
              "'Syne', sans-serif",
            fontSize: "1.3rem",
            fontWeight: 800,
            letterSpacing:
              "-0.02em",
            color: "#7DD3FC",
            textDecoration:
              "none",
          }}
          whileHover={{
            scale: 1.05,
          }}
        >
          MALLORD
        </motion.a>

        <div
          style={{
            display: "flex",
            gap: "2.5rem",
          }}
        >
          {[
            ["Home", "home"],
            ["Skills", "skills"],
            ["Projects", "projects"],
            ["Contact", "contact"],
          ].map(([label, id]) => (
            <motion.a
              key={label}
              href={`#${id}`}
              style={{
                color:
                  "rgba(240,236,227,0.6)",
                textDecoration:
                  "none",
                fontSize: "0.8rem",
                fontFamily:
                  "'DM Sans', sans-serif",
                letterSpacing:
                  "0.1em",
                textTransform:
                  "uppercase",
                fontWeight: 500,
              }}
              whileHover={{
                color: "#7DD3FC",
                y: -1,
              }}
              transition={{
                duration: 0.2,
              }}
            >
              {label}
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* HERO */}
      <section
        id="home"
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            backgroundImage:
              `linear-gradient(rgba(125,211,252,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,0.04) 1px, transparent 1px)`,
            backgroundSize:
              "60px 60px",
          }}
        />

        <motion.div
          style={{
            position: "absolute",
            right: "-10%",
            top: "10%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            filter: "blur(100px)",
            zIndex: 0,
            background:
              "radial-gradient(circle, rgba(125,211,252,0.15) 0%, rgba(56,189,248,0.05) 50%, transparent 70%)",
          }}
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          style={{
            position: "relative",
            zIndex: 2,
            padding: "0 3rem",
            paddingTop: "6rem",
            y: heroY,
            opacity: heroOpacity,
          }}
        >
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
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
              delay: 0.4,
              duration: 0.7,
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              border:
                "1px solid rgba(125,211,252,0.3)",
              borderRadius: "2px",
              padding:
                "0.4rem 1rem",
              marginBottom:
                "2rem",
              color: "#7DD3FC",
              fontSize: "0.75rem",
              letterSpacing:
                "0.15em",
              fontFamily:
                "'DM Sans', sans-serif",
              textTransform:
                "uppercase",
            }}
          >
            <motion.span
              animate={{
                opacity: [
                  1, 0.3, 1,
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              ●
            </motion.span>

            Available for freelance work
          </motion.div>

          <div
            style={{
              overflow: "hidden",
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
                      0.5 +
                      i * 0.12,
                    duration: 0.8,
                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                  style={{
                    display: "block",
                    fontFamily:
                      "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize:
                      "clamp(3rem, 8vw, 7rem)",
                    lineHeight: 0.95,
                    letterSpacing:
                      "-0.03em",
                    color:
                      i === 2
                        ? "transparent"
                        : "#f0ece3",
                    WebkitTextStroke:
                      i === 2
                        ? "1px #7DD3FC"
                        : "none",
                  }}
                >
                  {line}
                </motion.div>
              )
            )}
          </div>

          {/* Scramble subtitle */}
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
              delay: 1,
            }}
            onHoverStart={() =>
              setHeroHovered(true)
            }
            onHoverEnd={() =>
              setHeroHovered(false)
            }
            style={{
              marginTop:
                "1.5rem",
              fontSize:
                "0.85rem",
              letterSpacing:
                "0.25em",
              color:
                "rgba(240,236,227,0.3)",
              fontFamily:
                "'DM Sans', sans-serif",
              cursor: "default",
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
              delay: 1.1,
              duration: 0.7,
            }}
            style={{
              marginTop:
                "1.5rem",
              maxWidth: 520,
              color:
                "rgba(240,236,227,0.5)",
              fontSize:
                "1rem",
              fontFamily:
                "'DM Sans', sans-serif",
              fontWeight: 300,
              lineHeight: 1.7,
            }}
          >
            Creating bold digital
            experiences through
            AI, design, short-form
            content and modern web.
          </motion.p>

          {/* Buttons */}
          <motion.div
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
              delay: 1.2,
              duration: 0.6,
            }}
            style={{
              display: "flex",
              gap: "1rem",
              marginTop:
                "3rem",
              flexWrap: "wrap",
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

          {/* Services */}
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
              delay: 1.5,
            }}
            style={{
              display: "flex",
              gap: "3rem",
              marginTop:
                "4rem",
              flexWrap: "wrap",
            }}
          >
            {[
              ["01", "Web"],
              ["02", "AI Content"],
              ["03", "Short-form"],
            ].map(
              ([num, label]) => (
                <div
                  key={label}
                >
                  <div
                    style={{
                      fontFamily:
                        "'Syne', sans-serif",
                      fontWeight: 800,
                      fontSize:
                        "2rem",
                      color:
                        "#7DD3FC",
                    }}
                  >
                    {num}
                  </div>

                  <div
                    style={{
                      fontSize:
                        "0.75rem",
                      color:
                        "rgba(240,236,227,0.4)",
                      fontFamily:
                        "'DM Sans', sans-serif",
                      letterSpacing:
                        "0.08em",
                      textTransform:
                        "uppercase",
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
            delay: 2,
          }}
          style={{
            position:
              "absolute",
            bottom: "2rem",
            left: "3rem",
            display: "flex",
            alignItems:
              "center",
            gap: "0.75rem",
          }}
        >
          <motion.div
            animate={{
              y: [0, 6, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
          >
            <IconArrow />
          </motion.div>

          <span
            style={{
              fontSize:
                "0.7rem",
              letterSpacing:
                "0.15em",
              textTransform:
                "uppercase",
              color:
                "rgba(240,236,227,0.3)",
              fontFamily:
                "'DM Sans', sans-serif",
            }}
          >
            Scroll to explore
          </span>
        </motion.div>
      </section>

      {/* SERVICES */}
      <section
        id="skills"
        style={{
          minHeight: "100vh",
          padding:
            "8rem 3rem",
          position: "relative",
        }}
      >
        <SectionLabel>
          02 / What I Do
        </SectionLabel>

        <SectionTitle>
          Creative Services
        </SectionTitle>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "1px",
            marginTop:
              "4rem",
            border:
              "1px solid rgba(240,236,227,0.08)",
            maxWidth: 1000,
          }}
        >
          {skills.map(
            (skill, i) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={i}
              />
            )
          )}
        </div>

        <motion.div
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
          transition={{
            delay: 0.3,
          }}
          style={{
            marginTop:
              "4rem",
            display: "flex",
            gap: "1.5rem",
            flexWrap: "wrap",
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
              <motion.span
                key={tool}
                whileHover={{
                  y: -3,
                  color: "#7DD3FC",
                }}
                style={{
                  padding:
                    "0.5rem 1.2rem",
                  border:
                    "1px solid rgba(240,236,227,0.1)",
                  fontSize:
                    "0.8rem",
                  fontFamily:
                    "'DM Sans', sans-serif",
                  letterSpacing:
                    "0.05em",
                  color:
                    "rgba(240,236,227,0.5)",
                  cursor:
                    "default",
                  transition:
                    "all 0.2s",
                }}
              >
                {tool}
              </motion.span>
            )
          )}
        </motion.div>
      </section>

      {/* PROJECTS */}
      <section
        id="projects"
        style={{
          padding:
            "8rem 3rem",
          position: "relative",
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
            display: "grid",
            gap: "1px",
            marginTop:
              "4rem",
          }}
        >
          {projects.map(
            (project, i) => (
              <ProjectRow
                key={project.num}
                project={project}
                index={i}
              />
            )
          )}
        </div>
      </section>

      {/* CONTACT */}
      <section
        id="contact"
        style={{
          padding:
            "8rem 3rem 6rem",
          position: "relative",
          overflow:
            "hidden",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            top: "50%",
            left: "50%",
            transform:
              "translate(-50%,-50%)",
            width: 500,
            height: 500,
            borderRadius:
              "50%",
            filter:
              "blur(120px)",
            background:
              "radial-gradient(circle, rgba(125,211,252,0.12) 0%, transparent 70%)",
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
            y: 40,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
          }}
          style={{
            fontFamily:
              "'Syne', sans-serif",
            fontWeight: 800,
            fontSize:
              "clamp(2.5rem, 6vw, 5rem)",
            lineHeight: 1,
            letterSpacing:
              "-0.03em",
            maxWidth: 700,
            marginTop:
              "1rem",
          }}
        >
          Let&apos;s build
          something{" "}
          <span
            style={{
              color:
                "#7DD3FC",
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
            delay: 0.2,
          }}
          style={{
            marginTop:
              "1.5rem",
            color:
              "rgba(240,236,227,0.5)",
            fontFamily:
              "'DM Sans', sans-serif",
            fontSize: "1rem",
            maxWidth: 480,
            lineHeight: 1.7,
          }}
        >
          Have a project in
          mind? Send me a
          message and
          let&apos;s talk about
          it.
        </motion.p>

        <motion.div
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
          transition={{
            delay: 0.3,
          }}
          style={{
            display: "flex",
            gap: "1rem",
            marginTop:
              "3rem",
            flexWrap: "wrap",
          }}
        >
          <ContactLink
            icon={<IconMail />}
            label="Email"
            href="mailto:stuffmallord@gmail.com"
          />

          <ContactLink
            icon={
              <span>
                ✈
              </span>
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
              "2rem",
            borderTop:
              "1px solid rgba(240,236,227,0.06)",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            flexWrap:
              "wrap",
            gap: "1rem",
          }}
        >
          <span
            style={{
              color:
                "rgba(240,236,227,0.2)",
              fontSize:
                "0.75rem",
              fontFamily:
                "'DM Sans', sans-serif",
            }}
          >
            © 2026 MALLORD
          </span>

          <span
            style={{
              color:
                "rgba(240,236,227,0.2)",
              fontSize:
                "0.75rem",
              fontFamily:
                "'DM Sans', sans-serif",
            }}
          >
            Creative / Digital /
            AI
          </span>
        </div>
      </section>
    </div>
  );
}