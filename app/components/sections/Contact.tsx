"use client";
import { trackEvent } from "@/app/lib/gtag";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, CheckCircle, AlertCircle, Mail, MessageSquare, User } from "lucide-react";
import Reveal from "../ui/Reveal";
import { Button } from "@/components/ui/button";

export default function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed");
      setStatus("sent");
      trackEvent("contact_form_submit", {
  location: "contact_section",
});
      formRef.current?.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
<section id="contact" className="py-12 sm:py-16">
        <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div className="glass glass-highlight rounded-3xl border border-white/10 p-7 sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#40FF00]">
                Get in Touch
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                Let&apos;s Work Together
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-white/70 sm:text-base">
                Have a project in mind? I&apos;d love to hear about it. Send me a message
                and I&apos;ll get back to you within 24 hours.
              </p>

              <div className="mt-8 space-y-4">
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                    <Mail className="h-4 w-4 text-[#40FF00]" />
                  </div>
                  <span>basharabushaban1999@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-white/70">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.06]">
                    <MessageSquare className="h-4 w-4 text-[#40FF00]" />
                  </div>
                  <span>Usually responds within 24h</span>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-white/55">
                  What to expect
                </p>
                <ul className="mt-3 space-y-2 text-sm text-white/70">
                  <li>• Quick reply with next steps</li>
                  <li>• Free initial consultation</li>
                  <li>• Clear timeline and pricing</li>
                </ul>
              </div>
            </div>

            <div className="glass glass-highlight rounded-3xl border border-white/10 p-7 sm:p-8">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/55">
                    Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 backdrop-blur-md transition focus:border-[#40FF00]/40 focus:outline-none focus:ring-1 focus:ring-[#40FF00]/30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/55">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white/35" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 backdrop-blur-md transition focus:border-[#40FF00]/40 focus:outline-none focus:ring-1 focus:ring-[#40FF00]/30"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-white/55">
                    Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3.5 top-3.5 h-4 w-4 text-white/35" />
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project..."
                      className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] py-3 pl-11 pr-4 text-sm text-white placeholder:text-white/35 backdrop-blur-md transition focus:border-[#40FF00]/40 focus:outline-none focus:ring-1 focus:ring-[#40FF00]/30"
                    />
                  </div>
                </div>

                <Button type="submit" size="xl" className="w-full" disabled={status === "sending"}>
                  {status === "sending" ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      <span className="text-black">Sending...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 text-black" />
                      <span className="text-black">Send Message</span>
                    </>
                  )}
                </Button>
              </form>

              <AnimatePresence>
                {status === "sent" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-4 flex items-center gap-2.5 rounded-2xl border border-[#40FF00]/20 bg-[#40FF00]/10 px-4 py-3 text-sm text-[#40FF00]"
                  >
                    <CheckCircle className="h-4 w-4" />
                    Message sent! I&apos;ll get back to you soon.
                  </motion.div>
                )}
                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="mt-4 flex items-center gap-2.5 rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400"
                  >
                    <AlertCircle className="h-4 w-4" />
                    Something went wrong. Please try again.
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}