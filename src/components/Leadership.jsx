import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import './Leadership.css';

const leaders = [
  {
    initial: 'A',
    name: 'Alman Madrid',
    role: 'CEO & General Manager',
    brief:
      'With over 30 years of printing industry expertise, Alman Madrid founded MCP with a vision to deliver world-class commercial printing to Philippine businesses.',
  },
  {
    initial: 'K',
    name: 'Kate Madrid',
    role: 'Operations Manager',
    brief:
      'Kate ensures every project flows seamlessly from order to delivery, maintaining the highest standards of quality and operational excellence.',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Leadership() {
  const gridRef = useRef(null);
  const isInView = useInView(gridRef, { once: true, margin: '-80px' });

  return (
    <section id="leadership" className="leadership">
      <div className="container">
        <ScrollReveal>
          <div className="leadership__header">
            <span className="section-label">Our Leaders</span>
            <h2 className="section-title">The Visionaries Behind MCP</h2>
          </div>
        </ScrollReveal>

        <motion.div
          ref={gridRef}
          className="leadership__grid"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {leaders.map((leader) => (
            <motion.div
              key={leader.name}
              className="leadership__card"
              variants={cardVariants}
              whileTap={{ scale: 0.97 }}
            >
              <div className="leadership__avatar">
                <span className="leadership__initial">{leader.initial}</span>
              </div>
              <h3 className="leadership__name">{leader.name}</h3>
              <p className="leadership__role">{leader.role}</p>
              <p className="leadership__brief">{leader.brief}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
