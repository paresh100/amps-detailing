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
        title="A proper introduction to Ajit and why he does this work."
        text="This page keeps the focus on the person behind the detailing: patient, trusted, and more interested in giving people that wow factor than turning the work into a sales pitch."
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
        text="The strongest images belong here, especially full-car presentation shots and close-ups that explain the work behind the final result."
      />
      <GallerySection />
    </PageTransition>
  )
}

export function WhatHeDoesPage() {
  return (
    <PageTransition>
      <IntroBlock
        eyebrow="What He Does"
        title="A clear view of the work that goes into each detail."
        text="This page explains the areas Ajit works on and the process behind the finish, without turning the site into a hard sales menu."
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
        title="A rough guide to the kind of time and care this work usually involves."
        text="This page gives context around typical detailing ranges without changing the tone of the site into something money-led or sales-driven."
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
        title="The kind of feedback that makes the quality believable."
        text="Short, honest comments matter because they show that the care people notice is not just something the site claims."
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
        text="This page is intentionally straightforward. It should feel calm, direct, and easy to use."
      />
      <ContactSection />
    </PageTransition>
  )
}
