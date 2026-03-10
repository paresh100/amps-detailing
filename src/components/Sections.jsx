import { useEffect, useRef } from 'react'
import { motion as Motion, useReducedMotion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Link } from 'react-router-dom'
import {
  addOns,
  galleryItems,
  highlights,
  processSteps,
  servicesData,
  testimonials,
  vehicleSizes,
} from '../data/siteData'

gsap.registerPlugin(ScrollTrigger)

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
}

export function PageTransition({ children, className = '' }) {
  return (
    <Motion.main
      className={className}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Motion.main>
  )
}

export function HeroSection() {
  const heroRef = useRef(null)
  const primaryCardRef = useRef(null)
  const secondaryCardRef = useRef(null)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    if (shouldReduceMotion || !heroRef.current) {
      return undefined
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.hero-copy > *',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.12,
          ease: 'power3.out',
          delay: 0.15,
        },
      )

      gsap.fromTo(
        [primaryCardRef.current, secondaryCardRef.current],
        { opacity: 0, y: 40, rotate: (_, target) => (target === primaryCardRef.current ? -9 : 8) },
        {
          opacity: 1,
          y: 0,
          rotate: (_, target) => (target === primaryCardRef.current ? -5 : 4),
          duration: 1.1,
          stagger: 0.15,
          ease: 'power4.out',
          delay: 0.25,
        },
      )

      gsap.to(primaryCardRef.current, {
        yPercent: -4,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })

      gsap.to(secondaryCardRef.current, {
        yPercent: 5,
        scrollTrigger: {
          trigger: heroRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.8,
        },
      })
    }, heroRef)

    return () => ctx.revert()
  }, [shouldReduceMotion])

  return (
    <section className="hero" ref={heroRef}>
      <div className="hero-video-wrap" aria-hidden="true">
        <video className="hero-video" autoPlay muted loop playsInline preload="metadata">
          <source src="/hero-video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="hero-copy">
        <p className="eyebrow">AMP Detailing</p>
        <h1>Car detailing done with pride, patience, and real care.</h1>
        <p className="hero-text">
          Ajit is retired and details cars because he loves bringing them back to life.
          This website gives his work a proper home and shows the effort, respect, and
          attention he puts into every vehicle.
        </p>

        <div className="hero-actions">
          <Link className="button button-primary" to="/gallery">
            View the Work
          </Link>
          <Link className="button button-secondary" to="/contact">
            Get in Touch
          </Link>
        </div>
      </div>

      <div className="hero-visual" aria-hidden="true">
        <div className="visual-card visual-primary" ref={primaryCardRef}>
          <img src="/public/gallery/IMG_1964.JPG" alt="" className="visual-photo" />
          <span className="visual-label">Featured Presentation</span>
          <strong>Open-door Rolls-Royce finish</strong>
          <small>Luxury presentation shot showing interior care and final finish together.</small>
        </div>
        <div className="visual-card visual-secondary" ref={secondaryCardRef}>
          <img src="/public/gallery/IMG_1960.JPG" alt="" className="visual-photo" />
          <span className="visual-label">Finished Result</span>
          <strong>Front three-quarter gloss</strong>
          <small>A cleaner hero-side image that makes the final finish feel credible.</small>
        </div>
        <div className="visual-detail">
          <span>Interior trim</span>
          <span>Wheel finish</span>
          <span>Paint reflection</span>
        </div>
      </div>
    </section>
  )
}

export function HighlightsSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Motion.section
      className="highlights"
      aria-label="Site highlights"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {highlights.map((item) => (
        <Motion.article
          className="highlight-card"
          key={item.value}
          whileHover={shouldReduceMotion ? undefined : { y: -4 }}
          transition={{ duration: 0.2 }}
        >
          <h2>{item.value}</h2>
          <p>{item.label}</p>
        </Motion.article>
      ))}
    </Motion.section>
  )
}

export function AboutSection() {
  return (
    <Motion.section
      className="story-grid section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="section-heading">
        <p className="eyebrow">About Ajit</p>
        <h2>A personal service built on enjoyment, trust, and doing the job properly.</h2>
      </div>

      <div className="story-layout">
        <article className="story-panel story-panel-dark">
          <p>
            Ajit mainly details cars for friends and family. He does not do it for profit.
            He does it because he values the work, enjoys the process, and takes real pride
            in seeing a car look cared for again.
          </p>
          <p>
            The tone of this site reflects that approach: warm, honest, and focused on the
            standard of the work rather than sales pressure.
          </p>
        </article>

        <article className="story-panel story-panel-light">
          <h3>Values behind every detail</h3>
          <ul className="value-list">
            <li>Respect the vehicle and treat it like it matters.</li>
            <li>Take the extra time the finish needs.</li>
            <li>Pay attention to the areas people usually miss.</li>
            <li>Leave the car looking cared for, not rushed through.</li>
          </ul>
        </article>
      </div>
    </Motion.section>
  )
}

export function GallerySection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Motion.section
      className="gallery section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="section-heading">
        <p className="eyebrow">Featured Work</p>
        <h2>The gallery should carry the site, so the layout is built around strong visuals.</h2>
        <p>
          These Rolls-Royce images now anchor the featured work, with space to add more
          before-and-after case studies as Ajit builds out the portfolio.
        </p>
      </div>

      <div className="gallery-grid">
        {galleryItems.map((item, index) => (
          <Motion.article
            className="gallery-card"
            key={item.title}
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={shouldReduceMotion ? undefined : { y: -6 }}
          >
            <div className={`gallery-image gallery-image-${index + 1}`}>
              <img src={item.image} alt={item.title} className="gallery-photo" />
              <span>{item.tag}</span>
            </div>
            <div className="gallery-copy">
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </div>
          </Motion.article>
        ))}
      </div>
    </Motion.section>
  )
}

export function ServicesSection() {
  return (
    <Motion.section
      className="services section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="section-heading">
        <p className="eyebrow">What He Does</p>
        <h2>Not a hard-sell service menu. Just a clear view of what goes into each detail.</h2>
      </div>

      <div className="services-layout">
        <article className="services-card">
          <h3>What Ajit works on</h3>
          <div className="chip-grid">
            {servicesData.map((service) => (
              <Link className="service-chip service-link" key={service.slug} to={`/services/${service.slug}`}>
                {service.title}
              </Link>
            ))}
          </div>
        </article>

        <article className="process-card">
          <h3>The process</h3>
          <div className="process-list">
            {processSteps.map((item) => (
              <div className="process-item" key={item.step}>
                <span className="process-step">{item.step}</span>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </article>
      </div>
    </Motion.section>
  )
}

export function PricingSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Motion.section
      className="pricing section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
    >
      <div className="section-heading">
        <p className="eyebrow">Without the Love, Prices</p>
        <h2>Comparable detailing usually costs far more than a basic valet once the work is done properly.</h2>
        <p>
          These ranges reflect the pricing you want the site to communicate, including ceramic
          coating and protection work. Open any item for its own page.
        </p>
      </div>

      <div className="pricing-grid">
        {servicesData.map((item) => (
          <Motion.div
            key={item.slug}
            whileHover={shouldReduceMotion ? undefined : { y: -5 }}
            transition={{ duration: 0.2 }}
          >
            <Link className="pricing-card pricing-link" to={`/services/${item.slug}`}>
              <p className="pricing-service">{item.title}</p>
              <h3>{item.shortPrice}</h3>
              <p>{item.summary}</p>
            </Link>
          </Motion.div>
        ))}
      </div>

      <Motion.div
        className="pricing-notes"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <article className="services-card">
          <h3>Approximate pricing by vehicle size</h3>
          <div className="size-grid">
            {vehicleSizes.map((item) => (
              <div className="size-card" key={item.label}>
                <p className="pricing-service">{item.label}</p>
                <h4>{item.value}</h4>
                <p>{item.note}</p>
              </div>
            ))}
          </div>
        </article>

        <article className="services-card">
          <h3>Optional add-ons</h3>
          <div className="add-on-list">
            {addOns.map((item) => (
              <div className="add-on-row" key={item.title}>
                <span>{item.title}</span>
                <strong>{item.price}</strong>
              </div>
            ))}
          </div>
        </article>
      </Motion.div>
    </Motion.section>
  )
}

export function QuoteSection() {
  return (
    <Motion.section
      className="quote-banner section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <p>
        Ajit details cars because he loves the work, not because he has to. The site should
        leave people with that feeling immediately.
      </p>
    </Motion.section>
  )
}

export function TestimonialsSection() {
  return (
    <Motion.section
      className="testimonials section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="section-heading">
        <p className="eyebrow">Kind Words</p>
        <h2>Short comments help underline the trust and care behind the work.</h2>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((quote, index) => (
          <Motion.blockquote
            className="testimonial-card"
            key={quote}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
          >
            <p>&ldquo;{quote}&rdquo;</p>
          </Motion.blockquote>
        ))}
      </div>
    </Motion.section>
  )
}

export function ContactSection() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <Motion.section
      className="contact section"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="contact-copy">
        <p className="eyebrow">Contact</p>
        <h2>If you&apos;d like to ask about Ajit&apos;s work or simply get in touch, start here.</h2>
        <p>
          This section is ready for Ajit&apos;s real contact details. Add a phone number,
          WhatsApp link, email address, and local area once you have the final information.
        </p>

        <div className="contact-details">
          <p><strong>Location area:</strong> Add local town or service area</p>
          <p><strong>Email:</strong> hello@ampdetailing.example</p>
          <p><strong>WhatsApp:</strong> Add Ajit&apos;s preferred contact link</p>
        </div>
      </div>

      <Motion.form
        className="contact-form"
        name="contact"
        method="POST"
        action="/"
        data-netlify="true"
        netlify-honeypot="bot-field"
        whileHover={shouldReduceMotion ? undefined : { y: -4 }}
        transition={{ duration: 0.2 }}
      >
        <input type="hidden" name="form-name" value="contact" />
        <p className="form-honeypot">
          <label>
            Don&apos;t fill this out if you&apos;re human:
            <input name="bot-field" />
          </label>
        </p>
        <label>
          Name
          <input type="text" name="name" placeholder="Your name" />
        </label>
        <label>
          Email
          <input type="email" name="email" placeholder="Your email address" />
        </label>
        <label>
          Message
          <textarea
            name="message"
            rows="5"
            placeholder="Ask about Ajit's work or leave a kind message."
          />
        </label>
        <button className="button button-primary" type="submit">
          Send Message
        </button>
      </Motion.form>
    </Motion.section>
  )
}
