'use client';

import Head from 'next/head';
import { useEffect, useMemo, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../styles/Contact.css';
import SocialMedia from './SocialMedia';

// 🔑 Replace with your actual EmailJS credentials
const SERVICE_ID = 'service_qkk0rka';
const TEMPLATE_ID = 'template_3aoha0s';
const PUBLIC_KEY  = '7G3Rj0qmx-_SFLZSJ';

// Country code options
const COUNTRY_CODES = [
  { code: '+1',  label: '🇺🇸 USA/Canada (+1)' },
  { code: '+44', label: '🇬🇧 UK (+44)' },
  { code: '+61', label: '🇦🇺 Australia (+61)' },
  { code: '+81', label: '🇯🇵 Japan (+81)' },
  { code: '+91', label: '🇮🇳 India (+91)' },
  { code: '+94', label: '🇱🇰 Sri Lanka (+94)' },
  { code: '+33', label: '🇫🇷 France (+33)' },
  { code: '+34', label: '🇪🇸 Spain (+34)' },
  { code: '+39', label: '🇮🇹 Italy (+39)' },
  { code: '+49', label: '🇩🇪 Germany (+49)' },
];

// 📏 Per-country phone digit rules (without country code)
const PHONE_RULES = {
  '+1':  { min: 10, max: 10 },
  '+44': { min: 10, max: 10 },
  '+61': { min:  9, max:  9 },
  '+81': { min: 10, max: 10 },
  '+91': { min: 10, max: 10 },
  '+94': { min:  9, max:  9 },
  '+33': { min:  9, max:  9 },
  '+34': { min:  9, max:  9 },
  '+39': { min:  9, max: 10 },
  '+49': { min:  7, max: 11 },
};

function lengthText({ min, max }) {
  return min === max ? `${min} digits` : `${min}–${max} digits`;
}
function makeDigitsRegex({ min, max }) {
  return new RegExp(`^\\d{${min === max ? `${min}` : `${min},${max}`}}$`);
}

export default function Contact() {
  const [sending, setSending] = useState(false);
  const [status, setStatus]   = useState(null);
  const [copied, setCopied]   = useState(false);

  // Start with NO selection
  const [countryCode, setCountryCode] = useState('');
  const rule = useMemo(
    () => (countryCode ? (PHONE_RULES[countryCode] ?? { min: 7, max: 15 }) : null),
    [countryCode]
  );

  const phonePattern = useMemo(
    () => (rule ? makeDigitsRegex(rule).source : '\\d*'),
    [rule]
  );
  const phonePlaceholder = useMemo(
    () => (rule ? (rule.min === rule.max ? `${rule.min} digits` : `${rule.min}-${rule.max} digits`) : 'Select country first'),
    [rule]
  );

  useEffect(() => {
    try { emailjs.init(PUBLIC_KEY); }
    catch (e) { console.error('EmailJS init error:', e); }
  }, []);

  const validateForm = ({ firstName, lastName, email, countryCode, phoneDigits, message }) => {
    const errs = [];
    if (!firstName || !/^[A-Za-z\s]{3,}$/.test(firstName)) errs.push('First name must be at least 3 letters (A–Z).');
    if (!lastName  || !/^[A-Za-z\s]{3,}$/.test(lastName))  errs.push('Last name must be at least 3 letters (A–Z).');
    if (!/^[^\s@]+@gmail\.com$/i.test(email)) errs.push('Email must be a valid Gmail address (e.g. yourname@gmail.com).');

    if (!countryCode) {
      errs.push('Please select a country code.');
    } else if (!/^\+\d{1,3}$/.test(countryCode)) {
      errs.push('Please select a valid country code (e.g. +94).');
    }

    if (countryCode) {
      const r  = PHONE_RULES[countryCode] ?? { min: 7, max: 15 };
      const rx = makeDigitsRegex(r);
      if (!rx.test(phoneDigits)) {
        errs.push(`Phone number must contain ${lengthText(r)} (digits only) for the selected country.`);
      }
    }

    if (!message || message.trim().length < 10) errs.push('Message must be at least 10 characters.');
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const form        = e.currentTarget;
    const firstName   = form.firstName.value.trim();
    const lastName    = form.lastName.value.trim();
    const email       = form.email.value.trim();
    const cc          = form.countryCode.value;
    const phoneDigits = form.phoneDigits.value.trim();
    const message     = form.message.value.trim();

    const errors = validateForm({ firstName, lastName, email, countryCode: cc, phoneDigits, message });
    if (errors.length) {
      setStatus({ type: 'form-error', msgs: errors });
      setSending(false);
      return;
    }

    const phone = `${cc}${phoneDigits}`;

    try {
      const res = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { firstName, lastName, email, phone, message }
      );
      if (res.status !== 200) throw new Error(`Unexpected status: ${res.status}`);

      setStatus({ type: 'success', msgs: ['Message sent! Diluka will get back to you soon.'] });
      form.reset();
      // keep the chosen country in state (select resets with the form)
      setCountryCode(cc);
    } catch (err) {
      console.error('EmailJS internal error:', err);
      setStatus({ type: 'system-error', msgs: ['System error. Please try again later.'] });
    } finally {
      setSending(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('dilukaathukorala@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          {/* =========================== */}
          {/* Left Column with Animation  */}
          {/* =========================== */}
          <div className="contact-left">
            <div className="contact-icon" aria-hidden="true">
              {/* Mail → Paper-Plane animation (preserved) */}
              <svg
                className="mail-rocket-anim"
                width="96"
                height="96"
                viewBox="0 0 100 100"
                xmlns="http://www.w3.org/2000/svg"
                role="img"
                aria-label="Sending message animation"
              >
                <g
                  className="mail-group"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path
                    className="mail-path mail-outer"
                    d="M15 30 h70 a5 5 0 0 1 5 5 v30 a5 5 0 0 1 -5 5 h-70 a5 5 0 0 1 -5 -5 v-30 a5 5 0 0 1 5 -5 z"
                  />
                  <path className="mail-path mail-flap" d="M15 32 L50 55 L85 32" />
                  <path className="mail-path mail-inner" d="M15 70 L42 50" />
                  <path className="mail-path mail-inner" d="M85 70 L58 50" />
                </g>
                <g
                  className="rocket-group"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M18 60 L86 35 L18 20 L32 38 L60 35 L32 42 Z" />
                  <path d="M32 38 L32 42 L45 41" />
                  <path className="rocket-trail" d="M24 64 Q36 58 50 54" />
                </g>
              </svg>
            </div>

            <div className="contact-info">
              <h3>Contact</h3>
              <h2>
                Prefer sending a detailed email with attachments? Reach me directly at:
              </h2>

              {/* Email + Copy button */}
              <div className="email-row">
                <a
                  href="mailto:dilukaathukorala@gmail.com"
                  className="contact-email"
                >
                  dilukaathukorala@gmail.com
                </a>

                <button
                  type="button"
                  className={`copy-btn ${copied ? 'copied' : ''}`}
                  onClick={handleCopyEmail}
                  aria-label={copied ? 'Copied' : 'Copy email'}
                  title={copied ? 'Copied' : 'Copy email'}
                >
                  {copied ? '✔' : '📋'}
                </button>
              </div>

              <p className="contact-note">or Send a message via this form</p>
            </div>
          </div>

          {/* =========================== */}
          {/* Right Column (Form)         */}
          {/* =========================== */}
          <div className="contact-right">
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
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
                  placeholder="Email (must be Gmail)"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-field">
                  <select
                    id="countryCode"
                    name="countryCode"
                    className="country-select"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    required
                  >
                    <option value="" disabled hidden>
                      Select country code ▼
                    </option>
                    {COUNTRY_CODES.map((c) => (
                      <option key={c.code} value={c.code}>
                        {c.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-field">
                  <input
                    id="phoneDigits"
                    name="phoneDigits"
                    type="tel"
                    placeholder={phonePlaceholder}
                    inputMode="numeric"
                    pattern={phonePattern}
                    maxLength={rule ? rule.max : undefined}
                    disabled={!countryCode}
                    required
                  />
                </div>
              </div>

              <div className="form-field">
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  placeholder="Write a message (min 10 characters)"
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

      {status && (
        <div className="status-overlay">
          <div
            className={`status-modal ${
              status.type === 'success' ? 'success' :
              status.type === 'form-error' ? 'error' : 'error'
            }`}
          >
            <button
              className="close-btn"
              onClick={() => setStatus(null)}
              aria-label="Close message"
            >
              ✖
            </button>
            <h3>
              {status.type === 'success'
                ? 'Success'
                : status.type === 'form-error'
                ? 'Please fix these errors'
                : 'System Error'}
            </h3>
            {status.msgs.length === 1 ? (
              <p>{status.msgs[0]}</p>
            ) : (
              <ul>
                {status.msgs.map((m, i) => (
                  <li key={i}>{m}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
      <SocialMedia />
    </>
  );
}
