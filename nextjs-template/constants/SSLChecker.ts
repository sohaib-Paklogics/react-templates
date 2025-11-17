// src/data/sslCheckerData.ts

export interface Section {
  id: string;
  title: string;
  highlight?: string;
  description?: string[];
  list?: string[];
  orderedList?: string[];
}

export const sslCheckerSections: Section[] = [
  {
    id: "intro",
    title: "SSL Certificate Checker",
    highlight: "SSL Certificate",
    description: [
      "SSL Certificate Checker enables you to verify instantly whether the details of SSL certificates on your website are valid.",
      "By using this tool, you can check the validity of SSL certificates, detect issues with misconfigured browsers or expired SSL certificates. Every website should have an installed and correctly working SSL certificate to ensure secure communications.",
      "Simply enter a domain name, and in a few seconds, SSL Certificate Checker will show you whether SSL is properly installed, valid, trusted, and not expired."
    ]
  },
  {
    id: "why",
    title: "Why Use Our SSL Checker?",
    highlight: "SSL Checker",
    description: [
      "When your SSL certificate isn’t working correctly, it can lead to “HTTPS not secure” errors, SSL/TLS handshake failures, and “invalid certificate” warnings. Such issues can negatively impact domain trust and lead customers to leave your site.",
      "SSL Checker ensures that your SSL certificates are installed properly and remain valid, so that companies can detect configuration issues, certification expiration dates, and browser incompatibility in advance."
    ]
  },
  {
    id: "info",
    title: "What Information Does the SSL Checker Provide?",
    highlight: "SSL Checker",
    description: [
      "When you use our SSL Checker tool, you will receive a detailed breakdown including:"
    ],
    list: [
      "Certificate Common Name (CN)",
      "Issuer Information",
      "Certificate Chain & Validation",
      "Certificate Type (DV, OV, EV)",
      "Key Length & Signature Algorithm",
      "Serial Number",
      "Validity Dates (Valid From / Valid To)",
      "Certificate Fingerprints"
    ]
  },
  {
    id: "understanding",
    title: "Understanding SSL Certificates and SSL Chains",
    highlight: "SSL Certificates and SSL Chains",
    description: [
      "SSL Certificates are small data files that bind a cryptographic key to your organization’s details, enabling secure connections between servers and browsers. SSL/TLS ensures data transmitted between your site and its visitors stays private and unmodified.",
      "The SSL chain of trust is critical to validating certificate authenticity — from the end-entity certificate to the root CA. When you run an SSL check, this helps confirm whether the certificate links to the full chain, ensuring trust in the identity of your website."
    ]
  },
  {
    id: "faqs",
    title: "FAQs",
    description: [
      "Without using SSL, will my website be marked insecure?",
      "Yes. Modern browsers like Chrome, Firefox, and Edge show warnings for sites not providing HTTPS connections. Without SSL, your site could lose visitors.",
      "How do I renew my SSL certificate?",
      "For example, if purchased, can SSL certificates be refunded?",
      "In most cases, SSL certificates cannot be refunded after issuance. Some providers may offer partial refunds if a certificate hasn’t yet been issued."
    ],
    orderedList: [
      "Generate a Certificate Signing Request (CSR) file.",
      "Submit the CSR to a Certificate Authority.",
      "Install the renewed SSL certificate through your hosting provider."
    ]
  }
];
