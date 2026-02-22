import React from 'react';
import FadeContent from './FadeContent';
import ShinyText from './ShinyText';
import './About.css';

export default function About() {
  return (
    <div className="about-section" id="about-detail">
      <div className="about-inner section-container">
        <FadeContent blur duration={900}>
          <h2 className="about-section-title">About Me</h2>
        </FadeContent>

        <div className="about-grid">
          <FadeContent blur duration={1000} delay={100}>
            <div className="about-card">
              <div className="about-card-icon">🚀</div>
              <h3>Backend Excellence</h3>
              <p>Deep expertise in Java, Spring Boot, Hibernate — building robust, secure, and performant APIs and microservices.</p>
            </div>
          </FadeContent>
          <FadeContent blur duration={1000} delay={200}>
            <div className="about-card">
              <div className="about-card-icon">⚡</div>
              <h3>Frontend Craft</h3>
              <p>Modern React development with clean component architecture, state management, and pixel-perfect UIs.</p>
            </div>
          </FadeContent>
          <FadeContent blur duration={1000} delay={300}>
            <div className="about-card">
              <div className="about-card-icon">☁️</div>
              <h3>DevOps & Cloud</h3>
              <p>Docker, Kubernetes, AWS — containerizing and deploying scalable systems to production with CI/CD pipelines.</p>
            </div>
          </FadeContent>
          <FadeContent blur duration={1000} delay={400}>
            <div className="about-card">
              <div className="about-card-icon">🤖</div>
              <h3>AI Integration</h3>
              <p>Integrating GenAI tools (OpenAI, Claude) into products — building intelligent, LLM-powered systems.</p>
            </div>
          </FadeContent>
        </div>
      </div>
    </div>
  );
}
