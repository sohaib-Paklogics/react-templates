export interface Benefit {
  id: number;
  text: string;
}

export interface Information {
  id: number;
  text: string;
}

export const benefitsData: Benefit[] = [
  { id: 1, text: "Geolocation Data – Find out the country, region, and city linked to the IP." },
  { id: 2, text: "ISP & Network Details – Identify the Internet Service Provider and organization that owns the IP." },
  { id: 3, text: "Security Insights – Detect if the IP is flagged for suspicious or malicious activity." },
  { id: 4, text: "Domain & Host Mapping – See connections between the IP and associated domains or servers." },
];

export const informationGetData: Information[] = [
  { id: 1, text: "Geolocation – Country, city, and region associated with the IP." },
  { id: 2, text: "ISP Details – Internet Service Provider and organization name." },
  { id: 3, text: "Connection Type – Whether the IP belongs to a mobile network, broadband, or data center." },
  { id: 4, text: "Blacklist Status – Check if the IP is flagged for spam, fraud, or other malicious activity." },
  { id: 5, text: "Domain/Host Mapping – Discover domains hosted on the same IP." },
];
