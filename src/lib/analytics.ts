export function track(event: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  // Google Analytics 4
  const w = window as unknown as {
    dataLayer?: unknown[];
    ym?: (id: number, method: string, goal: string, params?: Record<string, unknown>) => void;
  };
  if (w.dataLayer) {
    w.dataLayer.push({ event, ...params });
  }
  const ymId = Number(process.env.NEXT_PUBLIC_YM_ID);
  if (w.ym && ymId) {
    w.ym(ymId, "reachGoal", event, params);
  }
}

export function getUtm(): Record<string, string> {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
    const v = params.get(k);
    if (v) utm[k] = v;
  });
  return utm;
}
