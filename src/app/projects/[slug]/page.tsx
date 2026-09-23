import { notFound } from "next/navigation";

type LayoutType =
  | "afterimage"
  | "concrete"
  | "deep-blue"
  | "glass-object";

const projects: Record<
  LayoutType,
  {
    number: string;
    title: string;
    category: string;
    image: string;
    intro: string;
    overview: string;
    challenge: string;
    approach: string;
    role: string[];
    deliverables: string[];
    tags: string[];
    statement: string;
    layout: LayoutType;
  }
> = {
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
    statement:
      "Visual direction should create a feeling before it explains an idea.",
    layout: "afterimage",
  },

  concrete: {
    number: "02",
    title: "CONCRETE",
    category: "Architecture / Editorial / Visual",
    image: "/projects/concrete.jpg",
    intro:
      "An architectural visual study built around geometry, shadow and atmosphere.",
    overview:
      "CONCRETE explores architecture as a graphic language: structure, rhythm, negative space and the tension between hard surfaces and soft light.",
    challenge:
      "Create a visual treatment that makes architecture feel editorial and contemporary without adding unnecessary visual noise.",
    approach:
      "The concept is built from rigid framing, strong horizontal and vertical lines, restrained colour and deliberate use of empty space. The result is a visual system that feels precise, quiet and architectural.",
    role: [
      "Art Direction",
      "Visual Research",
      "Composition",
      "Editorial Direction",
    ],
    deliverables: [
      "Visual Direction",
      "Mood Development",
      "Art Direction",
      "Editorial Layout",
    ],
    tags: [
      "Architecture",
      "Editorial",
      "Visual",
      "Direction",
    ],
    statement:
      "When the form is strong enough, everything else can become quiet.",
    layout: "concrete",
  },

  "deep-blue": {
    number: "03",
    title: "DEEP BLUE",
    category: "AI / Digital Art / Experiment",
    image: "/projects/deep-blue.jpg",
    intro:
      "An experimental digital concept combining abstract forms, light and AI-driven aesthetics.",
    overview:
      "DEEP BLUE investigates how AI-assisted imagery can be shaped into a coherent visual world instead of remaining a collection of disconnected generations.",
    challenge:
      "Build an identity from abstract material, light and depth while keeping the visuals consistent enough to work as a system.",
    approach:
      "The direction focuses on cool tonal range, luminous forms, controlled depth and a limited visual vocabulary. The work is intentionally abstract, allowing the same language to move across covers, social posts and motion pieces.",
    role: [
      "Concept Development",
      "AI Visual Direction",
      "Art Direction",
      "Visual System",
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
      "Experiment",
      "Visual",
    ],
    statement:
      "The image is only the surface. The real work is the world around it.",
    layout: "deep-blue",
  },

  "glass-object": {
    number: "04",
    title: "GLASS OBJECT",
    category: "3D / Product / Art Direction",
    image: "/projects/glass-object.jpg",
    intro:
      "A minimal product concept focused on material, transparency and futuristic visual language.",
    overview:
      "GLASS OBJECT is a product visual experiment where the material itself becomes the main character. The direction is intentionally restrained and presentation-led.",
    challenge:
      "Make a simple object feel premium and futuristic without relying on a traditional product-advertising composition.",
    approach:
      "The concept uses transparency, reflections, precise spacing and a lot of negative space. Every element is kept controlled so that the material and silhouette remain the focus.",
    role: [
      "3D Direction",
      "Product Concept",
      "Composition",
      "Art Direction",
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
      "Minimal",
      "Visual",
    ],
    statement:
      "Minimalism is not empty. It is controlled.",
    layout: "glass-object",
  },
};

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

  const project =
    projects[slug as LayoutType];

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

function Label({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
  return (
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
      <span>{number}</span>

      <span
        style={{
          width: 25,
          height: 1,
          background: "#7DD3FC",
        }}
      />

      <span
        style={{
          color: "rgba(240,236,227,0.4)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function Tags({
  items,
}: {
  items: string[];
}) {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "0.45rem",
        marginTop: "1.2rem",
      }}
    >
      {items.map((tag) => (
        <span
          key={tag}
          style={{
            padding: "0.35rem 0.6rem",
            border:
              "1px solid rgba(240,236,227,0.12)",
            color:
              "rgba(240,236,227,0.42)",
            fontSize: "0.58rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {tag}
        </span>
      ))}
    </div>
  );
}

function MainImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`main-image ${className}`}
      style={{
        width: "100%",
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
          display: "block",
        }}
      />
    </div>
  );
}

function SharedInfo({
  project,
}: {
  project: (typeof projects)[LayoutType];
}) {
  return (
    <section
      style={{
        maxWidth: 1250,
        margin: "0 auto",
        padding: "90px 5vw 130px",
      }}
    >
      <div
        className="info-grid"
        style={{
          display: "grid",
          gridTemplateColumns:
            "minmax(0,1fr) minmax(230px,0.4fr)",
          gap: "5rem",
          paddingBottom: "6rem",
          borderBottom:
            "1px solid rgba(240,236,227,0.08)",
        }}
      >
        <div>
          <Label
            number="00"
            text="Overview"
          />

          <p
            style={{
              margin: 0,
              maxWidth: 900,
              color:
                "rgba(240,236,227,0.8)",
              fontSize:
                "clamp(1.5rem, 3vw, 2.7rem)",
              lineHeight: 1.18,
              letterSpacing:
                "-0.035em",
              fontWeight: 600,
            }}
          >
            {project.overview}
          </p>
        </div>

        <div>
          <Label
            number="ROLE"
            text="What I Did"
          />

          {project.role.map(
            (item) => (
              <div
                key={item}
                className="list-item"
                style={{
                  padding:
                    "0.72rem 0",
                  borderBottom:
                    "1px solid rgba(240,236,227,0.08)",
                  color:
                    "rgba(240,236,227,0.65)",
                  fontSize: "0.85rem",
                }}
              >
                {item}
              </div>
            )
          )}
        </div>
      </div>

      <div
        className="info-grid three"
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,minmax(0,1fr))",
          gap: "4rem",
          padding:
            "6rem 0",
        }}
      >
        <div>
          <Label
            number="01"
            text="Challenge"
          />

          <p
            style={{
              margin: 0,
              color:
                "rgba(240,236,227,0.62)",
              lineHeight: 1.8,
              fontSize: "0.9rem",
            }}
          >
            {project.challenge}
          </p>
        </div>

        <div>
          <Label
            number="02"
            text="Approach"
          />

          <p
            style={{
              margin: 0,
              color:
                "rgba(240,236,227,0.62)",
              lineHeight: 1.8,
              fontSize: "0.9rem",
            }}
          >
            {project.approach}
          </p>
        </div>

        <div>
          <Label
            number="03"
            text="Deliverables"
          />

          {project.deliverables.map(
            (item) => (
              <div
                key={item}
                className="list-item"
                style={{
                  padding:
                    "0.72rem 0",
                  borderBottom:
                    "1px solid rgba(240,236,227,0.08)",
                  color:
                    "rgba(240,236,227,0.65)",
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
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONCRETE
// ─────────────────────────────────────────────────────────────────────────────

function ConcreteLayout({
  project,
}: {
  project: (typeof projects)["concrete"];
}) {
  return (
    <>
      <section
        style={{
          maxWidth: 1450,
          margin: "0 auto",
          padding: "0 5vw 110px",
        }}
      >
        <MainImage
          src={project.image}
          alt={project.title}
        />
      </section>

      <section
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          padding:
            "0 5vw 130px",
        }}
      >
        <div
          className="concrete-grid"
          style={{
            display: "grid",
            gridTemplateColumns:
              "0.7fr 1.3fr",
            gap: "5rem",
            alignItems: "start",
          }}
        >
          <div
            style={{
              position:
                "sticky",
              top: "110px",
            }}
          >
            <Label
              number="04"
              text="Visual Language"
            />

            <h2
              style={{
                margin: 0,
                fontSize:
                  "clamp(2.8rem, 6vw, 6.5rem)",
                lineHeight: 0.88,
                letterSpacing:
                  "-0.065em",
                fontWeight: 800,
              }}
            >
              FORM
              <br />
              <span
                style={{
                  color: "#7DD3FC",
                }}
              >
                / SPACE
              </span>
            </h2>
          </div>

          <div>
            <p
              style={{
                margin: 0,
                fontSize:
                  "clamp(1.35rem, 2.7vw, 2.4rem)",
                lineHeight: 1.2,
                letterSpacing:
                  "-0.03em",
                color:
                  "rgba(240,236,227,0.86)",
              }}
            >
              Architecture becomes
              graphic composition when
              the camera stops
              documenting and starts
              designing.
            </p>

            <div
              style={{
                marginTop: "4rem",
                borderTop:
                  "1px solid rgba(240,236,227,0.08)",
              }}
            >
              {[
                [
                  "01",
                  "Geometry",
                  "Hard edges, repetition and structural rhythm.",
                ],
                [
                  "02",
                  "Light",
                  "Natural contrast used as a graphic element.",
                ],
                [
                  "03",
                  "Silence",
                  "Negative space keeps the composition controlled.",
                ],
              ].map(
                ([num, title, text]) => (
                  <div
                    key={num}
                    style={{
                      display:
                        "grid",
                      gridTemplateColumns:
                        "45px 170px 1fr",
                      gap:
                        "1rem",
                      padding:
                        "1.25rem 0",
                      borderBottom:
                        "1px solid rgba(240,236,227,0.08)",
                      alignItems:
                        "start",
                    }}
                  >
                    <span
                      style={{
                        color:
                          "#7DD3FC",
                        fontSize:
                          "0.65rem",
                      }}
                    >
                      {num}
                    </span>

                    <span
                      style={{
                        fontWeight:
                          700,
                        fontSize:
                          "0.9rem",
                      }}
                    >
                      {title}
                    </span>

                    <span
                      style={{
                        color:
                          "rgba(240,236,227,0.42)",
                        fontSize:
                          "0.82rem",
                        lineHeight:
                          1.55,
                      }}
                    >
                      {text}
                    </span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      <section
        style={{
          borderTop:
            "1px solid rgba(240,236,227,0.08)",
          borderBottom:
            "1px solid rgba(240,236,227,0.08)",
          padding:
            "6rem 5vw",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
          }}
        >
          <p
            style={{
              margin: 0,
              maxWidth: 950,
              fontSize:
                "clamp(2rem, 4.5vw, 4.5rem)",
              lineHeight: 1,
              letterSpacing:
                "-0.055em",
              fontWeight: 700,
            }}
          >
            {project.statement}
          </p>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DEEP BLUE
// ─────────────────────────────────────────────────────────────────────────────

function DeepBlueLayout({
  project,
}: {
  project: (typeof projects)["deep-blue"];
}) {
  return (
    <>
      <section
        style={{
          position:
            "relative",
          minHeight: "78vh",
          display:
            "flex",
          alignItems:
            "center",
          justifyContent:
            "center",
          overflow:
            "hidden",
          borderTop:
            "1px solid rgba(240,236,227,0.05)",
          borderBottom:
            "1px solid rgba(240,236,227,0.05)",
        }}
      >
        <div
          style={{
            position:
              "absolute",
            inset: 0,
            background:
              "radial-gradient(circle at center, rgba(56,189,248,0.12), transparent 48%)",
          }}
        />

        <div
          style={{
            position:
              "relative",
            width: "min(1000px,88vw)",
            aspectRatio:
              "1 / 1",
            overflow:
              "hidden",
            borderRadius:
              "50%",
            border:
              "1px solid rgba(125,211,252,0.12)",
            boxShadow:
              "0 0 120px rgba(56,189,248,0.08)",
          }}
        >
          <img
            src={project.image}
            alt={project.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display:
                "block",
              transform:
                "scale(1.08)",
            }}
          />

          <div
            style={{
              position:
                "absolute",
              inset:
                "15%",
              border:
                "1px solid rgba(125,211,252,0.18)",
              borderRadius:
                "50%",
            }}
          />

          <div
            style={{
              position:
                "absolute",
              inset:
                "30%",
              border:
                "1px solid rgba(125,211,252,0.14)",
              borderRadius:
                "50%",
            }}
          />
        </div>

        <div
          style={{
            position:
              "absolute",
            bottom:
              "2rem",
            left:
              "5vw",
            right:
              "5vw",
            display:
              "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            color:
              "rgba(240,236,227,0.28)",
            fontSize:
              "0.62rem",
            letterSpacing:
              "0.13em",
            textTransform:
              "uppercase",
          }}
        >
          <span>
            Experimental visual system
          </span>

          <span>
            AI / Digital / 03
          </span>
        </div>
      </section>

      <section
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          padding:
            "100px 5vw 130px",
        }}
      >
        <div
          className="deep-intro"
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "0.45fr 1.55fr",
            gap:
              "4rem",
          }}
        >
          <div>
            <Label
              number="04"
              text="System"
            />
          </div>

          <div>
            <h2
              style={{
                margin:
                  "0 0 3rem",
                fontSize:
                  "clamp(2.5rem, 6vw, 6rem)",
                lineHeight:
                  0.9,
                letterSpacing:
                  "-0.06em",
              }}
            >
              AN IMAGE
              <br />
              <span
                style={{
                  color:
                    "#7DD3FC",
                }}
              >
                BECOMES A WORLD.
              </span>
            </h2>

            <div
              className="deep-columns"
              style={{
                display:
                  "grid",
                gridTemplateColumns:
                  "1fr 1fr",
                gap:
                  "3rem",
              }}
            >
              <p
                style={{
                  margin: 0,
                  color:
                    "rgba(240,236,227,0.52)",
                  lineHeight:
                    1.8,
                  fontSize:
                    "0.92rem",
                }}
              >
                {project.approach}
              </p>

              <p
                style={{
                  margin: 0,
                  color:
                    "rgba(240,236,227,0.52)",
                  lineHeight:
                    1.8,
                  fontSize:
                    "0.92rem",
                }}
              >
                The same visual language
                can expand into covers,
                social assets, campaign
                frames and motion pieces.
                The objective is
                consistency, not repetition.
              </p>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop:
              "8rem",
            display:
              "grid",
            gridTemplateColumns:
              "1fr 1fr",
            gap:
              "1rem",
          }}
          className="deep-cards"
        >
          {[
            ["01", "LIGHT", "Controlled glow and depth."],
            ["02", "FORM", "Abstract shapes as identity."],
            ["03", "DEPTH", "Layered space and atmosphere."],
            ["04", "RHYTHM", "A visual language ready for motion."],
          ].map(
            ([num, title, text]) => (
              <div
                key={num}
                style={{
                  minHeight:
                    220,
                  padding:
                    "1.6rem",
                  border:
                    "1px solid rgba(240,236,227,0.08)",
                  background:
                    "rgba(125,211,252,0.015)",
                }}
              >
                <div
                  style={{
                    color:
                      "#7DD3FC",
                    fontSize:
                      "0.63rem",
                    marginBottom:
                      "4rem",
                  }}
                >
                  {num}
                </div>

                <div
                  style={{
                    fontSize:
                      "1.4rem",
                    fontWeight:
                      700,
                    letterSpacing:
                      "-0.03em",
                  }}
                >
                  {title}
                </div>

                <p
                  style={{
                    margin:
                      "0.7rem 0 0",
                    color:
                      "rgba(240,236,227,0.4)",
                    fontSize:
                      "0.82rem",
                    lineHeight:
                      1.6,
                  }}
                >
                  {text}
                </p>
              </div>
            )
          )}
        </div>

        <div
          style={{
            marginTop:
              "8rem",
            paddingTop:
              "2rem",
            borderTop:
              "1px solid rgba(240,236,227,0.08)",
          }}
        >
          <p
            style={{
              margin: 0,
              maxWidth:
                1000,
              fontSize:
                "clamp(2rem, 4.5vw, 4.7rem)",
              lineHeight:
                1,
              letterSpacing:
                "-0.055em",
              fontWeight:
                700,
            }}
          >
            {project.statement}
          </p>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// GLASS OBJECT
// ─────────────────────────────────────────────────────────────────────────────

function GlassObjectLayout({
  project,
}: {
  project: (typeof projects)["glass-object"];
}) {
  return (
    <>
      <section
        style={{
          maxWidth: 1450,
          margin: "0 auto",
          padding:
            "0 5vw 120px",
        }}
      >
        <div
          className="glass-hero"
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "0.7fr 1.3fr",
            gap:
              "1rem",
            alignItems:
              "stretch",
          }}
        >
          <div
            style={{
              minHeight:
                650,
              padding:
                "2rem",
              border:
                "1px solid rgba(240,236,227,0.08)",
              display:
                "flex",
              flexDirection:
                "column",
              justifyContent:
                "space-between",
              background:
                "rgba(240,236,227,0.012)",
            }}
          >
            <div>
              <Label
                number="04"
                text="Product Study"
              />

              <h2
                style={{
                  margin:
                    "3rem 0 0",
                  fontSize:
                    "clamp(2.5rem, 6vw, 6rem)",
                  lineHeight:
                    0.9,
                  letterSpacing:
                    "-0.06em",
                }}
              >
                LESS
                <br />
                <span
                  style={{
                    color:
                      "#7DD3FC",
                  }}
                >
                  BUT
                  <br />
                  BETTER.
                </span>
              </h2>
            </div>

            <p
              style={{
                margin: 0,
                maxWidth:
                  300,
                color:
                  "rgba(240,236,227,0.42)",
                fontSize:
                  "0.85rem",
                lineHeight:
                  1.7,
              }}
            >
              Product direction built around
              material, silhouette, reflection
              and controlled presentation.
            </p>
          </div>

          <MainImage
            src={project.image}
            alt={project.title}
            className="glass-main-image"
          />
        </div>
      </section>

      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding:
            "0 5vw 120px",
        }}
      >
        <div
          className="glass-specs"
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "repeat(4,1fr)",
            borderTop:
              "1px solid rgba(240,236,227,0.08)",
            borderBottom:
              "1px solid rgba(240,236,227,0.08)",
          }}
        >
          {[
            ["01", "Material", "Glass"],
            ["02", "Direction", "Minimal"],
            ["03", "Mood", "Futuristic"],
            ["04", "Focus", "Form"],
          ].map(
            ([num, title, value]) => (
              <div
                key={num}
                style={{
                  padding:
                    "1.5rem",
                  borderRight:
                    "1px solid rgba(240,236,227,0.08)",
                }}
              >
                <div
                  style={{
                    color:
                      "#7DD3FC",
                    fontSize:
                      "0.6rem",
                    marginBottom:
                      "2rem",
                  }}
                >
                  {num}
                </div>

                <div
                  style={{
                    color:
                      "rgba(240,236,227,0.38)",
                    fontSize:
                      "0.66rem",
                    letterSpacing:
                      "0.12em",
                    textTransform:
                      "uppercase",
                  }}
                >
                  {title}
                </div>

                <div
                  style={{
                    marginTop:
                      "0.55rem",
                    fontSize:
                      "0.9rem",
                    fontWeight:
                      600,
                  }}
                >
                  {value}
                </div>
              </div>
            )
          )}
        </div>

        <div
          style={{
            marginTop:
              "7rem",
            display:
              "grid",
            gridTemplateColumns:
              "0.8fr 1.2fr",
            gap:
              "5rem",
            alignItems:
              "end",
          }}
          className="glass-copy"
        >
          <div>
            <Label
              number="05"
              text="Material"
            />

            <p
              style={{
                margin: 0,
                fontSize:
                  "clamp(2rem, 4vw, 4.2rem)",
                lineHeight:
                  1,
                letterSpacing:
                  "-0.05em",
                fontWeight:
                  700,
              }}
            >
              Transparency becomes
              <span
                style={{
                  color:
                    "#7DD3FC",
                }}
              >
                {" "}
                structure.
              </span>
            </p>
          </div>

          <p
            style={{
              margin: 0,
              maxWidth:
                580,
              color:
                "rgba(240,236,227,0.5)",
              fontSize:
                "0.95rem",
              lineHeight:
                1.8,
            }}
          >
            {project.approach}
          </p>
        </div>

        <div
          style={{
            marginTop:
              "8rem",
            padding:
              "5rem 0",
            borderTop:
              "1px solid rgba(240,236,227,0.08)",
            borderBottom:
              "1px solid rgba(240,236,227,0.08)",
          }}
        >
          <p
            style={{
              maxWidth:
                1000,
              margin: 0,
              fontSize:
                "clamp(2rem, 4.5vw, 4.7rem)",
              lineHeight:
                1,
              letterSpacing:
                "-0.055em",
              fontWeight:
                700,
            }}
          >
            {project.statement}
          </p>
        </div>
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// AFTERIMAGE
// ─────────────────────────────────────────────────────────────────────────────

function AfterimageLayout({
  project,
}: {
  project: (typeof projects)["afterimage"];
}) {
  return (
    <>
      <section
        style={{
          maxWidth: 1450,
          margin: "0 auto",
          padding:
            "0 5vw 110px",
        }}
      >
        <MainImage
          src={project.image}
          alt={project.title}
          className="afterimage-main"
        />
      </section>

      <section
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          padding:
            "0 5vw 130px",
        }}
      >
        <div
          style={{
            borderTop:
              "1px solid rgba(240,236,227,0.08)",
            paddingTop:
              "5rem",
          }}
        >
          <Label
            number="04"
            text="Visual Language"
          />

          <div
            className="afterimage-grid"
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "minmax(0,1.2fr) minmax(280px,0.8fr)",
              gap:
                "3rem",
              alignItems:
                "end",
            }}
          >
            <div>
              <h2
                style={{
                  margin:
                    0,
                  fontSize:
                    "clamp(2.8rem, 6vw, 6rem)",
                  lineHeight:
                    0.88,
                  letterSpacing:
                    "-0.06em",
                  fontWeight:
                    800,
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
                margin:
                  0,
                color:
                  "rgba(240,236,227,0.5)",
                fontSize:
                  "0.92rem",
                lineHeight:
                  1.75,
              }}
            >
              {project.approach}
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop:
              "5rem",
            display:
              "grid",
            gridTemplateColumns:
              "1.4fr 0.6fr",
            gap:
              "1rem",
          }}
          className="afterimage-gallery"
        >
          <MainImage
            src={project.image}
            alt={`${project.title} direction`}
          />

          <div
            style={{
              display:
                "grid",
              gridTemplateRows:
                "1fr 1fr",
              gap:
                "1rem",
            }}
          >
            <MainImage
              src={project.image}
              alt={`${project.title} detail one`}
            />

            <MainImage
              src={project.image}
              alt={`${project.title} detail two`}
            />
          </div>
        </div>

        <div
          style={{
            marginTop:
              "7rem",
            padding:
              "5rem 0",
            borderTop:
              "1px solid rgba(240,236,227,0.08)",
            borderBottom:
              "1px solid rgba(240,236,227,0.08)",
          }}
        >
          <div
            className="afterimage-mood"
            style={{
              display:
                "grid",
              gridTemplateColumns:
                "0.7fr 1.3fr",
              gap:
                "4rem",
            }}
          >
            <div>
              <Label
                number="05"
                text="Mood"
              />
            </div>

            <p
              style={{
                margin: 0,
                fontSize:
                  "clamp(2rem, 4vw, 4.3rem)",
                lineHeight:
                  1.02,
                letterSpacing:
                  "-0.05em",
                fontWeight:
                  700,
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
      </section>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Page
// ─────────────────────────────────────────────────────────────────────────────

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const project =
    projects[slug as LayoutType];

  if (!project) {
    notFound();
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#060608",
        color: "#F0ECE3",
        fontFamily:
          "Arial, Helvetica, sans-serif",
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

        .list-item {
          transition:
            color .2s ease,
            padding-left .2s ease,
            border-color .2s ease;
        }

        .list-item:hover {
          color: #7DD3FC !important;
          padding-left: .35rem !important;
          border-color:
            rgba(125,211,252,0.25) !important;
        }

        .main-image {
          aspect-ratio: 16 / 9;
        }

        .main-image img {
          transition:
            transform .8s cubic-bezier(.22,1,.36,1);
        }

        .main-image:hover img {
          transform: scale(1.025);
        }

        @media (max-width: 900px) {
          .info-grid {
            grid-template-columns:
              1fr !important;
            gap:
              3rem !important;
          }

          .info-grid.three {
            grid-template-columns:
              1fr !important;
          }

          .concrete-grid {
            grid-template-columns:
              1fr !important;
          }

          .concrete-grid > div:first-child {
            position:
              static !important;
          }

          .deep-intro {
            grid-template-columns:
              1fr !important;
          }

          .deep-cards {
            grid-template-columns:
              1fr !important;
          }

          .glass-hero {
            grid-template-columns:
              1fr !important;
          }

          .glass-main-image {
            min-height:
              520px;
          }

          .glass-specs {
            grid-template-columns:
              1fr 1fr !important;
          }

          .glass-copy {
            grid-template-columns:
              1fr !important;
          }

          .afterimage-grid {
            grid-template-columns:
              1fr !important;
          }

          .afterimage-mood {
            grid-template-columns:
              1fr !important;
          }
        }

        @media (max-width: 700px) {
          .case-nav {
            padding:
              1rem 1.25rem !important;
          }

          .case-nav-title {
            display:
              none !important;
          }

          .case-hero {
            padding:
              130px 1.25rem 45px !important;
          }

          .case-body {
            padding:
              70px 1.25rem 100px !important;
          }

          .case-title {
            font-size:
              clamp(3.2rem, 17vw, 7rem) !important;
          }

          .main-image {
            aspect-ratio:
              4 / 3;
          }

          .afterimage-main,
          .glass-main-image {
            aspect-ratio:
              4 / 3 !important;
          }

          .glass-main-image {
            min-height:
              auto !important;
          }

          .glass-specs {
            grid-template-columns:
              1fr !important;
          }

          .glass-specs > div {
            border-right:
              none !important;
            border-bottom:
              1px solid rgba(240,236,227,0.08);
          }

          .deep-columns {
            grid-template-columns:
              1fr !important;
          }

          .case-bottom {
            flex-direction:
              column !important;
            align-items:
              flex-start !important;
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
          justifyContent:
            "space-between",
          alignItems: "center",
          padding:
            "1.35rem 3rem",
          borderBottom:
            "1px solid rgba(240,236,227,0.06)",
          backdropFilter:
            "blur(20px)",
          background:
            "rgba(6,6,8,0.78)",
        }}
      >
        <a
          href="/"
          className="case-link"
          style={{
            color: "#7DD3FC",
            textDecoration:
              "none",
            fontSize:
              "0.86rem",
            fontWeight: 800,
            letterSpacing:
              "-0.03em",
          }}
        >
          MALLORD
        </a>

        <span
          className="case-nav-title"
          style={{
            color:
              "rgba(240,236,227,0.25)",
            fontSize:
              "0.62rem",
            letterSpacing:
              "0.16em",
            textTransform:
              "uppercase",
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
            textDecoration:
              "none",
            fontSize:
              "0.67rem",
            letterSpacing:
              "0.12em",
            textTransform:
              "uppercase",
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
          padding:
            "160px 5vw 55px",
        }}
      >
        <div
          className="case-header"
          style={{
            display:
              "grid",
            gridTemplateColumns:
              "minmax(0,1.1fr) minmax(280px,0.9fr)",
            gap:
              "5rem",
            alignItems:
              "end",
            marginBottom:
              "3.5rem",
          }}
        >
          <div>
            <div
              style={{
                display:
                  "flex",
                alignItems:
                  "center",
                gap:
                  "0.8rem",
                marginBottom:
                  "1.35rem",
                color:
                  "#7DD3FC",
                fontSize:
                  "0.65rem",
                letterSpacing:
                  "0.18em",
                textTransform:
                  "uppercase",
              }}
            >
              <span>
                {project.number}
              </span>

              <span
                style={{
                  width: 35,
                  height: 1,
                  background:
                    "#7DD3FC",
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
                lineHeight:
                  0.82,
                letterSpacing:
                  "-0.075em",
                fontWeight:
                  900,
              }}
            >
              {project.title}
            </h1>
          </div>

          <div>
            <p
              style={{
                maxWidth:
                  470,
                margin: 0,
                color:
                  "rgba(240,236,227,0.54)",
                fontSize:
                  "0.98rem",
                lineHeight:
                  1.8,
              }}
            >
              {project.intro}
            </p>

            <Tags
              items={
                project.tags
              }
            />
          </div>
        </div>
      </section>

      {/* SHARED INFO */}

      <SharedInfo
        project={
          project
        }
      />

      {/* UNIQUE LAYOUT */}

      {project.layout ===
        "afterimage" && (
        <AfterimageLayout
          project={
            project
          }
        />
      )}

      {project.layout ===
        "concrete" && (
        <ConcreteLayout
          project={
            project
          }
        />
      )}

      {project.layout ===
        "deep-blue" && (
        <DeepBlueLayout
          project={
            project
          }
        />
      )}

      {project.layout ===
        "glass-object" && (
        <GlassObjectLayout
          project={
            project
          }
        />
      )}

      {/* FOOTER CTA */}

      <section
        style={{
          maxWidth: 1250,
          margin: "0 auto",
          padding:
            "0 5vw 120px",
        }}
      >
        <div
          className="case-bottom"
          style={{
            paddingTop:
              "1.5rem",
            borderTop:
              "1px solid rgba(240,236,227,0.08)",
            display:
              "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            gap:
              "2rem",
          }}
        >
          <span
            style={{
              color:
                "rgba(240,236,227,0.22)",
              fontSize:
                "0.64rem",
              letterSpacing:
                "0.11em",
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
              color:
                "#7DD3FC",
              textDecoration:
                "none",
              fontSize:
                "0.67rem",
              letterSpacing:
                "0.13em",
              textTransform:
                "uppercase",
            }}
          >
            Start a project →
          </a>
        </div>
      </section>
    </main>
  );
}