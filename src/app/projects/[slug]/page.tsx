import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type LayoutType =
  | "afterimage"
  | "concrete"
  | "deep-blue"
  | "glass-object";

interface ProjectData {
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

const projects: Record<LayoutType, ProjectData> = {
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
    tags: ["AI", "Digital Art", "Experiment", "Visual"],
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
    tags: ["3D", "Product", "Minimal", "Visual"],
    statement: "Minimalism is not empty. It is controlled.",
    layout: "glass-object",
  },
};

const projectSlugs = Object.keys(projects) as LayoutType[];

export function generateStaticParams() {
  return projectSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug as LayoutType];

  if (!project) {
    return {
      title: "Project — MALLORD",
      description: "Selected creative work by MALLORD.",
    };
  }

  return {
    title: `${project.title} — MALLORD`,
    description: project.intro,
    alternates: {
      canonical: `/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} — MALLORD`,
      description: project.intro,
      type: "article",
      images: [
        {
          url: project.image,
          alt: `${project.title} — MALLORD`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — MALLORD`,
      description: project.intro,
      images: [project.image],
    },
  };
}

function Label({ number, text }: { number: string; text: string }) {
  return (
    <div className="case-label">
      <span className="case-label-number">{number}</span>
      <span className="case-label-line" />
      <span className="case-label-text">{text}</span>
    </div>
  );
}

function Tags({ items }: { items: string[] }) {
  return (
    <div className="case-tags">
      {items.map((tag) => (
        <span key={tag}>{tag}</span>
      ))}
    </div>
  );
}

function MainImage({
  src,
  alt,
  className = "",
  sizes = "100vw",
  priority = false,
  objectPosition,
  style,
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectPosition?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`main-image ${className}`} style={style}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="main-image-img"
        style={{ objectPosition }}
      />
    </div>
  );
}

function SharedInfo({ project }: { project: ProjectData }) {
  return (
    <section className="shared-info">
      <div className="info-grid overview-grid">
        <div>
          <Label number="00" text="Overview" />
          <p className="overview-text">{project.overview}</p>
        </div>

        <div>
          <Label number="ROLE" text="What I Did" />
          <div className="line-list">
            {project.role.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>

      <div className="info-grid detail-grid">
        <div>
          <Label number="01" text="Challenge" />
          <p className="detail-text">{project.challenge}</p>
        </div>

        <div>
          <Label number="02" text="Approach" />
          <p className="detail-text">{project.approach}</p>
        </div>

        <div>
          <Label number="03" text="Deliverables" />
          <div className="line-list">
            {project.deliverables.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatementSection({
  text,
  inline = false,
}: {
  text: string;
  inline?: boolean;
}) {
  return (
    <div className={inline ? "statement-section inline" : "statement-section"}>
      <p>{text}</p>
    </div>
  );
}

function AfterimageLayout({ project }: { project: ProjectData }) {
  return (
    <>
      <section className="wide-media-section afterimage-hero-section">
        <div className="afterimage-hero-frame">
          <MainImage
            src={project.image}
            alt={`${project.title} cinematic direction`}
            sizes="(max-width: 900px) 90vw, 1350px"
            priority
            className="afterimage-hero-image"
          />
          <div className="afterimage-hero-gradient" />
          <div className="afterimage-hero-meta">
            <span>AFTERIMAGE / 01</span>
            <span>Cinematic visual study</span>
          </div>
        </div>
      </section>

      <section className="layout-section afterimage-section">
        <div className="afterimage-head">
          <div>
            <Label number="04" text="Visual Language" />
            <h2>
              LIGHT
              <br />
              BECOMES
              <br />
              <span>MOTION.</span>
            </h2>
          </div>

          <p className="detail-text">{project.approach}</p>
        </div>

        <div className="afterimage-detail-grid">
          <MainImage
            src={project.image}
            alt={`${project.title} light detail`}
            sizes="(max-width: 900px) 90vw, 850px"
            className="afterimage-large-detail"
            objectPosition="34% center"
            style={{
              aspectRatio: "1 / 1.08",
            }}
          />

          <div className="afterimage-cards">
            <article>
              <div className="detail-card-index">01</div>
              <Label number="" text="Atmosphere" />
              <p>
                Cold light.
                <br />
                Deep shadows.
              </p>
              <span className="detail-card-line" />
            </article>

            <article>
              <div className="detail-card-index">02</div>
              <Label number="" text="Direction" />
              <p>
                Residual
                <br />
                <span>motion.</span>
              </p>
              <span className="detail-card-line" />
            </article>
          </div>
        </div>

        <div className="afterimage-crops">
          <div className="crop-frame">
            <MainImage
              src={project.image}
              alt={`${project.title} shadow detail`}
              sizes="(max-width: 900px) 90vw, 600px"
              objectPosition="73% 45%"
            />
            <span>DETAIL / 02 — MOTION</span>
          </div>

          <div className="crop-frame low">
            <MainImage
              src={project.image}
              alt={`${project.title} dark detail`}
              sizes="(max-width: 900px) 90vw, 600px"
              objectPosition="25% 78%"
            />
            <span>DETAIL / 03 — SHADOW</span>
          </div>
        </div>

        <div className="afterimage-system-block">
          <Label number="05" text="Art Direction System" />
          <div className="afterimage-system-grid">
            {[
              ["01", "COLD LIGHT", "Blue highlights define the visual temperature."],
              ["02", "DEEP SHADOW", "Negative space keeps the frame cinematic."],
              ["03", "RESIDUAL MOTION", "Static frames imply movement through composition."],
            ].map(([num, title, text]) => (
              <article key={num}>
                <span>{num}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="afterimage-mood">
          <Label number="06" text="Mood" />
          <p>
            Cold light.
            <br />
            Deep shadows.
            <br />
            <span>Residual motion.</span>
          </p>
        </div>

        <StatementSection text={project.statement} inline />
      </section>
    </>
  );
}

function ConcreteLayout({ project }: { project: ProjectData }) {
  const visualPoints = [
    ["01", "Geometry", "Hard edges, repetition and structural rhythm."],
    ["02", "Light", "Natural contrast used as a graphic element."],
    ["03", "Silence", "Negative space keeps the composition controlled."],
  ];

  return (
    <>
      <section className="wide-media-section concrete-hero-section">
        <MainImage
          src={project.image}
          alt={`${project.title} architectural visual study`}
          sizes="(max-width: 900px) 90vw, 1350px"
          priority
          className="concrete-hero-image"
        />
      </section>

      <section className="layout-section concrete-section">
        <div className="concrete-grid">
          <div className="sticky-title">
            <Label number="04" text="Visual Language" />
            <h2>
              FORM
              <br />
              <span>/ SPACE</span>
            </h2>
            <div className="concrete-rule" />
            <span className="concrete-side-note">STRUCTURE / RHYTHM / LIGHT</span>
          </div>

          <div>
            <p className="large-copy">
              Architecture becomes graphic composition when the camera stops
              documenting and starts designing.
            </p>

            <div className="visual-points">
              {visualPoints.map(([num, title, text]) => (
                <div className="visual-point" key={num}>
                  <span>{num}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>

            <div className="concrete-composition">
              <div className="composition-window big">
                <MainImage
                  src={project.image}
                  alt={`${project.title} composition detail`}
                  sizes="(max-width: 900px) 90vw, 800px"
                  objectPosition="center 25%"
                />
                <span>FRAME / 01</span>
              </div>

              <div className="composition-column">
                <div className="composition-window small">
                  <MainImage
                    src={project.image}
                    alt={`${project.title} shadow detail`}
                    sizes="(max-width: 900px) 90vw, 420px"
                    objectPosition="72% 50%"
                  />
                  <span>FRAME / 02</span>
                </div>

                <div className="composition-mark">
                  <span>CONCRETE</span>
                  <strong>02</strong>
                  <i />
                  <em>ARCH / EDITORIAL / VISUAL</em>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="concrete-statement-band">
        <div>
          <span>FIELD NOTE / 02</span>
          <p>{project.statement}</p>
        </div>
      </section>

      <section className="layout-section concrete-closing">
        <div className="concrete-closing-grid">
          <div>
            <Label number="05" text="Editorial Logic" />
          </div>
          <div>
            <p className="closing-copy">
              The system is intentionally quiet: geometry carries hierarchy,
              light creates depth and every empty area gives the architecture
              room to speak.
            </p>
            <div className="concrete-keywords">
              {["GRID", "CONTRAST", "NEGATIVE SPACE", "RHYTHM", "PRECISION"].map(
                (item) => (
                  <span key={item}>{item}</span>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DeepBlueLayout({ project }: { project: ProjectData }) {
  const cards = [
    ["01", "LIGHT", "Controlled glow and depth."],
    ["02", "FORM", "Abstract shapes as identity."],
    ["03", "DEPTH", "Layered space and atmosphere."],
    ["04", "RHYTHM", "A visual language ready for motion."],
  ];

  return (
    <>
      <section className="deep-hero">
        <div className="deep-glow" />
        <div className="deep-grid-lines" />

        <div className="deep-orbit orbit-a" />
        <div className="deep-orbit orbit-b" />
        <div className="deep-orbit orbit-c" />

        <div className="deep-circle">
          <Image
            src={project.image}
            alt={`${project.title} experimental digital artwork`}
            fill
            priority
            sizes="(max-width: 900px) 88vw, 960px"
            className="deep-image"
          />

          <div className="deep-ring ring-one" />
          <div className="deep-ring ring-two" />
          <div className="deep-ring ring-three" />
        </div>

        <div className="deep-hero-label">03 / AI VISUAL SYSTEM</div>

        <div className="deep-hero-meta">
          <span>Experimental visual system</span>
          <span>AI / Digital / 03</span>
        </div>
      </section>

      <section className="layout-section deep-section">
        <div className="deep-intro">
          <div>
            <Label number="04" text="System" />
            <span className="deep-side-code">DB / 03 / SYSTEM</span>
          </div>

          <div>
            <h2 className="deep-heading">
              AN IMAGE
              <br />
              <span>BECOMES A WORLD.</span>
            </h2>

            <div className="deep-columns">
              <p className="detail-text">{project.approach}</p>
              <p className="detail-text">
                The same visual language can expand into covers, social assets,
                campaign frames and motion pieces. The objective is
                consistency, not repetition.
              </p>
            </div>
          </div>
        </div>

        <div className="deep-spectrum">
          <div className="deep-spectrum-line" />
          <span>LOW CONTRAST</span>
          <span>LOW SATURATION</span>
          <strong>LIGHT / FORM / DEPTH</strong>
          <span>HIGH GLOW</span>
        </div>

        <div className="deep-cards">
          {cards.map(([num, title, text]) => (
            <article key={num}>
              <span>{num}</span>
              <strong>{title}</strong>
              <p>{text}</p>
              <div className="deep-card-orb" />
            </article>
          ))}
        </div>

        <div className="deep-final-grid">
          <div>
            <Label number="05" text="Visual Vocabulary" />
          </div>

          <div>
            <p className="deep-final-copy">
              Cool tonal range, luminous material, controlled depth and repeated
              visual cues turn isolated generations into one recognisable world.
            </p>

            <div className="deep-tags">
              {["LUMINOUS", "ABSTRACT", "COOL TONAL RANGE", "DEPTH", "MOTION READY"].map(
                (item) => (
                  <span key={item}>{item}</span>
                ),
              )}
            </div>
          </div>
        </div>

        <StatementSection text={project.statement} inline />
      </section>
    </>
  );
}

function GlassObjectLayout({ project }: { project: ProjectData }) {
  const specs = [
    ["01", "Material", "Glass"],
    ["02", "Direction", "Minimal"],
    ["03", "Mood", "Futuristic"],
    ["04", "Focus", "Form"],
  ];

  return (
    <>
      <section className="wide-media-section glass-hero-section">
        <div className="glass-hero">
          <div className="glass-intro-panel">
            <div>
              <Label number="04" text="Product Study" />
              <h2>
                LESS
                <br />
                <span>BUT</span>
                <br />
                <span>BETTER.</span>
              </h2>
            </div>

            <div className="glass-panel-bottom">
              <p>
                Product direction built around material, silhouette, reflection
                and controlled presentation.
              </p>
              <span>GLASS OBJECT / 04</span>
            </div>
          </div>

          <MainImage
            src={project.image}
            alt={`${project.title} product concept`}
            className="glass-main-image"
            sizes="(max-width: 900px) 90vw, 900px"
            priority
          />
        </div>
      </section>

      <section className="layout-section glass-section">
        <div className="glass-specs">
          {specs.map(([num, title, value]) => (
            <div key={num}>
              <span>{num}</span>
              <small>{title}</small>
              <strong>{value}</strong>
            </div>
          ))}
        </div>

        <div className="glass-copy">
          <div>
            <Label number="05" text="Material" />
            <p>
              Transparency becomes <span>structure.</span>
            </p>
          </div>

          <p className="detail-text">{project.approach}</p>
        </div>

        <div className="glass-material-grid">
          <div className="glass-material-card tall">
            <div className="glass-card-visual glass-crosshair">
              <span />
              <i />
            </div>
            <div>
              <Label number="01" text="Silhouette" />
              <p>Precise contours keep the object recognisable from every crop.</p>
            </div>
          </div>

          <div className="glass-material-column">
            <div className="glass-material-card">
              <div className="glass-card-visual glass-lines">
                <span />
                <span />
                <span />
              </div>
              <div>
                <Label number="02" text="Reflection" />
                <p>Light reveals the material instead of competing with it.</p>
              </div>
            </div>

            <div className="glass-material-card dark">
              <div className="glass-card-visual glass-dot-grid" />
              <div>
                <Label number="03" text="Negative Space" />
                <p>The frame stays quiet so the material carries the visual.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="glass-quote-band">
          <span>PRODUCT / MATERIAL / CONTROL</span>
          <p>Good product direction makes the object feel inevitable.</p>
        </div>

        <StatementSection text={project.statement} inline />
      </section>
    </>
  );
}

function ProjectNavigation({ currentSlug }: { currentSlug: LayoutType }) {
  const currentIndex = projectSlugs.indexOf(currentSlug);
  const previousSlug = currentIndex > 0 ? projectSlugs[currentIndex - 1] : null;
  const nextSlug =
    currentIndex < projectSlugs.length - 1
      ? projectSlugs[currentIndex + 1]
      : null;

  return (
    <section className="project-navigation-section">
      <div className="case-bottom">
        {previousSlug ? (
          <a
            href={`/projects/${previousSlug}`}
            className="case-link case-prev"
          >
            ← Previous
          </a>
        ) : (
          <span />
        )}

        <a href="/#projects" className="case-link case-all">
          All projects
        </a>

        {nextSlug ? (
          <a
            href={`/projects/${nextSlug}`}
            className="case-link case-next"
          >
            Next project →
          </a>
        ) : (
          <a href="/#contact" className="case-link case-next">
            Start a project →
          </a>
        )}
      </div>
    </section>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug as LayoutType];

  if (!project) {
    notFound();
  }

  return (
    <main className="case-page">
      <style>{`
        * { box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        body { margin: 0; background: #060608; color: #F0ECE3; }
        a { -webkit-tap-highlight-color: transparent; }

        .case-page {
          min-height: 100vh;
          overflow-x: hidden;
          background: #060608;
          color: #F0ECE3;
          font-family: Arial, Helvetica, sans-serif;
        }

        .case-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: space-between;
          min-height: 72px;
          padding: 0 3rem;
          border-bottom: 1px solid rgba(240,236,227,0.06);
          background: rgba(6,6,8,0.8);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }

        .case-logo {
          color: #7DD3FC;
          text-decoration: none;
          font-size: .86rem;
          font-weight: 800;
          letter-spacing: -.03em;
        }

        .case-nav-title,
        .case-nav-back {
          color: rgba(240,236,227,.3);
          font-size: .61rem;
          letter-spacing: .14em;
          text-transform: uppercase;
          text-decoration: none;
        }

        .case-nav-back {
          color: rgba(240,236,227,.58);
          transition: color .2s ease, transform .2s ease;
        }

        .case-nav-back:hover {
          color: #7DD3FC;
          transform: translateX(-3px);
        }

        .case-link {
          transition: color .2s ease, transform .2s ease;
        }

        .case-link:hover { color: #7DD3FC !important; }
        .case-prev:hover { transform: translateX(-4px); }
        .case-next:hover { transform: translateX(4px); }

        .case-hero {
          max-width: 1450px;
          margin: 0 auto;
          padding: 158px 5vw 58px;
        }

        .case-header {
          display: grid;
          grid-template-columns: minmax(0,1.1fr) minmax(280px,.9fr);
          gap: 5rem;
          align-items: end;
        }

        .case-kicker {
          display: flex;
          align-items: center;
          gap: .8rem;
          margin-bottom: 1.35rem;
          color: #7DD3FC;
          font-size: .64rem;
          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .case-kicker-line { width: 35px; height: 1px; background: #7DD3FC; }
        .case-kicker-category { color: rgba(240,236,227,.39); }

        .case-title {
          margin: 0;
          font-size: clamp(4rem, 11vw, 10rem);
          line-height: .82;
          letter-spacing: -.075em;
          font-weight: 900;
        }

        .case-intro {
          max-width: 470px;
          margin: 0;
          color: rgba(240,236,227,.54);
          font-size: .97rem;
          line-height: 1.8;
        }

        .case-label {
          display: flex;
          align-items: center;
          gap: .7rem;
          margin-bottom: 1.1rem;
          color: #7DD3FC;
          font-size: .61rem;
          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .case-label-number { min-width: 26px; }
        .case-label-line { width: 25px; height: 1px; background: #7DD3FC; }
        .case-label-text { color: rgba(240,236,227,.38); }

        .case-tags {
          display: flex;
          flex-wrap: wrap;
          gap: .45rem;
          margin-top: 1.25rem;
        }

        .case-tags span {
          padding: .35rem .6rem;
          border: 1px solid rgba(240,236,227,.12);
          color: rgba(240,236,227,.4);
          font-size: .56rem;
          letter-spacing: .09em;
          text-transform: uppercase;
        }

        .shared-info {
          max-width: 1250px;
          margin: 0 auto;
          padding: 0 5vw 125px;
        }

        .info-grid {
          display: grid;
        }

        .overview-grid {
          grid-template-columns: minmax(0,1fr) minmax(230px,.4fr);
          gap: 5rem;
          padding: 5.5rem 0 5.5rem;
          border-top: 1px solid rgba(240,236,227,.08);
          border-bottom: 1px solid rgba(240,236,227,.08);
        }

        .overview-text {
          max-width: 900px;
          margin: 0;
          color: rgba(240,236,227,.79);
          font-size: clamp(1.5rem,3vw,2.7rem);
          line-height: 1.18;
          letter-spacing: -.035em;
          font-weight: 600;
        }

        .detail-grid {
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 4rem;
          padding: 5.5rem 0 0;
        }

        .detail-text {
          margin: 0;
          color: rgba(240,236,227,.59);
          font-size: .88rem;
          line-height: 1.82;
        }

        .line-list > div {
          padding: .72rem 0;
          border-bottom: 1px solid rgba(240,236,227,.08);
          color: rgba(240,236,227,.62);
          font-size: .83rem;
          transition: color .2s ease, padding-left .2s ease, border-color .2s ease;
        }

        .line-list > div:hover {
          padding-left: .35rem;
          color: #7DD3FC;
          border-color: rgba(125,211,252,.23);
        }

        .wide-media-section {
          max-width: 1450px;
          margin: 0 auto;
          padding: 0 5vw 110px;
        }

        .main-image {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #0A0A0D;
          border: 1px solid rgba(240,236,227,.08);
          aspect-ratio: 16 / 9;
        }

        .main-image-img {
          object-fit: cover;
          transition: transform .8s cubic-bezier(.22,1,.36,1), filter .35s ease;
        }

        .main-image:hover .main-image-img { transform: scale(1.02); }

        .layout-section {
          max-width: 1250px;
          margin: 0 auto;
          padding: 0 5vw 130px;
        }

        /* AFTERIMAGE */
        .afterimage-hero-section { padding-bottom: 110px; }

        .afterimage-hero-frame {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(240,236,227,.08);
        }

        .afterimage-hero-frame .main-image {
          border: 0;
          aspect-ratio: 16 / 9;
        }

        .afterimage-hero-gradient {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(180deg, rgba(6,6,8,.02), rgba(6,6,8,.05) 45%, rgba(6,6,8,.58));
        }

        .afterimage-hero-meta {
          position: absolute;
          left: 1.6rem;
          right: 1.6rem;
          bottom: 1.25rem;
          display: flex;
          justify-content: space-between;
          gap: 1rem;
          color: rgba(240,236,227,.62);
          font-size: .57rem;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .afterimage-head {
          display: grid;
          grid-template-columns: minmax(0,1.2fr) minmax(280px,.8fr);
          gap: 4rem;
          align-items: end;
          padding-top: 5rem;
          border-top: 1px solid rgba(240,236,227,.08);
        }

        .afterimage-head h2 {
          margin: 0;
          font-size: clamp(3rem,7vw,7rem);
          line-height: .84;
          letter-spacing: -.07em;
          font-weight: 800;
        }

        .afterimage-head h2 span { color: #7DD3FC; }

        .afterimage-detail-grid {
          display: grid;
          grid-template-columns: minmax(0,1.35fr) minmax(300px,.65fr);
          gap: 1rem;
          margin-top: 5rem;
        }

        .afterimage-large-detail { min-height: 650px; }

        .afterimage-cards {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 1rem;
        }

        .afterimage-cards article {
          position: relative;
          min-height: 300px;
          padding: 1.7rem;
          overflow: hidden;
          border: 1px solid rgba(240,236,227,.08);
          background: linear-gradient(145deg, rgba(125,211,252,.025), rgba(240,236,227,.01));
        }

        .afterimage-cards .case-label { margin-bottom: 0; }
        .detail-card-index { color: rgba(240,236,227,.22); font-size: .58rem; margin-bottom: 3rem; }
        .afterimage-cards article p {
          margin: 2.2rem 0 0;
          font-size: clamp(1.6rem,3vw,2.7rem);
          line-height: .95;
          letter-spacing: -.045em;
          font-weight: 700;
        }
        .afterimage-cards article p span { color: #7DD3FC; }
        .detail-card-line { position: absolute; left: 1.7rem; bottom: 1.7rem; width: 48px; height: 1px; background: #7DD3FC; }

        .afterimage-crops {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 1rem;
        }

        .crop-frame {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(240,236,227,.08);
        }
        .crop-frame .main-image { aspect-ratio: 16 / 10; border: 0; }
        .crop-frame.low .main-image { filter: brightness(.8) saturate(.85); }
        .crop-frame > span {
          position: absolute;
          left: 1rem;
          bottom: .9rem;
          color: rgba(240,236,227,.55);
          font-size: .55rem;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .afterimage-system-block {
          margin-top: 7rem;
          padding-top: 3rem;
          border-top: 1px solid rgba(240,236,227,.08);
        }

        .afterimage-system-grid {
          display: grid;
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 1px;
          margin-top: 2.5rem;
          background: rgba(240,236,227,.08);
        }

        .afterimage-system-grid article {
          min-height: 235px;
          padding: 1.8rem;
          background: #08080A;
        }
        .afterimage-system-grid article > span { color: #7DD3FC; font-size: .58rem; }
        .afterimage-system-grid h3 { margin: 3.8rem 0 .75rem; font-size: 1rem; letter-spacing: -.02em; }
        .afterimage-system-grid p { max-width: 280px; margin: 0; color: rgba(240,236,227,.37); font-size: .78rem; line-height: 1.65; }

        .afterimage-mood {
          display: grid;
          grid-template-columns: .7fr 1.3fr;
          gap: 4rem;
          margin-top: 6rem;
          padding: 5rem 0;
          border-top: 1px solid rgba(240,236,227,.08);
          border-bottom: 1px solid rgba(240,236,227,.08);
        }
        .afterimage-mood p { margin: 0; font-size: clamp(2rem,4vw,4.4rem); line-height: 1; letter-spacing: -.05em; font-weight: 700; }
        .afterimage-mood p span { color: rgba(125,211,252,.72); }

        /* CONCRETE */
        .concrete-hero-image { aspect-ratio: 16 / 10; }

        .concrete-grid {
          display: grid;
          grid-template-columns: .7fr 1.3fr;
          gap: 5rem;
          align-items: start;
        }
        .sticky-title { position: sticky; top: 110px; }
        .sticky-title h2 { margin: 0; font-size: clamp(3rem,6.5vw,6.6rem); line-height: .84; letter-spacing: -.065em; }
        .sticky-title h2 span { color: #7DD3FC; }
        .concrete-rule { width: 72px; height: 1px; margin-top: 2rem; background: #7DD3FC; }
        .concrete-side-note { display: block; margin-top: 1rem; color: rgba(240,236,227,.2); font-size: .54rem; letter-spacing: .12em; line-height: 1.7; }
        .large-copy { margin: 0; font-size: clamp(1.5rem,3vw,2.55rem); line-height: 1.16; letter-spacing: -.035em; color: rgba(240,236,227,.85); }
        .visual-points { margin-top: 4rem; border-top: 1px solid rgba(240,236,227,.08); }
        .visual-point { display: grid; grid-template-columns: 45px 170px 1fr; gap: 1rem; align-items: start; padding: 1.25rem 0; border-bottom: 1px solid rgba(240,236,227,.08); }
        .visual-point > span { color: #7DD3FC; font-size: .6rem; }
        .visual-point strong { font-size: .88rem; }
        .visual-point p { margin: 0; color: rgba(240,236,227,.39); font-size: .78rem; line-height: 1.55; }
        .concrete-composition { display: grid; grid-template-columns: 1.25fr .75fr; gap: 1rem; margin-top: 5rem; }
        .composition-window { position: relative; overflow: hidden; border: 1px solid rgba(240,236,227,.08); }
        .composition-window .main-image { border: 0; }
        .composition-window.big .main-image { aspect-ratio: 4 / 5; }
        .composition-window.small .main-image { aspect-ratio: 1 / 1; }
        .composition-window > span { position: absolute; left: 1rem; bottom: .85rem; color: rgba(240,236,227,.5); font-size: .54rem; letter-spacing: .12em; }
        .composition-column { display: grid; grid-template-rows: 1fr 1fr; gap: 1rem; }
        .composition-mark { display: flex; flex-direction: column; justify-content: space-between; padding: 1.5rem; border: 1px solid rgba(240,236,227,.08); background: #08080A; }
        .composition-mark span { color: rgba(240,236,227,.22); font-size: .56rem; letter-spacing: .13em; }
        .composition-mark strong { font-size: clamp(4rem,8vw,7rem); line-height: .8; letter-spacing: -.07em; color: #7DD3FC; }
        .composition-mark i { width: 36px; height: 1px; background: rgba(240,236,227,.25); }
        .composition-mark em { color: rgba(240,236,227,.24); font-size: .53rem; font-style: normal; letter-spacing: .1em; }
        .concrete-statement-band { padding: 7rem 5vw; border-top: 1px solid rgba(240,236,227,.08); border-bottom: 1px solid rgba(240,236,227,.08); }
        .concrete-statement-band > div { max-width: 1250px; margin: 0 auto; display: grid; grid-template-columns: .7fr 1.3fr; gap: 4rem; }
        .concrete-statement-band span { color: #7DD3FC; font-size: .56rem; letter-spacing: .13em; }
        .concrete-statement-band p { margin: 0; max-width: 900px; font-size: clamp(2.2rem,4.7vw,4.8rem); line-height: 1; letter-spacing: -.055em; font-weight: 700; }
        .concrete-closing { padding-top: 7rem; }
        .concrete-closing-grid { display: grid; grid-template-columns: .7fr 1.3fr; gap: 4rem; }
        .closing-copy { max-width: 800px; margin: 0; color: rgba(240,236,227,.52); font-size: 1rem; line-height: 1.8; }
        .concrete-keywords { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 2rem; }
        .concrete-keywords span { padding: .45rem .7rem; border: 1px solid rgba(240,236,227,.1); color: rgba(240,236,227,.35); font-size: .55rem; letter-spacing: .08em; }

        /* DEEP BLUE */
        .deep-hero { position: relative; min-height: 82vh; display: flex; align-items: center; justify-content: center; overflow: hidden; border-top: 1px solid rgba(240,236,227,.05); border-bottom: 1px solid rgba(240,236,227,.05); background: radial-gradient(circle at 50% 50%, rgba(56,189,248,.08), transparent 48%); }
        .deep-glow { position: absolute; width: 650px; height: 650px; border-radius: 50%; filter: blur(120px); background: radial-gradient(circle, rgba(56,189,248,.13), transparent 70%); }
        .deep-grid-lines { position: absolute; inset: 0; opacity: .22; background-image: linear-gradient(rgba(125,211,252,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(125,211,252,.025) 1px, transparent 1px); background-size: 90px 90px; }
        .deep-circle { position: relative; width: min(940px,82vw); aspect-ratio: 1 / 1; overflow: hidden; border-radius: 50%; border: 1px solid rgba(125,211,252,.14); box-shadow: 0 0 160px rgba(56,189,248,.09); }
        .deep-image { object-fit: cover; transform: scale(1.08); }
        .deep-ring { position: absolute; border-radius: 50%; pointer-events: none; border: 1px solid rgba(165,243,252,.2); }
        .ring-one { inset: 10%; }
        .ring-two { inset: 24%; border-color: rgba(125,211,252,.16); }
        .ring-three { inset: 40%; border-color: rgba(125,211,252,.12); }
        .deep-orbit { position: absolute; width: min(1120px,94vw); aspect-ratio: 1 / 1; border-radius: 50%; border: 1px solid rgba(125,211,252,.045); pointer-events: none; }
        .orbit-a { transform: rotate(22deg) scaleX(1.45); }
        .orbit-b { transform: rotate(-18deg) scaleX(.76); }
        .orbit-c { transform: rotate(65deg) scaleY(.72); }
        .deep-hero-label { position: absolute; top: 8rem; left: 5vw; color: rgba(240,236,227,.24); font-size: .57rem; letter-spacing: .13em; }
        .deep-hero-meta { position: absolute; bottom: 2rem; left: 5vw; right: 5vw; display: flex; justify-content: space-between; gap: 1rem; color: rgba(240,236,227,.27); font-size: .57rem; letter-spacing: .13em; text-transform: uppercase; }
        .deep-intro { display: grid; grid-template-columns: .45fr 1.55fr; gap: 4rem; }
        .deep-side-code { display: block; margin-top: 3rem; color: rgba(240,236,227,.16); font-size: .54rem; letter-spacing: .11em; }
        .deep-heading { margin: 0 0 3rem; font-size: clamp(2.8rem,6.5vw,6.2rem); line-height: .88; letter-spacing: -.065em; }
        .deep-heading span { color: #7DD3FC; }
        .deep-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; }
        .deep-spectrum { position: relative; display: grid; grid-template-columns: 1fr auto auto auto; gap: 1rem; align-items: center; margin-top: 5rem; padding: 1.1rem 0; border-top: 1px solid rgba(240,236,227,.08); border-bottom: 1px solid rgba(240,236,227,.08); color: rgba(240,236,227,.2); font-size: .52rem; letter-spacing: .1em; }
        .deep-spectrum strong { color: #7DD3FC; font-size: .54rem; font-weight: 500; }
        .deep-spectrum-line { position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: linear-gradient(90deg, transparent, rgba(125,211,252,.22), transparent); pointer-events: none; }
        .deep-cards { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; margin-top: 4rem; background: rgba(240,236,227,.08); }
        .deep-cards article { position: relative; min-height: 235px; padding: 1.6rem; overflow: hidden; background: #08080A; }
        .deep-cards article > span { color: #7DD3FC; font-size: .59rem; }
        .deep-cards article strong { display: block; margin-top: 4rem; font-size: 1.35rem; letter-spacing: -.03em; }
        .deep-cards article p { max-width: 280px; margin: .7rem 0 0; color: rgba(240,236,227,.37); font-size: .78rem; line-height: 1.6; }
        .deep-card-orb { position: absolute; right: -55px; bottom: -55px; width: 160px; height: 160px; border-radius: 50%; background: radial-gradient(circle, rgba(56,189,248,.08), transparent 70%); }
        .deep-final-grid { display: grid; grid-template-columns: .45fr 1.55fr; gap: 4rem; margin-top: 7rem; padding-top: 4rem; border-top: 1px solid rgba(240,236,227,.08); }
        .deep-final-copy { max-width: 880px; margin: 0; font-size: clamp(1.7rem,3.6vw,3.6rem); line-height: 1.05; letter-spacing: -.045em; }
        .deep-tags { display: flex; flex-wrap: wrap; gap: .5rem; margin-top: 2rem; }
        .deep-tags span { padding: .45rem .72rem; border: 1px solid rgba(240,236,227,.1); color: rgba(240,236,227,.36); font-size: .55rem; letter-spacing: .08em; }

        /* GLASS */
        .glass-hero-section { padding-bottom: 120px; }
        .glass-hero { display: grid; grid-template-columns: .7fr 1.3fr; gap: 1rem; align-items: stretch; }
        .glass-intro-panel { min-height: 660px; padding: 2rem; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(240,236,227,.08); background: linear-gradient(145deg, rgba(240,236,227,.018), rgba(240,236,227,.007)); }
        .glass-intro-panel h2 { margin: 3rem 0 0; font-size: clamp(2.8rem,6vw,6.5rem); line-height: .86; letter-spacing: -.065em; }
        .glass-intro-panel h2 span { color: #7DD3FC; }
        .glass-panel-bottom p { max-width: 310px; margin: 0; color: rgba(240,236,227,.41); font-size: .82rem; line-height: 1.7; }
        .glass-panel-bottom span { display: block; margin-top: 1rem; color: rgba(240,236,227,.18); font-size: .54rem; letter-spacing: .12em; }
        .glass-main-image { min-height: 660px; aspect-ratio: auto; }
        .glass-specs { display: grid; grid-template-columns: repeat(4,1fr); border-top: 1px solid rgba(240,236,227,.08); border-bottom: 1px solid rgba(240,236,227,.08); }
        .glass-specs > div { min-height: 165px; padding: 1.5rem; border-right: 1px solid rgba(240,236,227,.08); }
        .glass-specs > div:last-child { border-right: 0; }
        .glass-specs span { display: block; color: #7DD3FC; font-size: .58rem; }
        .glass-specs small { display: block; margin-top: 2rem; color: rgba(240,236,227,.35); font-size: .59rem; letter-spacing: .11em; text-transform: uppercase; }
        .glass-specs strong { display: block; margin-top: .5rem; font-size: .86rem; }
        .glass-copy { display: grid; grid-template-columns: .8fr 1.2fr; gap: 5rem; align-items: end; margin-top: 7rem; }
        .glass-copy > div > p { margin: 0; font-size: clamp(2rem,4vw,4.25rem); line-height: 1; letter-spacing: -.05em; font-weight: 700; }
        .glass-copy > div > p span { color: #7DD3FC; }
        .glass-material-grid { display: grid; grid-template-columns: .95fr 1.05fr; gap: 1rem; margin-top: 6rem; }
        .glass-material-column { display: grid; grid-template-rows: 1fr 1fr; gap: 1rem; }
        .glass-material-card { min-height: 280px; padding: 1.5rem; display: flex; flex-direction: column; justify-content: space-between; border: 1px solid rgba(240,236,227,.08); background: rgba(240,236,227,.012); }
        .glass-material-card.tall { min-height: 570px; }
        .glass-material-card.dark { background: #08080A; }
        .glass-card-visual { position: relative; min-height: 140px; margin-bottom: 1.5rem; overflow: hidden; border: 1px solid rgba(240,236,227,.06); }
        .glass-crosshair::before, .glass-crosshair::after { content: ""; position: absolute; left: 50%; top: 50%; background: rgba(125,211,252,.18); transform: translate(-50%,-50%); }
        .glass-crosshair::before { width: 70%; height: 1px; }
        .glass-crosshair::after { width: 1px; height: 70%; }
        .glass-crosshair span { position: absolute; width: 74px; height: 74px; border: 1px solid rgba(125,211,252,.32); border-radius: 50%; left: 50%; top: 50%; transform: translate(-50%,-50%); }
        .glass-crosshair i { position: absolute; width: 10px; height: 10px; border-radius: 50%; background: #7DD3FC; left: 50%; top: 50%; transform: translate(-50%,-50%); opacity: .55; }
        .glass-lines { display: flex; align-items: flex-end; justify-content: space-around; padding: 2rem; }
        .glass-lines span { display: block; width: 1px; height: 75%; background: linear-gradient(180deg, transparent, rgba(125,211,252,.28)); transform: rotate(17deg); }
        .glass-lines span:nth-child(2) { height: 100%; }
        .glass-lines span:nth-child(3) { height: 55%; }
        .glass-dot-grid { background-image: radial-gradient(rgba(125,211,252,.24) 1px, transparent 1px); background-size: 18px 18px; opacity: .3; }
        .glass-material-card p { max-width: 360px; margin: 0; color: rgba(240,236,227,.37); font-size: .79rem; line-height: 1.65; }
        .glass-quote-band { display: flex; justify-content: space-between; gap: 2rem; align-items: end; margin-top: 7rem; padding: 2rem 0; border-top: 1px solid rgba(240,236,227,.08); border-bottom: 1px solid rgba(240,236,227,.08); }
        .glass-quote-band span { color: rgba(240,236,227,.21); font-size: .54rem; letter-spacing: .12em; }
        .glass-quote-band p { max-width: 700px; margin: 0; font-size: clamp(1.5rem,2.8vw,2.7rem); line-height: 1.08; letter-spacing: -.035em; font-weight: 600; }

        /* STATEMENT */
        .statement-section { padding: 0 0 30px; }
        .statement-section.inline { margin-top: 7rem; padding: 5rem 0; border-top: 1px solid rgba(240,236,227,.08); border-bottom: 1px solid rgba(240,236,227,.08); }
        .statement-section p { max-width: 1000px; margin: 0; font-size: clamp(2rem,4.6vw,4.7rem); line-height: 1; letter-spacing: -.055em; font-weight: 700; }

        .project-navigation-section { max-width: 1250px; margin: 0 auto; padding: 0 5vw 120px; }
        .case-bottom { display: grid; grid-template-columns: 1fr auto 1fr; align-items: center; gap: 2rem; padding-top: 1.4rem; border-top: 1px solid rgba(240,236,227,.08); }
        .case-bottom a { color: rgba(240,236,227,.5); text-decoration: none; font-size: .64rem; letter-spacing: .12em; text-transform: uppercase; }
        .case-bottom .case-all { color: rgba(240,236,227,.2); text-align: center; }
        .case-bottom .case-next { color: #7DD3FC; text-align: right; }

        @media (max-width: 1000px) {
          .case-nav { padding-inline: 1.5rem; }
          .case-nav-title { display: none; }
          .case-hero { padding-left: 4vw; padding-right: 4vw; }
          .case-header { grid-template-columns: 1fr; gap: 2rem; }
          .shared-info { padding-left: 4vw; padding-right: 4vw; }
          .overview-grid { grid-template-columns: 1fr; gap: 3rem; }
          .detail-grid { grid-template-columns: 1fr; gap: 3rem; }
          .wide-media-section, .layout-section, .project-navigation-section { padding-left: 4vw; padding-right: 4vw; }
          .afterimage-head { grid-template-columns: 1fr; gap: 2.5rem; }
          .afterimage-detail-grid { grid-template-columns: 1fr; }
          .afterimage-large-detail { min-height: 540px; }
          .concrete-grid { grid-template-columns: 1fr; gap: 3rem; }
          .sticky-title { position: static; }
          .concrete-statement-band > div, .concrete-closing-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .deep-intro, .deep-final-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          .glass-hero { grid-template-columns: 1fr; }
          .glass-intro-panel, .glass-main-image { min-height: 560px; }
          .glass-copy { grid-template-columns: 1fr; gap: 2.5rem; }
        }

        @media (max-width: 700px) {
          .case-nav { min-height: 66px; padding: 0 1.05rem; }
          .case-nav-back { font-size: .56rem; }
          .case-hero { padding-top: 125px; padding-bottom: 40px; }
          .case-title { font-size: clamp(3.2rem,16vw,7rem); }
          .case-kicker { flex-wrap: wrap; row-gap: .45rem; line-height: 1.4; }
          .case-kicker-category { max-width: 250px; }
          .shared-info { padding-bottom: 90px; }
          .overview-grid { padding-top: 4rem; padding-bottom: 4rem; }
          .overview-text { font-size: 1.35rem; }
          .detail-text { font-size: .84rem; }
          .main-image { aspect-ratio: 4 / 3; }
          .afterimage-hero-frame .main-image { aspect-ratio: 4 / 3; }
          .afterimage-hero-meta { left: .9rem; right: .9rem; bottom: .9rem; flex-direction: column; align-items: flex-start; gap: .3rem; }
          .afterimage-head h2 { font-size: clamp(2.8rem,13vw,5.7rem); }
          .afterimage-detail-grid { margin-top: 3.5rem; }
          .afterimage-large-detail { min-height: 460px; }
          .afterimage-cards article { min-height: 250px; }
          .afterimage-cards article p { margin-top: 1.8rem; }
          .afterimage-crops { grid-template-columns: 1fr; }
          .afterimage-system-grid { grid-template-columns: 1fr; }
          .afterimage-system-grid article { min-height: 190px; }
          .afterimage-mood { grid-template-columns: 1fr; gap: 2rem; }
          .afterimage-mood p { font-size: 2.4rem; }
          .visual-point { grid-template-columns: 35px 1fr; }
          .visual-point p { grid-column: 2; }
          .concrete-composition { grid-template-columns: 1fr; }
          .composition-window.big .main-image { aspect-ratio: 4 / 5; }
          .composition-column { grid-template-rows: 360px 220px; }
          .concrete-statement-band { padding: 5rem 4vw; }
          .concrete-statement-band p { font-size: 2.2rem; }
          .deep-hero { min-height: 78vh; }
          .deep-circle { width: 88vw; }
          .deep-hero-label { top: 6rem; left: 4vw; }
          .deep-hero-meta { left: 4vw; right: 4vw; flex-direction: column; gap: .4rem; }
          .deep-columns { grid-template-columns: 1fr; gap: 1.5rem; }
          .deep-spectrum { grid-template-columns: 1fr 1fr; row-gap: .75rem; }
          .deep-spectrum strong { grid-column: 1 / -1; grid-row: 1; }
          .deep-spectrum-line { display: none; }
          .deep-cards { grid-template-columns: 1fr; }
          .deep-final-copy { font-size: 1.75rem; }
          .glass-intro-panel, .glass-main-image { min-height: 470px; }
          .glass-intro-panel h2 { font-size: clamp(3rem,13vw,5.7rem); }
          .glass-specs { grid-template-columns: 1fr 1fr; }
          .glass-specs > div:nth-child(2) { border-right: 0; }
          .glass-specs > div:nth-child(-n+2) { border-bottom: 1px solid rgba(240,236,227,.08); }
          .glass-material-grid { grid-template-columns: 1fr; }
          .glass-material-column { grid-template-rows: auto auto; }
          .glass-material-card.tall { min-height: 430px; }
          .glass-quote-band { flex-direction: column; align-items: flex-start; }
          .glass-quote-band p { font-size: 1.7rem; }
          .statement-section.inline { margin-top: 5rem; padding: 4rem 0; }
          .statement-section p { font-size: 2.25rem; }
          .case-bottom { grid-template-columns: 1fr; gap: 1rem; align-items: start; }
          .case-bottom .case-all, .case-bottom .case-next { text-align: left; }
        }

        @media (max-width: 430px) {
          .case-title { font-size: 3.2rem; }
          .case-intro { font-size: .88rem; }
          .afterimage-large-detail { min-height: 400px; }
          .glass-specs { grid-template-columns: 1fr; }
          .glass-specs > div { border-right: 0 !important; border-bottom: 1px solid rgba(240,236,227,.08); }
          .glass-specs > div:last-child { border-bottom: 0; }
        }

        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; }
        }
      `}</style>

      <nav className="case-nav" aria-label="Project navigation">
        <a href="/" className="case-logo">MALLORD</a>
        <span className="case-nav-title">Selected Project / Case Study</span>
        <a href="/#projects" className="case-nav-back">← Back to work</a>
      </nav>

      <header className="case-hero">
        <div className="case-header">
          <div>
            <div className="case-kicker">
              <span>{project.number}</span>
              <span className="case-kicker-line" />
              <span className="case-kicker-category">{project.category}</span>
            </div>
            <h1 className="case-title">{project.title}</h1>
          </div>

          <div>
            <p className="case-intro">{project.intro}</p>
            <Tags items={project.tags} />
          </div>
        </div>
      </header>

      <SharedInfo project={project} />

      {project.layout === "afterimage" && <AfterimageLayout project={project} />}
      {project.layout === "concrete" && <ConcreteLayout project={project} />}
      {project.layout === "deep-blue" && <DeepBlueLayout project={project} />}
      {project.layout === "glass-object" && <GlassObjectLayout project={project} />}

      <ProjectNavigation currentSlug={project.layout} />
    </main>
  );
}
