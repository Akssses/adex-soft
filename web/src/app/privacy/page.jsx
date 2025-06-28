"use client";

import React from "react";
import s from "./page.module.scss";

export default function PrivacyPolicy() {
  return (
    <>
      <main className={s.privacyPage}>
        <div className="container">
          <article className={s.content}>
            <h1>Privacy Policy — ADEX SOFT</h1>
            <div className={s.dates}>
              <p>Effective Date: 15/03/2024</p>
              <p>Last Updated: 15/03/2024</p>
            </div>

            <p className={s.intro}>
              ADEX SOFT respects your privacy and strives to protect the
              personal data you provide when using our website{" "}
              <a href="https://adexsoft.co">https://adexsoft.co</a>, our
              services, or during any interaction with our team.
            </p>

            <section>
              <h2>1. Who We Are</h2>
              <p>
                ADEX SOFT is a digital agency specializing in website
                development, Telegram Mini-apps, and Web3 solutions. In this
                policy, "we", "us", "our" refers to ADEX SOFT.
              </p>
            </section>

            <section>
              <h2>2. Data We Collect</h2>
              <h3>a) Personal data provided by you:</h3>
              <ul>
                <li>First and last name</li>
                <li>Email address</li>
                <li>Phone number</li>
                <li>Company name</li>
                <li>Content of inquiries, requests, messages</li>
                <li>Uploaded files (optional)</li>
              </ul>

              <h3>b) Automatically collected data:</h3>
              <ul>
                <li>IP address and approximate geolocation</li>
                <li>Browser type and version</li>
                <li>Device and operating system</li>
                <li>Website behavior (pages, clicks, scrolling, duration)</li>
                <li>Source of visit (referral URL)</li>
              </ul>

              <h3>c) Cookies and tracking:</h3>
              <p>We use cookies, pixels, and other technologies:</p>
              <ul>
                <li>to improve website functionality</li>
                <li>for analytics</li>
                <li>for personalized advertising</li>
                <li>
                  for retargeting (e.g., in Facebook/Instagram, Google Ads)
                </li>
              </ul>
            </section>

            <section>
              <h2>3. Purpose of Data Processing</h2>
              <p>We process your data to:</p>
              <ul>
                <li>
                  Respond to your inquiries and fulfill service obligations
                </li>
                <li>Improve our product and interface</li>
                <li>
                  Send notifications, news, and special offers (with your
                  consent)
                </li>
                <li>Conduct marketing analysis and advertising</li>
                <li>Comply with legal requirements</li>
              </ul>
            </section>

            <section>
              <h2>4. Legal Basis for Processing (GDPR)</h2>
              <p>Depending on the situation, we process your data based on:</p>
              <ul>
                <li>Consent (e.g., for newsletters)</li>
                <li>Contract (if you become our client)</li>
                <li>Legitimate interest (e.g., for website improvement)</li>
                <li>Legal obligations (e.g., accounting)</li>
              </ul>
            </section>

            <section>
              <h2>5. Who We May Share Data With</h2>
              <p>
                Your data is not sold to third parties. However, we may share it
                with:
              </p>
              <ul>
                <li>Contractors (developers, marketers, designers)</li>
                <li>
                  Third-party services (Google Analytics, Meta Ads, Telegram
                  WebApp)
                </li>
                <li>Payment systems (e.g., Stripe, YooKassa)</li>
                <li>Legal authorities — upon official request</li>
              </ul>
              <p>
                All partners are required to maintain confidentiality and data
                protection measures.
              </p>
            </section>

            <section>
              <h2>6. International Data Transfer</h2>
              <p>
                If you are outside the hosting country, your information may be
                transferred and processed in other countries. We take measures
                to protect data under standard contractual clauses (SCCs) and
                other mechanisms.
              </p>
            </section>

            <section>
              <h2>7. Data Retention Period</h2>
              <p>We retain data:</p>
              <ul>
                <li>
                  for as long as necessary for the purposes for which it was
                  collected
                </li>
                <li>
                  or within the timeframes required by law (e.g., tax data)
                </li>
              </ul>
              <p>
                After the retention period, data will be deleted or anonymized.
              </p>
            </section>

            <section>
              <h2>8. Your Rights</h2>
              <p>
                In accordance with applicable laws (GDPR, Personal Data Laws of
                RF and KR), you have the right to:
              </p>
              <ul>
                <li>Access your data</li>
                <li>Correct or update data</li>
                <li>Delete your data (right to be "forgotten")</li>
                <li>Restrict or object to processing</li>
                <li>Transfer your data to another service</li>
                <li>Withdraw consent at any time</li>
                <li>File a complaint with a supervisory authority</li>
              </ul>
              <p>
                To exercise your rights — contact us:{" "}
                <a href="mailto:info@adexsoft.co">info@adexsoft.co</a>
              </p>
            </section>

            <section>
              <h2>9. Data Security</h2>
              <p>
                We implement technical and organizational security measures:
              </p>
              <ul>
                <li>Use secure connection (HTTPS, SSL/TLS)</li>
                <li>Limit employee access to data</li>
                <li>Conduct regular security checks</li>
                <li>Store data on secure servers</li>
              </ul>
              <p>
                However, no method of data transmission over the internet can be
                absolutely secure. We do everything possible to minimize risks.
              </p>
            </section>

            <section>
              <h2>10. Links to Third-Party Resources</h2>
              <p>
                Our website may contain links to other websites or services. We
                are not responsible for the privacy policies of these resources.
                We recommend reviewing their terms separately.
              </p>
            </section>

            <section>
              <h2>11. Changes to Privacy Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will
                notify you of any significant changes by posting a notice on our
                website or sending you an email.
              </p>
            </section>

            <section>
              <h2>12. Contact Us</h2>
              <p>
                If you have any questions about this privacy policy or how we
                handle your data, please contact us:
              </p>
              <address className={s.contacts}>
                <p>
                  <strong>ADEX SOFT</strong>
                </p>
                <p>📍 Bishkek, Kyrgyzstan</p>
                <p>
                  📧 <a href="mailto:info@adexsoft.co">info@adexsoft.co</a>
                </p>
                <p>
                  🌐 <a href="https://adexsoft.co">https://adexsoft.co</a>
                </p>
              </address>
            </section>
          </article>
        </div>
      </main>
    </>
  );
}
