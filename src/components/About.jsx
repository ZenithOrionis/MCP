import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import data from '../content/data.json';
import './About.css';

const { stats, paragraphs, label, title, missionQuote } = data.about;

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.18 },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const statVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef(null);

  const textInView = useInView(textRef, { once: true, margin: '-80px' });
  const statsInView = useInView(statsRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgR = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [26, 26, 31, 31]);
  const bgG = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [49, 49, 61, 61]);
  const bgB = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [44, 44, 54, 54]);
  const backgroundColor = useTransform(
    [bgR, bgG, bgB],
    ([r, g, b]) => `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
  );

  return (
    <motion.section
      id="about"
      className="about section"
      ref={sectionRef}
      style={{ backgroundColor }}
    >
      <div className="container">
        <ScrollReveal>
          <span className="section-label">{label}</span>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <h2 className="section-title" style={{ whiteSpace: 'pre-line' }}>
            {title}
          </h2>
        </ScrollReveal>

        <div className="about__grid">
          <motion.div
            className="about__text"
            ref={textRef}
            variants={containerVariants}
            initial="hidden"
            animate={textInView ? 'visible' : 'hidden'}
          >
            {paragraphs.map((text, i) => (
              <motion.p key={i} className="about__paragraph" variants={lineVariants}>
                {text}
              </motion.p>
            ))}

            <motion.div className="divider" variants={lineVariants} />

            <motion.p className="about__mission" variants={lineVariants}>
              {missionQuote}
            </motion.p>
          </motion.div>

          <div className="about__visual">
            <div className="about__quote-wrapper">
              <div className="about__quote-shape">
                <span className="about__quote-mark">&ldquo;</span>
              </div>
              <div className="about__quote-glow" />
            </div>
          </div>
        </div>

        <motion.div
          className="about__stats"
          ref={statsRef}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          animate={statsInView ? 'visible' : 'hidden'}
        >
          {stats.map((stat, i) => (
            <motion.div key={i} className="about__stat" variants={statVariants}>
              <span className="about__stat-number">{stat.number}</span>
              <span className="about__stat-label">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
