"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ChevronDown,
  Download,
  FileWarning,
  Gavel,
  Link2,
  Menu,
  Network,
  Share2,
  ShieldAlert,
  X,
} from "lucide-react";

/* ─── Config ───────────────────────────────────────────────────────── */

const DONATE_URL = "https://opportunity.vote/donate";

const MIA_DOSSIER_URL = "/mia-bonta-dossier.pdf";
const ROB_DOSSIER_URL = "/rob-bonta-dossier.pdf";
const MIA_DOSSIER_FILENAME = "Mia Bonta Dossier.pdf";
const ROB_DOSSIER_FILENAME = "Rob Bonta Dossier.pdf";

const NAV_LINKS = [
  { id: "evidence-section", label: "The Evidence" },
  { id: "mia-section", label: "Mia Bonta" },
  { id: "rob-section", label: "Rob Bonta" },
  { id: "network-section", label: "The Network" },
  { id: "action-section", label: "Take Action" },
];

const SHARE_TEXT =
  "The Bonta Files — How Rob and Mia Bonta built a pay-to-play empire inside California's justice system and legislature — funded by indicted criminals, fraudulent nonprofits, and straw donors tied to human trafficking. Read the full dossier:";

const STAT_CALLOUTS = [
  {
    value: "$172,316+",
    label: "From the Duong family — now under FBI indictment — into Rob and Mia Bonta's campaigns",
    highlight: true,
  },
  {
    value: "240,000+",
    label: "Gun owners' personal data leaked by Rob Bonta's DOJ — names, addresses, CCW numbers exposed for nearly 24 hours",
    highlight: true,
  },
  {
    value: "$469,000",
    label: "Spent on private lawyers during the FBI probe — five months after a blackmail letter from Mario Juarez",
    highlight: true,
  },
  {
    value: "SB 14",
    label: "Mia Bonta initially abstained on making child sex trafficking a serious felony — killing the bill in committee",
    highlight: false,
  },
  {
    value: "$3.4M+",
    label: "State grant Rob Bonta secured for failed Viridis Fuels — whose address later became Mia's campaign HQ",
    highlight: true,
  },
];

const REVELATIONS = [
  {
    id: "music-cafe",
    title: "Music Cafe Straw Donor Scandal",
    summary:
      "Mia Bonta's 2021 Assembly campaign was funded by alleged straw donors orchestrated by Andy Duong. One primary donor was Mon Kil Quan, listed owner of Music Cafe — a downtown Oakland karaoke lounge investigators believe Duong secretly controlled.",
    detail:
      "The Music Cafe was not merely a restaurant. In 2018, the California Department of Alcoholic Beverage Control raided the establishment and revoked its liquor license after undercover agents discovered employees selling ketamine and ecstasy, and offering prostitution for $100. Investigators discovered the Duongs utilized straw donors — individuals who make political donations under their own names but are secretly reimbursed by a hidden principal. Mia Bonta's 2021 campaign directly received thousands from this scheme. Andy Duong has publicly referred to Rob Bonta as \"his brother,\" and social media photographs document the Bontas celebrating with the federally indicted Duong family.",
    source: "FPPC filings, Oakland Public Ethics Commission investigation, ABC enforcement records, Mia Bonta Dossier §9",
  },
  {
    id: "oakland-promise",
    title: "Oakland Promise EIN Fraud",
    summary:
      "As CEO of Oakland Promise, Mia Bonta drew six-figure compensation while the organization operated without valid 501(c)(3) status — filing fraudulent IRS Form 990s and using duplicate employer identification numbers.",
    detail:
      "Oakland City Attorney Barbara Parker issued a formal legal opinion on March 3, 2020: \"Prior to 2019 Oakland Promise has not been a non-profit.\" Despite lacking independent 501(c)(3) status and never receiving a formal Letter of Determination from the IRS, Oakland Promise operated as a standalone tax-exempt entity. A federal lawsuit by Gene Hazzard alleges fraudulent tax returns. The Oakland Public Education Fund terminated its fiscal sponsorship in 2019, signing an Exit Agreement that legally absolved itself of fiduciary responsibility. The structural irregularities include duplicate EINs — a matter that remains on the public record even after the Ninth Circuit dismissed the appeal in December 2023.",
    source: "Gene Hazzard v. City of Oakland, Oakland City Attorney legal opinion, IRS Form 990s via ProPublica, Mia Bonta Dossier §3",
  },
  {
    id: "viridis",
    title: "Viridis Fuels / 1241 High Street Connection",
    summary:
      "Rob Bonta intervened to secure a $3.4 million state grant for Viridis Fuels — a failed biodiesel plant co-founded by Mario Juarez. Mia Bonta's 2021 campaign headquarters was at the exact same address: 1241 High Street, Oakland.",
    detail:
      "In 2014, the California Energy Commission initially denied Viridis Fuels' grant application, citing severe lack of capitalization — Juarez needed to raise $50 million. Assemblymember Rob Bonta then wrote a formal letter to the Commission heavily supporting the project. Following Bonta's political intervention, the commission abruptly reversed its decision and approved the $3.4 million grant. Trademarkia lists Viridis as \"dead/cancelled\" by 2019. When Mia Bonta ran for Assembly in 2021, her official campaign headquarters was located at 1241 High Street — the same corporate headquarters for Juarez's Viridis Fuels. Mia Bonta formally endorsed Juarez for the Alameda Democratic Central Committee; Juarez donated over $2,500 to her campaign.",
    source: "California Energy Commission records, campaign finance disclosures, Trademarkia, Mia Bonta Dossier §10",
  },
  {
    id: "blackmail",
    title: "The Compromising Video & $469k Legal Spend",
    summary:
      "In May 2024, Mario Juarez sent Rob Bonta a blackmail letter warning that Andy Duong possessed a \"compromising video.\" Five months later, Bonta's campaign disclosed $469,000 in private legal fees to Wilson Sonsini.",
    detail:
      "Juarez wrote: \"Andy Duong in particular has a recording of you in a compromising situation and that he routinely engages in entertaining elected and other officials to extract recordings without their knowledge for later use in blackmail.\" While Bonta denied the video exists, the documented communications regarding blackmail of the state's top law enforcement officer by targets of a federal bribery probe are politically catastrophic. Five months after the letter, Bonta's reelection campaign disclosed spending $469,000 on private legal fees to Wilson Sonsini Goodrich & Rosati. A formal FPPC complaint alleged improper use of campaign funds for private criminal defense. Loyola Law School professor Jessica Levinson flagged the expenditure as highly irregular. Bonta's campaign was forced to admit the money was used to \"help federal investigators\" in the probe resulting in the indictment of Oakland Mayor Thao and the Duong family.",
    source: "Juarez blackmail letter (May 2024), FPPC complaint, campaign finance disclosures, Rob Bonta Dossier §3.4",
  },
  {
    id: "ccw-breach",
    title: "CCW Data Breach — 240,000+ Exposed",
    summary:
      "Rob Bonta's DOJ unintentionally exposed confidential personal data of over 240,000 Californians who applied for or held CCW permits — full names, home addresses, license numbers — publicly accessible for nearly 24 hours.",
    detail:
      "The leaked data included full names, dates of birth, home addresses, gender, race, CCW license numbers, and California Criminal Information Index numbers — essentially a complete, searchable roadmap to the homes of gun owners. The data was publicly accessible and downloadable for nearly 24 hours before the DOJ shut down the dashboard. The breach occurred exactly four days after the U.S. Supreme Court's landmark Bruen decision struck down restrictive concealed carry laws. Bonta had publicly condemned Bruen and vowed to restrict concealed firearms. When his department leaked gun owners' names and home addresses days later, the Second Amendment community accused Bonta of deliberate retaliation.",
    source: "California DOJ records, Bruen decision timeline, Rob Bonta Dossier §5",
  },
  {
    id: "ab2624",
    title: "AB 2624 — The \"Stop Nick Shirley Act\"",
    summary:
      "In February 2026, Mia Bonta introduced AB 2624 to shield immigration service providers from public accountability. Opponents dubbed it the \"Stop Nick Shirley Act\" — criminalizing the exposure of nonprofit fraud.",
    detail:
      "Formally titled \"Privacy for immigration support services providers,\" AB 2624 aims to extend California's \"Safe at Home\" program to employees and volunteers of immigration service providers. Opponents informally dubbed it the \"Stop Nick Shirley Act,\" referring to the journalist whose viral investigations exposed massive fraud at Somali-run immigrant daycare centers in Minnesota — corroborated by federal prosecutors who found over half of an $18 billion taxpayer fund was likely stolen. The third-order implications are chilling viewed through the Bonta family's broader activities: just days before AB 2624 advanced, Mia Bonta's own nonprofit irregularities and ties to trafficking-front straw donors were under renewed scrutiny.",
    source: "AB 2624 legislative text, CalMatters, FIRE.org, Mia Bonta Dossier §8",
  },
  {
    id: "spousal-budget",
    title: "Spousal Budget Conflict",
    summary:
      "Mia Bonta chaired the Assembly budget subcommittee overseeing Rob Bonta's DOJ budget — a brazen conflict she initially refused to recuse from, deflecting criticism as \"sexist and racist.\"",
    detail:
      "Assemblywoman Mia Bonta was appointed to oversee the powerful legislative budget subcommittee responsible for funding her husband's Department of Justice. This created an unprecedented conflict wherein a spouse directly controlled the billion-dollar budget of the state's top law enforcement officer. When questioned by media and ethics watchdogs, Mia Bonta initially refused to recuse herself. Instead of addressing the structural conflict, she publicly characterized the media's questioning as \"sexist and racist,\" weaponizing identity politics to shield a blatant ethical violation. Following intense public backlash, she eventually reversed course.",
    source: "Assembly Budget Committee records, media reports, Rob Bonta Dossier §2.2",
  },
  {
    id: "behested",
    title: "Behested Payments Pipeline",
    summary:
      "Rob Bonta solicited $517,500+ in behested payments to nonprofits employing his wife. His Bonta California Progress Foundation \"loaned\" $25,000 to Mia's Literacy Lab while she drew $142,866 in salary.",
    detail:
      "Rob Bonta aggressively utilized the behested payment mechanism, soliciting $517,500 from donors to explicitly support nonprofits employing his wife. Google contributed $500,000 to Bring Me a Book, where Mia served as executive director — reported as a behested payment after Bonta wrote a formal letter of recommendation. PG&E, cannabis dispensary owners, and other Capitol lobbyists filled the pipeline. Separately, Rob Bonta established the Bonta California Progress Foundation, behested $75,000 from special interest groups lobbying him, then transferred $25,000 directly to Mia Bonta's Literacy Lab in 2018 — the same year she reported $142,866 executive compensation. Between 2013 and 2020, Rob Bonta behested over $5.8 million from unions, banks, tech giants, and healthcare companies.",
    source: "FPPC behested payment reports, IRS Form 990s, CalMatters, Rob Bonta Dossier §2.1",
  },
];

const TIMELINE = [
  { year: "2014", event: "Mia Bonta founds Literacy Lab. Rob Bonta intervenes to secure $3.4M state grant for Mario Juarez's Viridis Fuels after the Energy Commission initially denied it." },
  { year: "2015–16", event: "Oakland Promise launches under Mayor Libby Schaaf. Mia Bonta becomes CEO, drawing six-figure compensation while the organization lacks valid 501(c)(3) status." },
  { year: "2018", event: "ABC raids Music Cafe — revokes liquor license for narcotics and prostitution. Bonta California Progress Foundation transfers $25,000 to Literacy Lab." },
  { year: "2019", event: "Oakland Public Ethics Commission investigates CWS for illegal campaign contributions. Oakland Public Education Fund terminates fiscal sponsorship of Oakland Promise." },
  { year: "2021", event: "Rob Bonta appointed Attorney General. Mia wins special election for AD-18. Her campaign HQ: 1241 High Street — former Viridis Fuels address. Straw donor money flows from Music Cafe front." },
  { year: "2023", event: "Mia Bonta abstains on SB 14 (child sex trafficking as serious felony), sparking nationwide outrage. Governor Newsom intervenes. FBI raids Duong family and Mayor Sheng Thao." },
  { year: "2024", event: "Juarez sends blackmail letter to Rob Bonta (May). CCW data breach exposes 240,000+ permit holders (June). Bonta launches ExxonMobil suit via Cotchett firm (registered foreign agents). Campaign spends $469,000 on Wilson Sonsini." },
  { year: "2026", event: "Mia Bonta introduces AB 2624. Rob Bonta eyes governorship while entangled in federal corruption probe." },
];

const EVIDENCE_QUOTES = [
  {
    text: "Prior to 2019 Oakland Promise has not been a non-profit.",
    attribution: "— Oakland City Attorney Barbara Parker, formal legal opinion, March 3, 2020",
  },
  {
    text: "Andy Duong in particular has a recording of you in a compromising situation and that he routinely engages in entertaining elected and other officials to extract recordings without their knowledge for later use in blackmail.",
    attribution: "— Mario Juarez, blackmail letter to Rob Bonta, May 2024",
  },
  {
    text: "The Duong family has shoveled an astonishing $172,316.45 into the political campaigns of Rob and Mia Bonta over the years—a figure more than 30 times higher than the $5,000 average the Duongs usually contributed to curry favor with other local politicians.",
    attribution: "— Campaign finance analysis, Mia Bonta Dossier §9",
  },
];

const NETWORK_NODES = [
  { id: "duong", label: "Duong Family", sub: "FBI indictment · $172,316+ to Bontas · CWS straw donors" },
  { id: "music", label: "Music Cafe", sub: "Trafficking & narcotics front · Straw donor pipeline" },
  { id: "bontas", label: "Rob & Mia Bonta", sub: "AG office · AD-18 · Shared donor network" },
  { id: "viridis", label: "Viridis Fuels", sub: "$3.4M grant · 1241 High St · Mario Juarez" },
  { id: "juarez", label: "Mario Juarez", sub: "Bagman · Blackmail letter · $469k legal spend" },
];

/* ─── Helpers ──────────────────────────────────────────────────────── */

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (el) {
    const offset = 80;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.08 } },
};

/* ─── Share Modal ──────────────────────────────────────────────────── */

function ShareModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const url = typeof window !== "undefined" ? window.location.href : "";
  const fullText = `${SHARE_TEXT} ${url}`;

  const shareLinks = [
    {
      label: "Share on X",
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`,
      color: "bg-white text-black hover:bg-gray-200",
    },
    {
      label: "Share on Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(SHARE_TEXT)}`,
      color: "bg-[#1877f2] text-white hover:bg-[#166fe5]",
    },
  ];

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-modal-title"
        >
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} aria-hidden />
          <motion.div
            className="relative w-full max-w-lg rounded-lg border border-red-900/50 bg-[#0f172a] p-6 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 text-gray-400 hover:text-white"
              aria-label="Close share modal"
            >
              <X className="h-5 w-5" />
            </button>
            <h2 id="share-modal-title" className="mb-2 text-xl font-bold uppercase tracking-wide text-white">
              Share The Files
            </h2>
            <p className="mb-4 text-sm text-gray-400">Spread the evidence. Pre-written copy ready to post.</p>
            <div className="mb-6 rounded border border-red-900/30 bg-[#0a0f1a] p-4 text-sm leading-relaxed text-gray-300">
              {fullText}
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              {shareLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 rounded px-4 py-3 text-center text-sm font-bold uppercase tracking-wider transition-colors ${link.color}`}
                >
                  {link.label}
                </a>
              ))}
            </div>
            <button
              onClick={() => navigator.clipboard?.writeText(fullText)}
              className="mt-3 w-full rounded border border-red-800/50 py-2.5 text-sm font-medium text-red-400 transition-colors hover:bg-red-950/30"
            >
              Copy to Clipboard
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Scandal Card ─────────────────────────────────────────────────── */

function ScandalCard({
  revelation,
  expanded,
  onToggle,
}: {
  revelation: (typeof REVELATIONS)[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <motion.article
      layout
      className="scandal-card rounded-r-lg border border-white/5 bg-[#0f172a]/80 p-5 md:p-6"
      variants={fadeUp}
    >
      <div className="mb-3 flex items-start gap-3">
        <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden />
        <h3 className="text-lg font-bold leading-snug text-white md:text-xl">{revelation.title}</h3>
      </div>
      <p className="mb-4 text-sm leading-relaxed text-gray-300 md:text-base">{revelation.summary}</p>
      <button
        onClick={onToggle}
        className="flex items-center gap-1.5 text-sm font-semibold uppercase tracking-wider text-red-500 transition-colors hover:text-red-400"
        aria-expanded={expanded}
        aria-controls={`detail-${revelation.id}`}
      >
        Read the evidence
        <ChevronDown className={`h-4 w-4 transition-transform ${expanded ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {expanded && (
          <motion.div
            id={`detail-${revelation.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] as const }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-red-900/30 pt-4">
              <p className="mb-3 text-sm leading-relaxed text-gray-300">{revelation.detail}</p>
              <p className="text-xs text-gray-500">
                <span className="font-semibold text-red-700/80">Source: </span>
                {revelation.source}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

/* ─── Main Page ────────────────────────────────────────────────────── */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const [showFloatingShare, setShowFloatingShare] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFloatingShare(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const xShareHref = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${SHARE_TEXT} ${shareUrl}`)}`;

  return (
    <div className="dossier-texture min-h-screen">
      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />

      {/* ── Navbar ── */}
      <header className="no-print sticky top-0 z-50 border-b border-red-900/20 bg-[#0a0f1a]/95 backdrop-blur-md">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6" aria-label="Main navigation">
          <button
            onClick={() => scrollToSection("hero")}
            className="text-sm font-black uppercase tracking-[0.15em] text-white md:text-base"
          >
            The Bonta Files
          </button>

          <div className="hidden items-center gap-6 lg:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className="text-xs font-semibold uppercase tracking-wider text-gray-400 transition-colors hover:text-white"
              >
                {link.label}
              </button>
            ))}
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded border border-red-800/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-red-400 transition-colors hover:bg-red-950/30"
            >
              Donate
            </a>
            <button
              onClick={() => setShareOpen(true)}
              className="rounded bg-red-700 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-600"
            >
              Share The Files
            </button>
          </div>

          <button
            className="lg:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-red-900/20 lg:hidden"
            >
              <div className="flex flex-col gap-1 px-4 py-3">
                {NAV_LINKS.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => {
                      scrollToSection(link.id);
                      setMenuOpen(false);
                    }}
                    className="py-2 text-left text-sm font-semibold uppercase tracking-wider text-gray-300"
                  >
                    {link.label}
                  </button>
                ))}
                <a
                  href={DONATE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 rounded border border-red-800/60 py-3 text-center text-sm font-bold uppercase tracking-wider text-red-400"
                >
                  Donate
                </a>
                <button
                  onClick={() => {
                    setShareOpen(true);
                    setMenuOpen(false);
                  }}
                  className="mt-2 rounded bg-red-700 py-3 text-center text-sm font-bold uppercase tracking-wider text-white"
                >
                  Share The Files
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ── Hero ── */}
      <section id="hero" className="relative overflow-hidden px-4 pb-20 pt-16 md:px-6 md:pb-28 md:pt-24">
        <motion.div
          className="relative mx-auto max-w-5xl text-center"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.p variants={fadeUp} className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-red-600 md:text-sm">
            The evidence trail of California&apos;s most compromised power couple
          </motion.p>
          <motion.div variants={fadeUp} className="mb-8 flex justify-center">
            <div className="relative overflow-hidden rounded-lg border-2 border-red-900/40 shadow-2xl shadow-red-950/30 ring-1 ring-red-800/20">
              <Image
                src="/picture.jpeg"
                alt="Rob and Mia Bonta"
                width={384}
                height={381}
                priority
                className="h-auto w-64 sm:w-72 md:w-80 lg:w-96"
              />
            </div>
          </motion.div>
          <motion.h1
            variants={fadeUp}
            className="mb-6 text-5xl font-black uppercase leading-[0.95] tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            The Bonta Files
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="mx-auto mb-4 max-w-3xl text-base leading-relaxed text-gray-300 md:text-lg lg:text-xl"
          >
            How Rob and Mia Bonta built a{" "}
            <span className="font-semibold text-red-500">pay-to-play empire</span> inside California&apos;s
            justice system and legislature — funded by indicted criminals, fraudulent nonprofits, and straw
            donors tied to human trafficking.
          </motion.p>
          <motion.div variants={fadeUp} className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <button
              onClick={() => scrollToSection("summary-section")}
              className="w-full rounded bg-red-700 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-600 sm:w-auto"
            >
              Read the Evidence
            </button>
            <a
              href={MIA_DOSSIER_URL}
              download={MIA_DOSSIER_FILENAME}
              className="flex w-full items-center justify-center gap-2 rounded border border-red-800/60 px-8 py-4 text-sm font-bold uppercase tracking-wider text-red-400 transition-colors hover:bg-red-950/30 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Mia Bonta Dossier
            </a>
            <a
              href={ROB_DOSSIER_URL}
              download={ROB_DOSSIER_FILENAME}
              className="flex w-full items-center justify-center gap-2 rounded border border-red-800/60 px-8 py-4 text-sm font-bold uppercase tracking-wider text-red-400 transition-colors hover:bg-red-950/30 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Rob Bonta Dossier
            </a>
          </motion.div>
        </motion.div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Executive Summary ── */}
      <section id="summary-section" className="px-4 py-16 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <h2 className="mb-4 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              The Bonta Machine
            </h2>
            <p className="text-base leading-relaxed text-gray-300 md:text-lg">
              Rob and Mia Bonta are not two politicians with separate scandals. They are a single corrupt
              political machine that monetized public office. Rob funnels corporate behested payments into
              his wife&apos;s nonprofits, weaponizes the Attorney General&apos;s office for partisan gain, and
              bleeds half a million dollars in campaign cash to manage an FBI blackmail inquiry. Mia inherits
              his donor network, chairs the subcommittee that funds his DOJ budget, and takes straw-donor
              money from a human trafficking front while shielding nonprofit fraud with AB 2624. The Duong
              family alone pumped <span className="font-bold text-red-500">$172,316.45</span> into their
              campaigns — more than 30 times what the Duongs gave other politicians.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STAT_CALLOUTS.map((stat) => (
              <div
                key={stat.value}
                className={`rounded-lg border p-5 ${
                  stat.highlight
                    ? "border-red-800/40 bg-red-950/20"
                    : "border-white/5 bg-[#0f172a]/60"
                }`}
              >
                <div
                  className={`stat-number mb-2 text-3xl font-black md:text-4xl ${
                    stat.highlight ? "text-red-500" : "text-white"
                  }`}
                >
                  {stat.value}
                </div>
                <p className="text-sm leading-relaxed text-gray-400">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Key Revelations ── */}
      <section id="evidence-section" className="px-4 py-16 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <div className="mb-2 flex items-center gap-2">
              <AlertTriangle className="h-6 w-6 text-red-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Priority Intel</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              Key Revelations
            </h2>
            <p className="mt-3 max-w-2xl text-gray-400">
              Eight scandals. One machine. Every fact drawn from public records, FBI filings, and campaign
              finance disclosures.
            </p>
          </motion.div>

          <div className="grid gap-5 md:grid-cols-2">
            {REVELATIONS.map((rev) => (
              <ScandalCard
                key={rev.id}
                revelation={rev}
                expanded={expandedCard === rev.id}
                onToggle={() => setExpandedCard(expandedCard === rev.id ? null : rev.id)}
              />
            ))}
          </div>
        </motion.div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Mia Bonta ── */}
      <section id="mia-section" className="px-4 py-16 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Target Profile</span>
            <h2 className="mt-2 mb-6 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              Mia Bonta Exposed
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-8 rounded-lg border border-red-900/30 bg-[#0f172a]/60 p-6 md:p-8">
            <p className="mb-4 text-lg font-semibold text-white">
              The &quot;grassroots&quot; assemblymember is an elite nonprofit operator who monetized charity
              work, took trafficking-front money, and legislates to protect herself.
            </p>
            <p className="mb-4 text-base leading-relaxed text-gray-300">
              Mia Bonta markets herself as a community advocate. The record shows a CEO who drew up to{" "}
              <span className="text-red-400 font-semibold">$160,625</span> from Oakland Promise while the
              organization operated without valid tax-exempt status. She founded Literacy Lab in 2014, then
              watched her husband&apos;s foundation funnel <span className="text-red-400 font-semibold">$25,000</span>{" "}
              in corporate lobbying money directly into her salary.
            </p>
            <p className="mb-4 text-base leading-relaxed text-gray-300">
              Her 2021 campaign headquarters sat at{" "}
              <span className="text-red-400 font-semibold">1241 High Street</span> — the dead address of
              Viridis Fuels, a company that received a{" "}
              <span className="text-red-400 font-semibold">$3.4 million</span> grant her husband personally
              lobbied for. She took straw-donor cash from Music Cafe, raided by state agents for narcotics
              and prostitution. When bipartisan lawmakers tried to make child sex trafficking a serious felony
              under SB 14, she <span className="font-bold text-red-500">abstained</span> — killing the bill
              until Governor Newsom intervened.
            </p>
            <p className="text-base leading-relaxed text-gray-300">
              Now she authors AB 2624 — the &quot;Stop Nick Shirley Act&quot; — to criminalize exposing
              nonprofit fraud while her own nonprofit irregularities and ties to trafficking-front straw donors
              remain under scrutiny.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: ShieldAlert,
                title: "Nonprofit Fraud",
                text: "Oakland Promise filed fraudulent 990s, used duplicate EINs, and operated for years without IRS 501(c)(3) determination — while Mia drew six-figure CEO pay.",
              },
              {
                icon: Gavel,
                title: "SB 14 Abstention",
                text: "In July 2023, Bonta abstained on classifying child sex trafficking as a serious felony. Nationwide outrage forced a reversal within 48 hours.",
              },
              {
                icon: FileWarning,
                title: "AB 2624",
                text: "February 2026: Introduced legislation opponents call the \"Stop Nick Shirley Act\" — extending privacy shields to immigration nonprofits under scrutiny for fraud.",
              },
              {
                icon: Link2,
                title: "Trafficking Money",
                text: "2021 campaign accepted straw-donor funds from Music Cafe — an alleged Duong front raided for ketamine, ecstasy, and prostitution.",
              },
            ].map((item) => (
              <div key={item.title} className="scandal-card rounded-lg border border-white/5 bg-[#0f172a]/40 p-5">
                <item.icon className="mb-3 h-5 w-5 text-red-600" />
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Rob Bonta ── */}
      <section id="rob-section" className="px-4 py-16 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp}>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Target Profile</span>
            <h2 className="mt-2 mb-6 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              Rob Bonta Exposed
            </h2>
          </motion.div>

          <motion.div variants={fadeUp} className="mb-8 rounded-lg border border-red-900/30 bg-[#0f172a]/60 p-6 md:p-8">
            <p className="mb-4 text-lg font-semibold text-white">
              California&apos;s top cop is compromised by federal corruption probes, catastrophic data breaches,
              and the weaponization of his office for partisan warfare.
            </p>
            <p className="mb-4 text-base leading-relaxed text-gray-300">
              Rob Bonta positions himself as a progressive champion and leading gubernatorial contender. The
              record shows a chief law enforcement officer who leaked{" "}
              <span className="font-bold text-red-500">240,000+</span> concealed-carry permit holders&apos;
              personal data — four days after the Supreme Court&apos;s Bruen decision — then spent{" "}
              <span className="font-bold text-red-500">$469,000</span> in campaign funds on private lawyers
              after a blackmail letter from a federal probe target.
            </p>
            <p className="mb-4 text-base leading-relaxed text-gray-300">
              He outsourced the ExxonMobil lawsuit to the Cotchett firm — registered as{" "}
              <span className="text-red-400 font-semibold">foreign agents</span> under FARA after an Australian
              competitor retained them to recruit U.S. environmental groups as litigation proxies. ExxonMobil
              alleged explicit pay-for-play connections. He manipulated ballot summaries on Prop 36, falsely
              warning voters it would defund schools and treatment — voters passed it with{" "}
              <span className="text-red-400 font-semibold">68.4%</span> anyway. The Supreme Court defeated him
              6-3 in <span className="text-white font-semibold">AFP v. Bonta</span>, ruling his donor-disclosure
              regime violated the First Amendment.
            </p>
            <p className="text-base leading-relaxed text-gray-300">
              He solicited <span className="text-red-400 font-semibold">$517,500+</span> in behested payments
              to nonprofits employing his wife — including a $500,000 Google grant to Bring Me a Book. Between
              2013 and 2020, he behested over <span className="text-red-400 font-semibold">$5.8 million</span>{" "}
              from unions, banks, tech giants, and healthcare companies lobbying his office.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid gap-4 md:grid-cols-2">
            {[
              {
                icon: ShieldAlert,
                title: "CCW Breach Hypocrisy",
                text: "DOJ exposed 240,000+ permit holders' names, addresses, and license numbers for nearly 24 hours — days after Bonta publicly condemned the Bruen decision.",
              },
              {
                icon: Gavel,
                title: "ExxonMobil / Foreign Agents",
                text: "September 2024: Launched plastic lawsuit while Cotchett firm — retained by Australian competitor — operated as registered foreign agents recruiting U.S. proxy plaintiffs.",
              },
              {
                icon: FileWarning,
                title: "Prop 36 Sabotage",
                text: "Authored misleading ballot summary falsely claiming Prop 36 would defund mental health and schools. Voters rejected his narrative with 68.4%.",
              },
              {
                icon: AlertTriangle,
                title: "AFP v. Bonta",
                text: "Supreme Court ruled 6-3 that his donor-disclosure requirements violated the First Amendment — a definitive rebuke of his weaponized regulatory agenda.",
              },
            ].map((item) => (
              <div key={item.title} className="scandal-card rounded-lg border border-white/5 bg-[#0f172a]/40 p-5">
                <item.icon className="mb-3 h-5 w-5 text-red-600" />
                <h3 className="mb-2 font-bold text-white">{item.title}</h3>
                <p className="text-sm leading-relaxed text-gray-400">{item.text}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Network ── */}
      <section id="network-section" className="px-4 py-16 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10">
            <div className="mb-2 flex items-center gap-2">
              <Network className="h-6 w-6 text-red-600" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Connection Map</span>
            </div>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              The Interconnected Web
            </h2>
            <p className="mt-3 max-w-2xl text-gray-400">
              This is not a collection of isolated incidents. It is one machine — Duong money, trafficking
              fronts, failed grants, shared addresses, and blackmail — all feeding the Bonta political empire.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="relative">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {NETWORK_NODES.map((node, i) => (
                <motion.div
                  key={node.id}
                  className={`rounded-lg border p-5 ${
                    node.id === "bontas"
                      ? "border-red-600 bg-red-950/30 sm:col-span-2 lg:col-span-1 lg:row-span-2 lg:flex lg:flex-col lg:justify-center"
                      : "border-white/10 bg-[#0f172a]/60"
                  }`}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <h3
                    className={`mb-1 font-black uppercase tracking-wide ${
                      node.id === "bontas" ? "text-xl text-red-400 md:text-2xl" : "text-base text-white"
                    }`}
                  >
                    {node.label}
                  </h3>
                  <p className="text-sm text-gray-400">{node.sub}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-red-900/30 bg-[#0f172a]/40 p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-red-500">The Triangle</h3>
              <div className="space-y-3 text-sm leading-relaxed text-gray-300">
                <p>
                  <span className="font-semibold text-white">Duong Family</span> → funnels{" "}
                  <span className="text-red-400">$172,316.45</span> through straw donors including Music Cafe
                  → into <span className="font-semibold text-white">Bonta campaigns</span>
                </p>
                <p>
                  <span className="font-semibold text-white">Mario Juarez</span> → operates Viridis Fuels at{" "}
                  <span className="text-red-400">1241 High Street</span> → receives{" "}
                  <span className="text-red-400">$3.4M grant</span> lobbied by Rob → same address becomes
                  Mia&apos;s campaign HQ
                </p>
                <p>
                  <span className="font-semibold text-white">Juarez</span> → acts as Duong bagman ($125K +
                  $170K conduit) → sends <span className="text-red-400">blackmail letter</span> to Rob Bonta
                  → triggers <span className="text-red-400">$469,000</span> in campaign legal fees
                </p>
                <p className="border-t border-red-900/20 pt-3 font-semibold text-red-400">
                  Andy Duong calls Rob Bonta &quot;his brother.&quot; The Bontas celebrate birthdays courtside
                  with the indicted family. One machine. One trail of evidence.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Timeline ── */}
      <section id="timeline-section" className="px-4 py-16 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-3xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.div variants={fadeUp} className="mb-10 text-center md:text-left">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-red-600">Chronology</span>
            <h2 className="mt-2 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
              Timeline of Corruption
            </h2>
          </motion.div>

          <div className="relative border-l-2 border-red-900/40 pl-8">
            {TIMELINE.map((item, i) => (
              <motion.div
                key={item.year}
                className="relative mb-8 last:mb-0"
                variants={fadeUp}
                custom={i}
              >
                <div className="absolute -left-[calc(2rem+5px)] top-1 h-3 w-3 rounded-full bg-red-600 ring-4 ring-[#0a0f1a]" />
                <div className="mb-1 text-sm font-black uppercase tracking-wider text-red-500">{item.year}</div>
                <p className="text-sm leading-relaxed text-gray-300 md:text-base">{item.event}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Evidence Quotes ── */}
      <section className="px-4 py-16 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="mb-10 text-center text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            The Evidence
          </motion.h2>

          <div className="space-y-6">
            {EVIDENCE_QUOTES.map((quote, i) => (
              <motion.blockquote
                key={i}
                variants={fadeUp}
                className="quote-block rounded-r-lg p-6 md:p-8"
              >
                <p className="mb-3 font-mono text-sm leading-relaxed text-gray-200 md:text-base">
                  &ldquo;{quote.text}&rdquo;
                </p>
                <footer className="text-xs font-semibold uppercase tracking-wider text-red-600/80">
                  {quote.attribution}
                </footer>
              </motion.blockquote>
            ))}
          </div>

          <motion.p
            variants={fadeUp}
            className="mt-10 text-center text-sm leading-relaxed text-gray-500"
          >
            All facts are drawn from IRS Form 990s, FBI filings, court records, legislative voting history,
            and public campaign finance disclosures.
          </motion.p>
        </motion.div>
      </section>

      <div className="section-divider mx-auto max-w-5xl" />

      {/* ── Take Action ── */}
      <section id="action-section" className="px-4 py-16 md:px-6 md:py-24">
        <motion.div
          className="mx-auto max-w-3xl text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
        >
          <motion.h2 variants={fadeUp} className="mb-4 text-3xl font-black uppercase tracking-tight text-white md:text-4xl">
            Take Action
          </motion.h2>
          <motion.p variants={fadeUp} className="mb-10 text-base leading-relaxed text-gray-300 md:text-lg">
            Rob and Mia Bonta built their empire in the dark. Public exposure is the antidote. Share the
            files and download the dossiers.
          </motion.p>

          <motion.div variants={fadeUp} className="mb-6 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
            <a
              href={xShareHref}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center gap-2 rounded bg-red-700 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-600 sm:w-auto"
            >
              <Share2 className="h-4 w-4" />
              Share on X
            </a>
            <a
              href={MIA_DOSSIER_URL}
              download={MIA_DOSSIER_FILENAME}
              className="flex w-full items-center justify-center gap-2 rounded border border-red-800/60 px-8 py-4 text-sm font-bold uppercase tracking-wider text-red-400 transition-colors hover:bg-red-950/30 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Mia Bonta Dossier
            </a>
            <a
              href={ROB_DOSSIER_URL}
              download={ROB_DOSSIER_FILENAME}
              className="flex w-full items-center justify-center gap-2 rounded border border-red-800/60 px-8 py-4 text-sm font-bold uppercase tracking-wider text-red-400 transition-colors hover:bg-red-950/30 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Rob Bonta Dossier
            </a>
          </motion.div>

          <motion.div variants={fadeUp}>
            <a
              href={DONATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-red-700 px-10 py-4 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-red-600"
            >
              Donate
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer ── */}
      <footer className="border-t border-red-900/20 px-4 py-8 md:px-6">
        <div className="mx-auto max-w-5xl text-center">
          <p className="mb-2 text-sm font-black uppercase tracking-[0.2em] text-white">The Bonta Files</p>
          <p className="text-xs leading-relaxed text-gray-600">
            Paid for by Americans for Opportunity
          </p>
          <a
            href="mailto:contact@bontafiles.com"
            className="mt-1 inline-block text-xs text-gray-500 transition-colors hover:text-red-400"
          >
            contact@bontafiles.com
          </a>
        </div>
      </footer>

      {/* ── Floating Share (mobile) ── */}
      <AnimatePresence>
        {showFloatingShare && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={() => setShareOpen(true)}
            className="no-print fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-red-700 text-white shadow-lg shadow-red-900/40 transition-colors hover:bg-red-600 md:hidden"
            aria-label="Share the files"
          >
            <Share2 className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
