import { motion as Motion } from 'framer-motion'
import { Link, Navigate, useParams } from 'react-router-dom'

export function ServicePage({ services }) {
  const { serviceSlug } = useParams()
  const service = services.find((item) => item.slug === serviceSlug)

  if (!service) {
    return <Navigate to="/" replace />
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug).slice(0, 3)

  return (
    <Motion.main
      className="service-page"
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -14 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <Motion.section
        className="service-hero section"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-heading">
          <p className="eyebrow">Market Value</p>
          <h1 className="service-title">{service.title}</h1>
          <p>
            {service.overview}
          </p>
        </div>

        <div className="service-hero-card">
          <p className="pricing-service">Typical UK pricing</p>
          <h2>{service.shortPrice}</h2>
          <p>{service.note}</p>
          <Link className="button button-primary" to="/contact">
            Ask About Ajit&apos;s Work
          </Link>
        </div>
      </Motion.section>

      <Motion.section
        className="service-content"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <Motion.article className="service-panel" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <h3>What that usually covers</h3>
          <ul className="value-list">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Motion.article>

        <Motion.article className="service-panel service-panel-accent" whileHover={{ y: -4 }} transition={{ duration: 0.2 }}>
          <h3>Why the market sits there</h3>
          <p>{service.summary}</p>
          <p>
            That pricing reflects time, condition, vehicle size, and whether the work stays in
            valet territory or moves into slower, higher-skill detail work.
          </p>
        </Motion.article>
      </Motion.section>

      <Motion.section
        className="related-services section"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="section-heading">
          <p className="eyebrow">Other Services</p>
          <h2>Each area of work now has its own page.</h2>
        </div>

        <div className="pricing-grid">
          {relatedServices.map((item) => (
            <Motion.div key={item.slug} whileHover={{ y: -5 }} transition={{ duration: 0.2 }}>
              <Link className="pricing-card pricing-link" to={`/services/${item.slug}`}>
                <p className="pricing-service">{item.title}</p>
                <h3>{item.shortPrice}</h3>
                <p>{item.summary}</p>
                <p className="pricing-card-cta">
                  More info <span aria-hidden="true">→</span>
                </p>
              </Link>
            </Motion.div>
          ))}
        </div>
      </Motion.section>
    </Motion.main>
  )
}
