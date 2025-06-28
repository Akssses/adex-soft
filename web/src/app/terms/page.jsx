"use client";

import React from "react";
import s from "./page.module.scss";

export default function TermsOfService() {
  return (
    <>
      <main className={s.termsPage}>
        <div className="container">
          <article className={s.content}>
            <h1>Terms of Service — ADEX SOFT</h1>
            <div className={s.dates}>
              <p>Effective Date: 15/03/2024</p>
              <p>Last Updated: 15/03/2024</p>
            </div>

            <p className={s.intro}>
              Welcome to ADEX SOFT. By using our website{" "}
              <a href="https://adexsoft.co">https://adexsoft.co</a> and our
              services, you agree to these terms of service. Please read them
              carefully.
            </p>

            <section>
              <h2>1. Definitions</h2>
              <ul>
                <li>"We", "us", "our" refers to ADEX SOFT</li>
                <li>"Website" means the website adexsoft.co</li>
                <li>"Services" include all services provided by ADEX SOFT</li>
                <li>
                  "User", "you", "your" refers to any person using the Website
                  or Services
                </li>
                <li>"Content" means any materials posted on the Website</li>
              </ul>
            </section>

            <section>
              <h2>2. Acceptance of Terms</h2>
              <p>By using our Website and Services, you confirm that:</p>
              <ul>
                <li>You have read and understood these terms</li>
                <li>You agree to comply with them</li>
                <li>You are of legal age in your jurisdiction</li>
                <li>
                  You have the right to enter into legally binding agreements
                </li>
              </ul>
            </section>

            <section>
              <h2>3. Services</h2>
              <p>ADEX SOFT provides the following services:</p>
              <ul>
                <li>Development & Integration</li>
                <li>Tokenomics</li>
                <li>Telegram Mini Apps</li>
                <li>Web Development</li>
                <li>UX/UI Design</li>
                <li>DeFi Solutions</li>
                <li>Telegram Bots</li>
                <li>NFT & Metaverse</li>
              </ul>
              <p>
                We reserve the right to modify, suspend, or discontinue any of
                the Services without prior notice.
              </p>
            </section>

            <section>
              <h2>4. Intellectual Property</h2>
              <p>
                All content on the Website, including but not limited to text,
                images, logos, code, is the property of ADEX SOFT or is used
                with permission from the rights holders.
              </p>
              <p>You may not:</p>
              <ul>
                <li>Copy or distribute content without our permission</li>
                <li>Use our trademarks without approval</li>
                <li>Modify or create derivative works</li>
                <li>Use content for commercial purposes without a license</li>
              </ul>
            </section>

            <section>
              <h2>5. User Content</h2>
              <p>
                When providing us with any materials (text, images, files), you:
              </p>
              <ul>
                <li>Guarantee that you have the rights to use them</li>
                <li>Grant us a non-exclusive license to use them</li>
                <li>Agree that we may moderate the content</li>
                <li>Are responsible for the provided materials</li>
              </ul>
            </section>

            <section>
              <h2>6. Payment and Refunds</h2>
              <p>Payment terms:</p>
              <ul>
                <li>Prices are specified in the service agreement</li>
                <li>Payment is made according to the established schedule</li>
                <li>We accept payment through approved payment systems</li>
                <li>All prices may be changed with prior notice</li>
              </ul>
              <p>
                Refunds are considered individually according to the contract
                terms and applicable law.
              </p>
            </section>

            <section>
              <h2>7. Limitation of Liability</h2>
              <p>ADEX SOFT provides services "as is" and does not guarantee:</p>
              <ul>
                <li>Absence of technical issues</li>
                <li>Services meeting specific client objectives</li>
                <li>Error-free website operation</li>
                <li>Constant service availability</li>
              </ul>
              <p>
                We are not liable for indirect damages, lost profits, or data
                loss.
              </p>
            </section>

            <section>
              <h2>8. Privacy</h2>
              <p>
                Personal data processing is carried out according to our{" "}
                <a href="/privacy">Privacy Policy</a>. By using the Website and
                Services, you agree to the data processing terms.
              </p>
            </section>

            <section>
              <h2>9. Termination of Access</h2>
              <p>We reserve the right to:</p>
              <ul>
                <li>Refuse to provide services</li>
                <li>Terminate website access</li>
                <li>Terminate the contract for terms violation</li>
                <li>Remove any content without warning</li>
              </ul>
            </section>

            <section>
              <h2>10. Changes to Terms</h2>
              <p>
                We may modify these terms at any time. By continuing to use the
                Website after changes, you accept the new terms. We recommend
                checking this page periodically.
              </p>
            </section>

            <section>
              <h2>11. Applicable Law</h2>
              <p>
                These terms are governed by the laws of the Kyrgyz Republic. All
                disputes shall be resolved in the courts of the Kyrgyz Republic.
              </p>
            </section>

            <section>
              <h2>12. Contact</h2>
              <p>
                For questions related to the terms of service, please contact:
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
