import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Command, Sparkles, ArrowRight } from "lucide-react";
import { workspaces } from "@/lib/workspaces";
import { WorkspaceCard } from "@/components/workspace-card";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nebula OS — The AI Operating System" },
      { name: "description", content: "A premium operating system of AI workspaces for designers, developers, creators, students and teams." },
      { property: "og:title", content: "Nebula OS — The AI Operating System" },
      { property: "og:description", content: "A premium operating system of AI workspaces for designers, developers, creators, students and teams." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {
  const [mouse, setMouse] = useState({ x: 50, y: 30 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden text-white">
      {/* Cursor-reactive aurora */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-70 transition-[background] duration-300"
        style={{
          background: `radial-gradient(600px 400px at ${mouse.x}% ${mouse.y}%, rgba(168,85,247,0.18), transparent 60%)`,
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-bg" />

      <Nav />

      <main className="mx-auto max-w-7xl px-6 pb-24 pt-16 sm:px-8">
        <Hero />
        <Manifest />

        <section id="workspaces" className="mt-24">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-[0.3em] text-white/50">
                / NINE ENVIRONMENTS
              </p>
              <h2 className="font-display mt-2 text-4xl leading-none sm:text-5xl">
                Choose your <span className="italic text-white/70">workspace</span>.
              </h2>
            </div>
            <p className="hidden max-w-sm text-sm text-white/60 md:block">
              Each workspace is a purpose-built environment. Every frontier model, one keystroke away.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {workspaces.map((w, i) => (
              <WorkspaceCard key={w.slug} workspace={w} index={i} />
            ))}
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-4 z-40 mx-auto max-w-7xl px-6 sm:px-8">
      <div className="glass-strong flex items-center justify-between rounded-full px-4 py-2.5">
        <Link to="/" className="flex items-center gap-2">
          <div className="grid h-7 w-7 place-items-center rounded-lg bg-gradient-to-br from-fuchsia-500 via-violet-500 to-blue-500 shadow-lg">
            <Sparkles className="h-3.5 w-3.5 text-white" />
          </div>
          <span className="font-display text-xl leading-none">Nebula</span>
          <span className="hidden font-mono text-[10px] tracking-[0.3em] text-white/50 sm:inline">OS · v1.0</span>
        </Link>
        <nav className="hidden items-center gap-1 text-sm text-white/70 md:flex">
          <a href="#workspaces" className="rounded-full px-3 py-1.5 hover:bg-white/5 hover:text-white">Workspaces</a>
          <a href="#manifest" className="rounded-full px-3 py-1.5 hover:bg-white/5 hover:text-white">Manifest</a>
          <a href="#footer" className="rounded-full px-3 py-1.5 hover:bg-white/5 hover:text-white">Changelog</a>
        </nav>
        <div className="flex items-center gap-2">
          <button className="glass hidden items-center gap-2 rounded-full px-3 py-1.5 text-xs text-white/70 sm:inline-flex">
            <Command className="h-3.5 w-3.5" /> K
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-medium text-black transition-transform hover:scale-105">
            Launch OS <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative pt-24 pb-16">
      <div className="mx-auto max-w-4xl text-center">
        <div className="glass inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] tracking-wider text-white/80">
          <span className="relative flex h-1.5 w-1.5">
            <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
          </span>
          58 MODELS · ONLINE
        </div>
        <h1 className="font-display mt-6 text-6xl leading-[0.95] tracking-tight sm:text-7xl md:text-8xl">
          The <span className="italic text-white/60">operating system</span>
          <br /> for every intelligence.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-base text-white/65 sm:text-lg">
          Nine cinematic workspaces. Every frontier AI model, orchestrated in one glass surface.
          Designed like Vision Pro. Fast like Linear. Feels like the future.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href="#workspaces"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Enter the OS
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
          <a
            href="#manifest"
            className="glass inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-white/85"
          >
            Read the manifest
          </a>
        </div>
      </div>

      {/* Hero orb */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, rgba(168,85,247,0.4), rgba(59,130,246,0.25) 40%, transparent 70%)" }}
      />
    </section>
  );
}

function Manifest() {
  const pillars = [
    { k: "01", t: "Cinematic", d: "Every pixel, every motion designed with a director's eye." },
    { k: "02", t: "Composable", d: "Split-screen models, multi-AI responses, workspace memory." },
    { k: "03", t: "Sovereign", d: "Your prompts, your files, your context — always yours." },
    { k: "04", t: "Live", d: "Real-time status, streaming responses, fluid handoff." },
  ];
  return (
    <section id="manifest" className="mt-28">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <p className="font-mono text-[11px] tracking-[0.3em] text-white/50">/ MANIFEST</p>
          <h2 className="font-display mt-2 text-4xl leading-none sm:text-5xl">
            Not another dashboard.
          </h2>
        </div>
      </div>
      <div className="glass-strong noise relative overflow-hidden rounded-3xl p-8 sm:p-12">
        <div className="noise-overlay" />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p) => (
            <div key={p.k}>
              <div className="font-mono text-[11px] tracking-[0.3em] text-white/40">{p.k}</div>
              <div className="font-display mt-2 text-3xl">{p.t}</div>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="footer" className="mt-24 border-t border-white/10 pt-8">
      <div className="flex flex-col items-start justify-between gap-4 text-xs text-white/50 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <div className="grid h-5 w-5 place-items-center rounded-md bg-gradient-to-br from-fuchsia-500 via-violet-500 to-blue-500">
            <Sparkles className="h-2.5 w-2.5 text-white" />
          </div>
          <span className="font-mono tracking-wider">NEBULA OS · MMXXVI</span>
        </div>
        <div className="font-mono tracking-wider">STATUS · ALL SYSTEMS NORMAL</div>
      </div>
    </footer>
  );
}
