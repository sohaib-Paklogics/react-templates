// src/data/MockData.ts

export interface IpInfo {
  [key: string]: string | number;
}

const ipInfo: IpInfo = {
  "IP Address": "58.65.223.103",
  "ISP": "Broadband Services",
  "Connection Speed": "(DSL) Broadband/Cable/Fiber",
  "City": "Faisalabad",
  "Country": "Pakistan",
  "State": "Punjab",
  "Latitude": "31.418557",
  "Longitude": "73.079529",
  "Time Zone": "UTC +05:00",
  "Local Time": "01 Sep, 2025 09:05 PM",
  "Proxy": "No",
  "Proxy Provider": "-",
  "Fraud Score": "0",
  "Address Type": "(A) Unicast",
  "District": "Faisalabad District",
  "ZIP Code": "48101",
  "Area Code": "041",
  "IDD Code": "92",
  "Weather Station": "Faisalabad [PKXX0005]",
  "Usage Type": "(ISP) Fixed Line ISP",
  "Domain Name": "spectrumet.net [WHOIS spectrumet.net]",
  "Mobile MNC": "-",
  "Mobile MCC": "-",
  "Mobile Brand": "-",
  "Elevation": "186 meters",
  "ASN Number": "9541",
  "ASN Name": "Cyber Internet Services (Private) Limited",
  "Category": "(AS19-18) Internet Technology",
  "Hosted Domain": "-"
};

export default ipInfo;
export const ipDetails = {
  ip: "58.65.223.103",
  country: "Pakistan",
  state: "Punjab",
  city: "Faisalabad",
  isp: "Broadband Services",
};

export const browserInfo = {
  "User Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.3 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36",
  Referrer: "https://www.ipaddress.my/",
  Device: "Desktop",
  "Operating System": "Win10",
  Architecture: "64 bits",
  Browser: "Chrome Generic",
};

export const countryInfo = {
  Country: "Pakistan",
  Capital: "Islamabad",
  Continent: "Asia",
  Population: "184,404,791",
  Area: "803,940 km²",
  Currency: "(PKR) Rupee",
  "Top Level Domain": ".pk",
};

// src/data/sslData.ts
export type KV = {
  label: string;
  value: string;
};

export interface SSLCertExamination {
  rows: KV[];
}

export interface SSLChain {
  commonName: string;
  rows: KV[];
  publicKeyUrl?: string;
  pemUrl?: string;
}

export interface SSLPageData {
  examination: SSLCertExamination;
  chain: SSLChain[];
}

export const sslSampleData: SSLPageData = {
  examination: {
    rows: [
      { label: "Host", value: "paklogics.com" },
      { label: "URL", value: "http://paklogics.com" },
      { label: "Issued For", value: "*.paklogics.com" },
      { label: "Issued By", value: "Let's Encrypt (R11)" },
      { label: "SSL Compression", value: "SSL Compression disabled." },
      { label: "SSL Chain Validation", value: "Successfully validated certificate chain." },
    ],
  },
  chain: [
    {
      commonName: "*.paklogics.com",
      rows: [
        { label: "Issued For", value: "*.paklogics.com" },
        { label: "Issued By", value: "Let's Encrypt US (R11)" },
        { label: "Signature Algorithm", value: "RSA SHA256" },
        { label: "Version", value: "3" },
        { label: "Valid From", value: "08 Aug 2025 02:14:17 +0000" },
        { label: "Valid To", value: "06 Nov 2025 02:14:16 +0000" },
        { label: "Validity (Total)", value: "89 days" },
        { label: "Validity (Remaining)", value: "62 days" },
        { label: "Serial Number", value: "0a6721acdfb14a848fbc42398f6f132b" },
        {
          label: "Hash",
          value: `0: af0720c5dfae47131d9728db107911
1: 16106b5a82a7028090b87737fcd7015aa51e7d5
2: 3150b5c816a1a6cfaa1e9a3819a6474e778e57f5c56e592fff583a86
3: 7db27332a3a05d9613ef1b9e19e34e42b8ac15aaf171cc87c51c3a5579f3daa95d516ae13f13255ee40
4: 429fda47113867b90b616a6e53a41e5ab3e7c77ed7aad82782e3467493278d8f4d65dcbad8b670b247f36d6a905b8ab34bb15249f7024b6da`,
        },
      ],
      publicKeyUrl: "#",
      pemUrl: "#",
    },
    {
      commonName: "R11",
      rows: [
        { label: "Issued For", value: "Let's Encrypt US (R11)" },
        { label: "Issued By", value: "Internet Security Research Group, US (ISRG Root X1)" },
        { label: "Signature Algorithm", value: "RSA SHA256" },
        { label: "Version", value: "2" },
        { label: "Valid From", value: "13 Mar 2024 00:00:00 +0000" },
        { label: "Valid To", value: "12 Mar 2027 23:59:59 +0000" },
        { label: "Validity (Total)", value: "1093 days" },
        { label: "Validity (Remaining)", value: "552 days" },
        { label: "Serial Number", value: "0a87ad1b3e2f03f28b62d076b3f84f8" },
        {
          label: "Hash",
          value: `0: 2fac0455314474a5d49fb4eba3c4fa3
1: 696bab31dfc176e5c5a2d925fc7b3d24dac7c
2: 591e5c8e86cdd3a07a51b4e773b298c2269176ddc79521136f1024ae13a44
3: 0ecfb14058a9ebf8686c1c492f791591b5295e1266b28f1d27bb3110bdefd47de87c508f23a7ad3151e
4: 429fda47113867b90b616a6e53a41e5ab3e7c77ed7aad82782e3467493278d8f4d65dcbad8b670b247f36d6a905b8ab34bb15249f7024b6da`,
        },
      ],
      publicKeyUrl: "#",
      pemUrl: "#",
    },
  ],
};

// src/data/dnsData.ts

export interface DNSLocation {
  id: number;
  country: string;
  city: string;
  flagUrl: string;
  status: "success" | "fail" | "pending";
}

export const dnsLocations: DNSLocation[] = [
  { id: 1, country: "United States", city: "Los Angeles, CA", flagUrl: "https://flagcdn.com/w20/us.png", status: "success" },
  { id: 2, country: "United States", city: "New York, NY", flagUrl: "https://flagcdn.com/w20/us.png", status: "success" },
  { id: 3, country: "United States", city: "Seattle, WA", flagUrl: "https://flagcdn.com/w20/us.png", status: "success" },
  { id: 4, country: "Canada", city: "Toronto, Ontario", flagUrl: "https://flagcdn.com/w20/ca.png", status: "success" },
  { id: 5, country: "Canada", city: "Montreal, Quebec", flagUrl: "https://flagcdn.com/w20/ca.png", status: "success" },
  { id: 6, country: "United Kingdom", city: "London", flagUrl: "https://flagcdn.com/w20/gb.png", status: "success" },
  { id: 7, country: "Germany", city: "Berlin", flagUrl: "https://flagcdn.com/w20/de.png", status: "success" },
  { id: 8, country: "Mexico", city: "Monterrey", flagUrl: "https://flagcdn.com/w20/mx.png", status: "success" },
  { id: 9, country: "Brazil", city: "São Paulo", flagUrl: "https://flagcdn.com/w20/br.png", status: "success" },
  { id: 10, country: "Australia", city: "Sydney", flagUrl: "https://flagcdn.com/w20/au.png", status: "success" },
  { id: 11, country: "New Zealand", city: "Auckland", flagUrl: "https://flagcdn.com/w20/nz.png", status: "success" },
  { id: 12, country: "South Africa", city: "Johannesburg", flagUrl: "https://flagcdn.com/w20/za.png", status: "success" },
  { id: 13, country: "India", city: "Mumbai", flagUrl: "https://flagcdn.com/w20/in.png", status: "success" },
  { id: 14, country: "Bangladesh", city: "Dhaka", flagUrl: "https://flagcdn.com/w20/bd.png", status: "success" },

  // 🌍 More Locations Added
  { id: 15, country: "France", city: "Paris", flagUrl: "https://flagcdn.com/w20/fr.png", status: "success" },
  { id: 16, country: "Italy", city: "Rome", flagUrl: "https://flagcdn.com/w20/it.png", status: "success" },
  { id: 17, country: "Spain", city: "Madrid", flagUrl: "https://flagcdn.com/w20/es.png", status: "success" },
  { id: 18, country: "Netherlands", city: "Amsterdam", flagUrl: "https://flagcdn.com/w20/nl.png", status: "success" },
  { id: 19, country: "Sweden", city: "Stockholm", flagUrl: "https://flagcdn.com/w20/se.png", status: "success" },
  { id: 20, country: "Japan", city: "Tokyo", flagUrl: "https://flagcdn.com/w20/jp.png", status: "success" },
  { id: 21, country: "China", city: "Beijing", flagUrl: "https://flagcdn.com/w20/cn.png", status: "success" },
  { id: 22, country: "Singapore", city: "Singapore", flagUrl: "https://flagcdn.com/w20/sg.png", status: "success" },
  { id: 23, country: "United Arab Emirates", city: "Dubai", flagUrl: "https://flagcdn.com/w20/ae.png", status: "success" },
  { id: 24, country: "Turkey", city: "Istanbul", flagUrl: "https://flagcdn.com/w20/tr.png", status: "success" },
  { id: 25, country: "Russia", city: "Moscow", flagUrl: "https://flagcdn.com/w20/ru.png", status: "success" },
];

//aboutus page
export interface Feature {
  id: number;
  title: string;
  description: string;
  icon: string;
   // can be a lucide-react icon name or URL
}

export const features: Feature[] = [
  {
    id: 1,
    title: "Fast & Efficient",
    description:
      "All our tools run entirely in your browser for instant results. No waiting for server processing or slow API calls.",
    icon: "search",
  },
  {
    id: 2,
    title: "Privacy Focused",
    description:
      "Your data never leaves your device. We don't store, track, or analyze your content. Complete privacy guaranteed.",
    icon: "search",
  },
  {
    id: 3,
    title: "User Centered",
    description:
      "Built based on real user needs and feedback. We continuously improve our tools to serve you better.",
    icon: "search",
  },
  {
    id: 4,
    title: "Always Free",
    description:
      "All tools are completely free to use for personal and commercial projects. No hidden fees or premium restrictions.",
    icon: "search",
  },
  {
    id: 5,
    title: "Always Free",
    description:
      "All tools are completely free to use for personal and commercial projects. No hidden fees or premium restrictions.",
    icon: "search",
  },
  {
    id: 6,
    title: "Always Free",
    description:
      "All tools are completely free to use for personal and commercial projects. No hidden fees or premium restrictions.",
    icon: "search",
  },
];
//utilities 

export type UtilityFeature = {
  id: number;
  title: string;
  description: string;
  category: string;
};

export const utilityfeatures: UtilityFeature[] = [
  { id: 1, title: "SEO Analyzer", description: "Analyze your site’s SEO instantly.", category: "SEO" },
  { id: 2, title: "Text Formatter", description: "Format and clean up your text easily.", category: "Text" },
  { id: 3, title: "Image Optimizer", description: "Compress and optimize images for the web.", category: "Image" },
  { id: 4, title: "Code Minifier", description: "Minify your CSS and JS files.", category: "Developer" },
  { id: 5, title: "Meta Tag Generator", description: "Create SEO-friendly meta tags.", category: "Website" },
  { id: 6, title: "Unit Converter", description: "Convert values across units easily.", category: "Utilities" },
];



// src/components/data/utilityTools.ts


export type Tool = {
  id: number;
  title: string;
  description: string;
  category: "SEO" | "Text" | "Image" | "Developer" | "Website" | "Utilities"; // 🔒 restricts allowed categories
  image: string; // icon or image path
  tags: string[];
  url: string; // link for "Use Tool"
};

export const toolsData: Tool[] = [
  {
    id: 1,
    title: "Global DNS Lookup",
    description: "Quickly check DNS records worldwide from multiple locations.",
    category: "SEO",
    image: "/search.svg",
    tags: ["content", "orginaality", "duplicate"],
    url: "/global-DNS",
  },
  {
    id: 2,
    title: "SSL Certificate Check",
    description: "Verify SSL status, expiry, and configuration",
    category: "Text",
    image: "/certificate.svg",
    tags: ["words", "characters", "count"],
    url: "/ssl-checker",
  },
  {
    id: 3,
    title: "AI Content Detection",
    description: "Analyze page load times and performance.",
    category: "Website",
    image: "/website.svg",
    tags: ["keywords", "seo", "density"],
    url: "/aicontent-detector",
  },
  {
    id: 4,
    title: "Search IP Address",
    description: "Run a full SEO scan to improve visibility.",
    category: "Utilities",
    image: "/globe.svg",
    tags: ["meta", "seo", "html"],
    url: "/ip-address",
  },
  {
    id: 5,
    title: "Page Speed Test",
    description: "Test website availability and performance from multiple global locations.",
    category: "Developer",
    image: "/audit.svg",
    tags: ["robots", "crawling", "seo"],
    url: "/page-speed",
  },
  {
    id: 6,
    title: "Humanize Content",
    description: "Easily reframe AI-generated text into naturalhuman-like writing.",
    category: "Image",
    image: "/setting.svg",
    tags: ["sitemap", "xml", "indexing"],
    url: "/humanize-content",
  },
];

export type Practice = {
  id: number;
  title: string;
  description: string;
  icon: string; // icon image or path
};

export const bestPractices: Practice[] = [
  {
    id: 1,
    title: "Fast & Reliable",
    description:
      "All tools run client-side for instant results and complete privacy. Your data never leaves your browser.",
    icon: "/fast.svg",
  },
  {
    id: 2,
    title: "Privacy First",
    description:
      "We prioritize your privacy. No data collection, no tracking, no server-side processing of sensitive content.",
    icon: "/privacy.svg",
  },
  {
    id: 3,
    title: "Always Updated",
    description:
      "Our tools are regularly updated with the latest algorithms and best practices for accurate results.",
    icon: "/updated.svg",
  },
];
 //blogs data
// types.ts (you can keep in a separate file if you want)
export interface BlogCardType {
  id: number;
  category: string;
  title: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
}

// blogData.ts
export const blogData: BlogCardType[] = [
  {
    id: 1,
    category: "Marketing",
    title: "Optimizing your advertising campaigns for higher ROAS",
    author: "Annette Black",
    date: "Feb 10, 2022",
    readTime: "8 min read",
    image: "/b1.svg",
  },
  {
    id: 2,
    category: "Marketing",
    title: "Optimizing your advertising campaigns for higher ROAS",
    author: "Annette Black",
    date: "Feb 10, 2022",
    readTime: "8 min read",
    image: "/b2.svg",
  },
]


export const OtherblogData: BlogCardType[] = [
  
    {
    id: 1,
    category: "Marketing",
    title: "Optimizing your advertising campaigns for higher ROAS",
    author: "Annette Black",
    date: "Feb 10, 2022",
    readTime: "8 min read",
    image: "/b3.svg",
  },
  {
    id: 2,
    category: "Marketing",
    title: "Optimizing your advertising campaigns for higher ROAS",
    author: "Annette Black",
    date: "Feb 10, 2022",
    readTime: "8 min read",
    image: "/b4.svg",
  },
    {
    id: 3,
    category: "Marketing",
    title: "Optimizing your advertising campaigns for higher ROAS",
    author: "Annette Black",
    date: "Feb 10, 2022",
    readTime: "8 min read",
    image: "/b5.svg",
  },
  {
    id: 4,
    category: "Marketing",
    title: "Optimizing your advertising campaigns for higher ROAS",
    author: "Annette Black",
    date: "Feb 10, 2022",
    readTime: "8 min read",
    image: "/b6.svg",
  },
    {
    id: 5,
    category: "Marketing",
    title: "Optimizing your advertising campaigns for higher ROAS",
    author: "Annette Black",
    date: "Feb 10, 2022",
    readTime: "8 min read",
    image: "/b7.svg",
  },
  {
    id: 6,
    category: "Marketing",
    title: "Optimizing your advertising campaigns for higher ROAS",
    author: "Annette Black",
    date: "Feb 10, 2022",
    readTime: "8 min read",
    image: "/b8.svg",
  },
  
];
