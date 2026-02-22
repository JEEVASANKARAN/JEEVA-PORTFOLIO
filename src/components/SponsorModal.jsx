import React, { useState, useRef } from 'react';
import { gsap } from 'gsap';
import './SponsorModal.css';

export default function SponsorModal({ onClose }) {
  const [form, setForm] = useState({ name: '', mail: '', description: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');
  const overlayRef = useRef(null);
  const cardRef = useRef(null);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.mail || !form.description) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      // Using mailto as a fallback (EmailJS or Formspree can be added)
      const subject = encodeURIComponent(`Sponsorship Inquiry from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.mail}\n\n${form.description}`);
      window.open(`mailto:s.jeevasankaran@gmail.com?subject=${subject}&body=${body}`, '_blank');
      setSent(true);
    } catch {
      setError('Failed to send. Please try emailing directly.');
    }
    setLoading(false);
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      // Shake card
      gsap.fromTo(cardRef.current, { x: -8 }, { x: 8, duration: 0.1, repeat: 4, yoyo: true, ease: 'none', onComplete: () => gsap.set(cardRef.current, { x: 0 }) });
    }
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-card" ref={cardRef}>
        <div className="modal-glow" />

        <button className="modal-close" onClick={onClose} aria-label="Close modal">✕</button>

        <div className="modal-header">
          <span className="modal-emoji">💜</span>
          <h2 className="modal-title">Become a Sponsor</h2>
          <p className="modal-subtitle">Support my open source work and help build impactful software.</p>
        </div>

        {sent ? (
          <div className="modal-success">
            <div className="success-icon">✅</div>
            <h3>Thank you for reaching out!</h3>
            <p>Your sponsorship inquiry has been sent. I'll get back to you shortly at <strong>{form.mail}</strong></p>
            <button className="modal-submit-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="modal-form" noValidate>
            <div className="modal-field">
              <label htmlFor="sponsor-name">Name <span className="required">*</span></label>
              <input id="sponsor-name" type="text" name="name" value={form.name} onChange={handleChange}
                placeholder="Your full name" autoComplete="name" required />
            </div>
            <div className="modal-field">
              <label htmlFor="sponsor-mail">Email <span className="required">*</span></label>
              <input id="sponsor-mail" type="email" name="mail" value={form.mail} onChange={handleChange}
                placeholder="your@email.com" autoComplete="email" required />
            </div>
            <div className="modal-field">
              <label htmlFor="sponsor-desc">Message <span className="required">*</span></label>
              <textarea id="sponsor-desc" name="description" value={form.description} onChange={handleChange}
                placeholder="Tell me about your sponsorship interest, or what you'd like to support..."
                rows={4} required />
            </div>
            {error && <p className="modal-error">{error}</p>}
            <button type="submit" className="modal-submit-btn" disabled={loading}>
              {loading ? 'Sending...' : 'Send Message 💜'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
