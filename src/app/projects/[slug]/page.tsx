import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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

function Label({
  number,
  text,
}: {
  number: string;
  text: string;
}) {
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
}: {
  src: string;
  alt: string;
  className?: string;
  sizes?: string;
  priority?: boolean;
}) {
  return (
    <div className={`main-image ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className="main-image-img"
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

function ConcreteLayout({ project }: { project: ProjectData }) {
  return (
    <>
      <section className="wide-media-section">
        <MainImage
          src={project.image}
          alt={project.title}
          sizes="(max-width: 900px) 90vw, 1350px"
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
          </div>

          <div>
            <p className="large-copy">
              Architecture becomes graphic composition when the camera stops
              documenting and starts designing.
            </p>

            <div className="visual-points">
              {[
                ["01", "Geometry", "Hard edges, repetition and structural rhythm."],
                ["02", "Light", "Natural contrast used as a graphic element."],
                ["03", "Silence", "Negative space keeps the composition controlled."],
              ].map(([num, title, text]) => (
                <div className="visual-point" key={num}>
                  <span>{num}</span>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <StatementSection text={project.statement} />
    </>
  );
}

function DeepBlueLayout({ project }: { project: ProjectData }) {
  const systemCards = [
    ["01", "LIGHT", "Controlled glow and depth."],
    ["02", "FORM", "Abstract shapes as identity."],
    ["03", "DEPTH", "Layered space and atmosphere."],
    ["04", "RHYTHM", "A visual language ready for motion."],
  ];

  return (
    <>
      <section className="deep-hero">
        <div className="deep-glow" />
        <div className="deep-circle">
          <Image
            src={project.image}
            alt={project.title}
            fill
            priority
            sizes="(max-width: 900px) 88vw, 1000px"
            className="deep-image"
          />
          <div className="deep-ring ring-one" />
          <div className="deep-ring ring-two" />
        </div>

        <div className="deep-hero-meta">
          <span>Experimental visual system</span>
          <span>AI / Digital / 03</span>
        </div>
      </section>

      <section className="layout-section deep-section">
        <div className="deep-intro">
          <div>
            <Label number="04" text="System" />
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
                campaign frames and motion pieces. The objective is consistency,
                not repetition.
              </p>
            </div>
          </div>
        </div>

        <div className="deep-cards">
          {systemCards.map(([num, title, text]) => (
            <article key={num}>
              <span>{num}</span>
              <strong>{title}</strong>
              <p>{text}</p>
            </article>
          ))}
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

            <p>
              Product direction built around material, silhouette, reflection
              and controlled presentation.
            </p>
          </div>

          <MainImage
            src={project.image}
            alt={project.title}
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

        <StatementSection text={project.statement} inline />
      </section>
    </>
  );
}

function AfterimageLayout({ project }: { project: ProjectData }) {
  return (
    <>
      <section className="wide-media-section">
        <MainImage
          src={project.image}
          alt={project.title}
          className="afterimage-main"
          sizes="(max-width: 900px) 90vw, 1350px"
          priority
        />
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
            alt={`${project.title} detail`}
            sizes="(max-width: 900px) 90vw, 800px"
          />

          <div className="afterimage-cards">
            <article>
              <Label number="01" text="Atmosphere" />
              <p>
                Cold light.
                <br />
                Deep shadows.
              </p>
            </article>

            <article>
              <Label number="02" text="Direction" />
              <p>
                Residual
                <br />
                <span>motion.</span>
              </p>
            </article>
          </div>
        </div>

        <div className="afterimage-mood">
          <Label number="05" text="Mood" />
          <p>
            Cold light.
            <br />
            Deep shadows.
            <br />
            <span>Residual motion.</span>
          </p>
        </div>
      </section>
    </>
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
    <div
      className={inline ? "statement-section inline" : "statement-section"}
    >
      <p>{text}</p>
    </div>
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
          border-bottom: 1px solid rgba(240,236,227,.06);
          background: rgba(6,6,8,.78);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          box-shadow: 0 10px 40px rgba(0,0,0,.08);
        }

        .case-logo,
        .case-back {
          color: #7DD3FC;
          text-decoration: none;
          transition: transform .2s ease, color .2s ease;
        }

        .case-logo {
          font-size: .86rem;
          font-weight: 800;
          letter-spacing: -.03em;
        }

        .case-nav-title {
          color: rgba(240,236,227,.24);
          font-size: .6rem;
          letter-spacing: .15em;
          text-transform: uppercase;
        }

        .case-back {
          color: rgba(240,236,227,.56);
          font-size: .65rem;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .case-back:hover,
        .case-logo:hover {
          color: #7DD3FC;
        }

        .case-back:hover {
          transform: translateX(-4px);
        }

        .case-label {
          display: flex;
          align-items: center;
          gap: .7rem;
          margin-bottom: 1.15rem;
          color: #7DD3FC;
          font-size: .63rem;
          letter-spacing: .17em;
          text-transform: uppercase;
        }

        .case-label-line {
          width: 25px;
          height: 1px;
          background: #7DD3FC;
        }

        .case-label-text {
          color: rgba(240,236,227,.4);
        }

        .case-tags {
          display: flex;
          flex-wrap: wrap;
          gap: .45rem;
          margin-top: 1.2rem;
        }

        .case-tags span {
          padding: .35rem .6rem;
          border: 1px solid rgba(240,236,227,.12);
          color: rgba(240,236,227,.42);
          font-size: .58rem;
          letter-spacing: .1em;
          text-transform: uppercase;
        }

        .case-header {
          display: grid;
          grid-template-columns: minmax(0,1.1fr) minmax(280px,.9fr);
          gap: 5rem;
          align-items: end;
        }

        .case-hero {
          max-width: 1450px;
          margin: 0 auto;
          padding: 155px 5vw 55px;
        }

        .case-number-row {
          display: flex;
          align-items: center;
          gap: .8rem;
          margin-bottom: 1.35rem;
          color: #7DD3FC;
          font-size: .65rem;
          letter-spacing: .18em;
          text-transform: uppercase;
        }

        .case-number-line {
          width: 35px;
          height: 1px;
          background: #7DD3FC;
        }

        .case-category {
          color: rgba(240,236,227,.4);
        }

        .case-title {
          margin: 0;
          font-size: clamp(4rem,11vw,10rem);
          line-height: .82;
          letter-spacing: -.075em;
          font-weight: 900;
        }

        .case-intro {
          max-width: 470px;
          margin: 0;
          color: rgba(240,236,227,.54);
          font-size: .98rem;
          line-height: 1.8;
        }

        .shared-info,
        .layout-section,
        .wide-media-section {
          max-width: 1250px;
          margin: 0 auto;
        }

        .wide-media-section {
          max-width: 1450px;
          padding: 0 5vw 110px;
        }

        .shared-info {
          padding: 10px 5vw 130px;
        }

        .info-grid {
          display: grid;
          gap: 5rem;
        }

        .overview-grid {
          grid-template-columns: minmax(0,1fr) minmax(230px,.4fr);
          padding-bottom: 6rem;
          border-bottom: 1px solid rgba(240,236,227,.08);
        }

        .detail-grid {
          grid-template-columns: repeat(3,minmax(0,1fr));
          gap: 4rem;
          padding: 6rem 0 0;
        }

        .overview-text {
          max-width: 900px;
          margin: 0;
          color: rgba(240,236,227,.8);
          font-size: clamp(1.5rem,3vw,2.7rem);
          line-height: 1.18;
          letter-spacing: -.035em;
          font-weight: 600;
        }

        .detail-text {
          margin: 0;
          color: rgba(240,236,227,.58);
          font-size: .9rem;
          line-height: 1.8;
        }

        .line-list > div {
          padding: .72rem 0;
          border-bottom: 1px solid rgba(240,236,227,.08);
          color: rgba(240,236,227,.65);
          font-size: .85rem;
          transition: color .2s ease, padding-left .2s ease, border-color .2s ease;
        }

        .line-list > div:hover {
          padding-left: .35rem;
          color: #7DD3FC;
          border-color: rgba(125,211,252,.25);
        }

        .main-image {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 9;
          overflow: hidden;
          background: #0A0A0D;
          border: 1px solid rgba(240,236,227,.08);
        }

        .main-image-img {
          object-fit: cover;
          transition: transform .8s cubic-bezier(.22,1,.36,1);
        }

        .main-image:hover .main-image-img {
          transform: scale(1.025);
        }

        .layout-section {
          padding: 0 5vw 130px;
        }

        .concrete-grid {
          display: grid;
          grid-template-columns: .7fr 1.3fr;
          gap: 5rem;
          align-items: start;
        }

        .sticky-title {
          position: sticky;
          top: 110px;
        }

        .sticky-title h2 {
          margin: 0;
          font-size: clamp(2.8rem,6vw,6.5rem);
          line-height: .88;
          letter-spacing: -.065em;
          font-weight: 800;
        }

        .sticky-title h2 span {
          color: #7DD3FC;
        }

        .large-copy {
          margin: 0;
          color: rgba(240,236,227,.86);
          font-size: clamp(1.35rem,2.7vw,2.4rem);
          line-height: 1.2;
          letter-spacing: -.03em;
        }

        .visual-points {
          margin-top: 4rem;
          border-top: 1px solid rgba(240,236,227,.08);
        }

        .visual-point {
          display: grid;
          grid-template-columns: 45px 170px 1fr;
          gap: 1rem;
          align-items: start;
          padding: 1.25rem 0;
          border-bottom: 1px solid rgba(240,236,227,.08);
        }

        .visual-point > span {
          color: #7DD3FC;
          font-size: .65rem;
        }

        .visual-point strong {
          font-size: .9rem;
        }

        .visual-point p {
          margin: 0;
          color: rgba(240,236,227,.42);
          font-size: .82rem;
          line-height: 1.55;
        }

        .statement-section {
          padding: 6rem 5vw;
          border-top: 1px solid rgba(240,236,227,.08);
          border-bottom: 1px solid rgba(240,236,227,.08);
        }

        .statement-section.inline {
          margin-top: 8rem;
          padding: 5rem 0;
        }

        .statement-section p {
          max-width: 1000px;
          margin: 0 auto;
          color: rgba(240,236,227,.94);
          font-size: clamp(2rem,4.5vw,4.7rem);
          line-height: 1;
          letter-spacing: -.055em;
          font-weight: 700;
        }

        .statement-section.inline p {
          margin: 0;
        }

        .deep-hero {
          position: relative;
          min-height: 78vh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-top: 1px solid rgba(240,236,227,.05);
          border-bottom: 1px solid rgba(240,236,227,.05);
        }

        .deep-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(56,189,248,.12), transparent 48%);
        }

        .deep-circle {
          position: relative;
          width: min(1000px,88vw);
          aspect-ratio: 1 / 1;
          overflow: hidden;
          border-radius: 50%;
          border: 1px solid rgba(125,211,252,.12);
          box-shadow: 0 0 120px rgba(56,189,248,.08);
        }

        .deep-image {
          object-fit: cover;
          transform: scale(1.08);
        }

        .deep-ring {
          position: absolute;
          border: 1px solid rgba(125,211,252,.16);
          border-radius: 50%;
          pointer-events: none;
        }

        .ring-one { inset: 15%; }
        .ring-two { inset: 30%; opacity: .8; }

        .deep-hero-meta {
          position: absolute;
          left: 5vw;
          right: 5vw;
          bottom: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
          color: rgba(240,236,227,.28);
          font-size: .62rem;
          letter-spacing: .13em;
          text-transform: uppercase;
        }

        .deep-intro {
          display: grid;
          grid-template-columns: .45fr 1.55fr;
          gap: 4rem;
        }

        .deep-heading {
          margin: 0 0 3rem;
          font-size: clamp(2.5rem,6vw,6rem);
          line-height: .9;
          letter-spacing: -.06em;
        }

        .deep-heading span {
          color: #7DD3FC;
        }

        .deep-columns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
        }

        .deep-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-top: 8rem;
        }

        .deep-cards article {
          min-height: 220px;
          padding: 1.6rem;
          border: 1px solid rgba(240,236,227,.08);
          background: rgba(125,211,252,.015);
        }

        .deep-cards article > span {
          display: block;
          margin-bottom: 4rem;
          color: #7DD3FC;
          font-size: .63rem;
        }

        .deep-cards article strong {
          display: block;
          font-size: 1.4rem;
          letter-spacing: -.03em;
        }

        .deep-cards article p {
          margin: .7rem 0 0;
          color: rgba(240,236,227,.4);
          font-size: .82rem;
          line-height: 1.6;
        }

        .glass-hero-section {
          padding-bottom: 120px;
        }

        .glass-hero {
          display: grid;
          grid-template-columns: .7fr 1.3fr;
          gap: 1rem;
          align-items: stretch;
        }

        .glass-intro-panel {
          min-height: 650px;
          padding: 2rem;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          border: 1px solid rgba(240,236,227,.08);
          background: rgba(240,236,227,.012);
        }

        .glass-intro-panel h2 {
          margin: 3rem 0 0;
          font-size: clamp(2.5rem,6vw,6rem);
          line-height: .9;
          letter-spacing: -.06em;
        }

        .glass-intro-panel h2 span {
          color: #7DD3FC;
        }

        .glass-intro-panel p {
          max-width: 300px;
          margin: 0;
          color: rgba(240,236,227,.42);
          font-size: .85rem;
          line-height: 1.7;
        }

        .glass-main-image {
          height: auto;
          min-height: 650px;
        }

        .glass-specs {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          border-top: 1px solid rgba(240,236,227,.08);
          border-bottom: 1px solid rgba(240,236,227,.08);
        }

        .glass-specs > div {
          padding: 1.5rem;
          border-right: 1px solid rgba(240,236,227,.08);
        }

        .glass-specs > div:last-child {
          border-right: 0;
        }

        .glass-specs span,
        .glass-specs small,
        .glass-specs strong {
          display: block;
        }

        .glass-specs span {
          margin-bottom: 2rem;
          color: #7DD3FC;
          font-size: .6rem;
        }

        .glass-specs small {
          color: rgba(240,236,227,.38);
          font-size: .66rem;
          letter-spacing: .12em;
          text-transform: uppercase;
        }

        .glass-specs strong {
          margin-top: .55rem;
          font-size: .9rem;
        }

        .glass-copy {
          display: grid;
          grid-template-columns: .8fr 1.2fr;
          gap: 5rem;
          align-items: end;
          margin-top: 7rem;
        }

        .glass-copy > div > p {
          margin: 0;
          font-size: clamp(2rem,4vw,4.2rem);
          line-height: 1;
          letter-spacing: -.05em;
          font-weight: 700;
        }

        .glass-copy > div > p span {
          color: #7DD3FC;
        }

        .afterimage-main {
          aspect-ratio: 16 / 9;
        }

        .afterimage-head {
          display: grid;
          grid-template-columns: minmax(0,1.2fr) minmax(280px,.8fr);
          gap: 3rem;
          align-items: end;
          border-top: 1px solid rgba(240,236,227,.08);
          padding-top: 5rem;
        }

        .afterimage-head h2 {
          margin: 0;
          font-size: clamp(2.8rem,6vw,6rem);
          line-height: .88;
          letter-spacing: -.06em;
          font-weight: 800;
        }

        .afterimage-head h2 span {
          color: #7DD3FC;
        }

        .afterimage-detail-grid {
          display: grid;
          grid-template-columns: 1.35fr .65fr;
          gap: 1rem;
          margin-top: 5rem;
        }

        .afterimage-cards {
          display: grid;
          grid-template-rows: 1fr 1fr;
          gap: 1rem;
        }

        .afterimage-cards article {
          min-height: 220px;
          padding: 1.6rem;
          border: 1px solid rgba(240,236,227,.08);
          background: linear-gradient(145deg, rgba(125,211,252,.03), rgba(240,236,227,.01));
        }

        .afterimage-cards article p {
          margin: 0;
          font-size: clamp(1.5rem,2.4vw,2.3rem);
          line-height: 1;
          letter-spacing: -.04em;
          font-weight: 700;
        }

        .afterimage-cards article p span,
        .afterimage-mood p span {
          color: #7DD3FC;
        }

        .afterimage-mood {
          display: grid;
          grid-template-columns: .7fr 1.3fr;
          gap: 4rem;
          margin-top: 7rem;
          padding: 5rem 0;
          border-top: 1px solid rgba(240,236,227,.08);
          border-bottom: 1px solid rgba(240,236,227,.08);
        }

        .afterimage-mood p {
          margin: 0;
          font-size: clamp(2rem,4vw,4.3rem);
          line-height: 1.02;
          letter-spacing: -.05em;
          font-weight: 700;
        }

        @media (max-width: 1000px) {
          .case-header,
          .overview-grid,
          .concrete-grid,
          .deep-intro,
          .glass-hero,
          .glass-copy,
          .afterimage-head,
          .afterimage-mood {
            grid-template-columns: 1fr !important;
          }

          .detail-grid {
            grid-template-columns: 1fr !important;
          }

          .sticky-title {
            position: static;
          }

          .deep-cards {
            grid-template-columns: 1fr;
          }

          .glass-main-image,
          .glass-intro-panel {
            min-height: 520px;
          }
        }

        @media (max-width: 700px) {
          .case-nav {
            min-height: 66px;
            padding: 0 1.15rem;
          }

          .case-nav-title {
            display: none;
          }

          .case-hero {
            padding: 120px 1.25rem 45px;
          }

          .wide-media-section,
          .layout-section,
          .shared-info {
            padding-left: 1.25rem;
            padding-right: 1.25rem;
          }

          .wide-media-section {
            padding-bottom: 75px;
          }

          .shared-info {
            padding-bottom: 95px;
          }

          .layout-section {
            padding-bottom: 95px;
          }

          .case-title {
            font-size: clamp(3.1rem,17vw,7rem);
          }

          .case-header {
            gap: 2.5rem;
          }

          .overview-text {
            font-size: clamp(1.35rem,6.2vw,2rem);
          }

          .info-grid {
            gap: 2.6rem;
          }

          .detail-grid {
            padding-top: 4rem;
          }

          .main-image,
          .afterimage-main {
            aspect-ratio: 4 / 3;
          }

          .visual-point {
            grid-template-columns: 35px 1fr;
          }

          .visual-point p {
            grid-column: 2;
          }

          .deep-hero {
            min-height: 74svh;
          }

          .deep-circle {
            width: 86vw;
          }

          .deep-hero-meta {
            flex-direction: column;
            align-items: flex-start;
            gap: .45rem;
          }

          .deep-columns {
            grid-template-columns: 1fr;
            gap: 2rem;
          }

          .glass-intro-panel,
          .glass-main-image {
            min-height: auto;
          }

          .glass-intro-panel {
            min-height: 460px;
          }

          .glass-main-image {
            aspect-ratio: 4 / 3;
          }

          .glass-specs {
            grid-template-columns: 1fr 1fr;
          }

          .glass-specs > div {
            border-right: 1px solid rgba(240,236,227,.08);
            border-bottom: 1px solid rgba(240,236,227,.08);
          }

          .glass-specs > div:nth-child(even) {
            border-right: 0;
          }

          .glass-specs > div:nth-last-child(-n + 2) {
            border-bottom: 0;
          }

          .afterimage-detail-grid {
            grid-template-columns: 1fr;
          }

          .afterimage-cards {
            grid-template-rows: auto;
            grid-template-columns: 1fr;
          }

          .statement-section {
            padding: 4.5rem 1.25rem;
          }

          .statement-section.inline {
            margin-top: 5rem;
            padding: 4.5rem 0;
          }

          .statement-section p {
            font-size: clamp(2rem,10vw,4rem);
          }

          .case-bottom {
            grid-template-columns: 1fr !important;
            align-items: flex-start !important;
          }
        }

        @media (max-width: 520px) {
          .case-title {
            letter-spacing: -.065em;
          }

          .case-intro {
            font-size: .9rem;
          }

          .glass-specs {
            grid-template-columns: 1fr;
          }

          .glass-specs > div,
          .glass-specs > div:nth-child(even),
          .glass-specs > div:nth-last-child(-n + 2) {
            border-right: 0;
            border-bottom: 1px solid rgba(240,236,227,.08);
          }

          .glass-specs > div:last-child {
            border-bottom: 0;
          }

          .deep-cards article {
            min-height: 190px;
          }
        }
      `}</style>

      <nav className="case-nav" aria-label="Project navigation">
        <a href="/" className="case-logo">
          MALLORD
        </a>

        <span className="case-nav-title">
          Selected Project
        </span>

        <a href="/#projects" className="case-back">
          ← Back to work
        </a>
      </nav>

      <section className="case-hero">
        <div className="case-header">
          <div>
            <div className="case-number-row">
              <span>{project.number}</span>
              <span className="case-number-line" />
              <span className="case-category">
                {project.category}
              </span>
            </div>

            <h1 className="case-title">{project.title}</h1>
          </div>

          <div>
            <p className="case-intro">{project.intro}</p>
            <Tags items={project.tags} />
          </div>
        </div>
      </section>

      <SharedInfo project={project} />

      {project.layout === "afterimage" && (
        <AfterimageLayout project={project} />
      )}

      {project.layout === "concrete" && (
        <ConcreteLayout project={project} />
      )}

      {project.layout === "deep-blue" && (
        <DeepBlueLayout project={project} />
      )}

      {project.layout === "glass-object" && (
        <GlassObjectLayout project={project} />
      )}

      <section className="layout-section" style={{ paddingBottom: "120px" }}>
        <div
          className="case-bottom"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            gap: "2rem",
            paddingTop: "1.5rem",
            borderTop: "1px solid rgba(240,236,227,.08)",
          }}
        >
          {projectSlugs.indexOf(project.layout) > 0 ? (
            <a
              href={`/projects/${projectSlugs[projectSlugs.indexOf(project.layout) - 1]}`}
              className="case-back"
            >
              ← Previous
            </a>
          ) : (
            <span />
          )}

          <span
            style={{
              color: "rgba(240,236,227,.2)",
              fontSize: ".61rem",
              letterSpacing: ".11em",
              textTransform: "uppercase",
              textAlign: "center",
            }}
          >
            Self-initiated concept
          </span>

          {projectSlugs.indexOf(project.layout) < projectSlugs.length - 1 ? (
            <a
              href={`/projects/${projectSlugs[projectSlugs.indexOf(project.layout) + 1]}`}
              className="case-back"
              style={{ textAlign: "right" }}
            >
              Next project →
            </a>
          ) : (
            <a
              href="/#contact"
              className="case-back"
              style={{ textAlign: "right" }}
            >
              Start a project →
            </a>
          )}
        </div>
      </section>
    </main>
  );
}
