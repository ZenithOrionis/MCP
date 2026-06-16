import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Package, BookOpen, Briefcase, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import data from '../content/data.json';
import './Products.css';

const { label, title, subtitle, categories, items: products } = data.products;

const categoryIcons = {
  Packaging: Package,
  Books: BookOpen,
  Corporate: Briefcase,
  Specialty: Sparkles,
};

const badgeClass = (category) => {
  const map = {
    Packaging: '',
    Books: 'products__card-badge--books',
    Corporate: 'products__card-badge--corporate',
    Specialty: 'products__card-badge--specialty',
  };
  return `products__card-badge ${map[category] || ''}`;
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 16 },
  visible: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.2 } },
};

export default function Products() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filterRefs = useRef({});
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const filteredProducts =
    activeFilter === 'All'
      ? products
      : products.filter((p) => p.category === activeFilter);

  const setFilterRef = useCallback((category) => (el) => {
    filterRefs.current[category] = el;
  }, []);

  return (
    <section id="products" className="products section" ref={sectionRef}>
      <div className="container">
        <ScrollReveal>
          <div className="products__header">
            <p className="section-label">{label}</p>
            <h2 className="section-title">{title}</h2>
            <p className="section-subtitle">{subtitle}</p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="products__filters">
            {categories.map((cat) => (
              <button
                key={cat}
                ref={setFilterRef(cat)}
                className={`products__filter-btn${
                  activeFilter === cat ? ' products__filter-btn--active' : ''
                }`}
                onClick={() => setActiveFilter(cat)}
              >
                {cat}
                {activeFilter === cat && (
                  <motion.span
                    className="products__filter-indicator"
                    layoutId="products-filter-underline"
                    style={{
                      position: 'absolute',
                      bottom: -1,
                      left: 0,
                      right: 0,
                      height: 2,
                    }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <motion.div
          className="products__grid"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => {
              const Icon = categoryIcons[product.category];
              return (
                <motion.div
                  key={product.id}
                  className="products__card glass-card"
                  layout
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{
                    duration: 0.45,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                    layout: { type: 'spring', stiffness: 300, damping: 28 },
                  }}
                >
                  <div className="products__card-top">
                    <span className={badgeClass(product.category)}>
                      {product.category}
                    </span>
                    {Icon && <Icon size={20} className="products__card-icon" />}
                  </div>
                  <h3 className="products__card-title">{product.name}</h3>
                  <p className="products__card-description">{product.description}</p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
