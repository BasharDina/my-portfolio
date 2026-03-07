"use client";

import { useState } from "react";
import Reveal from "../ui/Reveal";
import { GlowLink } from "../ui/GlowButton";

import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { Mail, MapPin, Send, Linkedin, Globe } from "lucide-react";

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  name: "",
  email: "",
  message: "",
};

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Contact() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState<string>("");
  const [submitSuccess, setSubmitSuccess] = useState<string>("");

  const [loading, setLoading] = useState(false);

  function onChange<K extends keyof FormValues>(key: K, v: FormValues[K]) {
    setValues((s) => ({ ...s, [key]: v }));
    setSubmitError("");
    setSubmitSuccess("");
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(v: FormValues): FormErrors {
    const next: FormErrors = {};

    if (v.name.trim().length < 2) {
      next.name = "Please enter your full name.";
    }
    if (!emailRegex.test(v.email.trim())) {
      next.email = "Please provide a valid email address.";
    }
    if (v.message.trim().length < 10) {
      next.message = "Share a bit more context (at least 10 characters).";
    }

    return next;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;

    const nextErrors = validate(values);
    setErrors(nextErrors);
    setSubmitError("");
    setSubmitSuccess("");

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Please review the highlighted fields.");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (!res.ok || !data.ok) {
        throw new Error(data?.error || "Failed to send");
      }

      toast.success("Message sent!", {
        description: "Thanks for reaching out — I’ll reply within 24 hours.",
      });

      setSubmitSuccess("Your message was delivered successfully.");
      setValues(initialValues);
      setErrors({});
    } catch (err: any) {
      const message = err?.message || "Try again later.";
      toast.error("Failed to send", {
        description: message,
      });
      setSubmitError(message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="contact" className="py-20">
      <Reveal>
        <div className="mx-auto max-w-[1320px] px-3 sm:px-4 lg:px-5">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Contact</h2>
              <p className="mt-2 text-sm text-white/70">
                Let’s build something premium. Send a message and I’ll reply fast.
              </p>
            </div>

            <GlowLink href="#projects" variant="secondary" className="shine-btn hidden sm:inline-flex">
              View Projects
            </GlowLink>
          </div>

          <div className="relative mt-10">
            {/* background glow */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[760px] w-[760px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-65"
              style={{
                background:
                  "radial-gradient(circle, rgba(64,255,0,0.18) 0%, rgba(124,58,237,0.10) 35%, rgba(0,0,0,0) 70%)",
              }}
            />

            <div className="grid gap-6 lg:grid-cols-5">
              {/* LEFT INFO */}
              <div className="glass glass-hover glass-highlight glow-hover rounded-3xl p-6 lg:col-span-2">
                <div className="text-sm font-semibold text-white">Start your next high-impact project</div>
                <p className="mt-2 text-sm text-white/70">
                  Tell me what you’re building, your goals, and timeline. I’ll reply with a focused
                  recommendation and a clear next step.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="glass-strong rounded-2xl p-2">
                      <Mail className="h-5 w-5 text-[#40FF00]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Email</div>
                      <div className="text-sm text-white/70">bashar@example.com</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="glass-strong rounded-2xl p-2">
                      <MapPin className="h-5 w-5 text-[#40FF00]" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold">Location</div>
                      <div className="text-sm text-white/70">Remote • Worldwide</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="text-xs font-semibold text-white/70">Links</div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    <a
                      className="shine-btn inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:border-[#40FF00]/50"
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Linkedin className="h-4 w-4 text-[#40FF00]" />
                      LinkedIn
                    </a>

                    <a
                      className="shine-btn inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 hover:border-[#40FF00]/50"
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Globe className="h-4 w-4 text-[#40FF00]" />
                      Upwork
                    </a>
                  </div>
                </div>

                <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-semibold">Trust & response time</div>
                  <p className="mt-1 text-sm text-white/70">
                    Replies within <span className="text-[#40FF00] font-semibold">24 hours</span>.
                    Your details are used only to respond to your inquiry.
                  </p>
                </div>
              </div>

              {/* RIGHT FORM */}
              <div className="glass glass-hover glass-highlight rounded-3xl p-6 lg:col-span-3">
                <form onSubmit={onSubmit} className="space-y-4" noValidate>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className="text-xs font-semibold text-white/70">
                        Your name
                      </label>
                      <Input
                        id="contact-name"
                        autoComplete="name"
                        value={values.name}
                        onChange={(e) => onChange("name", e.target.value)}
                        placeholder="Bashar Emad"
                        aria-invalid={Boolean(errors.name)}
                        aria-describedby={errors.name ? "contact-name-error" : undefined}
                        className={`mt-2 border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-[#40FF00]/40 ${
                          errors.name ? "border-red-400/70 focus-visible:ring-red-400/40" : ""
                        }`}
                      />
                      {errors.name ? (
                        <p id="contact-name-error" className="mt-2 text-xs text-red-300">
                          {errors.name}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="contact-email" className="text-xs font-semibold text-white/70">
                        Email
                      </label>
                      <Input
                        id="contact-email"
                        type="email"
                        autoComplete="email"
                        value={values.email}
                        onChange={(e) => onChange("email", e.target.value)}
                        placeholder="you@email.com"
                        aria-invalid={Boolean(errors.email)}
                        aria-describedby={errors.email ? "contact-email-error" : undefined}
                        className={`mt-2 border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-[#40FF00]/40 ${
                          errors.email ? "border-red-400/70 focus-visible:ring-red-400/40" : ""
                        }`}
                      />
                      {errors.email ? (
                        <p id="contact-email-error" className="mt-2 text-xs text-red-300">
                          {errors.email}
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="contact-message" className="text-xs font-semibold text-white/70">
                      Project details
                    </label>
                    <Textarea
                      id="contact-message"
                      autoComplete="off"
                      value={values.message}
                      onChange={(e) => onChange("message", e.target.value)}
                      placeholder="What are you building, what’s the goal, and when do you need it delivered?"
                      aria-invalid={Boolean(errors.message)}
                      aria-describedby={errors.message ? "contact-message-error" : "contact-message-help"}
                      className={`mt-2 min-h-[160px] border-white/10 bg-white/5 text-white placeholder:text-white/35 focus-visible:ring-[#40FF00]/40 ${
                        errors.message ? "border-red-400/70 focus-visible:ring-red-400/40" : ""
                      }`}
                    />
                    {errors.message ? (
                      <p id="contact-message-error" className="mt-2 text-xs text-red-300">
                        {errors.message}
                      </p>
                    ) : (
                      <p id="contact-message-help" className="mt-2 text-xs text-white/55">
                        Include scope, references, and deadline for a faster, more accurate reply.
                      </p>
                    )}
                  </div>

                  {submitError ? (
                    <div
                      role="alert"
                      className="rounded-2xl border border-red-400/40 bg-red-500/10 px-4 py-3 text-sm text-red-200"
                    >
                      {submitError}
                    </div>
                  ) : null}

                  {submitSuccess ? (
                    <div
                      role="status"
                      aria-live="polite"
                      className="rounded-2xl border border-emerald-400/40 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200"
                    >
                      {submitSuccess}
                    </div>
                  ) : null}

                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <Button
                      type="submit"
                      disabled={loading}
                      aria-busy={loading}
                      className="shine-btn bg-[#40FF00] text-black hover:brightness-110 disabled:opacity-60"
                    >
                      {loading ? (
                        <span className="inline-flex items-center gap-2">
                          Sending your message…
                          <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-2">
                          Send message <Send className="h-4 w-4" />
                        </span>
                      )}
                    </Button>

                    <GlowLink href="/cv.pdf" download variant="secondary" className="shine-btn">
                      Download CV
                    </GlowLink>

                    <div className="ml-auto text-xs text-white/55">
                      No spam. No newsletters. Just a direct reply to your request.
                    </div>
                  </div>

                  <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/70">
                    <span className="text-white/85 font-semibold">Best results:</span> Share links,
                    inspiration, budget range, and timeline so I can send the most relevant plan in one reply.
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}