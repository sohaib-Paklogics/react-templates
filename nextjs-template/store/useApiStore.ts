// src/store/useApiStore.ts
import { create } from "zustand";
import { callApi } from "@/lib/callApi";

// ✅ Import all types
import type {
  HumanizeRequest,
  HumanizeResponse,
  IPCheckerRequest,
  IPCheckerResponse,
  AIDetectionResponse,
  SSLCheckerResponse,
  DNSCheckerResponse,
  DNSRecordType,
  PageSpeedResponse,
} from "@/types/api.type";

// ✅ Import all services
import {
  humanizeService,
  ipCheckerService,
  aiDetectionService,
  getSSLCheckerMain,
  dnsCheckerService,
  runPageSpeedTest,
} from "@/services/api.service";

// ---------------- STORE INTERFACE ----------------
interface ApiState {
  isLoading: boolean;
  error: string | null;

  // Humanizer
  humanizeResult: HumanizeResponse | null;
  processHumanize: (data: HumanizeRequest) => Promise<void>;

  // IP Checker
  ipCheckerResult: IPCheckerResponse | null;
  processIPCheck: (data: IPCheckerRequest) => Promise<void>;

  // AI Detection
  aiDetectionResult: AIDetectionResponse | null;
  processAIDetection: (payload: { text: string; methods: string[]; exportFormat?: string }) => Promise<void>;
  processFileDetection: (file: File, methods: string[], exportFormat?: string) => Promise<void>;

  // SSL Checker
  sslCheckerResult: SSLCheckerResponse | null;
  fetchSSLChecker: (domain: string) => Promise<void>;
  clearSSLChecker: () => void;

  // DNS Checker
  dnsLoading: boolean;
  dnsError: string | null;
  dnsResult: DNSCheckerResponse | null;
  lastDomain: string | null;
  lastTypes: DNSRecordType[] | null;
  _abortController: AbortController | null;
  fetchDnsCheck: (domain: string, types?: DNSRecordType[]) => Promise<void>;
  cancelDnsCheck: () => void;

  // PageSpeed
  pageSpeedResult: PageSpeedResponse | null;
  fetchPageSpeed: (url: string, strategy: "desktop" | "mobile" | "both") => Promise<void>;
  clearPageSpeed: () => void;

  // Reset
  clearAll: () => void;
}

// ---------------- STORE IMPLEMENTATION ----------------
const useApiStore = create<ApiState>((set, get) => ({
  isLoading: false,
  error: null,

  // --- Results ---
  humanizeResult: null,
  ipCheckerResult: null,
  aiDetectionResult: null,
  sslCheckerResult: null,

  // DNS
  dnsLoading: false,
  dnsError: null,
  dnsResult: null,
  lastDomain: null,
  lastTypes: null,
  _abortController: null,

  // -------- Humanizer ----------
  processHumanize: async (data) => {
    set({ isLoading: true, error: null });
    const response = await callApi<HumanizeResponse>(() => humanizeService.processText(data), {
      showSuccess: false,
      showError: true,
    });

    if (response) {
      set({ humanizeResult: response, isLoading: false });
    } else {
      set({ error: "⚠️ Failed to humanize text.", isLoading: false });
    }
  },

  // -------- IP Checker ----------
  processIPCheck: async (data) => {
    set({ isLoading: true, error: null });

    const response = await callApi<IPCheckerResponse>(() => ipCheckerService.checkIP(data), {
      showSuccess: false,
      showError: true,
    });

    if (response) {
      set({ ipCheckerResult: response, isLoading: false });
    } else {
      set({ error: "⚠️ Failed to fetch IP info.", isLoading: false });
    }
  },

  // -------- AI Detection ----------
  processAIDetection: async ({ text, methods, exportFormat }) => {
    set({ isLoading: true, error: null });
    try {
      const payload = {
        text,
        methods: methods.length > 0 ? methods : ["all_methods"], // fallback to all
        exportFormat: exportFormat || undefined,
      };

      const res = await aiDetectionService.analyzeText(payload);
      set({ aiDetectionResult: res, isLoading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || err?.message || "⚠️ Failed to analyze text",
        isLoading: false,
      });
    }
  },

  processFileDetection: async (file, methods, exportFormat) => {
    set({ isLoading: true, error: null });
    try {
      const res = await aiDetectionService.analyzeFile(file, methods, exportFormat);
      set({ aiDetectionResult: res, isLoading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || err?.message || "⚠️ Failed to analyze file",
        isLoading: false,
      });
    }
  },

  // -------- SSL Checker ----------
  fetchSSLChecker: async (domain: string) => {
    set({ isLoading: true, error: null });
    try {
      const data: SSLCheckerResponse = await getSSLCheckerMain(domain);
      set({ sslCheckerResult: data, isLoading: false });
    } catch (err: any) {
      set({
        error: err?.response?.data?.message || "⚠️ Failed to fetch SSL Checker data",
        isLoading: false,
      });
    }
  },

  clearSSLChecker: () => set({ sslCheckerResult: null, error: null }),

  // -------- DNS Checker ----------
  cancelDnsCheck: () => {
    const { _abortController } = get();
    if (_abortController) {
      _abortController.abort();
      set({ _abortController: null, dnsLoading: false });
    }
  },

  fetchDnsCheck: async (domain, types) => {
    const cleanDomain = (domain ?? "").trim();
    if (!cleanDomain) {
      set({ dnsError: "Domain is required." });
      return;
    }

    get().cancelDnsCheck();

    const aborter = new AbortController();
    set({
      _abortController: aborter,
      dnsLoading: true,
      dnsError: null,
    });

    try {
      const result: DNSCheckerResponse = await dnsCheckerService.check(
        cleanDomain,
        types && types.length > 0 ? types : undefined,
      );

      set({
        dnsResult: result,
        lastDomain: cleanDomain,
        lastTypes: types ?? null,
      });
    } catch (err: any) {
      if (err?.name !== "CanceledError" && err?.name !== "AbortError") {
        set({ dnsError: err?.message || "⚠️ Failed to fetch DNS data." });
      }
    } finally {
      const { _abortController } = get();
      if (_abortController === aborter) {
        set({ _abortController: null });
      }
      set({ dnsLoading: false });
    }
  },

  // -------- PageSpeed ----------
  pageSpeedResult: null,

  fetchPageSpeed: async (url, strategy) => {
    set({ isLoading: true, error: null });
    try {
      const data = await runPageSpeedTest(url, strategy);
      set({ pageSpeedResult: data, isLoading: false });
    } catch (err: any) {
      set({ isLoading: true, error: null });
      try {
        const data = await runPageSpeedTest(url, strategy);
        set({ pageSpeedResult: data, isLoading: false });
      } catch (err: any) {
        set({
          error:
            err?.response?.data?.detail || // <-- prefer 'detail'
            err?.response?.data?.message || // fallback to 'message'
            (typeof err?.message === "string" ? err.message : "Failed to fetch PageSpeed data"),
          isLoading: false,
        });
      }
    }
  },

  clearPageSpeed: () => set({ pageSpeedResult: null, error: null }),

  // -------- Reset ----------
  clearAll: () =>
    set({
      humanizeResult: null,
      ipCheckerResult: null,
      aiDetectionResult: null,
      sslCheckerResult: null,
      dnsResult: null,
      pageSpeedResult: null,
      error: null,
      dnsError: null,
      isLoading: false,
      dnsLoading: false,
    }),
}));

export default useApiStore;
