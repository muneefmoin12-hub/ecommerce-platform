import type { Metadata } from 'next';
import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
import { Leaf, Heart, Globe, Award } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about our mission to create beautifully made, responsibly sourced products.',
};

const values = [
  {
    icon: Leaf,
    title: 'Sustainably Sourced',
    description: 'Every material is chosen for its environmental credentials. We partner only with certified suppliers who share our commitment to the planet.',
  },
  {
    icon: Heart,
    title: 'Crafted with Care',
    description: 'Our products are made in small batches by skilled artisans. No mass production — each piece carries the mark of human hands.',
  },
  {
    icon: Globe,
    title: 'Fair Trade Partners',
    description: 'We pay fair wages across our entire supply chain, creating lasting relationships with producers around the world.',
  },
  {
    icon: Award,
    title: 'Built to Last',
    description: 'We design for longevity, not obsolescence. Every product is covered by our Lifetime Quality Guarantee.',
  },
];

const team = [
  { name: 'Sarah Chen', role: 'Co-founder & CEO', image: 'https://picsum.photos/seed/sarah/160/160' },
  { name: 'Marcus Webb', role: 'Co-founder & Creative Director', image: 'https://picsum.photos/seed/marcus/160/160' },
  { name: 'Priya Nair', role: 'Head of Sustainability', image: 'https://picsum.photos/seed/priya/160/160' },
  { name: 'Tom Hartley', role: 'Head of Product', image: 'https://picsum.photos/seed/tom/160/160' },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-[#faf7f4] py-20 md:py-28">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <span className="inline-block bg-primary/10 text-primary text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Our Story
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
              We make things worth{' '}
              <span className="text-gradient">keeping.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              We started with a simple belief: the world doesn&apos;t need more stuff — it needs
              better stuff. Products made with intention, designed to endure, and priced fairly
              for everyone in the chain.
            </p>
          </div>
        </section>

        {/* Story section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-5">From a small workshop to a global community</h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  We started in a small studio with two people and one idea: make products so good
                  that people never need to replace them. That first year, we sold handcrafted goods
                  to friends and neighbours.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Today, we ship worldwide, work with artisan producers across multiple countries,
                  and have been trusted by hundreds of thousands of customers. But our values
                  haven&apos;t changed.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  1% of every sale goes to environmental restoration projects. Because a better
                  product should also leave the world better than we found it.
                </p>
              </div>
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-muted">
                <img
                  src="https://picsum.photos/seed/workshop/600/600"
                  alt="Our workshop"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur rounded-xl p-4">
                  <p className="font-semibold text-sm">Our Workshop</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Where every product begins.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-20 bg-secondary/40">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">What we stand for</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">These aren&apos;t marketing words. They&apos;re the criteria we apply to every decision.</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {values.map(({ icon: Icon, title, description }) => (
                <div key={title} className="bg-background rounded-2xl p-6 border">
                  <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-3">The team</h2>
              <p className="text-muted-foreground max-w-xl mx-auto">Small by choice. Everyone who works here is a product obsessive.</p>
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
              {team.map((person) => (
                <div key={person.name} className="text-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden mx-auto mb-4 ring-4 ring-secondary">
                    <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="font-semibold text-sm">{person.name}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{person.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats banner */}
        <section className="py-12 bg-slate-900 text-white">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: '200k+', label: 'Happy customers' },
                { value: '45', label: 'Countries shipped' },
                { value: '80+', label: 'Artisan partners' },
                { value: '1%', label: 'Revenue to planet' },
              ].map(({ value, label }) => (
                <div key={label}>
                  <p className="text-3xl font-bold text-amber-400">{value}</p>
                  <p className="text-slate-400 text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
