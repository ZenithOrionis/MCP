import { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import { Package, BookOpen, Briefcase, Sparkles } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './Products.css';

const categories = ['All', 'Packaging', 'Books', 'Corporate', 'Specialty'];

const categoryIcons = {
  Packaging: Package,
  Books: BookOpen,
  Corporate: Briefcase,
  Specialty: Sparkles,
};

const products = [
  {
    id: 'pkg-1',
    name: 'Product Packaging',
    description: 'Custom boxes and containers designed to protect and showcase your products.',
    category: 'Packaging',
  },
  {
    id: 'pkg-2',
    name: 'Sleeves & Wrappers',
    description: 'Precision-printed sleeves and wrappers for pharmaceutical and consumer goods.',
    category: 'Packaging',
  },
  {
    id: 'pkg-3',
    name: 'Corrugated Boxes',
    description: 'Durable packaging solutions for shipping and retail display.',
    category: 'Packaging',
  },
  {
    id: 'bk-1',
    name: 'Hardcover Books',
    description: 'Premium hardbound publications with archival-quality printing.',
    category: 'Books',
  },
  {
    id: 'bk-2',
    name: 'Softcover & Paperbacks',
    description: 'Cost-effective softcover printing for novels, manuals, and guides.',
    category: 'Books',
  },
  {
    id: 'bk-3',
    name: 'Journals & Notebooks',
    description: 'Custom journals with specialty covers and lay-flat binding.',
    category: 'Books',
  },
  {
    id: 'corp-1',
    name: 'Brochures & Flyers',
    description: 'High-impact marketing collateral with vivid color reproduction.',
    category: 'Corporate',
  },
  {
    id: 'corp-2',
    name: 'Business Cards',
    description: 'Premium cards with options for embossing, foil, and specialty finishes.',
    category: 'Corporate',
  },
  {
    id: 'corp-3',
    name: 'Catalogs & Magazines',
    description: 'Multi-page publications with perfect binding and saddle-stitch options.',
    category: 'Corporate',
  },
  {
    id: 'spec-1',
    name: 'Foil Stamping',
    description: 'Metallic and holographic foil applications for luxury finishing.',
    category: 'Specialty',
  },
  {
    id: 'spec-2',
    name: 'Embossing & Debossing',
    description: 'Tactile raised or recessed designs that add dimension to print.',
    category: 'Specialty',
  },
  {
    id: 'spec-3',
    name: '3D Lamination',
    description: 'Eye-catching lenticular and textured lamination effects.',
    category: 'Specialty',
  },
];

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
            <p className="section-label">OUR PRODUCTS</p>
            <h2 className="section-title">The Masterpieces We Create</h2>
            <p className="section-subtitle">
              From concept to creation, we bring your vision to life across every format.
            </p>
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
