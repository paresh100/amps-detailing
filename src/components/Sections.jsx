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

function PricingGraphic({ slug }) {
  const variants = {
    'maintenance-wash-detail': {
      label: 'Wash',
      path: 'M18 72 C42 48, 80 38, 118 36 C150 34, 182 42, 210 58',
      circleX: 188,
      circleY: 36,
    },
    'interior-deep-clean': {
      label: 'Interior',
      path: 'M18 66 C52 54, 88 46, 124 44 C154 42, 186 48, 214 62',
      circleX: 84,
      circleY: 34,
    },
    'full-exterior-detail': {
      label: 'Exterior',
      path: 'M18 74 C56 50, 94 40, 134 38 C170 36, 196 44, 214 54',
      circleX: 162,
      circleY: 32,
    },
    'machine-polishing-enhancement': {
      label: 'Polish',
      path: 'M18 70 C44 44, 82 30, 126 30 C166 30, 196 42, 214 60',
      circleX: 122,
      circleY: 28,
    },
    'ceramic-coating-paint-protection': {
      label: 'Ceramic',
      path: 'M18 76 C54 48, 94 34, 142 34 C176 34, 198 42, 214 54',
      circleX: 198,
      circleY: 30,
    },
    'engine-bay-detailing': {
      label: 'Engine',
      path: 'M18 68 C46 52, 84 44, 124 42 C160 40, 192 46, 214 58',
      circleX: 70,
      circleY: 30,
    },
  }

  const variant = variants[slug] ?? variants['maintenance-wash-detail']

  return (
    <svg className="pricing-card-graphic" viewBox="0 0 232 96" preserveAspectRatio="none">
      <defs>
        <linearGradient id={`line-${slug}`} x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,244,232,0.12)" />
          <stop offset="100%" stopColor="rgba(255,244,232,0.92)" />
        </linearGradient>
      </defs>
      <path
        d={variant.path}
        fill="none"
        stroke={`url(#line-${slug})`}
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d={variant.path}
        fill="none"
        stroke="rgba(255,255,255,0.16)"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <circle cx={variant.circleX} cy={variant.circleY} r="20" fill="rgba(255,255,255,0.12)" />
      <circle cx={variant.circleX} cy={variant.circleY} r="8" fill="rgba(255,244,232,0.86)" />
      <text x="18" y="24" className="pricing-card-graphic-label">{variant.label}</text>
    </svg>
  )
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
          Ajit details cars because he loves bringing them back to life. AMP Detailing
          reflects the effort, respect, and attention he puts into every vehicle.
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
          <img src="/gallery/IMG_1964.JPG" alt="" className="visual-photo" />
          <span className="visual-label">Featured Presentation</span>
          <strong>Open-door Rolls-Royce finish</strong>
          <small>Interior care and exterior finish in one view.</small>
        </div>
        <div className="visual-card visual-secondary" ref={secondaryCardRef}>
          <img src="/gallery/IMG_1960.JPG" alt="" className="visual-photo" />
          <span className="visual-label">Finished Result</span>
          <strong>Front three-quarter gloss</strong>
          <small>A clear view of the final finish.</small>
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
        <p className="eyebrow">About AMP Detailing</p>
        <h2>A personal service built on enjoyment, trust, and doing the job properly.</h2>
      </div>

      <div className="story-layout">
        <article className="story-panel story-panel-dark">
          <p>
            AMP Detailing is built around friends, family, and the enjoyment of doing the
            job properly. It is about taking pride in the work, paying attention to the
            details others miss, and giving every car that real wow factor when people see
            it again.
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
        <p className="eyebrow">Gallery</p>
        <h2>A closer look at the finish, the presentation, and the care behind the work.</h2>
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
        <p className="eyebrow">Offerings</p>
        <h2>Care that looks sharp, feels premium, and leaves the right impression.</h2>
        <p>
          From careful washing to deep interior work and finishing touches, AMP Detailing
          is about making the whole car feel properly looked after.
        </p>
      </div>

      <div className="services-layout">
        <article className="services-card services-showcase">
          <div className="services-showcase-media">
            <img src="/gallery/IMG_1965.JPG" alt="Rolls-Royce side profile after detailing" className="gallery-photo" />
          </div>
          <div className="services-showcase-copy">
            <p className="pricing-service">AMP Approach</p>
            <h3>Exterior finish, interior freshness, and the small details people notice straight away.</h3>
            <p>
              The work is built around presentation as much as cleanliness, so the result
              feels polished, cared for, and genuinely special.
            </p>
          </div>
        </article>

        <article className="process-card process-card-spotlight">
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

      <div className="service-chip-grid">
        {servicesData.map((service, index) => (
          <Motion.div
            key={service.slug}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: index * 0.04 }}
          >
            <Link className="service-chip-card" to={`/services/${service.slug}`}>
              <p className="pricing-service">Service</p>
              <h3>{service.title}</h3>
              <p>{service.shortPrice}</p>
            </Link>
          </Motion.div>
        ))}
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
        <p className="eyebrow">Guide Prices</p>
        <h2>Simple ranges that match the level of care, finish, and time involved.</h2>
      </div>

      <div className="pricing-grid pricing-grid-premium">
        {servicesData.map((item, index) => (
          <Motion.div
            key={item.slug}
            whileHover={shouldReduceMotion ? undefined : { y: -6 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              className={`pricing-card pricing-card-premium pricing-card-${(index % 4) + 1} pricing-link`}
              to={`/services/${item.slug}`}
            >
              <div className="pricing-card-media" aria-hidden="true">
                <PricingGraphic slug={item.slug} />
                <span className="pricing-card-badge">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <p className="pricing-service">{item.title}</p>
              <h3>{item.shortPrice}</h3>
              <p>{item.note}</p>
              <p className="pricing-friends-note">
                Special Rates For True Friends ~~~ Free <span aria-hidden="true">♥</span>
              </p>
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
        <article className="services-card pricing-note-card">
          <h3>By vehicle size</h3>
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

        <article className="services-card pricing-note-card">
          <h3>Add-ons</h3>
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

      <Motion.div
        className="friends-family-price"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="friends-family-heart" aria-hidden="true">♥</span>
        <p className="pricing-service">Special Rates For True Friends ~~~</p>
        <h3>Free <span className="friends-family-inline-heart" aria-hidden="true">♥</span></h3>
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
        AMP Detailing should feel personal, warm, and trustworthy from the first glance,
        because that is exactly what the work represents.
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
        <h2>Comments that make the finish feel believable.</h2>
      </div>

      <div className="testimonial-grid testimonial-grid-premium">
        <Motion.blockquote
          className="testimonial-card testimonial-card-feature"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
        >
          <img src="/gallery/IMG_1964.JPG" alt="" className="testimonial-photo" />
          <div className="testimonial-overlay" />
          <div className="testimonial-content">
            <p className="pricing-service">Featured Feedback</p>
            <p>&ldquo;{testimonials[0]}&rdquo;</p>
          </div>
        </Motion.blockquote>

        {testimonials.slice(1).map((quote, index) => (
          <Motion.blockquote
            className="testimonial-card testimonial-card-quote"
            key={quote}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: (index + 1) * 0.08 }}
          >
            <span className="testimonial-mark" aria-hidden="true">“</span>
            <p>{quote}</p>
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
        netlify
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
