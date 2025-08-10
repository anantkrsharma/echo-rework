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
  MessageCircle,
  Server,
  Layers,
  Database,
  LucideIcon,
} from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import axios from "axios";
import { easeOut, motion } from "framer-motion";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

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
  icon: LucideIcon;
  name: string;
  desc: string;
}

const FEATURES: Feature[] = [
  { icon: BookOpen, title: "Your Content, One Place", desc: "Publish posts, videos, and courses from a single, simple dashboard." },
  { icon: Calendar, title: "Smart Booking Links", desc: "Let clients and fans book time with you using Cal.com or Calendly." },
  { icon: ShoppingCart, title: "Built-In Store", desc: "Sell memberships, merchandise, or accept donations — no extra setup." },
  { icon: Cloud, title: "Instant Launch", desc: "Go live on your own domain with one click — works with Vercel, Netlify, or Cloudflare." },
  { icon: Bot, title: "Automated Updates", desc: "Keep your site fresh with easy scheduling and background publishing." },
  { icon: MessageCircle, title: "MCP Concierge", desc: "Manage your brand and services anytime — no coding needed." },
];

const HOW_IT_WORKS_STEPS: Step[] = [
  { icon: Terminal, text: "Sign up in seconds — just your email or Google account." },
  { icon: Palette, text: "Pick a theme and make it yours with colors, fonts, and layout." },
  { icon: FileText, text: "Add your content, products, or booking calendar." },
  { icon: Globe, text: "Launch instantly to your own domain." },
  { icon: Bot, text: "Manage everything with a simple dashboard or API." },
];

const API_TOOLS: ApiTool[] = [
  { icon: Server, name: "create_site", desc: "Set up a complete site in seconds." },
  { icon: FileText, name: "generate_page", desc: "Add pages like ‘About’, ‘Contact’, or any custom content." },
  { icon: ShoppingCart, name: "create_product", desc: "List and sell digital or physical products." },
  { icon: Calendar, name: "generate_booking_link", desc: "Share your availability for meetings or events." },
  { icon: Layers, name: "publish_post", desc: "Publish blogs, updates, or media instantly." },
  { icon: Cloud, name: "sync_to_cloud", desc: "Push your latest changes live automatically." },
  { icon: Database, name: "get_site_status", desc: "Check site uptime, performance, and analytics." },
  { icon: Bot, name: "manage_workflows", desc: "Automate tasks and streamline your content publishing." },
  { icon: MessageCircle, name: "customer_support", desc: "Handle customer messages and inquiries effortlessly." },
];

// Animation variants
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};
function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="py-24">
      {title && (
        <h2 className="text-4xl font-extrabold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
          {title}
        </h2>
      )}
      {children}
    </section>
  );
}

function FeatureCard({ icon: Icon, title, desc }: Feature) {
  return (
    <motion.div variants={itemVariants} viewport={{ once: true, amount: 0.3 }} initial="hidden" whileInView="visible">
      <Card className="bg-neutral-900 border border-neutral-800 hover:border-white/30 shadow-lg hover:shadow-xl transition duration-300 rounded-2xl">
        <CardContent className="flex items-start p-7 space-x-5">
          <Icon className="h-10 w-10 text-white" />
          <div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="text-neutral-400 text-sm mt-1">{desc}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function StepItem({ icon: Icon, text }: Step) {
  return (
    <motion.div variants={itemVariants} viewport={{ once: true, amount: 0.3 }} initial="hidden" whileInView="visible" className="flex flex-col items-center text-center relative">
      <div className="h-16 w-16 flex items-center justify-center rounded-full bg-white text-black shadow-lg mb-4 z-10">
        <Icon className="h-7 w-7" />
      </div>
      <p className="text-neutral-200 text-base font-medium max-w-[160px]">{text}</p>
    </motion.div>
  );
}

function ApiToolCard({ icon: Icon, name, desc }: ApiTool) {
  return (
    <motion.div variants={itemVariants} viewport={{ once: true, amount: 0.3 }} initial="hidden" whileInView="visible" className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl hover:border-white/30 hover:shadow-lg transition flex items-start space-x-4">
      <div className="h-12 w-12 flex items-center justify-center rounded-md bg-white text-black">
        <Icon className="h-6 w-6" />
      </div>
      <div>
        <span className="block font-mono text-white text-base font-semibold">{name}</span>
        <span className="text-neutral-400 text-sm">{desc}</span>
      </div>
    </motion.div>
  );
}

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
      <header className="border-b border-neutral-800">
        <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
          <Image src="/logo.png" width={110} height={110} alt="Logo" />
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden py-28 text-center">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent)]" />
          <div className="max-w-4xl mx-auto relative z-10">
            <h1 className="text-7xl font-extrabold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500 tracking-tight">
              Creator Brand Builder
            </h1>
            <p className="text-xl text-neutral-300 mb-10">
              Launch a fully branded site, booking system, and store in minutes — powered by one protocol.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4 max-w-lg mx-auto">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1 bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500 rounded-xl"
              />
              <Button
                type="submit"
                disabled={loading}
                className="px-8 py-5 bg-white text-black font-semibold rounded-xl shadow-lg hover:bg-neutral-200 transition duration-300"
              >
                {loading ? "Joining..." : "Join Waitlist"}
              </Button>
            </form>
            <p className="text-sm text-neutral-500 mt-3">Be the first to know when we launch.</p>
          </div>
        </section>

        <Section title="Core Features">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto px-6"
          >
            {FEATURES.map((f) => (
              <FeatureCard key={f.title} {...f} />
            ))}
          </motion.div>
        </Section>

        <Section title="How It Works">
          <div className="relative max-w-6xl mx-auto px-6">
            <div className="hidden sm:flex absolute top-[32px] left-0 right-0 h-[3px] bg-neutral-700 z-0" />
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-5 gap-14 relative z-10"
            >
              {HOW_IT_WORKS_STEPS.map((step) => (
                <StepItem key={step.text} {...step} />
              ))}
            </motion.div>
          </div>
        </Section>

        <Section title="API Tools & Benefits">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 max-w-6xl mx-auto px-6"
          >
            {API_TOOLS.map((tool) => (
              <ApiToolCard key={tool.name} {...tool} />
            ))}
          </motion.div>
        </Section>

        <Section title="Our Mission">
          <div className="max-w-lg mx-auto text-center">
            <p className="text-neutral-300 text-lg leading-relaxed">
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
