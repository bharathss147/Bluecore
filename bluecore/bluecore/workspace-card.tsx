import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Sparkles, ArrowUpRight, Star } from "lucide-react";
import type { Workspace } from "@/lib/workspaces";

type Props = { workspace: Workspace; index: number };

export function WorkspaceCard({ workspace, index }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const Icon = workspace.icon;
  const [g1, g2, g3] = workspace.gradient;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - r.left;
      const y = e.clientY - r.top;
      const rx = ((y / r.height) - 0.5) * -8;
      const ry = ((x / r.width) - 0.5) * 8;
      el.style.setProperty("--mx", `${x}px`);
      el.style.setProperty("--my", `${y}px`);
      el.style.setProperty("--rx", `${rx}deg`);
      el.style.setProperty("--ry", `${ry}deg`);
    };
    const onLeave = () => {
      el.style.setProperty("--rx", `0deg`);
      el.style.setProperty("--ry", `0deg`);
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      className="animate-rise"
      style={{ animationDelay: `${index * 60}ms`, perspective: "1200px" }}
    >
      <div
        ref={ref}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="group relative rounded-3xl transition-transform duration-500 ease-out will-change-transform"
        style={{
          transform: "rotateX(var(--rx,0)) rotateY(var(--ry,0))",
          transformStyle: "preserve-3d",
        }}
      >
        {/* Animated conic border */}
        <div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-70 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `conic-gradient(from 0deg, ${g1}, ${g2}, ${g3}, ${g1})`,
            filter: "blur(0.5px)",
            animation: "spin-slow 14s linear infinite",
          }}
        />
        {/* Outer glow */}
        <div
          className="pointer-events-none absolute -inset-6 rounded-[2rem] opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-60"
          style={{
            background: `radial-gradient(60% 60% at 50% 50%, rgba(${workspace.glow}, 0.55), transparent 70%)`,
          }}
        />

        <div className="glass-strong noise relative overflow-hidden rounded-3xl">
          {/* Mesh gradient background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-60 transition-opacity duration-700 group-hover:opacity-100"
            style={{
              background: `
                radial-gradient(60% 50% at 20% 20%, ${g1}55, transparent 60%),
                radial-gradient(50% 50% at 80% 30%, ${g2}55, transparent 60%),
                radial-gradient(60% 60% at 50% 100%, ${g3}55, transparent 60%)`,
            }}
          />
          <div className="animate-aurora pointer-events-none absolute inset-0 opacity-40 mix-blend-screen"
            style={{
              background: `radial-gradient(40% 40% at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.28), transparent 60%)`,
            }}
          />
          <div className="noise-overlay" />

          {/* Content */}
          <div className="relative flex min-h-[440px] flex-col p-7">
            {/* Top row */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] tracking-widest text-white/50">
                  WORKSPACE / {workspace.number}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {workspace.featured && (
                  <span className="glass inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/90">
                    <Star className="h-3 w-3 fill-current" /> FEATURED
                  </span>
                )}
                <span className="glass inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-medium tracking-wide text-white/90">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </span>
                  LIVE
                </span>
              </div>
            </div>

            {/* Floating 3D icon */}
            <div className="relative mt-6 h-28" style={{ transformStyle: "preserve-3d" }}>
              <div
                className="animate-float absolute left-0 top-2 grid h-24 w-24 place-items-center rounded-3xl"
                style={{
                  background: `linear-gradient(135deg, ${g1}, ${g2})`,
                  boxShadow: `0 30px 60px -20px rgba(${workspace.glow}, 0.65), inset 0 1px 0 rgba(255,255,255,0.25)`,
                  transform: "translateZ(40px)",
                }}
              >
                <Icon className="h-11 w-11 text-white drop-shadow" strokeWidth={1.5} />
              </div>
              <div
                className="animate-float-alt absolute left-24 top-8 h-10 w-10 rounded-2xl opacity-90"
                style={{
                  background: `linear-gradient(135deg, ${g2}, ${g3})`,
                  transform: "translateZ(20px)",
                  boxShadow: `0 20px 40px -10px rgba(${workspace.glow}, 0.5)`,
                }}
              />
              <div
                className="animate-float-alt absolute left-36 top-0 h-6 w-6 rounded-xl opacity-80"
                style={{
                  background: `linear-gradient(135deg, ${g3}, ${g1})`,
                  animationDelay: "1.2s",
                  transform: "translateZ(30px)",
                }}
              />
              <Particles active={hover} color={workspace.glow} />
            </div>

            {/* Title */}
            <div className="mt-6">
              <h3 className="font-display text-4xl leading-none text-white">
                {workspace.name}
              </h3>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-white/70">
                {workspace.description}
              </p>
            </div>

            {/* AI logos marquee */}
            <div className="relative mt-6 overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-gradient-to-r from-black/40 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-gradient-to-l from-black/40 to-transparent" />
              <div className="animate-marquee flex gap-2 whitespace-nowrap">
                {[...workspace.ais, ...workspace.ais].map((ai, i) => (
                  <span
                    key={i}
                    className="glass inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-[11px] text-white/85"
                  >
                    <Sparkles className="h-3 w-3" style={{ color: g2 }} />
                    {ai}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom row */}
            <div className="mt-auto flex items-center justify-between pt-6">
              <div className="flex items-baseline gap-1.5 font-mono text-white/70">
                <span
                  className="text-2xl font-semibold text-white"
                  style={{ textShadow: `0 0 20px rgba(${workspace.glow}, 0.6)` }}
                >
                  {workspace.aiCount}
                </span>
                <span className="text-[11px] tracking-widest">AI · MODELS</span>
              </div>
              <Link
                to="/workspace/$slug"
                params={{ slug: workspace.slug }}
                className="glass group/btn inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-medium text-white transition-transform duration-300 hover:scale-105"
                style={{
                  boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.15), 0 10px 30px -10px rgba(${workspace.glow}, 0.6)`,
                }}
              >
                Open Workspace
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Particles({ active, color }: { active: boolean; color: string }) {
  if (!active) return null;
  return (
    <div className="pointer-events-none absolute inset-0" aria-hidden>
      {Array.from({ length: 12 }).map((_, i) => {
        const left = (i * 37) % 100;
        const delay = (i * 0.15).toFixed(2);
        const dur = 3 + (i % 4);
        return (
          <span
            key={i}
            className="absolute bottom-0 h-1 w-1 rounded-full opacity-0"
            style={{
              left: `${left}%`,
              background: `rgb(${color})`,
              boxShadow: `0 0 8px rgb(${color})`,
              animation: `float-y ${dur}s ease-in ${delay}s infinite, rise 0.6s ease-out ${delay}s forwards`,
            }}
          />
        );
      })}
    </div>
  );
}

export function GlassChip({ children }: { children: ReactNode }) {
  return (
    <span className="glass inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs text-white/85">
      {children}
    </span>
  );
}
