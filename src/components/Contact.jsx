import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import ScrollReveal from './ScrollReveal';
import './Contact.css';

const contactItems = [
  {
    icon: Phone,
    label: 'Phone',
    value: '(02) 8942-1610',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'madridcompress@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Office',
    value:
      '89 Rodriguez St. Felix Subd. Brgy. San Andres Cainta, Rizal, Philippines, 1900',
  },
  {
    icon: MapPin,
    label: 'Plant',
    value:
      '11 Lily St. Midtown Village, Brgy. San Andres, Cainta, Rizal, Philippines, 1900',
  },
];



const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Contact() {
  const listRef = useRef(null);
  const isInView = useInView(listRef, { once: true, margin: '-60px' });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('submitting');
    
    try {
      const response = await fetch('https://formsubmit.co/ajax/ramizgshaikh@gmail.com', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            _subject: 'New submission from MCP Website'
        })
      });
      
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="container">
        <ScrollReveal>
          <div className="contact__cta">
            <h2 className="contact__heading section-title">
              Ready to Print Your Success?
            </h2>
            <p className="contact__subtitle">
              Let&rsquo;s bring your next project to life.
            </p>
            <div className="contact__cta-btn">
              <button className="btn-primary">
                Request a Quote
                <ArrowRight />
              </button>
            </div>
          </div>
        </ScrollReveal>

        <div className="contact__grid">
          <motion.div
            ref={listRef}
            className="contact__items"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {contactItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label + i}
                  className="contact__item"
                  variants={itemVariants}
                >
                  <div className={`contact__icon-wrap contact__icon-wrap--float-${i}`}>
                    <Icon />
                  </div>
                  <div>
                    <p className="contact__item-label">{item.label}</p>
                    <p className="contact__item-value">{item.value}</p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          <ScrollReveal delay={0.3}>
            <form className="contact__form" onSubmit={handleSubmit}>
              <h3 className="contact__form-title">Send us a message</h3>
              
              <div className="contact__form-group">
                <label htmlFor="name" className="contact__form-label">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="contact__form-input" 
                  placeholder="John Doe" 
                  value={formData.name}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="email" className="contact__form-label">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="contact__form-input" 
                  placeholder="john@example.com" 
                  value={formData.email}
                  onChange={handleChange}
                  required 
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="message" className="contact__form-label">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  className="contact__form-input contact__form-textarea" 
                  placeholder="How can we help you?" 
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required 
                />
                <input type="hidden" name="_captcha" value="false" />
              </div>

              <button 
                type="submit" 
                className="btn-primary contact__submit-btn"
                disabled={status === 'submitting' || status === 'success'}
              >
                {status === 'submitting' ? 'Sending...' : status === 'success' ? 'Message Sent' : 'Send Message'}
                {status === 'success' ? <CheckCircle /> : status === 'error' ? <AlertCircle /> : <Send />}
              </button>
              
              {status === 'error' && (
                <p className="contact__form-error">Something went wrong. Please try again.</p>
              )}
            </form>
          </ScrollReveal>
        </div>

        <footer className="contact__footer">
          <span className="contact__footer-text">
            &copy; 2025 Madrid Commercial Press. All rights reserved.
          </span>
          <span className="contact__footer-text">Crafted with precision.</span>
        </footer>
      </div>
    </section>
  );
}
