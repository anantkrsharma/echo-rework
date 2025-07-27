"use client";

import { useState } from "react";
import {
  BookOpen,
  Calendar,
  ShoppingCart,
  Cloud,
  Bot,
} from "lucide-react";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

const featureItems = [
  { icon: BookOpen, title: "Custom CMS", desc: "Manage posts, videos, and courses from one dashboard." },
  { icon: Calendar, title: "Booking Links", desc: "Seamless Cal.com & Calendly integration." },
  { icon: ShoppingCart, title: "E-commerce", desc: "Sell memberships, merch, and accept donations." },
  { icon: Cloud, title: "One-Click Deploy", desc: "Deploy instantly to Vercel, Netlify, or Cloudflare." },
  { icon: Bot, title: "Workflow API", desc: "Automate site updates and content workflows." },
];

const apiTools = [
  { name: "create_site", desc: "Initialize a branded site." },
  { name: "generate_page", desc: "Add pages like About or Contact." },
  { name: "create_product", desc: "Publish digital or physical products." },
  { name: "generate_booking_link", desc: "Expose calendar availability." },
  { name: "publish_post", desc: "Push content live instantly." },
  { name: "sync_to_cloud", desc: "Trigger automated deployment." },
  { name: "get_site_status", desc: "Monitor site health & metrics." },
];

const audienceList = ["Content creators", "Solo founders", "Coaches & consultants", "Indie builders"];

function Section({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <section className="pt-20 pb-12">
      {title && <h2 className="text-3xl font-semibold mb-8 text-center">{title}</h2>}
      {children}
    </section>
  );
}

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error("Enter a valid email.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      toast.success("Joined waitlist!");
      setEmail("");
      setLoading(false);
    }, 700);
  };

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Navbar */}
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <h1 className="text-2xl font-bold text-indigo-600">
            <Image
              src="/logo.png"
              width={80}
              height={80} alt={""}            
              />
          </h1>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6">
        {/* Hero */}
        <Section>
          <div className="text-center mx-auto max-w-2xl">
            <h1 className="text-5xl font-bold mb-4">Creator Brand Builder MCP</h1>
            <p className="text-lg text-gray-600 mb-8">
              Spin up a fully branded site, booking system, and store using one simple protocol.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row justify-center gap-4">
              <Input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="flex-1"
              />
              <Button type="submit" disabled={loading} className="px-6">
                {loading ? "Submitting..." : "Join Waitlist"}
              </Button>
            </form>
            <p className="text-sm text-gray-500 mt-2">No spam. Only essential updates.</p>
          </div>
        </Section>

        {/* Features */}
        <Section title="Core Features">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureItems.map((item, idx) => (
              <Card key={idx} className="hover:shadow-lg transition">
                <CardContent className="flex items-start p-6 space-x-4">
                  <item.icon className="h-8 w-8 text-indigo-500 mt-1" />
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* How It Works */}
        <Section title="How It Works">
          <div className="flex flex-col space-y-6 max-w-md mx-auto">
            {[
              "Sign up with your email or OAuth",
              "Select a theme and customize settings",
              "Add content, products, and booking slots",
              "Deploy instantly to your own domain",
              "Manage everything via API calls",
            ].map((step, i) => (
              <div key={i} className="flex items-start space-x-4">
                <div className="h-8 w-8 flex-shrink-0 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center font-medium">
                  {i + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Tools & Benefits */}
        <Section title="API Tools & Benefits">
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-semibold mb-4">API Endpoints</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {apiTools.map((tool) => (
                  <div key={tool.name} className="p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition flex justify-between">
                    <span className="font-mono text-indigo-600">{tool.name}</span>
                    <span className="text-gray-600 text-sm">{tool.desc}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mx-auto flex flex-row content-center justify-center items-center gap-10">
              <h3 className="text-2xl font-semibold mb-4">Why Choose MCP</h3>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>All-in-one protocol for site, store, and scheduler</li>
                <li>Full control over branding and custom domains</li>
                <li>Instant content and product updates</li>
                <li>API-first: integrate with any service</li>
              </ul>
            </div>
          </div>
        </Section>

        <Section title="Our Mission">
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <p className="text-gray-700 leading-relaxed">
                Empower creators and founders with a fast, unified platform that removes technical barriers and accelerates brand growth.
              </p>
            </div>
          </div>
        </Section>
        
      </main>
      <footer className="bg-white border-t py-6 text-center text-gray-500">
        <p>© 2025 Echo. All rights reserved.</p>
      </footer>
    </div>
  );
}
