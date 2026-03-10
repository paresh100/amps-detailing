import {
  AboutSection,
  ContactSection,
  GallerySection,
  HighlightsSection,
  PageTransition,
  PricingSection,
  QuoteSection,
  ServicesSection,
  TestimonialsSection,
} from '../components/Sections'

function IntroBlock({ eyebrow, title, text }) {
  return (
    <section className="section page-intro">
      <div className="section-heading">
        <p className="eyebrow">{eyebrow}</p>
        <h1 className="service-title">{title}</h1>
        <p>{text}</p>
      </div>
    </section>
  )
}

export function AboutPage() {
  return (
    <PageTransition>
      <IntroBlock
        eyebrow="About"
        title="A closer look at the care, pride, and personal approach behind AMP Detailing."
        text="A warm, personal approach matters here because the work is built on trust, care, and giving people that real wow factor when they see the result."
      />
      <HighlightsSection />
      <AboutSection />
      <QuoteSection />
    </PageTransition>
  )
}

export function GalleryPage() {
  return (
    <PageTransition>
      <IntroBlock
        eyebrow="Gallery"
        title="A visual record of the finish, the presentation, and the detail work."
        text="A closer look at the finish, the presentation, and the care behind the work."
      />
      <GallerySection />
    </PageTransition>
  )
}

export function WhatHeDoesPage() {
  return (
    <PageTransition>
      <IntroBlock
        eyebrow="Offerings"
        title="A closer look at the care, time, and attention that go into each detail."
        text="This section walks through the kind of work involved in each detail, so people can understand the care behind the finish without it feeling like a hard sell."
      />
      <ServicesSection />
      <QuoteSection />
    </PageTransition>
  )
}

export function PricesPage() {
  return (
    <PageTransition>
      <IntroBlock
        eyebrow="Prices"
        title="A guide to the level of care behind each service."
        text="These guide prices help set expectations for the time, attention, and finish involved in proper detailing work."
      />
      <PricingSection />
    </PageTransition>
  )
}

export function TestimonialsPage() {
  return (
    <PageTransition>
      <IntroBlock
        eyebrow="Testimonials"
        title="What people say after seeing the result."
        text="Real feedback helps show the impression the work leaves."
      />
      <TestimonialsSection />
    </PageTransition>
  )
}

export function ContactPage() {
  return (
    <PageTransition>
      <IntroBlock
        eyebrow="Contact"
        title="A simple way to ask about Ajit’s work or get in touch."
        text="Getting in touch should feel straightforward, calm, and easy."
      />
      <ContactSection />
    </PageTransition>
  )
}
