import BlogHeroSection from "@/components/BlogHeroSection";
import SiteFooter from "@/components/Footer";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <BlogHeroSection title="Terms and Conditions" isBreadCrumb={false} />
        <div className="bg-white py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-8">
                Welcome to our service! By accessing or using our services, you
                agree to comply with the following Terms and Conditions. Please
                read them carefully.
              </p>

              <section className="mb-8">
                <h2 className="text-heading4-medium">1. Acceptance of Terms</h2>
                <p>
                  By using our service, you acknowledge that you have read,
                  understood, and agreed to these Terms and Conditions. If you
                  do not agree, please do not use our services. These terms
                  constitute a legally binding agreement between you and our
                  company.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">2. Use of Services</h2>
                <p>
                  Our company provides services to individuals and businesses.
                  You agree to use our services only for lawful purposes and in
                  compliance with all applicable laws and regulations. You must
                  not misuse our services for fraudulent activities, spamming,
                  or any action that could harm the integrity of our platform.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  3. Account Registration
                </h2>
                <p>
                  To access certain features, you may be required to create an
                  account. You are responsible for maintaining the
                  confidentiality of your account credentials and for all
                  activities under your account. You agree to provide accurate
                  and up-to-date information during registration. We reserve the
                  right to suspend or terminate accounts that provide false or
                  misleading information.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  4. Payment and Subscription
                </h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Some features may require payment or a subscription plan.
                  </li>
                  <li>
                    Payments are processed securely, and all fees are
                    non-refundable unless stated otherwise.
                  </li>
                  <li>
                    We reserve the right to modify pricing at any time with
                    prior notice.
                  </li>
                  <li>
                    When you subscribe to a recurring payment plan, you
                    authorize us to charge your payment method automatically at
                    the beginning of each billing cycle until you cancel your
                    subscription.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  5. Prohibited Activities
                </h2>
                <p>You agree not to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Use our service for spamming, fraudulent, or illegal
                    activities.
                  </li>
                  <li>
                    Interfere with or disrupt our services, servers, or
                    networks.
                  </li>
                  <li>
                    Attempt to reverse-engineer, copy, or exploit any part of
                    our service for personal or commercial gain.
                  </li>
                  <li>Use automated scripts or bots to access our services.</li>
                  <li>
                    Violate any applicable laws or regulations related to data
                    privacy, security, or consumer rights.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  6. Data Security and Privacy
                </h2>
                <p>
                  We prioritize data security and privacy. By using our
                  services, you consent to our data practices outlined in our
                  Privacy Policy. We implement industry-standard measures to
                  protect your data, but we cannot guarantee absolute security.
                  You are responsible for safeguarding your account credentials
                  and ensuring secure use of our services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  7. Limitation of Liability
                </h2>
                <p>
                  Our service is provided as is without warranties of any kind.
                  We do not guarantee error-free or uninterrupted service. In no
                  event shall our company, its affiliates, employees, or
                  partners be liable for any direct, indirect, incidental,
                  special, or consequential damages resulting from the use of
                  our services, including but not limited to data loss, business
                  interruption, or financial losses.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">8. Termination</h2>
                <p>
                  We reserve the right to suspend or terminate your access to
                  our service at any time for violations of these terms or
                  misuse of our services. Upon termination, you must cease all
                  use of our service, and we may delete your account and
                  associated data.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">9. Changes to Terms</h2>
                <p>
                  We may update these Terms and Conditions periodically. It is
                  your responsibility to review these terms regularly. Continued
                  use of our services after changes take effect constitutes
                  acceptance of the updated terms. We will notify users of major
                  updates via email or on our platform.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default page;
