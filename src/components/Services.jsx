import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette, Printer, Layers } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './Services.css';

const services = [
  {
    number: '01',
    title: 'Pre-Press',
    Icon: Palette,
    items: [
      'Artwork & Design Creation',
      'Mock-up Development',
      'Computer To Plate (CTP) Technology',
    ],
  },
  {
    number: '02',
    title: 'Press',
    Icon: Printer,
    items: [
      'Advanced Offset Printing Technology',
      'CMYK & Pantone Color Systems',
      'Custom In-House Color Mixing',
    ],
  },
  {
    number: '03',
    title: 'Post-Press',
    Icon: Layers,
    items: [
      'UV Coating & Spot UV',
      '3D Lamination',
      'Die-Cut & Foil Stamping',
      'Perfect & Saddle-Stitch Binding',
    ],
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Services() {
  const gridRef = useRef(null);
  const gridInView = useInView(gridRef, { once: true, margin: '-80px' });

  return (
    <section id="services" className="services section">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">WHAT WE DO</span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="section-title">End-to-End Print Mastery</h2>
        </ScrollReveal>

        <motion.div
          className="services__grid"
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {services.map((service) => (
            <motion.div
              key={service.number}
              className="glass-card services__card"
              variants={cardVariants}
            >
              <span className="services__card-number">{service.number}</span>

              <div className="services__icon-wrap">
                <service.Icon size={26} strokeWidth={1.5} />
              </div>

              <h3 className="services__card-title">{service.title}</h3>

              <ul className="services__list">
                {service.items.map((item, i) => (
                  <li key={i} className="services__list-item">
                    <span className="services__dot" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
