import ScrollReveal from './ScrollReveal';
import data from '../content/data.json';
import './Partners.css';

const { label, title, subtitle } = data.partners;

import sanMiguelLogo from '../assets/partners/san-miguel.png';
import dunkinLogo from '../assets/partners/dunkin.png';
import benchLogo from '../assets/partners/bench.png';
import cargillLogo from '../assets/partners/cargill.png';
import nestleLogo from '../assets/partners/nestle.png';
import astrazenecaLogo from '../assets/partners/astrazeneca.png';
import globeLogo from '../assets/partners/globe.png';
import urcLogo from '../assets/partners/urc.png';

const partners = [
  { name: 'San Miguel', logo: sanMiguelLogo },
  { name: "Dunkin'", logo: dunkinLogo },
  { name: 'Bench', logo: benchLogo },
  { name: 'Cargill', logo: cargillLogo },
  { name: 'Nestlé', logo: nestleLogo },
  { name: 'AstraZeneca', logo: astrazenecaLogo },
  { name: 'Globe', logo: globeLogo },
  { name: 'Universal Robina', logo: urcLogo },
];

function MarqueeRow({ items, reverse = false }) {
  const trackClass = `partners__track${reverse ? ' partners__track--reverse' : ''}`;

  return (
    <div className="partners__marquee">
      <div className={trackClass}>
        {[...items, ...items].map((partner, i) => (
          <div key={`${partner.name}-${i}`} className="partners__logo">
            <img 
              src={partner.logo} 
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
          <MarqueeRow items={partners} />
          <MarqueeRow items={partners} reverse />
        </div>
      </ScrollReveal>
    </section>
  );
}
