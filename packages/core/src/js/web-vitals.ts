type MetricName = 'LCP' | 'CLS' | 'FID';

function report(metric: { name: MetricName; value: number }) {
  // Placeholder reporting; replace with your analytics endpoint if desired
  // navigator.sendBeacon('/analytics', JSON.stringify(metric));
  // For now, log to console to verify
  console.info('[web-vitals]', metric.name, Math.round(metric.value * 1000) / 1000);
}

export function initWebVitals() {
  if ('PerformanceObserver' in window) {
    try {
      const poLCP = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const last = entries[entries.length - 1] as PerformanceEntry & { value?: number };
        if (last) report({ name: 'LCP', value: (last as any).startTime || last.duration || 0 });
      });
      poLCP.observe({ type: 'largest-contentful-paint', buffered: true } as any);

      let clsValue = 0;
      const poCLS = new PerformanceObserver((entryList) => {
        for (const e of entryList.getEntries() as any) {
          if (!e.hadRecentInput) clsValue += e.value || 0;
        }
        report({ name: 'CLS', value: clsValue });
      });
      poCLS.observe({ type: 'layout-shift', buffered: true } as any);

      const poFID = new PerformanceObserver((entryList) => {
        const first = entryList.getEntries()[0] as any;
        if (first) report({ name: 'FID', value: first.processingStart - first.startTime });
      });
      poFID.observe({ type: 'first-input', buffered: true } as any);
    } catch (e) {
      // PerformanceObserver types vary by browser; fail silently if unsupported
    }
  }
}

