import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import {
  ArrowLeft, Sparkles, Command, Layers, Plus, Search, Star, Pin,
  Clock, FileText, Split, Send, MessageSquare, Folder, Zap, ChevronRight,
} from "lucide-react";
import { getWorkspace, workspaces } from "@/lib/workspaces";

export const Route = createFileRoute("/workspace/$slug")({
  head: ({ params }) => {
    const w = getWorkspace(params.slug);
    return {
      meta: [
        { title: w ? `${w.name} — Nebula OS` : "Workspace — Nebula OS" },
        { name: "description", content: w?.description ?? "Nebula OS workspace." },
        { property: "og:title", content: w ? `${w.name} — Nebula OS` : "Workspace — Nebula OS" },
        { property: "og:description", content: w?.description ?? "Nebula OS workspace." },
      ],
    };
  },
  loader: ({ params }) => {
    const w = getWorkspace(params.slug);
    if (!w) throw notFound();
    return { workspace: w };
  },
  notFoundComponent: NotFound,
  component: WorkspacePage,
});

function NotFound() {
  return (
    <div className="grid min-h-screen place-items-center text-white">
      <div className="text-center">
        <p className="font-mono text-xs tracking-widest text-white/50">404 · WORKSPACE</p>
        <h1 className="font-display mt-2 text-5xl">Not found</h1>
        <Link to="/" className="glass mt-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
          <ArrowLeft className="h-4 w-4" /> Back to OS
        </Link>
      </div>
    </div>
  );
}

function WorkspacePage() {
  const { workspace: w } = Route.useLoaderData() as { workspace: import("@/lib/workspaces").Workspace };
  const [g1, g2, g3] = w.gradient;
  const Icon = w.icon;

  return (
    <div className="relative min-h-screen text-white animate-rise">
      {/* Ambient workspace mesh */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 opacity-80"
        style={{
          background: `
            radial-gradient(50% 40% at 15% 10%, ${g1}55, transparent 60%),
            radial-gradient(50% 40% at 85% 20%, ${g2}55, transparent 60%),
            radial-gradient(60% 50% at 50% 100%, ${g3}55, transparent 60%),
            oklch(0.14 0.02 270)`,
        }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10 grid-bg" />

      {/* Top nav */}
      <header className="sticky top-4 z-40 mx-auto max-w-[1600px] px-4 sm:px-6">
        <div className="glass-strong flex items-center justify-between rounded-2xl px-3 py-2">
          <div className="flex items-center gap-3">
            <Link to="/" className="glass inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-xs text-white/80 hover:text-white">
              <ArrowLeft className="h-3.5 w-3.5" /> OS
            </Link>
            <div className="hidden items-center gap-1.5 text-xs text-white/50 sm:flex">
              <ChevronRight className="h-3 w-3" />
              <span className="font-mono tracking-widest">WORKSPACES</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-white">{w.name}</span>
            </div>
          </div>
          <div className="glass hidden min-w-[380px] items-center gap-2 rounded-xl px-3 py-1.5 text-xs text-white/60 md:flex">
            <Search className="h-3.5 w-3.5" />
            <span>Ask anything, run any AI…</span>
            <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-white/40">
              <Command className="h-3 w-3" /> K
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="glass inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[10px] tracking-widest text-white/80">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              LIVE
            </span>
            <button
              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-white"
              style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
            >
              <Plus className="h-3.5 w-3.5" /> New
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1600px] gap-4 px-4 pt-4 pb-8 sm:px-6 lg:grid-cols-[260px_minmax(0,1fr)_320px]">
        {/* LEFT SIDEBAR */}
        <aside className="glass-strong noise sticky top-24 hidden h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl p-3 lg:flex">
          <div className="noise-overlay" />
          <div className="relative flex items-center gap-3 rounded-xl p-2">
            <div
              className="grid h-10 w-10 shrink-0 place-items-center rounded-xl"
              style={{
                background: `linear-gradient(135deg, ${g1}, ${g2})`,
                boxShadow: `0 10px 30px -10px rgba(${w.glow}, 0.6)`,
              }}
            >
              <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
            </div>
            <div className="min-w-0">
              <div className="truncate font-display text-lg leading-none">{w.name}</div>
              <div className="mt-1 font-mono text-[10px] tracking-widest text-white/50">
                WS / {w.number}
              </div>
            </div>
          </div>

          <SectionLabel>Tabs</SectionLabel>
          <div className="relative space-y-1">
            {["Overview","Canvas","Chat","Files","Prompts"].map((t, i) => (
              <button
                key={t}
                className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm ${i===0 ? "bg-white/10 text-white" : "text-white/65 hover:bg-white/5 hover:text-white"}`}
              >
                <Layers className="h-3.5 w-3.5" /> {t}
              </button>
            ))}
          </div>

          <SectionLabel>Pinned AI</SectionLabel>
          <div className="relative space-y-1">
            {w.ais.slice(0, 5).map((ai) => (
              <button key={ai} className="group flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm text-white/75 hover:bg-white/5 hover:text-white">
                <span className="grid h-5 w-5 place-items-center rounded-md" style={{ background: `linear-gradient(135deg, ${g2}, ${g3})` }}>
                  <Sparkles className="h-3 w-3 text-white" />
                </span>
                <span className="truncate">{ai}</span>
                <Pin className="ml-auto h-3 w-3 text-white/30 group-hover:text-white/70" />
              </button>
            ))}
          </div>

          <SectionLabel>Recent Projects</SectionLabel>
          <div className="relative space-y-1">
            {["Untitled draft","Q3 pitch deck","Landing hero","Icon set / mono"].map((p) => (
              <button key={p} className="flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-left text-sm text-white/65 hover:bg-white/5 hover:text-white">
                <FileText className="h-3.5 w-3.5" /> <span className="truncate">{p}</span>
              </button>
            ))}
          </div>

          <div className="relative mt-auto pt-3">
            <div className="glass flex items-center gap-2 rounded-xl p-2 text-xs">
              <div className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-blue-500 text-[10px] font-semibold">
                A
              </div>
              <div className="min-w-0">
                <div className="truncate">Alex Rivera</div>
                <div className="truncate text-white/50">Pro · Unlimited</div>
              </div>
            </div>
          </div>
        </aside>

        {/* CENTER */}
        <section className="min-w-0 space-y-4">
          {/* Hero header */}
          <div className="glass-strong noise relative overflow-hidden rounded-3xl p-8">
            <div
              className="pointer-events-none absolute inset-0 opacity-80"
              style={{
                background: `radial-gradient(50% 60% at 20% 10%, ${g1}55, transparent 60%), radial-gradient(50% 60% at 90% 20%, ${g2}55, transparent 60%)`,
              }}
            />
            <div className="noise-overlay" />
            <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-mono text-[11px] tracking-[0.3em] text-white/60">
                  WORKSPACE / {w.number} · {w.aiCount} MODELS
                </p>
                <h1 className="font-display mt-3 text-5xl leading-[0.95] sm:text-6xl">
                  {w.name}
                </h1>
                <p className="mt-3 max-w-xl text-white/70">{w.tagline}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button className="glass inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm">
                  <Split className="h-4 w-4" /> Split screen
                </button>
                <button
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-white"
                  style={{ background: `linear-gradient(135deg, ${g1}, ${g2})`, boxShadow: `0 20px 40px -10px rgba(${w.glow}, 0.5)` }}
                >
                  <Zap className="h-4 w-4" /> Start session
                </button>
              </div>
            </div>
          </div>

          {/* Features grid */}
          <div>
            <SectionHeader label="/ FEATURES" title="Every tool in the room." />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {w.features.map((f, i) => (
                <button
                  key={f}
                  className="glass group relative overflow-hidden rounded-2xl p-4 text-left transition-transform duration-300 hover:-translate-y-0.5"
                >
                  <div
                    className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-0 blur-2xl transition-opacity group-hover:opacity-70"
                    style={{ background: i % 2 ? g1 : g2 }}
                  />
                  <div className="flex items-center gap-2 font-mono text-[10px] tracking-widest text-white/40">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="mt-2 text-sm font-medium text-white">{f}</div>
                  <div className="mt-1 text-xs text-white/50">Instant · streaming</div>
                </button>
              ))}
            </div>
          </div>

          {/* Prompt bar */}
          <div className="glass-strong relative overflow-hidden rounded-3xl p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-white/60">
                <MessageSquare className="h-3.5 w-3.5" />
                <span className="font-mono tracking-widest">MULTI-AI PROMPT</span>
              </div>
              <div className="flex items-center gap-1">
                {w.ais.slice(0, 4).map((ai, i) => (
                  <span key={ai} className="glass rounded-full px-2 py-0.5 text-[10px] text-white/80">
                    {ai}
                    {i < 3 && <span className="ml-1 text-white/30">·</span>}
                  </span>
                ))}
              </div>
            </div>
            <div className="glass flex items-end gap-3 rounded-2xl p-3">
              <textarea
                rows={2}
                placeholder="Describe what you want to make…"
                className="min-h-[56px] flex-1 resize-none bg-transparent text-sm text-white placeholder:text-white/40 focus:outline-none"
              />
              <button
                className="inline-flex items-center gap-1.5 rounded-xl px-3 py-2 text-xs font-medium text-white"
                style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
              >
                <Send className="h-3.5 w-3.5" /> Send
              </button>
            </div>
          </div>

          {/* Other workspaces */}
          <div className="pt-2">
            <SectionHeader label="/ SWITCH" title="Other workspaces" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {workspaces.filter((x) => x.slug !== w.slug).slice(0, 4).map((o) => {
                const OIcon = o.icon;
                return (
                  <Link
                    key={o.slug}
                    to="/workspace/$slug"
                    params={{ slug: o.slug }}
                    className="glass group flex items-center gap-3 rounded-2xl p-3 transition-transform hover:-translate-y-0.5"
                  >
                    <div
                      className="grid h-10 w-10 place-items-center rounded-xl"
                      style={{ background: `linear-gradient(135deg, ${o.gradient[0]}, ${o.gradient[1]})` }}
                    >
                      <OIcon className="h-5 w-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-medium">{o.name}</div>
                      <div className="truncate text-[11px] text-white/50">{o.aiCount} models</div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        {/* RIGHT PANEL */}
        <aside className="glass-strong noise sticky top-24 hidden h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl p-3 lg:flex">
          <div className="noise-overlay" />
          <div className="relative flex items-center justify-between px-2 pt-1">
            <div className="font-mono text-[10px] tracking-widest text-white/50">
              / INTEGRATED AI
            </div>
            <span className="text-[10px] text-white/50">{w.aiCount} online</span>
          </div>
          <div className="relative mt-3 space-y-1.5 overflow-y-auto pr-1">
            {w.ais.map((ai, i) => (
              <div key={ai} className="glass group flex items-center gap-2 rounded-xl p-2">
                <div
                  className="grid h-8 w-8 shrink-0 place-items-center rounded-lg"
                  style={{ background: `linear-gradient(135deg, ${g1}, ${g2})` }}
                >
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm">{ai}</div>
                  <div className="flex items-center gap-1.5 text-[10px] text-white/50">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    Ready · {(20 + i * 7) % 90}ms
                  </div>
                </div>
                <button className="opacity-0 transition-opacity group-hover:opacity-100">
                  <Star className="h-3.5 w-3.5 text-white/60" />
                </button>
              </div>
            ))}
          </div>

          <SectionLabel>Activity</SectionLabel>
          <div className="relative space-y-2">
            {[
              { t: "Generated 8 icons", ago: "2m" },
              { t: "Refined brand palette", ago: "14m" },
              { t: "Exported hero.png", ago: "1h" },
            ].map((a) => (
              <div key={a.t} className="flex items-center gap-2 text-xs text-white/70">
                <Clock className="h-3 w-3 text-white/40" />
                <span className="truncate">{a.t}</span>
                <span className="ml-auto font-mono text-[10px] text-white/40">{a.ago}</span>
              </div>
            ))}
          </div>

          <div className="relative mt-auto">
            <div className="glass flex items-center gap-2 rounded-xl p-2 text-xs text-white/70">
              <Folder className="h-3.5 w-3.5" /> 12 files · 240 MB
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative mt-5 mb-2 px-2 font-mono text-[10px] tracking-widest text-white/40">
      / {children}
    </div>
  );
}
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="mb-3 flex items-end justify-between">
      <div>
        <p className="font-mono text-[11px] tracking-[0.3em] text-white/50">{label}</p>
        <h3 className="font-display mt-1 text-2xl">{title}</h3>
      </div>
    </div>
  );
}
