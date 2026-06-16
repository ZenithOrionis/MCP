import { useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import data from '../content/data.json';
import './Hero.css';

const TITLE_TEXT = data.hero.title;

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
  const heroRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 30, mass: 0.5 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

  const handlePointerMove = useCallback((e) => {
    const rect = heroRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }, [mouseX, mouseY]);

  const handlePointerLeave = useCallback(() => {
    mouseX.set(0);
    mouseY.set(0);
  }, [mouseX, mouseY]);

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
      ref={heroRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Floating ambient particles */}
      <div className="hero__particle hero__particle--1" aria-hidden="true" />
      <div className="hero__particle hero__particle--2" aria-hidden="true" />
      <div className="hero__particle hero__particle--3" aria-hidden="true" />

      {/* Morphing holographic sphere with tilt */}
      <motion.div
        className="hero__sphere-wrap"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        style={{
          rotateX,
          rotateY,
          perspective: 600,
        }}
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
              whileHover={{ scale: 1.15, color: '#89D7B7', transition: { duration: 0.2 } }}
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
          {data.hero.subtitle}
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
        <span className="hero__scroll-text">{data.hero.ctaText}</span>
        <ChevronDown size={20} className="hero__scroll-icon" />
      </motion.a>
    </motion.section>
  );
}
