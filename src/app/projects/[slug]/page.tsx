import { notFound } from "next/navigation";

const projects = {
  afterimage: {
    number: "01",
    title: "AFTERIMAGE",
    category: "Art Direction / Motion / Visual",
    image: "/projects/afterimage.jpg",
    intro:
      "A cinematic visual concept exploring motion, light and digital identity.",
    challenge:
      "Create a visual piece that feels atmospheric, modern and memorable while staying flexible enough for digital campaigns and social content.",
    approach:
      "The direction combines dark composition, cold light, motion-oriented framing and a minimal visual language designed around atmosphere rather than literal storytelling.",
    deliverables: [
      "Art Direction",
      "Visual Concept",
      "Motion Direction",
      "Social Visuals",
    ],
  },

  concrete: {
    number: "02",
    title: "CONCRETE",
    category: "Architecture / Visual / Direction",
    image: "/projects/concrete.jpg",
    intro:
      "An architectural visual study built around geometry, shadow and atmosphere.",
    challenge:
      "Develop a restrained visual identity where form, structure and light become the main storytelling elements.",
    approach:
      "The concept uses hard geometry, negative space, controlled contrast and architectural framing to create a strong editorial mood.",
    deliverables: [
      "Creative Direction",
      "Visual Research",
      "Composition",
      "Art Direction",
    ],
  },

  "deep-blue": {
    number: "03",
    title: "DEEP BLUE",
    category: "AI / Digital Art / Concept",
    image: "/projects/deep-blue.jpg",
    intro:
      "An experimental digital concept combining abstract forms, light and AI-driven aesthetics.",
    challenge:
      "Explore how abstract AI-generated imagery can become part of a consistent visual language instead of looking like isolated experiments.",
    approach:
      "The visual system focuses on cold colour, glowing forms, depth and controlled composition to build a futuristic atmosphere.",
    deliverables: [
      "AI Visual Development",
      "Concept Design",
      "Visual Direction",
      "Digital Art",
    ],
  },

  "glass-object": {
    number: "04",
    title: "GLASS OBJECT",
    category: "3D / Product / Visual",
    image: "/projects/glass-object.jpg",
    intro:
      "A minimal product concept focused on material, transparency and futuristic visual language.",
    challenge:
      "Create a product-oriented visual that feels premium without relying on a conventional advertising layout.",
    approach:
      "The concept uses transparency, reflections, clean geometry and negative space to create a restrained futuristic product aesthetic.",
    deliverables: [
      "3D Concept",
      "Product Direction",
      "Visual Composition",
      "Campaign Concept",
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
            transform .7s cubic-bezier(.22,1,.36,1);
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
          border-color: rgba(125,211,252,0.25) !important;
        }

        @media (max-width: 800px) {
          .case-nav {
            padding: 1rem 1.25rem !important;
          }

          .case-nav-title {
            display: none !important;
          }

          .case-hero {
            padding: 130px 1.25rem 30px !important;
          }

          .case-header {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }

          .case-title {
            font-size: clamp(3.4rem, 17vw, 7rem) !important;
          }

          .case-image {
            aspect-ratio: 4 / 3 !important;
          }

          .case-body {
            padding: 70px 1.25rem 100px !important;
          }

          .case-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }

          .case-bottom {
            flex-direction: column !important;
            align-items: flex-start !important;
          }
        }
      `}</style>

      {/* NAVIGATION */}

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
            transition:
              "color .2s ease, transform .2s ease",
          }}
        >
          ← Back to work
        </a>
      </nav>

      {/* HERO */}

      <section
        className="case-hero"
        style={{
          maxWidth: 1450,
          margin: "0 auto",
          padding: "160px 5vw 50px",
        }}
      >
        <div
          className="case-header"
          style={{
            display: "grid",
            gridTemplateColumns:
              "minmax(0, 1.15fr) minmax(300px, 0.85fr)",
            gap: "5rem",
            alignItems: "end",
            marginBottom: "3rem",
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
                    "rgba(240,236,227,0.38)",
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

          <p
            style={{
              maxWidth: 460,
              margin: 0,
              color:
                "rgba(240,236,227,0.52)",
              fontSize: "0.98rem",
              lineHeight: 1.75,
            }}
          >
            {project.intro}
          </p>
        </div>

        <div
          className="case-image"
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

      {/* CASE CONTENT */}

      <section
        className="case-body"
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          padding: "90px 5vw 150px",
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
          {/* CHALLENGE */}

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginBottom: "1.15rem",
                color: "#7DD3FC",
                fontSize: "0.63rem",
                letterSpacing: "0.17em",
                textTransform: "uppercase",
              }}
            >
              <span>01</span>

              <span
                style={{
                  width: 24,
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
                Challenge
              </span>
            </div>

            <p
              style={{
                margin: 0,
                color:
                  "rgba(240,236,227,0.64)",
                fontSize: "0.9rem",
                lineHeight: 1.78,
              }}
            >
              {project.challenge}
            </p>
          </div>

          {/* APPROACH */}

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginBottom: "1.15rem",
                color: "#7DD3FC",
                fontSize: "0.63rem",
                letterSpacing: "0.17em",
                textTransform: "uppercase",
              }}
            >
              <span>02</span>

              <span
                style={{
                  width: 24,
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
                Approach
              </span>
            </div>

            <p
              style={{
                margin: 0,
                color:
                  "rgba(240,236,227,0.64)",
                fontSize: "0.9rem",
                lineHeight: 1.78,
              }}
            >
              {project.approach}
            </p>
          </div>

          {/* DELIVERABLES */}

          <div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.7rem",
                marginBottom: "1.15rem",
                color: "#7DD3FC",
                fontSize: "0.63rem",
                letterSpacing: "0.17em",
                textTransform: "uppercase",
              }}
            >
              <span>03</span>

              <span
                style={{
                  width: 24,
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
                Deliverables
              </span>
            </div>

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
                        "rgba(240,236,227,0.66)",
                      fontSize: "0.86rem",
                      transition:
                        "color .2s ease, padding-left .2s ease, border-color .2s ease",
                    }}
                  >
                    {item}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* VISUAL STATEMENT */}

        <div
          style={{
            marginTop: "9rem",
            paddingTop: "2rem",
            borderTop:
              "1px solid rgba(240,236,227,0.08)",
          }}
        >
          <p
            style={{
              maxWidth: 950,
              margin: 0,
              fontSize:
                "clamp(1.8rem, 4vw, 4rem)",
              lineHeight: 1.05,
              letterSpacing: "-0.045em",
              fontWeight: 700,
              color:
                "rgba(240,236,227,0.88)",
            }}
          >
            Visual direction should create
            a feeling before it explains
            an idea.
          </p>
        </div>

        {/* BOTTOM */}

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
              textTransform: "uppercase",
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