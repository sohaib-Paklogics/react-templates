import BlogHeroSection from "@/components/BlogHeroSection";
import SiteFooter from "@/components/Footer";
import React from "react";

const page = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <BlogHeroSection title="Privacy Policy" />

        {/* Main content */}
        <div className="bg-white py-10">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 mb-8">
                At YourBrand, we are committed to protecting your privacy. This
                Privacy Policy outlines how we collect, use, and safeguard your
                personal information when you use our email verification
                services.
              </p>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  1. Information We Collect
                </h2>
                <p>
                  We collect different types of information to provide and
                  improve our services, including:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Personal Information: Name, email address, and payment
                    details when you register or subscribe.
                  </li>
                  <li>Email Data: Email lists you upload for verification.</li>
                  <li>
                    Usage Information: IP address, browser type, and device
                    information for security and analytics.
                  </li>
                  <li>
                    Cookies and Tracking Technologies: To enhance user
                    experience and monitor website performance.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  2. How We Use Your Information
                </h2>
                <p>We use collected data for:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Providing and improving our email verification services.
                  </li>
                  <li>Processing transactions and managing subscriptions.</li>
                  <li>
                    Communicating updates, service-related messages, and
                    marketing offers (if opted in).
                  </li>
                  <li>
                    Ensuring security, fraud prevention, and legal compliance.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  3. Data Protection and Security
                </h2>
                <p>
                  We implement industry-standard security measures to protect
                  your data. While we strive to secure your information, no
                  method is 100% foolproof. You are responsible for maintaining
                  the confidentiality of your account credentials.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  4. Sharing Your Information
                </h2>
                <p>
                  We do not sell or rent your personal data. However, we may
                  share information with:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>
                    Service Providers: Third-party vendors assisting with
                    payment processing, analytics, or customer support.
                  </li>
                  <li>
                    Legal Authorities: If required by law, to protect rights,
                    prevent fraud, or ensure security.
                  </li>
                  <li>
                    Business Transfers: In case of mergers, acquisitions, or
                    business restructuring.
                  </li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  5. Your Rights and Choices
                </h2>
                <p>You have the right to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Access, update, or delete your personal information.</li>
                  <li>Opt-out of marketing emails at any time.</li>
                  <li>Request data portability where applicable.</li>
                  <li>Disable cookies via browser settings.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  6. Data Retention
                </h2>
                <p>
                  We retain your data only as long as necessary to provide our
                  services and comply with legal obligations. You may request
                  data deletion by contacting us.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  7. Third-Party Links
                </h2>
                <p>
                  Our website may contain links to external sites. We are not
                  responsible for their privacy practices and encourage
                  reviewing their policies.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-heading4-medium">
                  8. Changes to This Policy
                </h2>
                <p>
                  We may update this Privacy Policy periodically. Changes will
                  be posted on this page, and significant updates may be
                  communicated via email.
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
