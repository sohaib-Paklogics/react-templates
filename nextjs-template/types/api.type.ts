
export interface HumanizeRequest {
  text: string;
  service: "enhanced" | "basic" | "advanced" | "neural" | "openai";
  strength: "light" | "medium" | "strong" | "extreme";
  target_style: "conversational" | "creative" | "professional" | "academic";
  batch_texts?: string[];
}

export interface HumanizeResponse {
  health?: any; // optional health info
  humanize_result?: {
    original_text: string;
    humanized_text: string;
    service_used: string;
    changes_made: string[];
    humanization_techniques: string[];
  };
  batch_result?: any;
  compare_result?: any;
}


//ip address 


// utils/countryCodes.ts
export const countryNameToCode: Record<string, string> = {
  "Pakistan": "PK",
  "India": "IN",
  "United States": "US",
  "United Kingdom": "GB",
  "Germany": "DE",
  "France": "FR",
  "China": "CN",
  "Japan": "JP",
  "Canada": "CA",
  "Australia": "AU",
  "Brazil": "BR",
  "Russia": "RU",
  // 👉 add more as needed, or use a full ISO dataset
};

export interface IPCheckerRequest {
  ip: string;
}

export interface IPCheckerResponse {
  ip_info: {
    ip: string;
    location: {
      country: string;
      city: string;
      region: string;
       country_code?: string;
    };
    network: {
      isp: string;
      organization: string;
      asn: string;
    };
    security: {
      is_proxy: boolean;
      is_hosting: boolean;
      likely_vpn: boolean;
      likely_datacenter: boolean;
      proxy_score: number;
    };
  };
}

// error format from backend
export interface ApiErrorDetail {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface ApiErrorResponse {
  detail: ApiErrorDetail[];
}

//multilocation

// src/types/api.type.ts

// PageSpeed API response type
interface CoreWebVitals {
  lcp_seconds: number;
  fcp_seconds: number;
  inp_ms: number;
  cls_score: number;
  ttfb_seconds: number;
  assessment: string;
}

interface PerformanceMetrics {
  fcp_seconds: number;
  lcp_seconds: number;
  tbt_ms: number;
  cls_score: number;
  si_seconds: number;
}

interface PageDetails {
  core_web_vitals: CoreWebVitals;
  performance_metrics: PerformanceMetrics;
  page_size_kb: number;
  requests_count: number;
  missing_meta_description: boolean;
  has_title: boolean;
  has_h1: boolean;
  has_canonical: boolean;
  missing_alt_images: number;
  total_interactive_elements: number;
  uses_https: boolean;
  security_issues: Record<string, boolean>;
  insights: {
    render_blocking_resources: any[];
    cache_lifetime_savings_kb: number;
    image_optimization_savings_kb: number;
    unused_javascript_savings_kb: number;
    css_minification_savings_kb: number;
    third_party_impact_ms: number;
  };
}

interface PageSpeedResult {
  performance_score: number;
  accessibility_score: number;
  best_practices_score: number;
  seo_score: number;
  details: PageDetails;
}

export interface PageSpeedResponse {
    strategy: "desktop" | "mobile" | "both";
  desktop?: PageSpeedResult;
  mobile?: PageSpeedResult;
  performance_score: number;
  accessibility_score: number;
  best_practices_score: number;
  seo_score: number;
  details: {
    core_web_vitals: {
      lcp_seconds: number;
      inp_ms: number;
      cls_score: number;
      fcp_seconds: number;
      ttfb_seconds: number;
      assessment: string;
    };
    performance_metrics: {
      fcp_seconds: number;
      lcp_seconds: number;
      tbt_ms: number;
      cls_score: number;
      si_seconds: number;
    };
    page_size_kb: number;
    requests_count: number;
    missing_meta_description: boolean;
    has_title: boolean;
    has_h1: boolean;
    has_canonical: boolean;
    missing_alt_images: number;
    interactive_elements_with_aria: number;
    total_interactive_elements: number;
    uses_https: boolean;
    has_inline_js: boolean;
    console_errors: number;
    security_issues: {
      missing_csp: boolean;
      missing_hsts: boolean;
      missing_coop: boolean;
      missing_xfo: boolean;
      missing_trusted_types: boolean;
    };
    insights: {
      render_blocking_resources: {
        url: string;
        transfer_size_kb: number;
        potential_savings_kb: number;
      }[];
      cache_lifetime_savings_kb: number;
      image_optimization_savings_kb: number;
      unused_javascript_savings_kb: number;
      css_minification_savings_kb: number;
      third_party_impact_ms: number;
    };
    dom_elements_count: number;
    largest_image_size: string;
    font_loading_issues: number;
  };
}


//ai detection
// src/types/api.type.ts

// src/types/api.type.ts

// -------- Request --------
// -------- Modes --------
// src/types/api.type.ts

// -------- AI Detection --------


export interface AIDetectionRequest {
  text?: string;               // optional for file detection    // strongly typed mode
  methods?: string[];
  exportFormat?: string;
  [key: string]: any;          // flexible for backend fields
}

// -------- Input Metadata --------
export interface InputMetadata {
  characters: number;
  characters_no_spaces: number;
  words: number;
  sentences: number;
  paragraphs: number;
  unique_words: number;
}

// -------- Individual detection method result --------
export interface DetectionResult {
  method: string;                   // e.g. "OpenAI Simple Check"
  method_type?: string;             // e.g. "AI-powered binary classification"
  verdict: "Human-written" | "AI-generated" | "Error in analysis";
  confidence: number;               // 0.0 - 1.0
  details?: Record<string, any> | null;
  execution_time?: number;          // seconds
  error?: string | null;
}

// -------- Summary block --------
export interface AIDetectionSummary {
  methods_used: number;
  successful_methods: number;
  failed_methods: number;
  avg_confidence: number;
}

// -------- Detection percentages --------
export interface DetectionPercentages {
  ai_generated?: string;     // e.g. "40%"
  ai_refined?: string;       // e.g. "20%"
  human_written?: string;    // e.g. "40%"
  [key: string]: string | undefined;
}

// -------- Full AI Detection API Response --------
export interface AIDetectionResponse {
  status: "success" | "failed";
  analysis_id: string;
  input_metadata?: InputMetadata;
  detection?: DetectionPercentages;
  detection_results: any;  
  final_verdict?: string;
  overall_confidence?: number;
  processing_time?: number;
  export_url?: string | null;
  summary?: AIDetectionSummary;
  [key: string]: any;
}



//SSL check
// api.type.ts

export interface ApiInfo {
  message: string;
  version: string;
  description: string;
  features: string[];
  usage: string;
  endpoints: Record<string, string>;
}

export interface ServerInfo {
  hostname: string;
  resolved_ip: string;
  port: number;
  server_type: string | null;
  supported_protocols: string[];
  cipher_suite: string;
}

export interface LeafCertificate {
  common_name: string;
  subject_dn: string;
  sans: string[];
  issuer_cn: string;
  issuer_dn: string;
  issuer_organization: string;
  issuer_location: string;
  valid_from: string;
  valid_to: string;
  days_left: number;
  is_expired: boolean;
  serial_hex: string;
  signature_algorithm: string;
  key_size: number;
  public_key_algorithm: string;
  fingerprint_sha1: string;
  fingerprint_sha256: string;
  is_self_signed: boolean;
  key_usage: string[];
  extended_key_usage: string[];
}

export interface CertificateChain {
  leaf_certificate: LeafCertificate;
  intermediate_certificates: LeafCertificate[];
  root_certificate: LeafCertificate | null;
  chain_length: number;
  is_complete_chain: boolean;
}

export interface SSLResult {
  server_info: ServerInfo;
  certificate_chain: CertificateChain;
  trusted_by_system_ca: boolean;
  trust_error: string | null;
  hostname_matches: boolean;
  security_issues: string[];
  security_score: number;
  recommendations: string[];
  timestamp: string;
  response_time_ms: number;
  cached: boolean;
  ok: boolean;
}

export interface SavedResult {
  server_info: ServerInfo;
  certificate_chain: CertificateChain;
  trusted_by_system_ca: boolean;
  trust_error: string | null;
  hostname_matches: boolean;
  security_issues: string[];
  security_score: number;
  recommendations: string[];
  timestamp: string;
  response_time_ms: number;
  cached: boolean;
  ok: boolean;
}

export interface SavedResults {
  results: SavedResult[];
  total: number;
  returned: number;
}

export interface SSLCheckerResponse {
  api_info: ApiInfo;
  ssl_result: SSLResult;
  saved_results: SavedResults;
}

//DNS Checker
// api.type.ts

// ---------------- DNS CHECKER TYPES ----------------

// All supported DNS record types
export type DNSRecordType =
  | "A"
  | "AAAA"
  | "CNAME"
  | "MX"
  | "NS"
  | "TXT"
  | "SOA"
  | "SRV"
  | "PTR"
  | "CAA"
  | "DS"
  | "DNSKEY";

// Status of a DNS record query
export type DNSRecordStatus = "resolved" | "not_resolved" | "timeout" | "error";

// Info about a server used for DNS resolution
export interface ServerInfo {
  name: string;
  ip: string;
  location: string;
  provider: string;
  country: string;
  country_code: string;
  flag_emoji: string;
  flag_url: string;
}

// A successfully resolved DNS record
export interface DNSAnswerRecord {
  name: string; // e.g. "www.example.com"
  type: DNSRecordType;
  ttl: number;
  data: string; // e.g. "192.168.0.1" or "alias.domain.com"
  server: string;
  server_info: ServerInfo;
  response_time_ms: number;
  status: DNSRecordStatus; // usually "resolved"
}

// An error returned by a DNS server
export interface DNSErrorEntry {
  server: string;
  server_info: ServerInfo;
  error: string; // human readable ("No A record found")
  status: DNSRecordStatus; // usually "not_resolved"
}

// A record set for a given type
export interface DNSRecordSet {
  record_type: DNSRecordType;
  records: DNSAnswerRecord[];
  errors: DNSErrorEntry[];
  successful_queries: number;
  failed_queries: number;
  propagation_percentage: number; // e.g. 65.4
  average_response_time_ms: number;
  unique_values: string[];
}

// Helper type for counts
export type RecordCounts = { [K in DNSRecordType]: number };

// Propagation status summary
export type PropagationStatus = "Partial" | "Complete" | "None" | "Unknown";

// Overall DNS summary
export interface DNSCheckerSummary {
  domain: string;
  primary_ip: string | null;
  record_counts: RecordCounts;
  total_servers_checked: number;
  propagation_status: PropagationStatus;
  propagation_percentage: number;
  countries_tested: number;
  global_coverage: boolean;
}

// Map of all DNS records by type
export type DNSRecordsMap = { [K in DNSRecordType]: DNSRecordSet };

// ---------------- MAIN RESPONSE ----------------
export interface DNSCheckerResponse {
  timestamp: string; // ISO8601
  processing_time_ms: number;
  summary: DNSCheckerSummary;
  dns_records: DNSRecordsMap;
}

// ---------------- REQUEST PARAMS ----------------
export interface DNSCheckerParams {
  domain: string;
  types?: DNSRecordType[]; // optional filter
  [key: string]: unknown;  // allow provider-specific flags
}
