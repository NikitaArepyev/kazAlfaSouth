"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    ym?: (id: number, method: string, goal: string, params?: Record<string, unknown>) => void;
  }
}

export default function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const ymId = process.env.NEXT_PUBLIC_YM_ID;

  useEffect(() => {
    if (gaId) {
      const s = document.createElement("script");
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(s);
      window.dataLayer = window.dataLayer || [];
      const gtag = (...args: unknown[]) => window.dataLayer?.push(args);
      gtag("js", new Date());
      gtag("config", gaId);
    }

    if (ymId) {
      const id = Number(ymId);
      const s = document.createElement("script");
      s.innerHTML = `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
      m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
      (window,document,"script","https://mc.yandex.ru/metrika/tag.js","ym");
      ym(${id}, "init", { clickmap:true, trackLinks:true, accurateTrackBounce:true });`;
      document.head.appendChild(s);
    }
  }, [gaId, ymId]);

  return null;
}
