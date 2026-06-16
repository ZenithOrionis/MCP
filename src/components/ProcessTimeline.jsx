import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import ScrollReveal from './ScrollReveal';
import './ProcessTimeline.css';

const steps = [
  {
    number: 1,
    title: 'Quotation',
    description:
      'Share your project details and receive a transparent, competitive quote within 24 hours.',
  },
  {
    number: 2,
    title: 'Order Acquisition',
    description:
      'Confirm your order with our team and finalize all specifications and requirements.',
  },
  {
    number: 3,
    title: 'Project Initiation',
    description:
      'Our pre-press team begins artwork preparation, proofing, and plate generation.',
  },
  {
    number: 4,
    title: 'Approval of Project',
    description:
      'Review and approve final proofs before we proceed to the press floor.',
  },
  {
    number: 5,
    title: 'Production',
    description:
      'Your project comes to life on our advanced offset presses and post-press finishing lines.',
  },
];

function TimelineNode({ step, index, scrollYProgress, totalSteps }) {
  const nodeRef = useRef(null);
  const isInView = useInView(nodeRef, { once: true, margin: '-80px' });

  const nodeThreshold = index / totalSteps;
  const nodeActivation = nodeThreshold + 0.08;

  const circleBg = useTransform(
    scrollYProgress,
    [nodeThreshold, nodeActivation],
    [
      'linear-gradient(135deg, rgba(137,215,183,0), rgba(66,132,117,0))',
      'linear-gradient(135deg, rgba(137,215,183,0.2), rgba(66,132,117,0.15))',
    ]
  );

  const circleColor = useTransform(
    scrollYProgress,
    [nodeThreshold, nodeActivation],
    ['#7a9e93', '#FFF4E1']
  );

  const isOdd = index % 2 === 0;

  return (
    <div ref={nodeRef} className="process__node">
      <motion.div
        className="process__circle"
        style={{ background: circleBg, color: circleColor }}
      >
        {step.number}
      </motion.div>

      <ScrollReveal
        direction={isOdd ? 'right' : 'left'}
        delay={0.1}
        className="process__card-reveal"
        style={{ width: 'calc(50% - 40px)' }}
      >
        <motion.div
          className="process__card"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <h3 className="process__card-title">{step.title}</h3>
          <p className="process__card-desc">{step.description}</p>
        </motion.div>
      </ScrollReveal>
    </div>
  );
}

export default function ProcessTimeline() {
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start end', 'end start'],
  });

  const pulseScaleY = useTransform(scrollYProgress, [0.05, 0.85], [0, 1]);

  return (
    <section id="process" className="process">
      <div className="container">
        <ScrollReveal>
          <div className="process__header">
            <span className="section-label">GET STARTED</span>
            <h2 className="section-title">Our Streamlined Process</h2>
            <p className="process__subtitle">
              From first contact to final delivery — a seamless journey.
            </p>
          </div>
        </ScrollReveal>

        <div className="process__timeline" ref={timelineRef}>
          <div className="process__line" aria-hidden="true" />

          <motion.div
            className="process__pulse-line"
            style={{ scaleY: pulseScaleY }}
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <TimelineNode
              key={step.number}
              step={step}
              index={i}
              scrollYProgress={scrollYProgress}
              totalSteps={steps.length}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
