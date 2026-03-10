import {
  AboutSection,
  ContactSection,
  GallerySection,
  HeroSection,
  HighlightsSection,
  PageTransition,
  PricingSection,
  QuoteSection,
  ServicesSection,
  TestimonialsSection,
} from '../components/Sections'

export function HomePage() {
  return (
    <PageTransition>
      <HeroSection />
      <HighlightsSection />
      <AboutSection />
      <GallerySection />
      <ServicesSection />
      <PricingSection />
      <QuoteSection />
      <TestimonialsSection />
      <ContactSection />
    </PageTransition>
  )
}
