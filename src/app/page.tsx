"use client";

import { useState } from "react";
import {
  BookOpen,
  Calendar,
  ShoppingCart,
  Cloud,
  Bot,
  Palette,
  FileText,
  Globe,
  Terminal,
  LucideIcon,
  MessageCircle,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// ----------------------
// Types
// ----------------------
interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface Step {
  icon: LucideIcon;
  text: string;
}

interface ApiTool {
  name: string;
  desc: string;
}

// ----------------------
// Data
// ----------------------
const FEATURES: Feature[] = [
  { icon: BookOpen, title: "Custom CMS", desc: "Manage posts, videos, and courses from one dashboard." },
  { icon: Calendar, title: "Booking Links", desc: "Seamless Cal.com & Calendly integration." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Sell memberships, merch, and accept donations." },
  { icon: Cloud, title: "One-Click Deploy", desc: "Deploy instantly to Vercel, Netlify, or Cloudflare." },
  { icon: Bot, title: "Workflow API", desc: "Automate site updates and content workflows." },
  { icon: MessageCircle, title: "MCP Support", desc: "Manage your services outside the dashboard" },
];

const HOW_IT_WORKS_STEPS: Step[] = [
  { icon: Terminal, text: "Sign up with your email or OAuth" },
  { icon: Palette, text: "Select a theme and customize settings" },
  { icon: FileText, text: "Add content, products, and booking slots" },
  { icon: Globe, text: "Deploy instantly to your own domain" },
  { icon: Bot, text: "Manage everything via API calls" },
];

const API_TOOLS: ApiTool[] = [
  { name: "create_site", desc: "Initialize a branded site." },
  { name: "generate_page", desc: "Add pages like About or Contact." },
  { name: "create_product", desc: "Publish digital or physical products." },
  { name: "generate_booking_link", desc: "Expose calendar availability." },
  { name: "publish_post", desc: "Push content live instantly." },
  { name: "sync_to_cloud", desc: "Trigger automated deployment." },
];


// ----------------------
// UI Components
// ----------------------
function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="py-20">
      {title && (
        <h2 className="text-3xl font-semibold text-center mb-10 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-500">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc }: Feature) {
  return (
    <Card className="bg-neutral-900 border border-neutral-800 hover:border-white/20 transition">
      <CardContent className="flex items-start p-6 space-x-4">
        <Icon className="h-8 w-8 text-white" />
        <div>
          <h3 className="text-lg font-medium text-neutral-200">{title}</h3>
          <p className="text-neutral-400 text-sm">{desc}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function StepCard({ icon: Icon, text }: Step) {
  return (
    <div className="flex flex-col items-center text-center p-6 rounded-lg bg-neutral-900 border border-neutral-800 hover:border-white/20 transition">
      <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white text-black mb-4">
        <Icon className="h-6 w-6" />
      </div>
      <p className="text-neutral-300 text-sm">{text}</p>
    </div>
  );
}

function ApiToolCard({ name, desc }: ApiTool) {
  return (
    <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-white/20 transition">
      <span className="block font-mono text-white text-sm">{name}</span>
      <span className="text-neutral-400 text-xs">{desc}</span>
    </div>
  );
}

// ----------------------
// Page Component
// ----------------------
export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email.");
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post("/api/email", { email });
      if (data.exists) toast.info("Email already registered.");
      else if (data.added) {
        toast.success("🎉 You're on the waitlist!");
        setEmail("");
      } else toast.error("Something went wrong.");
    } catch {
      toast.error("Network error.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-neutral-900 to-black text-white">
      {/* Navbar */}
      <header className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Image src="/logo.png" width={100} height={100} alt="Logo" />
          <Button variant="outline" className="border-neutral-700 text-black hover:bg-neutral-800">
            Join Waitlist
          </Button>
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden py-24 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)]" />
          <div className="max-w-3xl mx-auto relative z-10">
            <h1 className="text-6xl font-light mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-neutral-400">
              Creator Brand Builder MCP
            </h1>
            <p className="text-lg text-neutral-400 mb-10">
              Launch a fully branded site, booking system, and store in minutes — powered by one protocol.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
              />
              <Button
                type="submit"
                disabled={loading}
                className="px-6 bg-white text-black hover:bg-neutral-200 transition"
              >
                {loading ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
            <p className="text-sm text-neutral-500 mt-3">Be the first to know when we launch.</p>
          </div>
        </section>

        {/* Features */}
        <Section title="Core Features">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto px-6">
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </div>
        </Section>

        {/* How It Works */}
        <Section title="How It Works">
          <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-6 max-w-6xl mx-auto px-6">
            {HOW_IT_WORKS_STEPS.map((step) => (
              <StepCard key={step.text} {...step} />
            ))}
          </div>
        </Section>

        {/* API Tools & Benefits */}
        <Section title="API Tools & Benefits">
          <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 gap-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {API_TOOLS.map((tool) => (
                  <ApiToolCard key={tool.name} {...tool} />
                ))}
              </div>
          </div>
        </Section>

        {/* Mission */}
        <Section title="Our Mission">
          <div className="max-w-md mx-auto text-center">
            <p className="text-neutral-400 leading-relaxed">
              Empower creators and founders with a fast, unified platform that removes technical barriers and accelerates
              brand growth.
            </p>
          </div>
        </Section>
      </main>

      <footer className="border-t border-neutral-800 py-6 text-center text-neutral-500 text-sm">
        © 2025 Echo. All rights reserved.
      </footer>
    </div>
  );
}
