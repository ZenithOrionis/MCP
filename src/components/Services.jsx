import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Palette, Printer, Layers } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import data from '../content/data.json';
import './Services.css';

const { label, title, items } = data.services;

const IconMap = {
  Palette,
  Printer,
  Layers,
};

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
          <span className="section-label">{label}</span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="section-title">{title}</h2>
        </ScrollReveal>

        <motion.div
          className="services__grid"
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
        >
          {items.map((service) => {
            const Icon = IconMap[service.icon];
            return (
              <motion.div
                key={service.number}
                className="glass-card services__card"
                variants={cardVariants}
                whileTap={{ scale: 0.97 }}
              >
                <span className="services__card-number">{service.number}</span>

                <div className="services__icon-wrap">
                  {Icon && <Icon size={26} strokeWidth={1.5} />}
                </div>

                <h3 className="services__card-title">{service.title}</h3>

                <ul className="services__list">
                  {service.features.map((item, i) => (
                    <li key={i} className="services__list-item">
                      <span className="services__dot" />
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
