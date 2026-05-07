'use client';

import { useState } from 'react';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

const contactInfo = [
  {
    icon: Mail,
    title: 'Email us',
    detail: 'hello@yourbrand.com',
    sub: 'We respond within 24 hours',
  },
  {
    icon: Phone,
    title: 'Call us',
    detail: '+1 (800) 555-0100',
    sub: 'Mon–Fri, 9am–5pm PT',
  },
  {
    icon: MapPin,
    title: 'Visit us',
    detail: '2417 NW Irving St',
    sub: 'Portland, OR 97210',
  },
  {
    icon: Clock,
    title: 'Support hours',
    detail: 'Mon–Fri 9am–6pm PT',
    sub: 'Sat 10am–4pm PT',
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  }

  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#faf7f4] py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-2xl text-center">
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-5">
              Get in touch
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              We&apos;d love to hear from you
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Whether you have a question about an order, a product, or just want to say hello —
              our team is here and ready to help.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid lg:grid-cols-5 gap-12">
              {/* Contact info */}
              <div className="lg:col-span-2 space-y-6">
                <h2 className="text-2xl font-bold">Contact information</h2>
                <div className="space-y-4">
                  {contactInfo.map(({ icon: Icon, title, detail, sub }) => (
                    <div key={title} className="flex items-start gap-4 p-4 rounded-xl border bg-secondary/20">
                      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                        <Icon className="h-4.5 w-4.5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{title}</p>
                        <p className="text-sm font-semibold mt-0.5">{detail}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="font-semibold text-sm mb-1">Order support?</p>
                  <p className="text-sm text-muted-foreground">
                    For order tracking, returns, or exchanges — include your order number and
                    we&apos;ll get back to you within 4 business hours.
                  </p>
                </div>
              </div>

              {/* Contact form */}
              <div className="lg:col-span-3">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-16">
                    <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-5">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Message sent!</h2>
                    <p className="text-muted-foreground max-w-sm">
                      Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="mt-6 text-sm text-primary font-medium hover:underline"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium mb-1.5">First name</label>
                        <input
                          type="text"
                          required
                          placeholder="Sarah"
                          className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1.5">Last name</label>
                        <input
                          type="text"
                          required
                          placeholder="Chen"
                          className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Email address</label>
                      <input
                        type="email"
                        required
                        placeholder="sarah@example.com"
                        className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Subject</label>
                      <select className="w-full h-11 px-4 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors">
                        <option value="">Select a topic</option>
                        <option value="order">Order & Shipping</option>
                        <option value="product">Product Question</option>
                        <option value="return">Return or Exchange</option>
                        <option value="wholesale">Wholesale Inquiry</option>
                        <option value="other">Other</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1.5">Message</label>
                      <textarea
                        required
                        rows={5}
                        placeholder="Tell us how we can help..."
                        className="w-full px-4 py-3 rounded-lg border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full text-sm font-semibold bg-primary text-white hover:bg-primary/90 transition-all shadow-md shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                      {loading ? 'Sending…' : 'Send message'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
