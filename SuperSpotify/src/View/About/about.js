import React from "react";
import "../../css/about.css";

function About() {
  return (
    <div className="about-container">
      {/* Header & App Goal */}
      <header className="about-header">
        <span className="badge">Project Overview</span>
        <h1>About The App</h1>
        <p className="app-goal">
          This application was engineered to provide a responsive, interactive media playback platform. By leveraging fluid UI state management, custom pure CSS animations, and RESTful backend integrations, the app demonstrates efficient API consumption, lightweight data handling, and modern UX design principles.
        </p>
      </header>

      <hr className="divider" />

      {/* Engineering Impact / Employer Highlights */}
      <section className="about-section">
        <h2>Engineering Impact Highlights</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <span className="metric-number">+23%</span>
            <span className="metric-label">E-Commerce Sales Growth via Web & Campaign Optimization</span>
          </div>
          <div className="metric-card">
            <span className="metric-number">+30%</span>
            <span className="metric-label">Increase in Online Platform Conversions & Donations</span>
          </div>
          <div className="metric-card">
            <span className="metric-number">+30%</span>
            <span className="metric-label">Improvement in Employee Resource Accessibility</span>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Tech Stack Breakdown */}
      <section className="about-section">
        <h2>Technologies & Architecture</h2>
        <div className="skills-grid">
          <div className="skill-card">
            <h3>Frontend & UI</h3>
            <p>React, JavaScript (ES6+), HTML5, Pure CSS Animations, Responsive Mobile Layouts</p>
          </div>
          <div className="skill-card">
            <h3>Backend & Services</h3>
            <p>Node.js, Express.js, RESTful API Development, JWT Authentication, JSON Payloads</p>
          </div>
          <div className="skill-card">
            <h3>Languages & Databases</h3>
            <p>Python, Swift, C#, PHP, SQL, Oracle Database, Google Firebase</p>
          </div>
          <div className="skill-card">
            <h3>Tools & Methodologies</h3>
            <p>Git, Rapid Prototyping, MapBox Geospatial Integration, Automated Testing (Mocha/Chai)</p>
          </div>
        </div>
      </section>

      <hr className="divider" />

      {/* Developer Profile & Education */}
      <section className="about-section developer-section">
        <h2>About the Developer</h2>
        <div className="developer-profile">
          <div className="developer-bio">
            <h3>Mekhi Brodie</h3>
            <p className="developer-title">Full Stack Software Engineer</p>
            <p className="bio-text">
              I am a creative, results-driven software engineer with expertise in React, Python, and full-stack development. I specialize in building scalable web and mobile applications, integrating complex APIs, and crafting intuitive user interfaces. With a strong track record of driving measurable business outcomes, I focus on combining robust backend collaboration with rapid frontend experimentation.
            </p>

            {/* Education & Credentials */}
            <div className="education-box">
              <h4>Education & Honors</h4>
              <p>
                <strong>University of Pennsylvania</strong> — Certification of Proficiency in Full-Stack Development (GPA: 3.8)
              </p>
              <p>
                <strong>Certifications:</strong> Rising Star Award
              </p>
            </div>
          </div>

          {/* Employer Contact Card */}
          <div className="contact-card">
            <h3>Contact Information</h3>
            <ul>
              <li>
                <strong>Location:</strong> Philadelphia, PA
              </li>
              <li>
                <strong>Phone:</strong> <a href="tel:2675060545">267-506-0545</a>
              </li>
              <li>
                <strong>Email:</strong>{" "}
                <a href="mailto:mekhi19132@gmail.com">mekhi19132@gmail.com</a>
              </li>
            </ul>
            <div className="cta-actions">
              <a href="mailto:mekhi19132@gmail.com" className="btn-primary">
                Get In Touch
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;