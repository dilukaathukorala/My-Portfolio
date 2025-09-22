// pages/Contact.js
import Head from 'next/head';
import { useState } from 'react';

export default function Contact() {
  const [sending, setSending] = useState(false);

  // Simple "mailto" submit—opens the user's email client
  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim() || 'Portfolio Contact';
    const message = form.message.value.trim();

    // CHANGE THIS to your real inbox
    const to = 'your.email@example.com';

    const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(
      message
    )}`;

    const mailto = `mailto:${to}?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;

    // Open the user's email client
    window.location.href = mailto;
    setTimeout(() => setSending(false), 800); // reset the button state
  };

  return (
    <>
      <Head>
        <title>Contact | Portfolio</title>
        <meta
          name="description"
          content="Get in touch for collaborations, opportunities, or a friendly hello."
        />
      </Head>

      {/* Reuse your skills page gradient */}
      <section className="skills-section contact-section">
        <div className="contact-card">
          <h1 className="contact-title">Let’s work together</h1>
          <p className="contact-subtitle">
            Have a project or idea in mind? Drop a message and I’ll get back to you.
          </p>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-grid">
              <div className="form-field">
                <label htmlFor="name">Name</label>
                <input id="name" name="name" type="text" placeholder="Your name" required />
              </div>

              <div className="form-field">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="subject">Subject</label>
              <input id="subject" name="subject" type="text" placeholder="What’s this about?" />
            </div>

            <div className="form-field">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                rows="6"
                placeholder="Tell me a bit about your project..."
                required
              />
            </div>

            <button className="btn-submit" type="submit" disabled={sending}>
              {sending ? 'Opening mail app…' : 'Send Message'}
            </button>
          </form>

          <div className="contact-aside">
            {/* UPDATE these with your real profiles */}
            <a href="mailto:your.email@example.com" className="contact-link">your.email@example.com</a>
            <div className="contact-socials">
              <a href="https://github.com/yourhandle" target="_blank" rel="noreferrer">GitHub</a>
              <a href="https://www.linkedin.com/in/yourhandle" target="_blank" rel="noreferrer">LinkedIn</a>
              <a href="https://x.com/yourhandle" target="_blank" rel="noreferrer">X</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
