import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { DollarSign, Shuffle, ShieldCheck, Clock, Users, Lock } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './WhyChooseUs.css';

const pillars = [
  {
    icon: DollarSign,
    title: 'Competitive Pricing',
    description:
      'Premium quality printing solutions that respect your budget without compromising excellence.',
  },
  {
    icon: Shuffle,
    title: 'Versatility',
    description:
      'From delicate pharmaceutical packaging to bold commercial prints — we handle every format.',
  },
  {
    icon: ShieldCheck,
    title: 'Quality Assurance',
    description:
      'Rigorous quality control at every stage ensures your prints meet the highest standards.',
  },
  {
    icon: Clock,
    title: 'Fast Turnaround',
    description:
      'Efficient workflows and dedicated teams deliver your projects on schedule, every time.',
  },
  {
    icon: Users,
    title: 'Experienced Team',
    description:
      'Three decades of collective expertise driving innovation in every print run.',
  },
  {
    icon: Lock,
    title: 'Confidentiality',
    description:
      'Your designs and proprietary information are safeguarded with strict confidentiality protocols.',
  },
];

function PillarIcon({ Icon, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  return (
    <motion.div
      ref={ref}
      className="why-us__icon-wrapper"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={
        isInView
          ? { opacity: 1, scale: 1 }
          : { opacity: 0, scale: 0.5 }
      }
      transition={{
        duration: 0.5,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <Icon />
    </motion.div>
  );
}

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="why-us">
      <div className="why-us__bg-glow" aria-hidden="true" />

      <div className="container">
        <ScrollReveal>
          <div className="why-us__header">
            <span className="section-label">WHY CHOOSE US</span>
            <h2 className="section-title">What Sets Us Apart</h2>
          </div>
        </ScrollReveal>

        <div className="why-us__grid">
          {pillars.map((pillar, i) => (
            <ScrollReveal
              key={pillar.title}
              direction={i % 2 === 0 ? 'left' : 'right'}
              delay={i * 0.08}
            >
              <div className="why-us__item">
                <PillarIcon Icon={pillar.icon} index={i} />
                <div className="why-us__content">
                  <h3 className="why-us__item-title">{pillar.title}</h3>
                  <p className="why-us__item-desc">{pillar.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
