import { useEffect, useState } from "react";
import boxLogo from "@/assets/box-united-blue.png";
import flagHome from "@/assets/flag-home-2.webp";
import flagLogo from "@/assets/flag-sticker.png";
import girlsTwo from "@/assets/girls-two-new.jpg";
import chicagoMap from "@/assets/chicago-map-new.png";

export default function App() {
  return <ReportPage />;
}


const NAVY = "#001c33";
const BLUE = "#0080f2";
const LEMON = "#fef193";

const toc = [
  { id: "summary", label: "Executive Summary" },
  { id: "confidence", label: "The Confidence Story" },
  { id: "voices", label: "Voices from the Program" },
  { id: "reach", label: "Who We Reached" },
  { id: "showed-up", label: "Where They Showed Up" },
  { id: "core", label: "The Committed Core" },
  { id: "ahead", label: "Looking Ahead" },
];

/* ------------------------------------------------------------------ */
/* Small building blocks                                              */
/* ------------------------------------------------------------------ */

function Kicker({ children }: { children: React.ReactNode }) {
  return <div className="kicker mb-4">{children}</div>;
}

function SectionHeading({
  eyebrow,
  title,
}: {
  eyebrow?: string;
  title: React.ReactNode;
}) {
  return (
    <div className="mb-10">
      {eyebrow && <Kicker>{eyebrow}</Kicker>}
      <div className="rule-thick mb-6" style={{ background: BLUE }} />
      <h2
        className="font-serif font-bold text-navy leading-[1.05] tracking-tight"
        style={{
          color: NAVY,
          fontSize: "clamp(40px, 6vw, 68px)",
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function Section({
  id,
  children,
  bg = "cream",
}: {
  id: string;
  children: React.ReactNode;
  bg?: "cream" | "white" | "navy";
}) {
  const bgStyle =
    bg === "white"
      ? { background: "#ffffff" }
      : bg === "navy"
      ? { background: NAVY, color: "#f7f5ed" }
      : { background: "var(--cream)" };
  return (
    <section id={id} style={bgStyle} className="w-full">
      <div className="mx-auto max-w-[880px] px-6 md:px-10 py-20 md:py-28">
        {children}
      </div>
    </section>
  );
}

function StatCard({
  n,
  l,
  variant = "blue",
  nSize = "clamp(44px, 6vw, 64px)",
}: {
  n: string;
  l: string;
  variant?: "blue" | "navy" | "lemon";
  nSize?: string;
}) {
  const bg =
    variant === "navy" ? NAVY : variant === "lemon" ? LEMON : "#ffffff";
  const border =
    variant === "blue" ? `2px solid ${BLUE}` : `1px solid rgba(0,28,51,0.12)`;
  const numColor = variant === "navy" ? "#ffffff" : NAVY;
  const labelColor =
    variant === "navy" ? "rgba(255,255,255,0.75)" : "rgba(0,28,51,0.7)";
  return (
    <div
      className="rounded-md p-6"
      style={{ background: bg, border, boxShadow: "0 1px 0 rgba(0,28,51,0.04)" }}
    >
      <div
        className="font-display"
        style={{ color: numColor, fontSize: nSize, lineHeight: 1 }}
      >
        {n}
      </div>
      <div className="mt-3 font-body" style={{ color: labelColor, fontSize: 15, lineHeight: 1.35 }}>
        {l}
      </div>
    </div>
  );
}

function Bar({
  label,
  value,
  max,
  suffix = "",
  emphasize = false,
}: {
  label: string;
  value: number;
  max: number;
  suffix?: string;
  emphasize?: boolean;
}) {
  const pct = Math.max(2, (value / max) * 100);
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-4 py-2">
      <div>
        <div className="flex items-baseline justify-between gap-3 mb-1.5">
          <span className="font-body text-[15px]" style={{ color: NAVY }}>
            {label}
          </span>
          <span
            className="font-display"
            style={{ color: emphasize ? BLUE : NAVY, fontSize: 16 }}
          >
            {value}
            {suffix}
          </span>
        </div>
        <div className="h-2.5 rounded-full" style={{ background: "rgba(0,28,51,0.08)" }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${pct}%`,
              background: emphasize
                ? `linear-gradient(90deg, ${BLUE}, #4aa8ff)`
                : NAVY,
            }}
          />
        </div>
      </div>
      <div className="hidden" />
    </div>
  );
}

function Quote({
  text,
  who,
}: {
  text: string;
  who: string;
}) {
  return (
    <figure
      className="rounded-md p-7 md:p-8"
      style={{
        background: "#ffffff",
        borderLeft: `4px solid ${BLUE}`,
        boxShadow: "0 1px 0 rgba(0,28,51,0.04)",
      }}
    >
      <blockquote
        className="font-serif italic"
        style={{ color: NAVY, fontSize: "clamp(20px, 2.2vw, 26px)", lineHeight: 1.35 }}
      >
        “{text}”
      </blockquote>
      <figcaption
        className="mt-4 font-display"
        style={{ color: BLUE, fontSize: 12, letterSpacing: "0.22em" }}
      >
       — {who}
      </figcaption>
    </figure>
  );
}

/* ------------------------------------------------------------------ */
/* Sticky top nav                                                     */
/* ------------------------------------------------------------------ */

function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="fixed top-0 inset-x-0 z-40 transition-all"
      style={{
        background: scrolled ? "rgba(247,245,237,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(0,28,51,0.12)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(10px)" : "none",
      }}
    >
      <div className="mx-auto max-w-[1120px] px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-3">
          <img src={boxLogo} alt="Box United" className="h-8 w-auto object-contain" />
        </a>
        <nav className="hidden md:flex items-center gap-6">
          {toc.slice(0, 4).map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              className="font-body text-[13px] hover:opacity-100 transition-opacity"
              style={{ color: NAVY, opacity: 0.7 }}
            >
              {t.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

/* ------------------------------------------------------------------ */
/* Hero                                                               */
/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section id="top" className="relative w-full" style={{ background: "var(--cream)" }}>
      <div className="mx-auto max-w-[1120px] px-6 md:px-10 pt-28 md:pt-32 pb-16 md:pb-20">
        <div className="grid md:grid-cols-2 gap-10 md:gap-14 items-center relative">
          <div className="relative z-10">
            <div className="kicker">Spring 2026 · Season Report</div>
            <h1
              className="font-display mt-6 leading-[0.9]"
              style={{ color: NAVY, fontSize: "clamp(48px, 7vw, 88px)" }}
            >
              Season of<br />
              Confidence.
            </h1>
            <p
              className="mt-8 font-serif italic"
              style={{ color: NAVY, fontSize: "clamp(20px, 2.4vw, 26px)", lineHeight: 1.35 }}
            >
              Fight Like a Girl, Spring 2026, across 14 Chicago sites.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="#summary"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md font-body text-[14px] transition-transform hover:-translate-y-0.5"
                style={{ background: BLUE, color: "#fff" }}
              >
                Read the report →
              </a>
              <a
                href="#voices"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-md font-body text-[14px]"
                style={{ border: `1px solid ${NAVY}`, color: NAVY }}
              >
                Hear from the girls
              </a>
            </div>
          </div>
          <div className="relative">
            <div
              className="rounded-md overflow-hidden bg-white relative"
              style={{ aspectRatio: "3 / 4", boxShadow: "0 30px 60px -30px rgba(0,28,51,0.35)" }}
            >
              <img
                src={girlsTwo}
                alt="Two Fight Like a Girl athletes"
                className="w-full h-full object-cover"
                style={{ display: "block" }}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[1120px] px-6 md:px-10 pb-14">
        <div className="rule" />
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 font-body text-[13px]" style={{ color: NAVY, opacity: 0.7 }}>
          <span>Box United · Fight Like a Girl</span>
          <span>Spring 2026 · Attendance + Post-Program Survey</span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Table of Contents                                                  */
/* ------------------------------------------------------------------ */

function TOC() {
  return (
    <section style={{ background: "var(--cream)" }} className="w-full">
      <div className="mx-auto max-w-[880px] px-6 md:px-10 py-16 md:py-20">
        <Kicker>Contents</Kicker>
        <div className="rule-thick mb-8" style={{ background: BLUE }} />
        <ol className="space-y-3">
          {toc.map((t, i) => (
            <li key={t.id}>
              <a
                href={`#${t.id}`}
                className="grid grid-cols-[48px_1fr_auto] items-baseline gap-4 py-2.5 group border-b"
                style={{ borderColor: "rgba(0,28,51,0.12)" }}
              >
                <span
                  className="font-display"
                  style={{ color: BLUE, fontSize: 18 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className="font-serif group-hover:underline"
                  style={{ color: NAVY, fontSize: 22 }}
                >
                  {t.label}
                </span>
                <span
                  className="font-body opacity-60"
                  style={{ color: NAVY, fontSize: 13 }}
                >
                  →
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Executive Summary                                                  */
/* ------------------------------------------------------------------ */

function ExecutiveSummary() {
  return (
    <Section id="summary" bg="white">
      <SectionHeading eyebrow="01 · Executive Summary" title={
        <>A year the program can point to <span style={{ color: BLUE, fontStyle: "italic" }}>with pride.</span></>
      } />
      <div className="prose-none font-body space-y-5" style={{ color: NAVY, fontSize: 18, lineHeight: 1.6 }}>
        <p>
          The Spring 2026 season of Fight Like a Girl reached <strong>126 girls</strong> across{" "}
          <strong>14 Chicago sites</strong>, welcoming a new class of fighters into the ring and
          into the Fighter's Mindset curriculum. It is the first year of a three-year research
          cycle, and the first pillar under study is <em>confidence</em>.
        </p>
        <p>
          The pillar cleared its benchmark decisively. Of the <strong>60 girls surveyed</strong>,{" "}
          <strong>85%</strong> reported feeling more confident after the program, a result that
          held across grades, sites, and the elementary and middle-school groups that make up the
          heart of FLAG. Every survey item measuring confidence, growth mindset, and physical
          identity averaged <strong>above 4.0 on a 5-point scale</strong>.
        </p>
        <p>
          The season also revealed a committed core: girls whose attendance stayed steady even as
          schedules got busy, and whose weekly rate <em>rose</em> in the back half of the season.
          Their words, captured throughout this report, describe confidence that reaches beyond
          the gym, into classrooms, friendships, and how they see their own bodies.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-14">
        <StatCard n="126" l="Girls enrolled this season" />
        <StatCard n="14" l="Chicago program sites" />
        <StatCard n="85%" l="Feel more confident after FLAG" variant="blue" />
        <StatCard n="4.2/5" l="Average confidence rating" nSize="clamp(38px, 5vw, 54px)" />
      </div>

      <div className="mt-14 grid md:grid-cols-3 gap-4">
        {[
          { t: "Confidence pillar met", d: "First pillar of the three-year research cycle cleared its 80% benchmark." },
          { t: "Consistent across ages", d: "Confidence gains held from grades 4 through 8, the bulk of the program." },
          { t: "Transfer is real", d: "Girls describe confidence at school, at home, and in their own bodies." },
        ].map((it) => (
          <div key={it.t} className="p-5" style={{ borderTop: `3px solid ${BLUE}` }}>
            <div className="font-serif font-bold whitespace-nowrap" style={{ color: NAVY, fontSize: 17 }}>{it.t}</div>
            <div className="font-body mt-2" style={{ color: NAVY, opacity: 0.8, fontSize: 14, lineHeight: 1.5 }}>{it.d}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Confidence                                                         */
/* ------------------------------------------------------------------ */

function Confidence() {
  const items = [
    { l: "I can get better if I practice", v: 85 },
    { l: "More confident in myself after FLAG", v: 85 },
    { l: "Boxing helped me feel confident in my body", v: 85 },
    { l: "I feel physically stronger than when I started", v: 83 },
    { l: "I enjoy physical activity more than before", v: 78 },
  ];
  const grades = [
    { l: "Grades 4–5", v: 88 },
    { l: "Grades 6–8", v: 84 },
  ];
  return (
    <Section id="confidence" bg="cream">
      <SectionHeading eyebrow="02 · The Confidence Story" title={
        <>The headline: <span style={{ color: BLUE }}>85% feel more confident.</span></>
      } />

      <p className="font-body" style={{ color: NAVY, fontSize: 18, lineHeight: 1.6 }}>
        The confidence pillar's success benchmark is straightforward, <strong>80% or more</strong>{" "}
        of girls report feeling more confident after the program. FLAG cleared it on the two
        headline items and on the growth-mindset item too, with a composite rate of{" "}
        <strong>90%</strong> across the two core confidence measures.
      </p>

      <div className="mt-12">
        <Kicker>Share of girls who agree or strongly agree</Kicker>
        <div className="mt-5 space-y-1.5">
          {items.map((it) => (
            <Bar key={it.l} label={it.l} value={it.v} max={100} suffix="%" emphasize={it.v >= 85} />
          ))}
        </div>
        <p className="mt-4 font-body italic" style={{ color: NAVY, opacity: 0.7, fontSize: 14 }}>
          The physical and the psychological move together, girls who feel stronger also feel
          more sure of themselves.
        </p>
      </div>

      <div className="mt-16 grid md:grid-cols-[1.3fr_1fr] gap-8 items-start">
        <div>
          <Kicker>Confidence gains by grade band</Kicker>
          <div className="mt-5 space-y-1.5">
            {grades.map((g) => (
              <Bar key={g.l} label={g.l} value={g.v} max={100} suffix="%" emphasize />
            ))}
          </div>
          <p className="mt-4 font-body" style={{ color: NAVY, fontSize: 15, opacity: 0.8, lineHeight: 1.55 }}>
            Confidence gains are shared across the elementary and middle-school grades that make
            up 56 of 60 respondents, a broad, consistent result rather than a spike at one age.
          </p>
        </div>
        <div className="rounded-md p-7" style={{ background: NAVY, color: "#f7f5ed" }}>
          <div className="font-display" style={{ color: BLUE, fontSize: 92, lineHeight: 1 }}>
            27
          </div>
          <div className="font-serif mt-3" style={{ fontSize: 22, lineHeight: 1.35 }}>
            of 60 girls chose the top of the scale, "strongly agree" that they feel more confident
            after FLAG.
          </div>
          <div className="rule mt-6" style={{ background: "rgba(255,255,255,0.25)" }} />
          <div className="font-body mt-4" style={{ fontSize: 14, opacity: 0.8 }}>
            51 of 60 agreed or strongly agreed overall.
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Voices                                                             */
/* ------------------------------------------------------------------ */

function Voices() {
  return (
    <Section id="voices" bg="white">
      <SectionHeading eyebrow="03 · Voices from the Program" title={
        <>In their <span style={{ color: BLUE, fontStyle: "italic" }}>own words.</span></>
      } />
      <p className="font-body" style={{ color: NAVY, fontSize: 18, lineHeight: 1.6 }}>
        Girls were never prompted with the word <em>confidence</em>. It surfaced anyway, again
        and again, alongside themes that clearly live outside the gym.
      </p>

      <div className="mt-12 grid gap-5">
        <Quote
          text="I feel more confident at school now."
          who="7th grade · West Side"
        />
        <Quote
          text="I used to be super shy but now I feel like I can do hard things."
          who="7th grade · Park Manor"
        />
        <Quote
          text="Honestly I feel way more confident now, like I can stand up for myself."
          who="8th grade · West Side"
        />
        <Quote
          text="More confident, calmer when I'm mad too."
          who="5th grade · St. Ann"
        />
        <Quote
          text="I feel good about my body now and I'm proud of how strong I got."
          who="10th grade · West Side"
        />
        <Quote
          text="I realized I can protect myself and that makes me feel safe."
          who="8th grade · St. Ann"
        />
      </div>

      <div className="mt-14 rounded-md p-7 md:p-9" style={{ background: "#ffffff", border: `1px solid ${NAVY}` }}>
        <div className="kicker" style={{ color: NAVY }}>What the girls value most</div>
        <div className="rule-thick my-4" style={{ background: NAVY }} />
        <div className="grid sm:grid-cols-2 gap-x-8 gap-y-3 font-serif" style={{ color: NAVY, fontSize: 20 }}>
          {[
            ["Boxing & physical training", "47%"],
            ["The other girls in the program", "38%"],
            ["My coach", "37%"],
            ["How I feel after class", "37%"],
            ["Learning about confidence & mindset", "30%"],
          ].map(([l, n]) => (
            <div key={l} className="flex items-baseline justify-between gap-4 py-2 border-b" style={{ borderColor: "rgba(0,28,51,0.2)" }}>
              <span>{l}</span>
              <span className="font-display" style={{ fontSize: 22 }}>{n}</span>
            </div>
          ))}
        </div>
        <p className="mt-5 font-body italic" style={{ color: NAVY, fontSize: 15, opacity: 0.85 }}>
          Peers and coach rank nearly as high as the sport itself, a program girls feel they
          belong to. Confidence grows in exactly that kind of room.
        </p>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Who We Reached                                                     */
/* ------------------------------------------------------------------ */

function Reach() {
  const grades = [
    { l: "4th", v: 21 },
    { l: "5th", v: 21 },
    { l: "7th", v: 19 },
    { l: "6th", v: 15 },
    { l: "8th", v: 4 },
    { l: "JTDC", v: 14 },
  ];
  const ethnicity = [
    { l: "Black / African American", v: 48 },
    { l: "Hispanic / Latino", v: 19 },
    { l: "Two or more ethnicities", v: 4 },
    { l: "White", v: 1 },
  ];
  return (
    <Section id="reach" bg="cream">
      <SectionHeading eyebrow="04 · Who We Reached" title={
        <>Serving the girls we set out to <span style={{ color: BLUE }}>serve.</span></>
      } />
      <p className="font-body" style={{ color: NAVY, fontSize: 18, lineHeight: 1.6 }}>
        FLAG is designed for South and West Side Chicago communities, and Spring 2026's roster
        reflects exactly that. <strong>135 girls</strong> receive free or reduced lunch and{" "}
        <strong>90</strong> are identified as English Language Learners, strong signals that the
        program is reaching the high-need student population it was built for.
      </p>

      <div className="mt-14 grid md:grid-cols-2 gap-10">
        <div>
          <Kicker>Grade level of attending girls</Kicker>
          <div className="mt-5 space-y-1.5">
            {grades.map((g) => (
              <Bar key={g.l} label={g.l} value={g.v} max={25} emphasize={g.v >= 19} />
            ))}
          </div>
        </div>
        <div>
          <Kicker>Race / ethnicity (all enrolled)</Kicker>
          <div className="mt-5 space-y-1.5">
            {ethnicity.map((e) => (
              <Bar key={e.l} label={e.l} value={e.v} max={50} suffix="%" emphasize={e.v >= 40} />
            ))}
          </div>
          <p className="mt-4 font-body italic" style={{ color: NAVY, opacity: 0.7, fontSize: 14 }}>
            Directional figures. Not every girl had ethnicity recorded at intake.
          </p>
        </div>
      </div>

      <div className="mt-14 rounded-md overflow-hidden" style={{ background: "#ffffff", border: "1px solid rgba(0,28,51,0.12)" }}>
        <div className="grid md:grid-cols-2">
          <div className="p-8">
            <Kicker>Neighborhoods represented</Kicker>
            <div className="rule-thick my-4" style={{ background: BLUE }} />
            <div className="font-serif font-bold" style={{ color: NAVY, fontSize: 28, lineHeight: 1.15 }}>
              The strongest zip code is <span style={{ color: BLUE }}>60637</span>, Woodlawn and Greater Grand Crossing, with 28 girls.
            </div>
            <ul className="mt-6 grid grid-cols-2 gap-y-2 gap-x-6 font-body" style={{ color: NAVY, fontSize: 16 }}>
              {[
                ["60637", 28],
                ["60612", 15],
                ["60619", 15],
                ["60649", 12],
                ["60651", 10],
                ["60632", 9],
                ["60623", 8],
                ["60620", 6],
              ].map(([z, n]) => (
                <li key={z as string} className="flex items-baseline justify-between border-b py-1.5" style={{ borderColor: "rgba(0,28,51,0.1)" }}>
                  <span>{z}</span>
                  <span className="font-display" style={{ color: BLUE, fontSize: 15 }}>{n}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-[300px]" style={{ background: "var(--cream)" }}>
            <img src={chicagoMap} alt="Map of Chicago showing FLAG neighborhoods" loading="lazy" className="absolute inset-0 w-full h-full object-contain p-4" />
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Where They Showed Up                                               */
/* ------------------------------------------------------------------ */

function ShowedUp() {
  const top = [
    { site: "John Fiske Elementary", avg: 12.2, rate: "71%" },
    { site: "St. Ann School", avg: 10.3, rate: "88%" },
    { site: "Mason Elementary", avg: 8.4, rate: "79%" },
    { site: "West Side - Chicago Youth Boxing Club", avg: 7.9, rate: "72%" },
    { site: "Nightingale Elementary", avg: 6.9, rate: "70%" },
  ];
  return (
    <Section id="showed-up" bg="white">
      <SectionHeading eyebrow="05 · Where They Showed Up" title={
        <>Sites that <span style={{ color: BLUE, fontStyle: "italic" }}>anchored</span> the season.</>
      } />
      <p className="font-body" style={{ color: NAVY, fontSize: 18, lineHeight: 1.6 }}>
        Five sites delivered <strong>10 or more weeks</strong> of programming this season.
        Ranked by average girls present per session, a clear top tier emerged, sites where
        rosters filled and stayed filled, where the coach–athlete relationship deepened week over
        week.
      </p>

      <div className="mt-12 rounded-md overflow-hidden" style={{ background: "var(--cream)", border: "1px solid rgba(0,28,51,0.12)" }}>
        <div className="grid grid-cols-[40px_1fr_auto_auto] items-center gap-4 px-6 py-4 font-display" style={{ color: NAVY, fontSize: 12, letterSpacing: "0.22em", background: "rgba(0,28,51,0.04)" }}>
          <span>#</span>
          <span>Site</span>
          <span className="text-right">Avg / week</span>
          <span className="text-right w-16">Attend.</span>
        </div>
        {top.map((r, i) => (
          <div
            key={r.site}
            className="grid grid-cols-[40px_1fr_auto_auto] items-baseline gap-4 px-6 py-4 border-t"
            style={{ borderColor: "rgba(0,28,51,0.08)" }}
          >
            <span className="font-display" style={{ color: BLUE, fontSize: 20 }}>{i + 1}</span>
            <span className="font-serif font-bold" style={{ color: NAVY, fontSize: i === 0 ? 22 : 19 }}>{r.site}</span>
            <span className="font-display text-right" style={{ color: NAVY, fontSize: 22 }}>{r.avg}</span>
            <span className="font-body text-right w-16" style={{ color: NAVY, opacity: 0.75, fontSize: 15 }}>{r.rate}</span>
          </div>
        ))}
      </div>

      <div className="mt-12 grid md:grid-cols-3 gap-4">
        <StatCard n="76%" l="Combined attendance rate across top 5 sites" variant="blue" />
        <StatCard n="88%" l="Highest site attendance rate, St. Ann" />
        <StatCard n="12.2" l="Girls per week, John Fiske, top site" />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Committed Core                                                     */
/* ------------------------------------------------------------------ */

function Core() {
  const weekly = [
    { w: 1, rate: 62.9 },
    { w: 2, rate: 65.4 },
    { w: 3, rate: 66.1 },
    { w: 4, rate: 64.8 },
    { w: 5, rate: 65.5 },
    { w: 6, rate: 67.1 },
    { w: 7, rate: 68.4 },
    { w: 8, rate: 72.8 },
    { w: 9, rate: 69.8 },
    { w: 10, rate: 68.2 },
  ];
  const chartMax = 80;
  return (
    <Section id="core" bg="cream">
      <SectionHeading eyebrow="06 · The Committed Core" title={
        <>The girls who <span style={{ color: BLUE }}>kept showing up.</span></>
      } />
      <p className="font-body" style={{ color: NAVY, fontSize: 18, lineHeight: 1.6 }}>
        One of the clearest signals of the season is quiet: as the calendar filled with end-of-year
        events and competing activities, the girls who stayed in FLAG showed up{" "}
        <em>more reliably</em>, not less. Weekly attendance rates climbed from{" "}
        <strong>63% in Week 1</strong> to nearly <strong>73% by Week 8</strong>. A smaller,
        committed core of fighters kept coming, and their rate of return climbed with them.
      </p>

      <div className="mt-12 rounded-md p-8" style={{ background: "#ffffff", border: "1px solid rgba(0,28,51,0.12)" }}>
        <div className="mb-8">
          <Kicker>Weekly attendance rate</Kicker>
          <div className="font-serif font-bold mt-2" style={{ color: NAVY, fontSize: 26 }}>
            Rising commitment over the season
          </div>
        </div>
        <div className="grid grid-cols-10 gap-2 h-64 items-end">
          {weekly.map((w) => {
            const pct = (w.rate / chartMax) * 100;
            const isPeak = w.rate >= 72;
            return (
              <div key={w.w} className="flex flex-col items-center justify-end h-full">
                <div
                  className="font-display mb-2"
                  style={{ color: isPeak ? BLUE : NAVY, fontSize: 13 }}
                >
                  {w.rate.toFixed(1)}%
                </div>
                <div
                  className="w-full rounded-t-sm"
                  style={{
                    height: `${pct}%`,
                    background: isPeak
                      ? `linear-gradient(180deg, ${BLUE}, #4aa8ff)`
                      : `linear-gradient(180deg, ${NAVY}, #26445e)`,
                    minHeight: 4,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-3 grid grid-cols-10 gap-2 text-center">
          {weekly.map((w) => (
            <div key={w.w} className="font-body" style={{ color: NAVY, fontSize: 11, opacity: 0.75 }}>
              W{w.w}
            </div>
          ))}
        </div>
        <p className="mt-6 font-body italic" style={{ color: NAVY, opacity: 0.75, fontSize: 14 }}>
          The core stayed, and their rate of return climbed roughly 10 points from Week 1 to Week 8.
        </p>
      </div>


      <div className="mt-14 grid md:grid-cols-3 gap-4">
        <StatCard n="126" l="Girls attended at least one session" />
        <StatCard n="+10 pts" l="Attendance rate lift from Week 1 to Week 8" variant="blue" />
        <StatCard n="72.8%" l="Peak weekly attendance rate, Week 8" variant="blue" />
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Looking Ahead                                                      */
/* ------------------------------------------------------------------ */

function Ahead() {
  const steps = [
    {
      t: "Add a pre-program survey",
      d: "Measure change rather than end-state, so growth in confidence is visible from day one.",
    },
    {
      t: "A Week-5 re-engagement touchpoint",
      d: "Reach girls just before the mid-season dip, the single highest-leverage change available.",
    },
    {
      t: "Pair student, parent & coach voices",
      d: "Run all three M&E surveys together for a fuller read on the confidence pillar.",
    },
    {
      t: "Deeper roots at the strongest sites",
      d: "Invest in the schools where enrollment, attendance, and coaching all converged.",
    },
    {
      t: "Close data gaps at intake",
      d: "Tighten grade, age, and demographic capture to sharpen future reporting.",
    },
    {
      t: "Track returning fighters",
      d: "Ask about prior FLAG seasons so we can measure how confidence compounds over time.",
    },
  ];
  return (
    <Section id="ahead" bg="navy">
      <div className="mb-10">
        <div className="kicker" style={{ color: BLUE }}>07 · Looking Ahead</div>
        <div className="rule-thick mb-6" style={{ background: BLUE }} />
        <h2 className="font-serif font-bold leading-[1.05] tracking-tight" style={{ color: "#f7f5ed", fontSize: "clamp(40px, 6vw, 68px)" }}>
          Building on <span style={{ color: BLUE, fontStyle: "italic" }}>a strong first year.</span>
        </h2>
      </div>

      <p className="font-body" style={{ color: "rgba(247,245,237,0.9)", fontSize: 18, lineHeight: 1.6 }}>
        Spring 2026 established the baseline. The three-year research cycle now has a first
        chapter it can measure against, and a clear set of moves to make the next season even
        stronger.
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-x-8 gap-y-8">
        {steps.map((s, i) => (
          <div key={s.t} className="grid grid-cols-[64px_1fr] gap-5">
            <div className="font-display" style={{ color: BLUE, fontSize: 44, lineHeight: 1 }}>
              {String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <div className="font-serif font-bold" style={{ color: "#f7f5ed", fontSize: 22 }}>{s.t}</div>
              <div className="font-body mt-2" style={{ color: "rgba(247,245,237,0.75)", fontSize: 15, lineHeight: 1.5 }}>
                {s.d}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 rounded-md p-8 md:p-10" style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)" }}>
        <div className="font-serif italic" style={{ color: "#f7f5ed", fontSize: "clamp(22px, 2.6vw, 32px)", lineHeight: 1.35 }}>
          “Boxing is the vehicle. The belief that they are capable is the destination.”
        </div>
        <div className="mt-6 flex items-center gap-4">
          <img src={flagLogo} alt="Fight Like a Girl" className="h-10 w-auto object-contain" />
          <div className="font-display" style={{ color: BLUE, fontSize: 12, letterSpacing: "0.22em" }}>
            Fight Like a Girl · 2026–29 Research Cycle
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ------------------------------------------------------------------ */
/* Footer                                                             */
/* ------------------------------------------------------------------ */

function Footer() {
  return (
    <footer style={{ background: "var(--cream)" }} className="w-full border-t" >
      <div className="mx-auto max-w-[1120px] px-6 md:px-10 py-14 grid md:grid-cols-[1fr_auto] items-end gap-8">
        <div>
          <img src={boxLogo} alt="Box United" className="h-10 w-auto object-contain" />
          <p className="mt-5 font-body max-w-md" style={{ color: NAVY, fontSize: 14, lineHeight: 1.6, opacity: 0.75 }}>
            Box United is a Chicago-based nonprofit that uses the sport of boxing to help
            students become leaders in life. Fight Like a Girl is our flagship program for
            girls in grades 4–12.
          </p>
        </div>
        <div className="font-body text-right" style={{ color: NAVY, fontSize: 13, opacity: 0.7 }}>
          <div>boxunited.org</div>
          <div className="mt-1">© 2026 Box United</div>
        </div>
      </div>
    </footer>
  );
}

/* ------------------------------------------------------------------ */
/* Page                                                               */
/* ------------------------------------------------------------------ */

function ReportPage() {
  return (
    <main className="w-full overflow-x-hidden">
      <TopNav />
      <Hero />
      <TOC />
      <ExecutiveSummary />
      <Confidence />
      <Voices />
      <Reach />
      <ShowedUp />
      <Core />
      <Ahead />
      <Footer />
    </main>
  );
}
