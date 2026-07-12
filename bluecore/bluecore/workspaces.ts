import type { LucideIcon } from "lucide-react";
import {
  Palette, Code2, Video, GraduationCap, Briefcase, Megaphone, Music, FlaskConical, Box,
} from "lucide-react";

export type Workspace = {
  slug: string;
  number: string;
  name: string;
  tagline: string;
  description: string;
  icon: LucideIcon;
  gradient: [string, string, string];
  glow: string;
  ais: string[];
  features: string[];
  aiCount: number;
  featured?: boolean;
};

export const workspaces: Workspace[] = [
  {
    slug: "design-studio",
    number: "01",
    name: "Design Studio",
    tagline: "Craft brands, interfaces & motion.",
    description:
      "Everything required for UI design, brand identity, graphics, motion, illustration, UX and product design.",
    icon: Palette,
    gradient: ["#a855f7", "#3b82f6", "#ec4899"],
    glow: "168, 85, 247",
    ais: ["ChatGPT","Claude","Recraft","Figma AI","Midjourney","Adobe Firefly","Flux","Ideogram","Leonardo AI","Canva AI"],
    features: ["Design Chat","Generate UI","Generate Logos","Generate Icons","Create Posters","Brand Kit","Color Palette","Typography","Moodboards","Wireframes","Mockups","Export Assets"],
    aiCount: 10,
    featured: true,
  },
  {
    slug: "developer-hub",
    number: "02",
    name: "Developer Hub",
    tagline: "The ultimate coding environment.",
    description: "Build, debug, refactor, ship. A cinematic IDE powered by every frontier coding model.",
    icon: Code2,
    gradient: ["#3b82f6", "#06b6d4", "#22d3ee"],
    glow: "59, 130, 246",
    ais: ["ChatGPT","Claude","Gemini","Cursor","GitHub Copilot","Windsurf","v0","Bolt","Lovable"],
    features: ["Generate Code","Explain Code","Debug","Refactor","Optimize","Architecture","Database","API Builder","Documentation","Deployment","Git Assistant","Terminal"],
    aiCount: 9,
    featured: true,
  },
  {
    slug: "video-creator",
    number: "03",
    name: "Video Creator",
    tagline: "Everything for content creators.",
    description: "From script to voice to final cut — a full generative studio for creators.",
    icon: Video,
    gradient: ["#f97316", "#a855f7", "#f43f5e"],
    glow: "249, 115, 22",
    ais: ["Sora","Runway","Kling","Pika","Luma","ElevenLabs","Suno","Udio","HeyGen","Synthesia"],
    features: ["Generate Video","Generate Voice","Generate Music","Create Avatar","Lip Sync","Subtitles","Editing","Storyboarding","Thumbnails","Social Clips"],
    aiCount: 10,
  },
  {
    slug: "student-hub",
    number: "04",
    name: "Student Hub",
    tagline: "Learn faster using AI.",
    description: "Study, summarize and understand anything — the calm academic companion.",
    icon: GraduationCap,
    gradient: ["#22c55e", "#3b82f6", "#14b8a6"],
    glow: "34, 197, 94",
    ais: ["NotebookLM","Perplexity","ChatGPT","Gemini","Claude","DeepSeek"],
    features: ["Study Notes","Summaries","Flashcards","Quiz Generator","Assignments","Research","Mind Maps","Explain Concepts","Exam Prep","References"],
    aiCount: 6,
  },
  {
    slug: "business-hub",
    number: "05",
    name: "Business Hub",
    tagline: "Strategy, decks & operations.",
    description: "From business plan to boardroom deck. Serious tools, cinematic feel.",
    icon: Briefcase,
    gradient: ["#eab308", "#f59e0b", "#1f2937"],
    glow: "234, 179, 8",
    ais: ["ChatGPT","Claude","Gemini","Perplexity","Gamma","Canva AI","Notion AI"],
    features: ["Business Plans","Pitch Deck","Market Research","Strategy","Reports","Presentations","Email Writing","Analytics"],
    aiCount: 7,
  },
  {
    slug: "marketing-studio",
    number: "06",
    name: "Marketing Studio",
    tagline: "Campaigns that hit.",
    description: "Ideate, ship and measure marketing across every channel.",
    icon: Megaphone,
    gradient: ["#ec4899", "#f97316", "#f43f5e"],
    glow: "236, 72, 153",
    ais: ["ChatGPT","Claude","Canva AI","Midjourney","Ideogram","Runway"],
    features: ["Social Posts","Ad Copy","Campaigns","Brand Strategy","Content Calendar","SEO","Analytics","Landing Pages"],
    aiCount: 6,
  },
  {
    slug: "music-studio",
    number: "07",
    name: "Music Studio",
    tagline: "Compose, produce, master.",
    description: "Generate songs, voice and podcasts in a producer-grade environment.",
    icon: Music,
    gradient: ["#a855f7", "#7c3aed", "#0f0f10"],
    glow: "168, 85, 247",
    ais: ["Suno","Udio","ElevenLabs","Adobe Podcast"],
    features: ["Generate Songs","Voice","Podcast","Sound Effects","Mixing","Lyrics"],
    aiCount: 4,
  },
  {
    slug: "research-lab",
    number: "08",
    name: "Research Lab",
    tagline: "Serious research, cited.",
    description: "Scientific search, fact-checking and citations at academic depth.",
    icon: FlaskConical,
    gradient: ["#60a5fa", "#e0f2fe", "#3b82f6"],
    glow: "96, 165, 250",
    ais: ["Perplexity","NotebookLM","Consensus","Elicit","Scite","ChatGPT","Claude"],
    features: ["Research Papers","Fact Checking","Citations","Knowledge Graph","Scientific Search","Document Analysis"],
    aiCount: 7,
  },
  {
    slug: "three-d-studio",
    number: "09",
    name: "3D Studio",
    tagline: "Model worlds, generate assets.",
    description: "3D models, textures and environments powered by generative pipelines.",
    icon: Box,
    gradient: ["#7c3aed", "#4c1d95", "#a855f7"],
    glow: "124, 58, 237",
    ais: ["Meshy","Spline AI","Luma","Tripo AI","Scenario AI"],
    features: ["3D Models","Textures","Materials","Environment Design","Game Assets","Animation"],
    aiCount: 5,
  },
];

export const getWorkspace = (slug: string) => workspaces.find((w) => w.slug === slug);
