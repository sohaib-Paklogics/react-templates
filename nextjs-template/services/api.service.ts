// src/services/api.service.ts
import {
  AIDetectionRequest,
  AIDetectionResponse,

  HumanizeRequest,
  HumanizeResponse,
  IPCheckerRequest,
  IPCheckerResponse,
  SSLCheckerResponse,
  DNSCheckerResponse,
  DNSRecordType,
  PageSpeedResponse,
} from "@/types/api.type";
import api from "@/lib/api";

// ================== Humanize Service ==================
export const humanizeService = {
  processText: async (data: HumanizeRequest): Promise<HumanizeResponse> => {
    const response = await api.post<HumanizeResponse>("/humanize-ai/main", data);
    return response.data;
  },
};

// ================== IP Checker Service ==================
export const ipCheckerService = {
  checkIP: async (data: IPCheckerRequest): Promise<IPCheckerResponse> => {
    const response = await api.get<IPCheckerResponse>("/ip-checker/main", {
      params: data,
    });
    return response.data;
  },
};

// ================== Multi-location Speed Service ==================
export const runPageSpeedTest = async (
  url: string,
  strategy: "desktop" | "mobile" | "both"
): Promise<PageSpeedResponse> => {
  const response = await api.post<PageSpeedResponse>("/pagespeed/speed-test", {
    url,
    strategy,
  });
  return response.data;
};
// ================== AI Detection Service ==================
export const aiDetectionService = {
  // 🔹 Text Analysis
  analyzeText: async (
    payload: AIDetectionRequest,
    methods: string[] = [],
    exportFormat?: string
  ): Promise<AIDetectionResponse> => {
    const body = {
      ...payload,
      methods: methods.length ? methods : undefined,
      exportFormat,
    };

    const response = await api.post<AIDetectionResponse>(
      "/ai-detection/text-analysis",
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  },

  // 🔹 File Analysis
  analyzeFile: async (
    file: File,
    methods: string[] = [],
    exportFormat?: string
  ): Promise<AIDetectionResponse> => {
    const fd = new FormData();
    fd.append("file", file);

    if (methods.length) {
      fd.append("methods", JSON.stringify(methods));
    }
    if (exportFormat) {
      fd.append("exportFormat", exportFormat);
    }

    const response = await api.post<AIDetectionResponse>(
      "/ai-detection/file-analysis",
      fd,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return response.data;
  },
};


// ================== SSL Checker ==================
export const getSSLCheckerMain = async (
  domain: string
): Promise<SSLCheckerResponse> => {
  if (!domain) {
    throw new Error("Domain is required to check SSL");
  }

  const response = await api.get<SSLCheckerResponse>("/ssl-checker/main", {
    params: { domain },
  });

  return response.data;
};

// ================== DNS Checker ==================
export const dnsCheckerService = {
  check: async (
    domain: string,
    types?: DNSRecordType[]
  ): Promise<DNSCheckerResponse> => {
    if (!domain) {
      throw new Error("Domain is required to check DNS");
    }

    const response = await api.get<DNSCheckerResponse>("/dns-checker/dns-check", {
      params: {
        domain,
        ...(types?.length ? { types: types.join(",") } : {}),
      },
    });

    return response.data;
  },
};
