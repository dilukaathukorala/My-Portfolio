import Head from 'next/head';
import { useState } from 'react';
import '../styles/Contact.css'; // ✅ Global CSS import

export default function Contact() {
  const [sending, setSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);

    const form = e.currentTarget;
    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    const to = 'hello@junedisann.com';
    const subject = 'Portfolio Contact';
    const body = `Name: ${firstName} ${lastName}\r\nEmail: ${email}\r\n\r\n${message}`;

    const params = new URLSearchParams({ subject, body });
    window.location.href = `mailto:${to}?${params.toString()}`;

    setTimeout(() => setSending(false), 800);
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

      <section className="skills-section contact-section">
        <div className="contact-container">
          {/* Left Column */}
          <div className="contact-left">
            <div className="contact-icon" aria-hidden="true">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96071 18.7893 4.46957 19 5 19Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <div className="contact-info">
              <h3>Contact</h3>
              <h2>
                For commissions <br />
                and project inquiries, <br />
                please email:
              </h2>
              <a href="mailto:dilukaathukorala@gmail.com" className="contact-email">
                dilukaathukorala@gmail.com
              </a>
              <p className="contact-note">or Send a message via this form</p>
            </div>
          </div>

          {/* Right Column */}
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-field">
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    placeholder="First Name"
                    required
                  />
                </div>

                <div className="form-field">
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    placeholder="Last Name"
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email *"
                  required
                />
              </div>

              <div className="form-field">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write a message"
                  required
                />
              </div>

              <button className="btn-submit" type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Submit'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
