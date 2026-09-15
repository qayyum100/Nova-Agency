"use client";

import { ArrowUpRight, Check, Send } from "lucide-react";
import { useState, type FormEvent } from "react";

type FormValues = { name: string; email: string; message: string };
type Errors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): Errors {
  const errors: Errors = {};
  if (!values.name.trim()) errors.name = "Your name is required.";
  if (!values.email.trim()) errors.email = "Your email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errors.email = "Enter a valid email.";
  if (values.message.trim().length < 12) errors.message = "Tell us a little more about the project.";
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState<FormValues>({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return;

    fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Contact request failed");
        setSubmitted(true);
      })
      .catch(() => setErrors({ message: "We couldn't send that. Please try again." }));
  }

  function update(field: keyof FormValues, value: string) {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
  }

  return (
    <section id="contact">
      <div className="mx-auto grid max-w-7xl gap-16 px-6 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:gap-32 lg:px-10 lg:py-32">
        <div>
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.2em] text-glow">Start a conversation</p>
          <h2 className="max-w-lg text-5xl font-semibold leading-[0.92] tracking-[-0.07em] text-white sm:text-7xl">Have a big idea? Give it a signal.</h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-soft">Tell us what you are building, where you want to go, and what is getting in the way.</p>
          <a href="mailto:hello@novaagency.studio" className="group mt-10 inline-flex items-center gap-2 text-sm text-white hover:text-glow">hello@novaagency.studio <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" /></a>
        </div>
        {submitted ? (
          <div className="flex min-h-[420px] flex-col items-center justify-center border border-glow/40 bg-glow/5 p-8 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-glow text-void"><Check size={28} /></div>
            <h3 className="mt-7 text-3xl font-medium text-white">Signal received.</h3>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-soft">Thanks for reaching out. We will be in touch within two working days.</p>
            <button onClick={() => { setSubmitted(false); setValues({ name: "", email: "", message: "" }); }} className="mt-8 text-sm text-glow underline underline-offset-4">Send another message</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-7">
            <div>
              <label htmlFor="name" className="mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-soft">Name</label>
              <input id="name" value={values.name} onChange={(event) => update("name", event.target.value)} className="form-field w-full border-b border-white/20 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/25" placeholder="Your name" aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-error" : undefined} />
              {errors.name && <p id="name-error" className="mt-2 text-xs text-red-300">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-soft">Email</label>
              <input id="email" type="email" value={values.email} onChange={(event) => update("email", event.target.value)} className="form-field w-full border-b border-white/20 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/25" placeholder="you@company.com" aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-error" : undefined} />
              {errors.email && <p id="email-error" className="mt-2 text-xs text-red-300">{errors.email}</p>}
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block font-mono text-xs uppercase tracking-[0.16em] text-soft">Message</label>
              <textarea id="message" rows={5} value={values.message} onChange={(event) => update("message", event.target.value)} className="form-field w-full resize-none border-b border-white/20 bg-transparent px-0 py-3 text-white outline-none placeholder:text-white/25" placeholder="Tell us about the project..." aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-error" : undefined} />
              {errors.message && <p id="message-error" className="mt-2 text-xs text-red-300">{errors.message}</p>}
            </div>
            <button type="submit" className="group inline-flex items-center gap-3 rounded-full border border-glow bg-glow px-6 py-4 text-sm font-semibold text-void transition-transform hover:scale-105">Send inquiry <Send size={16} className="transition-transform group-hover:translate-x-1" /></button>
          </form>
        )}
      </div>
    </section>
  );
}
