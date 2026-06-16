import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import './Portfolio.css';

const portfolioItems = [
  { id: 1, title: 'Pharmaceutical Packaging', category: 'Packaging', size: 'tall' },
  { id: 2, title: 'Luxury Cosmetic Box', category: 'Packaging', size: 'medium' },
  { id: 3, title: 'Corporate Calendar 2025', category: 'Corporate', size: 'medium' },
  { id: 4, title: 'Coffee Table Art Book', category: 'Books', size: 'tall' },
  { id: 5, title: 'Product Catalog', category: 'Corporate', size: 'short' },
  { id: 6, title: 'Wine Label Collection', category: 'Specialty', size: 'medium' },
  { id: 7, title: 'Annual Report', category: 'Corporate', size: 'tall' },
  { id: 8, title: 'Promotional Brochure', category: 'Corporate', size: 'short' },
];

function PortfolioCard({ item, index }) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={cardRef}
      className={`portfolio__card portfolio__card--${item.size}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{
        duration: 0.6,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <div className="portfolio__gradient" />

      <motion.div
        className="portfolio__overlay"
        initial={{ opacity: 0, y: 20 }}
        animate={isHovered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="portfolio__overlay-title">{item.title}</p>
        <span className="portfolio__overlay-category">{item.category}</span>
      </motion.div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <section id="portfolio" className="portfolio section">
      <div className="container">
        <ScrollReveal>
          <div className="portfolio__header">
            <p className="section-label">SAMPLE PRINTS</p>
            <h2 className="section-title">Printing Perfection</h2>
            <p className="portfolio__subtitle">"Every Impression Tells a Story"</p>
          </div>
        </ScrollReveal>

        <div className="portfolio__masonry">
          {portfolioItems.map((item, index) => (
            <PortfolioCard key={item.id} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
