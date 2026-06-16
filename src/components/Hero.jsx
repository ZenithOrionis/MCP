import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import './Hero.css';

const TITLE_TEXT = 'OFFSET PRINTING';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.04,
      delayChildren: 0.6,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function Hero() {
  const handleScrollClick = (e) => {
    e.preventDefault();
    const target = document.querySelector('#about');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="hero"
      className="hero"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Floating ambient particles */}
      <div className="hero__particle hero__particle--1" aria-hidden="true" />
      <div className="hero__particle hero__particle--2" aria-hidden="true" />
      <div className="hero__particle hero__particle--3" aria-hidden="true" />

      {/* Morphing holographic sphere */}
      <motion.div
        className="hero__sphere-wrap"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="hero__sphere" aria-hidden="true" />
      </motion.div>

      {/* Text content */}
      <div className="hero__text">
        <motion.h1
          className="hero__title"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {TITLE_TEXT.split('').map((char, i) => (
            <motion.span
              key={`${char}-${i}`}
              className="hero__letter"
              variants={letterVariants}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="hero__subtitle"
          variants={fadeUpVariants}
          initial="hidden"
          animate="visible"
          custom={1.4}
        >
          Madrid Commercial Press
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.a
        className="hero__scroll"
        href="#about"
        onClick={handleScrollClick}
        variants={fadeUpVariants}
        initial="hidden"
        animate="visible"
        custom={1.8}
      >
        <span className="hero__scroll-text">Discover Our Craft</span>
        <ChevronDown size={20} className="hero__scroll-icon" />
      </motion.a>
    </motion.section>
  );
}
