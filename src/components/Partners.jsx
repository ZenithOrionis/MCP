import ScrollReveal from './ScrollReveal';
import data from '../content/data.json';
import './Partners.css';

const { label, title, subtitle, logos } = data.partners;

function MarqueeRow({ items, reverse = false }) {
  const trackClass = `partners__track${reverse ? ' partners__track--reverse' : ''}`;

  return (
    <div className="partners__marquee">
      <div className={trackClass}>
        {[...items, ...items].map((partner, i) => (
          <div key={`${partner.name}-${i}`} className="partners__logo">
            <img 
              src={partner.imgSrc} 
              alt={partner.name} 
              className="partners__logo-img"
            />
            <span className="partners__logo-text">{partner.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Partners() {
  return (
    <section id="partners" className="partners">
      <div className="container">
        <ScrollReveal>
          <div className="partners__header">
            <span className="partners__label">{label}</span>
            <h2 className="partners__title section-title">{title}</h2>
            <p className="partners__subtitle">{subtitle}</p>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal delay={0.2}>
        <div className="partners__marquee-area">
          <MarqueeRow items={logos} />
          <MarqueeRow items={logos} reverse />
        </div>
      </ScrollReveal>
    </section>
  );
}
