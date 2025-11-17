// src/data/dnsSectionsData.ts

export interface SectionData {
  id: string;
  title: string;
  description: string;
  adLabel?: string;
  details: string[];
}

export const dnsSections: SectionData[] = [
  {
    id: "whois-lookup",
    title: "WHOIS Lookup",
    description:
      "Our WHOIS Lookup tool provides valuable information about domain ownership, registration details, and expiration dates. This is essential for verifying website legitimacy, investigating cyber threats, and managing domain portfolios.",
    adLabel: "Ad",
    details: [
      "Find domain ownership details and registrant contact info",
      "Check domain registration and expiration dates",
      "Identify domain registrars and administrative contacts",
      "Investigate suspicious or fraudulent domains",
      "Monitor your own domain portfolio for changes",
    ],
  },
  {
    id: "ping-test",
    title: "Ping Test",
    description:
      "The Ping Test tool allows you to measure how quickly a server responds to requests from your device. It helps you identify latency issues, packet drops, or server downtime.",
    adLabel: "Ad",
    details: [
      "Measure server response times accurately",
      "Identify latency or packet loss issues",
      "Troubleshoot slow connections or downtime",
      "Verify website and server availability",
      "Ensure network reliability across regions",
    ],
  },
  {
    id: "traceroute",
    title: "Traceroute",
    description:
      "Traceroute shows the exact path your data takes across the internet from your device to a destination server. It helps diagnose routing problems and optimize connectivity.",
    adLabel: "Ad",
    details: [
      "Trace the full path between your device and server",
      "Identify slow or failing nodes along the route",
      "Diagnose connectivity or routing issues",
      "Verify ISP and backbone network performance",
      "Optimize network paths for better reliability",
    ],
  },
];

// src/data/toolsData.ts

export interface Tool {
  id: number;
  title: string;
  description: string;
}

export const tools: Tool[] = [
  {
    id: 1,
    title: "IP Lookup",
    description: "Our IP Lookup tool provides in-depth details about any IP address...",
  },
  {
    id: 2,
    title: "WHOIS Lookup",
    description: "The WHOIS Lookup tool reveals the ownership details of a domain...",
  },
  {
    id: 3,
    title: "Ping Test",
    description: "The Ping Test tool allows you to measure how quickly a server...",
  },
  {
    id: 4,
    title: "Traceroute",
    description: "Traceroute shows the exact path your data takes across the...",
  },
  {
    id: 5,
    title: "SSL Checker",
    description: "The SSL Checker tool verifies whether your SSL certificate...",
  },
  {
    id: 6,
    title: "Email Blacklist Check",
    description: "Our Email Blacklist Check scans your domain and IP address...",
  },
];
