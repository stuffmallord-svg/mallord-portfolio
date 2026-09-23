import { notFound } from "next/navigation";

const projects = {
  afterimage: {
    number: "01",
    title: "AFTERIMAGE",
    category: "Art Direction / Motion / Visual",
    image: "/projects/afterimage.jpg",

    intro:
      "A cinematic visual concept exploring motion, light and digital identity.",

    overview:
      "AFTERIMAGE is a self-initiated visual direction study built around atmosphere, controlled light and a sense of movement. The goal was to create something that feels closer to a campaign world than a single isolated image.",

    challenge:
      "Create a visual language that feels immediate and memorable while remaining flexible enough to work across short-form content, digital campaigns and social formats.",

    approach:
      "The direction combines dark compositions, cold blue light, negative space and motion-oriented framing. Instead of relying on literal storytelling, the concept focuses on creating a recognisable mood that can be extended into multiple visual formats.",

    role: [
      "Creative Direction",
      "Visual Concept",
      "Art Direction",
      "Motion Direction",
    ],

    deliverables: [
      "Visual Direction",
      "Art Direction",
      "Motion Concept",
      "Social Visual System",
    ],

    tags: [
      "Art Direction",
      "Motion",
      "Visual Identity",
      "Digital",
    ],
  },

  concrete: {
    number: "02",
    title: "CONCRETE",
    category: "Architecture / Visual / Direction",
    image: "/projects/concrete.jpg",
    intro:
      "An architectural visual study built around geometry, shadow and atmosphere.",
    overview:
      "A self-initiated architectural visual exploration focused on structure, contrast and minimal composition.",
    challenge:
      "Develop a restrained visual identity where form, structure and light become the main storytelling elements.",
    approach:
      "The concept uses hard geometry, negative space, controlled contrast and architectural framing to create a strong editorial mood.",
    role: [
      "Creative Direction",
      "Visual Research",
      "Composition",
      "Art Direction",
    ],
    deliverables: [
      "Creative Direction",
      "Visual Research",
      "Composition",
      "Art Direction",
    ],
    tags: [
      "Architecture",
      "Visual",
      "Direction",
      "Editorial",
    ],
  },

  "deep-blue": {
    number: "03",
    title: "DEEP BLUE",
    category: "AI / Digital Art / Concept",
    image: "/projects/deep-blue.jpg",
    intro:
      "An experimental digital concept combining abstract forms, light and AI-driven aesthetics.",
    overview:
      "An experimental study of abstract digital imagery and atmosphere.",
    challenge:
      "Explore how abstract AI-generated imagery can become part of a consistent visual language instead of looking like isolated experiments.",
    approach:
      "The visual system focuses on cold colour, glowing forms, depth and controlled composition to build a futuristic atmosphere.",
    role: [
      "Concept Design",
      "AI Visual Development",
      "Visual Direction",
      "Art Direction",
    ],
    deliverables: [
      "AI Visual Development",
      "Concept Design",
      "Visual Direction",
      "Digital Art",
    ],
    tags: [
      "AI",
      "Digital Art",
      "Concept",
      "Visual",
    ],
  },

  "glass-object": {
    number: "04",
    title: "GLASS OBJECT",
    category: "3D / Product / Visual",
    image: "/projects/glass-object.jpg",
    intro:
      "A minimal product concept focused on material, transparency and futuristic visual language.",
    overview:
      "A self-initiated product visual experiment focused on material, form and presentation.",
    challenge:
      "Create a product-oriented visual that feels premium without relying on a conventional advertising layout.",
    approach:
      "The concept uses transparency, reflections, clean geometry and negative space to create a restrained futuristic product aesthetic.",
    role: [
      "3D Concept",
      "Product Direction",
      "Visual Composition",
      "Campaign Concept",
    ],
    deliverables: [
      "3D Concept",
      "Product Direction",
      "Visual Composition",
      "Campaign Concept",
    ],
    tags: [
      "3D",
      "Product",
      "Visual",
      "Concept",
    ],
  },
} as const;

type ProjectSlug = keyof typeof projects;

export function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects[slug as ProjectSlug];

  if (!project) {
    return {
      title: "Project — MALLORD",
    };
  }

  return {
    title: `${project.title} — MALLORD`,
    description: project.intro,
  };
}

function NumberLabel({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.7rem",
        marginBottom: "1.2rem",
        color: "#7DD3FC",
        fontSize: "0.63rem",
        letterSpacing: "0.17em",
        textTransform: "uppercase",
      }}
    >
      <span>{number}</span>

      <span
        style={{
          width: 26,
          height: 1,
          background: "#7DD3FC",
        }}
      />

      <span
        style={{
          color: "rgba(240,236,227,0.4)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

function ImagePanel({
  src,
  alt,
  objectPosition = "center",
  label,
  small = false,
}: {
  src: string;
  alt: string;
  objectPosition?: string;
  label: string;
  small?: boolean;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: small ? "1 / 1" : "16 / 10",
        overflow: "hidden",
        background: "#0A0A0D",
        border:
          "1px solid rgba(240,236,227,0.08)",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition,
          display: "block",
        }}
      />

      <div
        style={{
          position: "absolute",
          left: "1rem",
          bottom: "1rem",
          padding: "0.35rem 0.55rem",
          background: "rgba(6,6,8,0.72)",
          border:
            "1px solid rgba(240,236,227,0.1)",
          backdropFilter: "blur(10px)",
          color: "rgba(240,236,227,0.55)",
          fontSize: "0.57rem",
          letterSpacing: "0.13em",
          textTransform: "uppercase",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project = projects[slug as ProjectSlug];

  if (!project) {
    notFound();
  }

  const isAfterimage = slug === "afterimage";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#060608",
        color: "#F0ECE3",
        fontFamily: "Arial, Helvetica, sans-serif",
        overflowX: "hidden",
      }}
    >
      <style>{`
        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: #060608;
        }

        a {
          -webkit-tap-highlight-color: transparent;
        }

        .case-link {
          transition:
            color .2s ease,
            transform .2s ease;
        }

        .case-link:hover {
          color: #7DD3FC !important;
        }

        .case-back:hover {
          transform: translateX(-4px);
        }

        .case-image img {
          transition:
            transform .8s cubic-bezier(.22,1,.36,1);
        }

        .case-image:hover img {
          transform: scale(1.025);
        }

        .deliverable {
          transition:
            color .2s ease,
            padding-left .2s ease,
            border-color .2s ease;
        }

        .deliverable:hover {
          color: #7DD3FC !important;
          padding-left: 0.4rem !important;
          border-color:
            rgba(125,211,252,0.25) !important;
        }

        .tag-pill {
          transition:
            color .2s ease,
            border-color .2s ease,
            background .2s ease;
        }

        .tag-pill:hover {
          color: #7DD3FC !important;
          border-color:
            rgba(125,211,252,0.35) !important;
          background:
            rgba(125,211,252,0.025) !important;
        }

        @media (max-width: 900px) {
          .case-header {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          .case-overview {
            grid-template-columns: 1fr !important;
          }

          .case-grid {
            grid-template-columns: 1fr !important;
          }

          .case-gallery {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 700px) {
          .case-nav {
            padding: 1rem 1.25rem !important;
          }

          .case-nav-title {
            display: none !important;
          }

          .case-hero {
            padding:
              130px 1.25rem 35px !important;
          }

          .case-body {
            padding:
              70px 1.25rem 100px !important;
          }

          .case-title {
            font-size:
              clamp(3.3rem, 17vw, 7rem) !important;
          }

          .case-main-image {
            aspect-ratio:
              4 / 3 !important;
          }

          .case-bottom {
            flex-direction:
              column !important;
            align-items:
              flex-start !important;
          }
        }
      `}</style>

      {/* ─────────────────────────────────────────────
          NAV
      ───────────────────────────────────────────── */}

      <nav
        className="case-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1.35rem 3rem",
          borderBottom:
            "1px solid rgba(240,236,227,0.06)",
          backdropFilter: "blur(20px)",
          background:
            "rgba(6,6,8,0.78)",
        }}
      >
        <a
          href="/"
          className="case-link"
          style={{
            color: "#7DD3FC",
            textDecoration: "none",
            fontSize: "0.86rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          MALLORD
        </a>

        <span
          className="case-nav-title"
          style={{
            color:
              "rgba(240,236,227,0.28)",
            fontSize: "0.63rem",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          Selected Project
        </span>

        <a
          href="/#projects"
          className="case-link case-back"
          style={{
            color:
              "rgba(240,236,227,0.58)",
            textDecoration: "none",
            fontSize: "0.67rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          ← Back to work
        </a>
      </nav>

      {/* ─────────────────────────────────────────────
          HERO
      ───────────────────────────────────────────── */}

      <section
        className="case-hero"
        style={{
          maxWidth: 1450,
          margin: "0 auto",
          padding:
            "160px 5vw 55px",
        }}
      >
        <div
          className="case-header"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.1fr) minmax(280px, 0.9fr)",
            gap: "5rem",
            alignItems: "end",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.8rem",
                marginBottom: "1.35rem",
                color: "#7DD3FC",
                fontSize: "0.65rem",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              <span>{project.number}</span>

              <span
                style={{
                  width: 35,
                  height: 1,
                  background: "#7DD3FC",
                }}
              />

              <span
                style={{
                  color:
                    "rgba(240,236,227,0.4)",
                }}
              >
                {project.category}
              </span>
            </div>

            <h1
              className="case-title"
              style={{
                margin: 0,
                fontSize:
                  "clamp(4rem, 11vw, 10rem)",
                lineHeight: 0.82,
                letterSpacing: "-0.075em",
                fontWeight: 900,
              }}
            >
              {project.title}
            </h1>
          </div>

          <div>
            <p
              style={{
                maxWidth: 470,
                margin: 0,
                color:
                  "rgba(240,236,227,0.54)",
                fontSize: "0.98rem",
                lineHeight: 1.8,
              }}
            >
              {project.intro}
            </p>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.45rem",
                marginTop: "1.4rem",
              }}
            >
              {project.tags.map(
                (tag) => (
                  <span
                    key={tag}
                    className="tag-pill"
                    style={{
                      padding:
                        "0.35rem 0.6rem",
                      border:
                        "1px solid rgba(240,236,227,0.12)",
                      color:
                        "rgba(240,236,227,0.42)",
                      fontSize:
                        "0.58rem",
                      letterSpacing:
                        "0.1em",
                      textTransform:
                        "uppercase",
                    }}
                  >
                    {tag}
                  </span>
                )
              )}
            </div>
          </div>
        </div>

        <div
          className="case-image case-main-image"
          style={{
            width: "100%",
            aspectRatio: "16 / 8",
            overflow: "hidden",
            background: "#0A0A0D",
            border:
              "1px solid rgba(240,236,227,0.08)",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </section>

      {/* ─────────────────────────────────────────────
          CASE INFO
      ───────────────────────────────────────────── */}

      <section
        className="case-body"
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          padding:
            "80px 5vw 150px",
        }}
      >
        <div
          className="case-overview"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1fr) minmax(220px, 0.35fr)",
            gap: "5rem",
            paddingBottom: "7rem",
            borderBottom:
              "1px solid rgba(240,236,227,0.08)",
          }}
        >
          <div>
            <NumberLabel
              number="00"
              label="Overview"
            />

            <p
              style={{
                maxWidth: 850,
                margin: 0,
                color:
                  "rgba(240,236,227,0.78)",
                fontSize:
                  "clamp(1.45rem, 3vw, 2.65rem)",
                lineHeight: 1.2,
                letterSpacing:
                  "-0.035em",
                fontWeight: 600,
              }}
            >
              {project.overview}
            </p>
          </div>

          <div>
            <NumberLabel
              number="ROLE"
              label="What I Did"
            />

            <div>
              {project.role.map(
                (item) => (
                  <div
                    key={item}
                    className="deliverable"
                    style={{
                      padding:
                        "0.72rem 0",
                      borderBottom:
                        "1px solid rgba(240,236,227,0.08)",
                      color:
                        "rgba(240,236,227,0.68)",
                      fontSize:
                        "0.84rem",
                    }}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            PROCESS
        ───────────────────────────────────────── */}

        <div
          style={{
            padding:
              "7rem 0",
          }}
        >
          <div
            className="case-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(3, minmax(0, 1fr))",
              gap: "4rem",
            }}
          >
            <div>
              <NumberLabel
                number="01"
                label="Challenge"
              />

              <p
                style={{
                  margin: 0,
                  color:
                    "rgba(240,236,227,0.62)",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                }}
              >
                {project.challenge}
              </p>
            </div>

            <div>
              <NumberLabel
                number="02"
                label="Approach"
              />

              <p
                style={{
                  margin: 0,
                  color:
                    "rgba(240,236,227,0.62)",
                  fontSize: "0.9rem",
                  lineHeight: 1.8,
                }}
              >
                {project.approach}
              </p>
            </div>

            <div>
              <NumberLabel
                number="03"
                label="Deliverables"
              />

              <div>
                {project.deliverables.map(
                  (item) => (
                    <div
                      key={item}
                      className="deliverable"
                      style={{
                        padding:
                          "0.75rem 0",
                        borderBottom:
                          "1px solid rgba(240,236,227,0.08)",
                        color:
                          "rgba(240,236,227,0.68)",
                        fontSize:
                          "0.85rem",
                      }}
                    >
                      {item}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* ─────────────────────────────────────────
            AFTERIMAGE VISUAL SYSTEM
        ───────────────────────────────────────── */}

        {isAfterimage && (
          <>
            <div
              style={{
                borderTop:
                  "1px solid rgba(240,236,227,0.08)",
                paddingTop: "5rem",
              }}
            >
              <NumberLabel
                number="04"
                label="Visual Language"
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "minmax(0, 1.2fr) minmax(280px, 0.8fr)",
                  gap: "3rem",
                  alignItems: "end",
                }}
              >
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontSize:
                        "clamp(2.6rem, 6vw, 6rem)",
                      lineHeight: 0.9,
                      letterSpacing:
                        "-0.06em",
                      fontWeight: 800,
                    }}
                  >
                    LIGHT
                    <br />
                    BECOMES
                    <br />
                    <span
                      style={{
                        color:
                          "#7DD3FC",
                      }}
                    >
                      MOTION.
                    </span>
                  </h2>
                </div>

                <p
                  style={{
                    margin: 0,
                    color:
                      "rgba(240,236,227,0.5)",
                    fontSize:
                      "0.92rem",
                    lineHeight: 1.75,
                  }}
                >
                  The visual system is
                  intentionally restrained:
                  dark surfaces, cold
                  illumination, strong
                  silhouettes and controlled
                  movement. This creates a
                  flexible visual identity
                  that can extend beyond a
                  single frame.
                </p>
              </div>
            </div>

            {/* VISUAL GRID */}

            <div
              className="case-gallery"
              style={{
                display: "grid",
                gridTemplateColumns:
                  "1.4fr 0.6fr",
                gap: "1rem",
                marginTop: "4rem",
              }}
            >
              <ImagePanel
                src={project.image}
                alt="AFTERIMAGE visual direction"
                label="Direction / 01"
                objectPosition="center"
              />

              <div
                style={{
                  display: "grid",
                  gridTemplateRows:
                    "1fr 1fr",
                  gap: "1rem",
                }}
              >
                <ImagePanel
                  src={project.image}
                  alt="AFTERIMAGE detail"
                  label="Detail / 02"
                  objectPosition="65% center"
                  small
                />

                <ImagePanel
                  src={project.image}
                  alt="AFTERIMAGE detail"
                  label="Detail / 03"
                  objectPosition="35% center"
                  small
                />
              </div>
            </div>

            {/* TYPOGRAPHY / MOOD */}

            <div
              style={{
                marginTop: "7rem",
                padding:
                  "5rem 0",
                borderTop:
                  "1px solid rgba(240,236,227,0.08)",
                borderBottom:
                  "1px solid rgba(240,236,227,0.08)",
              }}
            >
              <div
                className="case-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns:
                    "0.7fr 1.3fr",
                  gap: "4rem",
                }}
              >
                <div>
                  <NumberLabel
                    number="05"
                    label="Mood"
                  />
                </div>

                <div>
                  <p
                    style={{
                      margin: 0,
                      fontSize:
                        "clamp(1.8rem, 4vw, 4rem)",
                      lineHeight: 1.05,
                      letterSpacing:
                        "-0.045em",
                      fontWeight: 700,
                      color:
                        "rgba(240,236,227,0.9)",
                    }}
                  >
                    Cold light.
                    <br />
                    Deep shadows.
                    <br />
                    <span
                      style={{
                        color:
                          "rgba(125,211,252,0.72)",
                      }}
                    >
                      Residual motion.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* ─────────────────────────────────────────
            END
        ───────────────────────────────────────── */}

        <div
          className="case-bottom"
          style={{
            marginTop: "8rem",
            paddingTop: "1.5rem",
            borderTop:
              "1px solid rgba(240,236,227,0.08)",
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <span
            style={{
              color:
                "rgba(240,236,227,0.23)",
              fontSize: "0.64rem",
              letterSpacing: "0.11em",
              textTransform:
                "uppercase",
            }}
          >
            Self-initiated concept
          </span>

          <a
            href="/#contact"
            className="case-link"
            style={{
              color: "#7DD3FC",
              textDecoration: "none",
              fontSize: "0.67rem",
              letterSpacing: "0.13em",
              textTransform: "uppercase",
            }}
          >
            Start a project →
          </a>
        </div>
      </section>
    </main>
  );
}